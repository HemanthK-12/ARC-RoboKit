<script>
  export let data;
  const user = data.user;
</script>

{#if user}
  <div class="bg-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl max-w-sm m-8-auto transition-transform duration-200 ease border border-gray-600 transform hover:translate-y--5 xs:mx-4 xs:my-4 xs:p-6">
    <h1 class="text-gray-200 mb-6 text-2xl font-semibold">Welcome, {user.name}!</h1>
    <div class="w-30 h-30 mx-auto mb-6 rounded-full p-0.75 bg-gradient-to-r from-blue-500 to-green-500">
      <!--don't use "picture","image" or "photo" words in the alt attribute to
      avoid the screen readers error.-->
      <img
        src={user.picture}
        alt="Profile"
        loading="lazy"
        referrerpolicy="no-referrer"
        class="rounded-full w-full h-full object-cover border-4 border-gray-800 transition-transform duration-300 ease-in-out transform hover:scale-105"
      />
      <!--use this no-referrer policy above, otherwise photos with googleusercontent.com in their url won't be displayed.-->
    </div>
    <p class="text-gray-200 text-base mt-4 p-3 bg-gray-900 rounded-md border border-gray-600">Email: {user.email}</p>
  </div>
{:else}
  <h1 class="text-gray-200 mb-6 text-2xl font-semibold">{user}</h1>
{/if}

<style>
  :global(body) {
    background: #1a202c;
    color: #e2e8f0;
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* .profile-card:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  } */
</style>
