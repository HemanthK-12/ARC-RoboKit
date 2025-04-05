<script>
export let data;
const user = data.user;
//has fields sub, name, given_name, family_name, picture, email, email_verified
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

<div class="min-h-screen bg-[#121212]">
  <!-- Navigation Bar -->
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold text-white mb-6">Profile</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-1">
        <div class="border border-[#333333] shadow-md overflow-hidden rounded-xl bg-[#2A2A2A] sticky top-20">
          <div 
            class="p-6 bg-gradient-to-r from-[#333333] to-[#6AB1EB]"
          >
            <h2 class="font-semibold text-lg text-white">User Information</h2>
          </div>
          <div class="p-6">
            <div class="flex flex-col items-center text-center">
              <img 
                src={user.picture} 
                alt="User Profile" 
                class="h-24 w-24 rounded-full border-4 border-[#6AB1EB] mb-4"
              />
              <h2 class="text-xl font-semibold text-white">{user.name}</h2>
              <p class="text-gray-400 mb-4">{user.email}</p>
              
              <div class="w-full mt-4 space-y-2">
                <button 
                  class="w-full bg-[#6AB1EB] hover:bg-[#6AB1EB]/90 text-white px-4 py-2 rounded-md"
                >
                  Edit Profile
                </button>
                <button 
                  class="w-full border border-[#FF4413] text-[#FF4413] hover:bg-[#FF4413]/20 px-4 py-2 rounded-md"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lg:col-span-2 space-y-6">
        <!-- Inventory History -->
        <div class="border border-[#333333] shadow-md overflow-hidden rounded-xl bg-[#2A2A2A]">
          <div 
            class="p-6 bg-[#2A2A2A] border-b border-[#333333]"
            style="border-top: 4px solid #6AB1EB;"
          >
            <h2 class="font-semibold text-lg text-white">
              Inventory History
            </h2>
          </div>
          <div class="p-0">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-[#1E1E1E]">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Item</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody class="bg-[#2A2A2A] divide-y divide-[#333333]">
                  {#each inventoryHistory as item}
                    <tr class="hover:bg-[#333333]">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{item.item}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.date}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-block px-2 py-1 rounded-full text-xs font-medium"
                          style="background-color: {item.status === 'Borrowed' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(5, 150, 105, 0.2)'}; 
                                 color: {item.status === 'Borrowed' ? '#EF4444' : '#10B981'};"
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <!-- Frequently Borrowed -->
        <div class="border border-[#333333] shadow-md overflow-hidden rounded-xl bg-[#2A2A2A]">
          <div 
            class="p-6 bg-[#2A2A2A] shadow-md overflow-hidden rounded-xl bg-[#2A2A2A]">
          <div 
            class="p-6 bg-[#2A2A2A] border-b border-[#333333]"
            style="border-top: 4px solid #FEFB0E;"
          >
            <h2 class="font-semibold text-lg text-white">
              Frequently Borrowed
            </h2>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              {#each frequentItems as item}
                <div class="bg-[#1E1E1E] rounded-lg p-4 text-center">
                  <h3 class="font-medium text-white">{item.name}</h3>
                  <div class="mt-2 text-2xl font-bold text-[#6AB1EB]">{item.count}</div>
                  <p class="text-xs text-gray-400">times borrowed</p>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>