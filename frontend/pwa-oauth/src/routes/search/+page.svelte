<script>
  import { onMount } from "svelte";

  let inventory = [];

  async function fetchInventory() {
    const response = await fetch("http://localhost:5000/api/inventory");
    inventory = await response.json();
  }

  onMount(fetchInventory);
</script>

<div class="min-h-screen bg-[#121212]">
  <!-- Navigation Bar -->
  <nav class="sticky top-0 z-10 bg-[#1E1E1E] shadow-md px-4 py-3 flex justify-between items-center border-b border-[#333333]">
    <div class="flex items-center gap-2">
      <img 
      src="/ARC.png" 
      alt="Robokit Logo" 
      class="h-12 w-12 rounded-full object-cover"
    />
      <h1 class="font-bold text-xl text-white">Robokit</h1>
    </div>
    <div class="flex items-center gap-4">
      <button class="p-2 rounded-full hover:bg-[#333333]">
        <div class="h-5 w-5 bg-white rounded-full"></div>
      </button>
    </div>
  </nav>

  <div class="container mx-auto px-4 py-6 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-white">Search Inventory</h1>
    </div>

    <div class="relative">
      <input
        type="text"
        placeholder="Search items..."
        class="w-full pl-10 pr-4 py-3 rounded-full border border-[#6AB1EB] bg-[#2A2A2A] text-white placeholder-gray-400"
      />
      <div
        class="absolute left-3 top-1/2 -translate-y-1/2 text-[#6AB1EB] h-5 w-5"
      >
        🔍
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each inventory as item}
        <div class="bg-[#1E1E1E] p-6 rounded-xl border border-[#333333] hover:border-[#6AB1EB] transition-all duration-300 shadow-lg hover:shadow-[#6AB1EB]/10">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-semibold text-white mb-2">{item.name}</h3>
              <div class="space-y-2">
                <p class="text-gray-400 text-sm">Quantity: <span class="text-[#6AB1EB]">{item.quantity}</span></p>
                {#if item.status}
                  <span class="inline-block px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                    Available
                  </span>
                {:else}
                  <span class="inline-block px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400">
                    Unavailable
                  </span>
                {/if}
              </div>
            </div>
            <button class="p-2 hover:bg-[#333333] rounded-lg transition-colors">
              <span class="text-[#6AB1EB]">→</span>
            </button>
          </div>
        </div>
      {/each}
    </div>

  </div>
</div>
