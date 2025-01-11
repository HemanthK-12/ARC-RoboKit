<script>
  import Avatar from '$lib/components/Avatar.svelte';
  import AvatarImage from '$lib/components/AvatarImage.svelte';
  import AvatarFallback from '$lib/components/AvatarFallback.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  export let data;
  const user = data.user;

  const inventoryHistory = [
    { id: 1, item: 'Arduino Uno', date: '2023-03-01', status: 'Borrowed' },
    { id: 2, item: 'Servo Motor', date: '2023-02-15', status: 'Returned' },
    { id: 3, item: 'LED Strip', date: '2023-01-20', status: 'Borrowed' },
  ];

  const frequentItems = [
    { id: 1, name: 'Arduino Uno', count: 5 },
    { id: 2, name: 'Servo Motor', count: 3 },
    { id: 3, name: 'Ultrasonic Sensor', count: 2 },
  ];
</script>

<div class="space-y-6">
  <h1 class="text-3xl font-bold">Profile</h1>
  
  <Card>
    <div slot="header" class="p-6">
      <h2 class="font-semibold text-lg">User Information</h2>
    </div>
    <div slot="content" class="p-6 flex items-center space-x-4">
      <Avatar class="h-24 w-24">
        <AvatarImage src={user.picture} alt={user.name} />
        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div>
        <h2 class="text-2xl font-semibold">{user.name}</h2>
        <p class="text-gray-500">{user.email}</p>
      </div>
    </div>
  </Card>

  <Card>
    <div slot="header" class="p-6">
      <h2 class="font-semibold text-lg">Inventory History</h2>
    </div>
    <div slot="content" class="p-6">
      <ul class="space-y-2">
        {#each inventoryHistory as item}
          <li class="flex justify-between items-center">
            <span>{item.item}</span>
            <span>{item.date}</span>
            <span>{item.status}</span>
          </li>
        {/each}
      </ul>
    </div>
  </Card>

  <Card>
    <div slot="header" class="p-6">
      <h2 class="font-semibold text-lg">Frequently Borrowed Items</h2>
    </div>
    <div slot="content" class="p-6">
      <ul class="space-y-2">
        {#each frequentItems as item}
          <li class="flex justify-between items-center">
            <span>{item.name}</span>
            <span>Borrowed {item.count} times</span>
          </li>
        {/each}
      </ul>
    </div>
  </Card>

  <Button variant="destructive">Sign Out</Button>
</div>