<script>
    // Simple version without complex imports
    const categories = ["Electronics", "Mechanics", "Sensors", "Tools"];
    const popularItems = ["Arduino Uno", "Servo Motor", "Ultrasonic Sensor"];
    const lowStockItems = ["LED", "Resistor", "Capacitor"];
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
  
    <div class="container mx-auto px-4 py-6 space-y-8">
      <!-- Hero Section -->
      <section class="text-center space-y-4 mb-10">
        <h1 class="text-4xl font-bold text-[#FF4413]">
          Welcome to Robokit
        </h1>
        <p class="text-gray-300 max-w-2xl mx-auto">
          Your one-stop solution for managing the robotics club inventory
        </p>
        <div class="relative max-w-md mx-auto mt-8">
          <input 
            type="text" 
            placeholder="Search for items..." 
            class="w-full pl-10 pr-4 py-3 rounded-full border border-[#6AB1EB] bg-[#2A2A2A] text-white placeholder-gray-400" 
          />
        </div>
      </section>
  
      <!-- Categories -->
      <section>
        <h2 class="text-xl font-semibold mb-4 text-white flex items-center">
          <span class="w-1 h-6 bg-[#FF4413] rounded-full mr-2"></span>
          Categories
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          {#each categories as category, i}
            <button
              class="h-auto py-6 flex flex-col gap-2 border-2 hover:border-[#FF4413] hover:text-[#FF4413] transition-all rounded-xl shadow-md bg-[#2A2A2A] text-white"
              style="border-color: {i % 2 === 0 ? '#6AB1EB' : '#FEFB0E'};"
            >
              <span class="text-lg font-medium">{category}</span>
            </button>
          {/each}
        </div>
      </section>
  
      <!-- Popular Items -->
      <section>
        <h2 class="text-xl font-semibold mb-4 text-white flex items-center">
          <span class="w-1 h-6 bg-[#6AB1EB] rounded-full mr-2"></span>
          Popular Items
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {#each popularItems as item, i}
            <div class="border border-[#333333] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all bg-[#2A2A2A]">
              <div 
                class="p-6 bg-gradient-to-r from-[#2A2A2A] to-[#222222]"
                style="border-top: 4px solid {i === 0 ? '#FF4413' : i === 1 ? '#6AB1EB' : '#FEFB0E'};"
              >
                <h3 class="font-semibold text-lg text-white">
                  {item}
                </h3>
              </div>
              <div class="p-6 pt-0">
                <p class="text-gray-300">
                  Short description of {item}
                </p>
                <button class="mt-4 bg-[#6AB1EB] hover:bg-[#6AB1EB]/90 text-white px-4 py-2 rounded-md">
                  Add to Cart
                </button>
              </div>
            </div>
          {/each}
        </div>
      </section>
  
      <!-- Low In Stock Items -->
      <section>
        <h2 class="text-xl font-semibold mb-4 text-white flex items-center">
          <span class="w-1 h-6 bg-[#FF4413] rounded-full mr-2"></span>
          Low In Stock Items
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {#each lowStockItems as item, i}
            <div class="border border-[#333333] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all bg-[#2A2A2A]">
              <div 
                class="p-6 bg-gradient-to-r from-[#2A2A2A] to-[#222222]"
                style="border-top: 4px solid #FF4413;"
              >
                <h3 class="font-semibold text-lg text-white">
                  {item}
                </h3>
              </div>
              <div class="p-6 pt-0">
                <p class="text-[#FF4413]">Only 5 left in stock</p>
                <button class="mt-4 bg-[#FF4413] hover:bg-[#FF4413]/90 text-white px-4 py-2 rounded-md">
                  Request Restock
                </button>
              </div>
            </div>
          {/each}
        </div>
      </section>
  
      <!-- Request for Item -->
      <section class="text-center py-8">
        <div class="bg-gradient-to-r from-[#333333] to-[#6AB1EB] p-8 rounded-xl shadow-lg">
          <h2 class="text-2xl font-bold text-white mb-4">Need something specific?</h2>
          <p class="text-white/80 mb-6 max-w-md mx-auto">
            Can't find what you're looking for? Request a specific item from our inventory.
          </p>
          <button class="bg-[#FEFB0E] hover:bg-[#FEFB0E]/90 text-[#121212] font-medium px-8 py-2 rounded-md">
            Request Item
          </button>
        </div>
      </section>
    </div>
  </div>