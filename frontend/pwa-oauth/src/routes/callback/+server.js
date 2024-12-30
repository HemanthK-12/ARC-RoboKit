import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '$env/static/private';

async function getUserData(access_token) {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  const data = await response.json();
  return data;
}
export const GET = async ({ url, cookies }) => {
  const code = await url.searchParams.get('code');
  try {
    const oAuth2Client = new OAuth2Client(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL
    );
    const r = await oAuth2Client.getToken(code);
    // Make sure to set the credentials on the OAuth2 client.
    oAuth2Client.setCredentials(r.tokens);
    console.info('Tokens acquired.');
    const user = oAuth2Client.credentials;

    const user_details=await getUserData(user.access_token);
    console.log('user_details printingggg ', user_details);
    cookies.set('user_details', JSON.stringify(user_details), {path:'/'});
    console.log("COOOOOOKKKKKKIIIIIIEEEEESSSSSS",cookies.get('user_details'));
  } catch (err) {
    console.log('Error logging in with OAuth2 user', err);
  }
  throw redirect(303, '/authenticated');
};

