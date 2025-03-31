<script>
    import Button2 from '$lib/components/Button2.svelte';
    import LandingPageCard from '$lib/components/LandingPageCard.svelte';
</script>
  
  <div class="min-h-screen flex items-center justify-center bg-black p-4">
    <LandingPageCard class="w-full max-w-md p-6 space-y-8 ">
      <div class="space-y-2">
        <div class="flex justify-center">
          <img
            src="/ARC_SQUARE.png"
            alt="Robotics Club Logo"
            width="300"
            height="300"
            class="mb-4"
          />
        </div>
      </div>
  
      <div class="space-y-6 text-center text-white">
        <div class="space-y-2">
          <h1 class="text-2xl font-semibold tracking-tight">
            Welcome to RoboKit
          </h1>
          <h2 class="text-lg mb-2">
            by Automation and Robotics Club (ARC)
          </h2>
          <p class="text-sm">
            This application is exclusively for ARC members.
            Please sign in with your club-registered Google account.
          </p>
        </div>
        <form
        class="flex flex-col justify-center text-center items-center"
        method="post"
        action="?/OAuth2"
    >
        <button class="google-btn" type="submit">Continue with Google</button
        >
    </form>
  
        <p class="text-sm">
          Not a Robotics Club member? Please contact the club administrator for access.
        </p>
      </div>
    </LandingPageCard>
  </div>
  
  <style>
    .min-h-screen {
      min-height: 100vh;
    }
  </style>