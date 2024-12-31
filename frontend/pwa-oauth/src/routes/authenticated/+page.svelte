<script>
  export let data;
  const user = data.user;
</script>

{#if user}
  <div class="profile-card">
    <h1>Welcome, {user.name}!</h1>
    <div class="image-container">
      <!--don't use "picture","image" or "photo" words in the alt attribute to
      avoid the screen readers error.-->
      <img
        src={user.picture}
        alt="Profile"
        loading="lazy"
        referrerpolicy="no-referrer"
      />
      <!--use this no-referrer policy above, otherwise photos with googleusercontent.com in their url won't be displayed.-->
    </div>
    <p class="email">Email: {user.email}</p>
  </div>
{:else}
  <h1>{user}</h1>
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

  .profile-card {
    background: #2d3748;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    margin: 2rem auto;
    text-align: center;
    transition: transform 0.2s ease;
    border: 1px solid #4a5568;
  }

  .profile-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }

  h1 {
    color: #e2e8f0;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    font-weight: 600;
  }

  .image-container {
    width: 120px;
    height: 120px;
    margin: 0 auto 1.5rem;
    border-radius: 50%;
    padding: 3px;
    background: linear-gradient(45deg, #4299e1, #48bb78);
  }

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 3px solid #2d3748;
    transition: transform 0.3s ease;
  }

  img:hover {
    transform: scale(1.05);
  }

  .email {
    color: #e2e8f0;
    font-size: 1.1rem;
    margin-top: 1rem;
    padding: 0.75rem;
    background: #1a202c;
    border-radius: 0.5rem;
    border: 1px solid #4a5568;
  }

  @media (max-width: 480px) {
    .profile-card {
      margin: 1rem;
      padding: 1.5rem;
    }

    h1 {
      font-size: 1.5rem;
    }
  }
</style>
