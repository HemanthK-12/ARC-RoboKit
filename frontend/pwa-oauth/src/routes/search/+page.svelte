<script>
    import { writable } from "svelte/store";
  
    const items = [
      {
        id: 1,
        name: "Arduino Uno",
        photo: "/placeholder.svg",
        category: "Electronics",
        status: "Available",
        quantity: 10,
      },
      {
        id: 2,
        name: "Servo Motor",
        photo: "/placeholder.svg",
        category: "Mechanics",
        status: "Running Out",
        quantity: 3,
      },
      {
        id: 3,
        name: "Ultrasonic Sensor",
        photo: "/placeholder.svg",
        category: "Sensors",
        status: "Out of Stock",
        quantity: 0,
      },
    ];
  
    let searchQuery = "";
    let showFilters = false;
    let filteredItems = items;
  
    function filterItems() {
      filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    $: searchQuery, filterItems();
  </script>
  
  <div class="min-h-screen bg-[#121212]">
    <!-- Navigation Bar -->
    <nav class="sticky top-0 z-10 bg-[#1E1E1E] shadow-md px-4 py-3 flex justify-between items-center border-b border-[#333333]">
      <div class="flex items-center gap-2">
        <div class="h-6 w-6 bg-[#FF4413] rounded-full"></div>
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
        <button 
          class="border border-[#6AB1EB] text-[#6AB1EB] px-4 py-2 rounded-md hover:bg-[#6AB1EB]/20"
          on:click={() => showFilters = !showFilters}
        >
          Filters
        </button>
      </div>
  
      <div class="relative">
        <input 
          type="text" 
          placeholder="Search items..." 
          class="w-full pl-10 pr-4 py-3 rounded-full border border-[#6AB1EB] bg-[#2A2A2A] text-white placeholder-gray-400"
          bind:value={searchQuery}
        />
        <div class="absolute left-3 top-1/2 -translate-y-1/2 text-[#6AB1EB] h-5 w-5">🔍</div>
      </div>
  
      {#if showFilters}
        <div class="bg-[#2A2A2A] p-4 rounded-xl shadow-md border border-[#333333]">
          <h3 class="mb-3 font-semibold text-white">Filter Options</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block mb-2 text-gray-300">Category</label>
              <select class="w-full p-2 border border-[#6AB1EB] rounded-md bg-[#1E1E1E] text-white">
                <option value="">All Categories</option>
                <option>Electronics</option>
                <option>Mechanics</option>
                <option>Sensors</option>
              </select>
            </div>
            <div>
              <label class="block mb-2 text-gray-300">Status</label>
              <select class="w-full p-2 border border-[#6AB1EB] rounded-md bg-[#1E1E1E] text-white">
                <option value="">All Status</option>
                <option>Available</option>
                <option>Running Out</option>
                <option>Out of Stock</option>
              </select>
            </div>
            <div>
              <label class="block mb-2 text-gray-300">Sort By</label>
              <select class="w-full p-2 border border-[#6AB1EB] rounded-md bg-[#1E1E1E] text-white">
                <option>Name (A-Z)</option>
                <option>Name (Z-A)</option>
                <option>Quantity (High-Low)</option>
                <option>Quantity (Low-High)</option>
              </select>
            </div>
          </div>
        </div>
      {/if}
  
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredItems as item}
          <div class="border border-[#333333] shadow-md hover:shadow-lg transition-all overflow-hidden rounded-xl bg-[#2A2A2A]">
            <div 
              class="p-6 bg-gradient-to-r from-[#2A2A2A] to-[#222222]"
              style="border-top: 4px solid {item.category === 'Electronics' ? '#FF4413' : item.category === 'Mechanics' ? '#6AB1EB' : '#FEFB0E'};"
            >
              <h3 class="font-semibold text-lg text-white">{item.name}</h3>
              <span class="inline-block px-2 py-1 text-xs rounded-full mt-2"
                style="background-color: {item.status === 'Available' ? 'rgba(5, 150, 105, 0.2)' : item.status === 'Running Out' ? 'rgba(217, 119, 6, 0.2)' : 'rgba(220, 38, 38, 0.2)'}; 
                       color: {item.status === 'Available' ? '#10B981' : item.status === 'Running Out' ? '#F59E0B' : '#EF4444'};"
              >
                {item.status}
              </span>
            </div>
            <div class="p-6 pt-0 flex flex-col h-full">
              <div class="flex-grow">
                <div class="aspect-square bg-[#1E1E1E] rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.photo || "/placeholder.svg"}
                    alt={item.name}
                    class="object-cover w-full h-full"
                  />
                </div>
                <p class="text-gray-300 mb-1">Category: <span class="font-medium text-white">{item.category}</span></p>
                <p class="text-gray-300 mb-4">Quantity: <span class="font-medium text-white">{item.quantity}</span></p>
              </div>
              <button 
                class="w-full mt-auto px-4 py-2 rounded-md text-white"
                style="background-color: {item.status === 'Out of Stock' ? '#4B5563' : '#6AB1EB'};"
                disabled={item.status === 'Out of Stock'}
              >
                {item.status === 'Out of Stock' ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        {/each}
      </div>
  
      {#if filteredItems.length === 0}
        <div class="text-center py-12">
          <div class="bg-[#2A2A2A] p-8 rounded-xl shadow-md inline-block border border-[#333333]">
            <div class="h-12 w-12 bg-[#6AB1EB] rounded-full mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold text-white mb-2">No items found</h3>
            <p class="text-gray-400">Try adjusting your search or filters</p>
          </div>
        </div>
      {/if}
    </div>
  </div>