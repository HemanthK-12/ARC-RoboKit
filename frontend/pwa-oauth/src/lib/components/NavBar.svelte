<script>
  import { Home, Search, ShoppingCart, User } from 'lucide-svelte';
  import { writable } from 'svelte/store';
  import "../../app.css";
  let activeTab = writable('home');
</script>

<div class="fixed bottom-6 left-0 right-0 flex justify-center">
  <nav class="bg-black backdrop-blur-lg rounded-full px-2 py-2 mx-4 shadow-lg shadow-black/20">
    <div class="flex items-center gap-2">
      <a 
        href="/home"
        on:click={() => activeTab.set('home')}
        class="p-3 rounded-full transition-all { $activeTab === 'home' ? 'bg-[var(--robokit-red)] text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700' }"
      >

        <Home class="w-6 h-6" />
      </a>
      <a 
        href="/search"
        on:click={() => activeTab.set('search')}
        class="p-3 rounded-full transition-all { $activeTab === 'search' ? 'bg-[var(--robokit-yellow)] text-black' : 'text-gray-400 hover:text-white hover:bg-gray-700' }"
      >
        <Search class="w-6 h-6" />
      </a>
      <a 
        href="/cart"
        on:click={() => activeTab.set('cart')}
        class="p-3 rounded-full transition-all { $activeTab === 'cart' ? 'bg-[var(--robokit-blue)] text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700' }"
      >
        <ShoppingCart class="w-6 h-6" />
      </a>
      <a 
        href="/profile"
        on:click={() => activeTab.set('profile')}
        class="p-3 rounded-full transition-all { $activeTab === 'profile' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700' }"
      >
        <User class="w-6 h-6" />
      </a>
    </div>
  </nav>
</div>

<style>
  .transition-all {
    transition: all 0.3s ease;
  }
</style>