import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '$env/static/private';


export const actions = {
  OAuth2: async ({ }) => {
    const oAuth2Client = new OAuth2Client(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL
    );
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/userinfo.profile  https://www.googleapis.com/auth/userinfo.email  openid ',
      prompt: 'consent'
    });
    throw redirect(302, authorizeUrl);
  }

}