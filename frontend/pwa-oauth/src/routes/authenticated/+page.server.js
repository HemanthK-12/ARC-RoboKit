export function load({ cookies }) {
    console.log("Cookies data:", cookies.get('user_details'));
    const user = cookies.get('user_details');
    return {
      user: user ? JSON.parse(user) : null
    };
}