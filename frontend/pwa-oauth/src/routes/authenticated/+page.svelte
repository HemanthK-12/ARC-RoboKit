<script context="module">
  export async function load({ cookies }) {
    const user = cookies.get('user_details');
    console.log("THISSSSSSS",user)
    return { user: user ? JSON.parse(user) : null };
  }
</script>

<script>
  export let user;
</script>

{#if user}
  <h1>Welcome, {user.name}!</h1>
  <img src={user.picture} alt="Profile Picture" />
  <p>Email: {user.email}</p>
{:else}
 <h1>{user}</h1>
{/if}

<style>
  img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
</style>