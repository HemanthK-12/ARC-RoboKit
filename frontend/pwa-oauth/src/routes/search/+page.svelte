<script>
    import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let inventory = [];
  let searchTerm = "";
  let filteredInventory = [];
  function navigateToItem(id)
  {
    goto(`/item/${id}`);
  }
  async function fetchInventory() {
    const response = await fetch("https://whjpx3pm-5000.inc1.devtunnels.ms/api/inventory");
    inventory = await response.json();
    filteredInventory = inventory;
    console.log(filteredInventory);
  }

  // Filter inventory when search term changes
  $: filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  onMount(fetchInventory);
</script>

<div class="min-h-screen bg-[#121212]">
  <div class="container mx-auto px-4 py-6 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-white">Search Inventory</h1>
    </div>

    <div class="relative">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search items..."
        class="w-full pl-10 pr-4 py-3 rounded-full border border-[#6AB1EB] bg-[#2A2A2A] text-white placeholder-gray-400"
      />
      <div
        class="absolute right-3 top-1/2 -translate-y-1/2 text-[#6AB1EB] h-5 w-5"
      >
        🔍
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each filteredInventory as item}
        <div class="bg-[#1E1E1E] p-6 rounded-xl border border-[#333333] hover:border-[#6AB1EB] transition-all duration-300 shadow-lg hover:shadow-[#6AB1EB]/10">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-semibold text-white mb-2">{item.name}</h3>
              <div class="space-y-2">
                <p class="text-gray-400 text-sm">Quantity: <span class="text-[#6AB1EB]">{item.quantity}</span></p>
                {#if !item.isLowStock}
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
            <button class="p-2 hover:bg-[#333333] rounded-lg transition-colors" on:click={()=>navigateToItem(item.id)}>
              <span class="text-[#6AB1EB]">→</span>
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
