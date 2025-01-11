<script>
  import { writable } from 'svelte/store';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import Input from '$lib/components/Input.svelte';

  const initialCartItems = [
    { id: 1, name: 'Arduino Uno', photo: '/placeholder.svg', category: 'Electronics', quantity: 1 },
    { id: 2, name: 'Servo Motor', photo: '/placeholder.svg', category: 'Mechanics', quantity: 2 },
    { id: 3, name: 'Ultrasonic Sensor', photo: '/placeholder.svg', category: 'Sensors', quantity: 1 },
  ];

  let cartItems = writable(initialCartItems);

  function updateQuantity(id, newQuantity) {
    cartItems.update(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      ).filter(item => item.quantity > 0)
    );
  }
</script>

<div class="space-y-6">
  <h1 class="text-3xl font-bold">Cart</h1>
  
  {#each $cartItems as item}
    <Card key={item.id}>
      <div slot="header" class="p-6">
        <h2 class="font-semibold text-lg">{item.name}</h2>
      </div>
      <div slot="content" class="p-6 flex items-center space-x-4">
        <img src={item.photo} alt={item.name} width={100} height={100} />
        <div class="flex-grow">
          <p>Category: {item.category}</p>
          <div class="flex items-center space-x-2 mt-2">
            <Button size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
            <Input 
              type="number" 
              value={item.quantity} 
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              class="w-20 text-center" 
            />
            <Button size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
          </div>
        </div>
      </div>
    </Card>
  {/each}

  {#if $cartItems.length === 0}
    <p class="text-center text-gray-500">Your cart is empty</p>
  {/if}

  {#if $cartItems.length > 0}
    <Button class="w-full">Request Items</Button>
  {/if}
</div>