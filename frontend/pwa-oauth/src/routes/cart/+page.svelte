<script>
  import { writable } from 'svelte/store';

  const initialCartItems = [
    { id: 1, name: 'Arduino Uno', photo: '/placeholder.svg', category: 'Electronics', quantity: 1 },
    { id: 2, name: 'Servo Motor', photo: '/placeholder.svg', category: 'Mechanics', quantity: 2 },
    { id: 3, name: 'Ultrasonic Sensor', photo: '/placeholder.svg', category: 'Sensors', quantity: 1 },
  ];

  let cartItems = initialCartItems;

  function updateQuantity(id, newQuantity) {
    cartItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ).filter(item => item.quantity > 0);
  }

  function removeItem(id) {
    cartItems = cartItems.filter(item => item.id !== id);
  }

  // Calculate total items
  $: totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
</script>

<div class="min-h-screen bg-[#121212]">

  <div class="container mx-auto px-4 py-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-white">Your Cart</h1>
      <div class="bg-[#6AB1EB]/20 text-[#6AB1EB] px-3 py-1 rounded-full text-sm font-medium">
        {totalItems} {totalItems === 1 ? 'item' : 'items'}
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-4">
        {#each cartItems as item}
          <div class="border border-[#333333] shadow-md hover:shadow-lg transition-all overflow-hidden rounded-xl bg-[#2A2A2A]">
            <div class="p-0">
              <div class="flex flex-col sm:flex-row">
                <div 
                  class="w-full sm:w-32 h-32 bg-[#1E1E1E] flex items-center justify-center p-4"
                  style="border-left: 4px solid {item.category === 'Electronics' ? '#FF4413' : item.category === 'Mechanics' ? '#6AB1EB' : '#FEFB0E'};"
                >
                  <img src={item.photo || "/placeholder.svg"} alt={item.name} class="max-h-full max-w-full object-contain" />
                </div>
                <div class="flex-grow p-4">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h3 class="font-semibold text-lg text-white">{item.name}</h3>
                      <p class="text-sm text-gray-400 mb-2">{item.category}</p>
                    </div>
                    <button 
                      on:click={() => removeItem(item.id)}
                      class="text-[#FF4413] hover:text-[#FF4413]/80 self-end sm:self-start"
                    >
                      Remove
                    </button>
                  </div>
                  <div class="flex items-center mt-4 sm:mt-0">
                    <button 
                      on:click={() => updateQuantity(item.id, item.quantity - 1)}
                      class="w-8 h-8 flex items-center justify-center rounded-full border border-[#6AB1EB] text-[#6AB1EB] bg-[#1E1E1E]"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      on:input={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                      class="w-16 mx-2 text-center border border-[#6AB1EB] rounded-md bg-[#1E1E1E] text-white" 
                    />
                    <button 
                      on:click={() => updateQuantity(item.id, item.quantity + 1)}
                      class="w-8 h-8 flex items-center justify-center rounded-full border border-[#6AB1EB] text-[#6AB1EB] bg-[#1E1E1E]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}

        {#if cartItems.length === 0}
          <div class="text-center py-12 bg-[#2A2A2A] rounded-xl shadow-md border border-[#333333]">
            <div class="h-12 w-12 bg-[#6AB1EB] rounded-full mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
            <p class="text-gray-400 mb-6">Add items to your cart to request them</p>
            <button 
              class="bg-[#6AB1EB] hover:bg-[#6AB1EB]/90 text-white px-4 py-2 rounded-md"
            >
              Browse Items
            </button>
          </div>
        {/if}
      </div>

      <div class="lg:col-span-1">
        <div class="border border-[#333333] shadow-md sticky top-20 overflow-hidden rounded-xl bg-[#2A2A2A]">
          <div 
            class="p-6 bg-gradient-to-r from-[#333333] to-[#6AB1EB]"
          >
            <h3 class="font-semibold text-lg text-white">Request Summary</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-300">Total Items:</span>
                <span class="font-medium text-white">{totalItems}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-300">Unique Items:</span>
                <span class="font-medium text-white">{cartItems.length}</span>
              </div>
              
              <div class="pt-4 border-t border-[#333333]">
                <button 
                  class="w-full bg-[#FF4413] hover:bg-[#FF4413]/90 text-white px-4 py-2 rounded-md"
                  disabled={cartItems.length === 0}
                >
                  Request Items
                </button>
              </div>
              
              <p class="text-xs text-gray-400 text-center mt-4">
                Items will be reviewed by the club admin before approval
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>