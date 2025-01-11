<script>
    import Button2 from '$lib/components/Button2.svelte';
    import Card2 from '$lib/components/Card2.svelte';
</script>
  
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <Card2 class="w-full max-w-md p-6 space-y-8">
      <div class="space-y-2">
        <div class="flex justify-center">
          <img
            src="/ARC_512.png"
            alt="Robotics Club Logo"
            width="120"
            height="120"
            class="mb-4"
          />
        </div>
      </div>
  
      <div class="space-y-6 text-center">
        <div class="space-y-2">
          <h1 class="text-2xl font-semibold tracking-tight">
            Welcome to RoboKit
          </h1>
          <h2 class="text-lg text-muted-foreground mb-2">
            by Automation and Robotics Club (ARC)
          </h2>
          <p class="text-sm text-muted-foreground">
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
  
        <p class="text-sm text-muted-foreground">
          Not a Robotics Club member? Please contact the club administrator for access.
        </p>
      </div>
    </Card2>
  </div>
  
  <style>
    .min-h-screen {
      min-height: 100vh;
    }
    .bg-gray-50 {
      background-color: #f9fafb;
    }
    .text-muted-foreground {
      color: #6b7280;
    }
  </style>