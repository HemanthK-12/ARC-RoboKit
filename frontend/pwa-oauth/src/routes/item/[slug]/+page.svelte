<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  let inventory = [];
  async function fetchInventory() {
  const response = await fetch("http://localhost:5000/api/inventory");
  inventory = await response.json();
  console.log(inventory);
}
  const item = {
      id: 1,
      name: "Arduino Uno R3",
      category: "Electronics",
      totalQuantity: 15,
      availableQuantity: 8,
      description:
          "The Arduino Uno is an open-source microcontroller board based on the Microchip ATmega328P microcontroller. It has 14 digital input/output pins (of which 6 can be used as PWM outputs), 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header and a reset button.",
      specifications: [
          { name: "Microcontroller", value: "ATmega328P" },
          { name: "Operating Voltage", value: "5V" },
          { name: "Input Voltage", value: "7-12V" },
          { name: "Digital I/O Pins", value: "14 (6 PWM)" },
          { name: "Analog Input Pins", value: "6" },
          { name: "DC Current per I/O Pin", value: "20 mA" },
          { name: "Flash Memory", value: "32 KB" },
      ],
      photos: [
          { url: "/placeholder.svg", alt: "Arduino Uno", type: "Main" },
          {
              url: "/placeholder.svg",
              alt: "Arduino Uno Schematic",
              type: "Schematic",
          },
          {
              url: "/placeholder.svg",
              alt: "Arduino Uno Pinout",
              type: "Pinout",
          },
          {
              url: "/placeholder.svg",
              alt: "Arduino Uno in Project",
              type: "Usage",
          },
      ],
      schematicPdf: {
          url: "/schematic.pdf",
          name: "Arduino_Uno_R3_Schematic.pdf",
          size: "1.2 MB",
          pages: 4,
          lastUpdated: "2023-01-15",
      },
      borrowers: [
          {
              id: 1,
              name: "Jane Smith",
              email: "jane.smith@example.com",
              quantity: 3,
              borrowDate: "2023-03-15",
          },
          {
              id: 2,
              name: "Mike Johnson",
              email: "mike.johnson@example.com",
              quantity: 2,
              borrowDate: "2023-04-02",
          },
          {
              id: 3,
              name: "Sarah Williams",
              email: "sarah.williams@example.com",
              quantity: 2,
              borrowDate: "2023-04-10",
          },
      ],
      relatedItems: [
          { id: 2, name: "Arduino Sensor Shield", category: "Electronics" },
          { id: 3, name: "Jumper Wires", category: "Electronics" },
          { id: 4, name: "Breadboard", category: "Electronics" },
      ],
  };
  let currentPhotoIndex = 0;
  let currentPage = 1;
  function requestItem() {
      alert(`Requesting ${item.name}`);
  }
  function showPhoto(index) {
      currentPhotoIndex = index;
  }
  $: availabilityPercentage =
      (item.availableQuantity / item.totalQuantity) * 100;
  $: availabilityStatus =
      availabilityPercentage > 66
          ? "High"
          : availabilityPercentage > 33
            ? "Medium"
            : "Low";
  $: availabilityColor =
      availabilityStatus === "High"
          ? "#10B981"
          : availabilityStatus === "Medium"
            ? "#F59E0B"
            : "#EF4444";
  onMount(fetchInventory);
  function getRandomRelatedItems(inventory, currentItem, count = 3) {
    if (!inventory || !currentItem || inventory.length <= 1) {
      return [];
    }
  
    // Create array of indices excluding current item's index
    const availableIndices = Array.from(
      { length: inventory.length },
      (_, i) => i
    ).filter(i => inventory[i].id !== currentItem.id);
  
    // Shuffle indices and take first 'count' items
    const selectedIndices = availableIndices
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(count, availableIndices.length));
  
    // Map indices to actual items
    return selectedIndices.map(index => inventory[index]);
  }
  $: relatedItems = getRandomRelatedItems(inventory, item);
</script>

<div class="min-h-screen bg-[#121212]">
  <div class="container mx-auto px-4 py-6">
      <!-- Breadcrumb -->
      <div class="flex items-center text-sm mb-6">
          <a href="/" class="text-gray-400 hover:text-[#6AB1EB]">Home</a>
          <span class="mx-2 text-gray-500">/</span>
          <a href="/search" class="text-gray-400 hover:text-[#6AB1EB]"
              >Inventory</a
          >
          <span class="mx-2 text-gray-500">/</span>
          <span class="text-white">{item.name}</span>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
              <div
                  class="bg-[#2A2A2A] rounded-xl overflow-hidden border border-[#333333] shadow-md mb-6"
              >
                  <div class="aspect-video bg-[#1E1E1E] relative">
                      <img
                          src={item.photos[currentPhotoIndex].url ||
                              "/placeholder.svg"}
                          alt={item.photos[currentPhotoIndex].alt}
                          class="w-full h-full object-contain"
                      />
                      <div
                          class="absolute bottom-2 right-2 bg-[#1E1E1E]/80 px-2 py-1 rounded text-xs text-white"
                      >
                          {item.photos[currentPhotoIndex].type}
                      </div>
                  </div>

                  <!-- Thumbnail Navigation -->
                  <div class="p-4 flex gap-2 overflow-x-auto">
                      {#each item.photos as photo, index}
                          <button
                              aria-label="Toggle"
                              class="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all"
                              class:border-[#6AB1EB]={currentPhotoIndex ===
                                  index}
                              class:border-[#333333]={currentPhotoIndex !==
                                  index}
                              on:click={() => showPhoto(index)}
                          >
                              <img
                                  src={photo.url || "/placeholder.svg"}
                                  alt={`Thumbnail ${index + 1}`}
                                  class="w-full h-full object-cover"
                              />
                          </button>
                      {/each}
                  </div>
              </div>

              <div
                  class="bg-[#2A2A2A] rounded-xl overflow-hidden border border-[#333333] shadow-md mb-6"
              >
                  <div class="p-6 bg-[#1E1E1E] border-b border-[#333333]">
                      <div class="flex items-start justify-between">
                          <div>
                              <h1 class="text-2xl font-bold text-white">
                                  {item.name}
                              </h1>
                              <div
                                  class="mt-1 inline-block bg-[#FF4413] text-white text-xs px-2 py-1 rounded-full"
                              >
                                  {item.category}
                              </div>
                          </div>
                          <button
                              aria-label="Toggle"
                              class="text-gray-400 hover:text-white"
                          >
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                              >
                                  <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                  />
                              </svg>
                          </button>
                      </div>
                  </div>

                  <div class="p-6">
                      <!-- Availability -->
                      <div class="mb-6">
                          <h3 class="text-sm font-medium text-gray-400 mb-2">
                              Availability
                          </h3>
                          <div class="flex items-center justify-between mb-2">
                              <span class="text-white font-medium"
                                  >{item.availableQuantity} of {item.totalQuantity}
                                  available</span
                              >
                              <span
                                  class="text-xs px-2 py-1 rounded-full"
                                  style="background-color: rgba({availabilityStatus ===
                                  'High'
                                      ? '16, 185, 129'
                                      : availabilityStatus === 'Medium'
                                        ? '245, 158, 11'
                                        : '239, 68, 68'}, 0.2); 
                          color: {availabilityColor};"
                              >
                                  {availabilityStatus}
                              </span>
                          </div>
                          <div class="w-full bg-[#1E1E1E] rounded-full h-2.5">
                              <div
                                  class="h-2.5 rounded-full"
                                  style="width: {availabilityPercentage}%; background-color: {availabilityColor};"
                              ></div>
                          </div>
                      </div>

                      <!-- Checkout History -->
                      <div class="mb-6">
                          <h3 class="text-sm font-medium text-gray-400 mb-2">
                              Checkout Status
                          </h3>
                          <div class="bg-[#1E1E1E] rounded-lg p-3">
                              <div class="flex justify-between items-center">
                                  <div>
                                      <p class="text-white font-medium">
                                          {item.totalQuantity -
                                              item.availableQuantity} items checked
                                          out
                                      </p>
                                      <p class="text-xs text-gray-400">
                                          By {item.borrowers.length} members
                                      </p>
                                  </div>
                                  <div
                                      class="h-10 w-10 bg-[#FEFB0E] rounded-full flex items-center justify-center text-[#1E1E1E] font-bold"
                                  >
                                      {item.totalQuantity -
                                          item.availableQuantity}
                                  </div>
                              </div>
                          </div>
                      </div>

                      <!-- Request Actions -->
                      <div class="space-y-3">
                          <button
                              aria-label="Toggle"
                              on:click={requestItem}
                              class="w-full bg-[#FF4413] hover:bg-[#FF4413]/90 text-white py-3 rounded-lg font-medium"
                              disabled={item.availableQuantity === 0}
                          >
                              Request Item
                          </button>

                          <button
                              aria-label="Toggle"
                              class="w-full bg-[#1E1E1E] border border-[#6AB1EB] text-[#6AB1EB] hover:bg-[#6AB1EB]/10 py-3 rounded-lg font-medium"
                          >
                              Add to Wishlist
                          </button>
                      </div>
                  </div>
              </div>

              <div
                  class="bg-[#2A2A2A] rounded-xl overflow-hidden border border-[#333333] shadow-md mb-6"
              >
                  <div class="p-6 border-b border-[#333333]">
                      <h2 class="text-xl font-bold text-white">
                          Description
                      </h2>
                  </div>
                  <div class="p-6">
                      <p class="text-gray-300">{item.description}</p>
                  </div>
              </div>

              <!-- Technical Specifications -->
              <div
                  class="bg-[#2A2A2A] rounded-xl overflow-hidden border border-[#333333] shadow-md mb-6"
              >
                  <div class="p-6 border-b border-[#333333]">
                      <h2 class="text-xl font-bold text-white">
                          Technical Specifications
                      </h2>
                  </div>
                  <div class="p-0">
                      <table class="w-full">
                          <tbody class="divide-y divide-[#333333]">
                              {#each item.specifications as spec}
                                  <tr>
                                      <td
                                          class="px-6 py-4 text-gray-300 font-medium"
                                          >{spec.name}</td
                                      >
                                      <td class="px-6 py-4 text-white"
                                          >{spec.value}</td
                                      >
                                  </tr>
                              {/each}
                          </tbody>
                      </table>
                  </div>
              </div>

              <!-- Schematic PDF Viewer -->
              <div
                  class="bg-[#2A2A2A] rounded-xl overflow-hidden border border-[#333333] shadow-md mb-6"
              >
                  <div
                      class="p-6 border-b border-[#333333] flex justify-between items-center"
                  >
                      <h2 class="text-xl font-bold text-white">
                          Schematic PDF
                      </h2>
                      <a
                          href={item.schematicPdf.url}
                          download={item.schematicPdf.name}
                          class="flex items-center gap-2 bg-[#1E1E1E] hover:bg-[#333333] text-white px-3 py-1.5 rounded-md text-sm"
                      >
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                          >
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                          </svg>
                          Download
                      </a>
                  </div>

                  <!-- PDF Info -->
                  <div class="p-4 bg-[#1E1E1E] flex flex-wrap gap-4 text-sm">
                      <div class="flex items-center gap-2">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-5 w-5 text-[#FF4413]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                          >
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                          </svg>
                          <span class="text-gray-300"
                              >{item.schematicPdf.name}</span
                          >
                      </div>
                      <div class="flex items-center gap-2">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-5 w-5 text-[#6AB1EB]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                          >
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                              />
                          </svg>
                          <span class="text-gray-300"
                              >{item.schematicPdf.size}</span
                          >
                      </div>
                      <div class="flex items-center gap-2">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-5 w-5 text-[#FEFB0E]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                          >
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                          </svg>
                          <span class="text-gray-300"
                              >{item.schematicPdf.pages} pages</span
                          >
                      </div>
                      <div class="flex items-center gap-2">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                          >
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                          </svg>
                      </div>
                  </div>
              </div>

              <!-- Current Borrowers -->
              <div
                  class="bg-[#2A2A2A] rounded-xl overflow-hidden border border-[#333333] shadow-md"
              >
                  <div
                      class="p-6 border-b border-[#333333] flex justify-between items-center"
                  >
                      <h2 class="text-xl font-bold text-white">
                          Current Borrowers
                      </h2>
                      <span
                          class="text-sm bg-[#1E1E1E] text-gray-300 px-3 py-1 rounded-full"
                      >
                          {item.borrowers.length} users
                      </span>
                  </div>
                  <div class="p-0">
                      <table class="w-full">
                          <thead class="bg-[#1E1E1E]">
                              <tr>
                                  <th
                                      class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                      >User</th
                                  >
                                  <th
                                      class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                      >Quantity</th
                                  >
                                  <th
                                      class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                      >Borrow Date</th
                                  >
                              </tr>
                          </thead>
                          <tbody class="divide-y divide-[#333333]">
                              {#each item.borrowers as borrower}
                                  <tr class="hover:bg-[#333333]">
                                      <td class="px-6 py-4">
                                          <div class="flex items-center">
                                              <div
                                                  class="h-8 w-8 bg-[#6AB1EB] rounded-full flex items-center justify-center text-white text-xs"
                                              >
                                                  {borrower.name
                                                      .split(" ")
                                                      .map((n) => n[0])
                                                      .join("")}
                                              </div>
                                              <div class="ml-3">
                                                  <p
                                                      class="text-sm font-medium text-white"
                                                  >
                                                      {borrower.name}
                                                  </p>
                                                  <p
                                                      class="text-xs text-gray-400"
                                                  >
                                                      {borrower.email}
                                                  </p>
                                              </div>
                                          </div>
                                      </td>
                                      <td class="px-6 py-4 text-white"
                                          >{borrower.quantity}</td
                                      >
                                      <td class="px-6 py-4 text-gray-300"
                                          >{borrower.borrowDate}</td
                                      >
                                  </tr>
                              {/each}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>

          <div class="lg:col-span-1">

              <!-- Related Items -->
              <div
                  class="mt-6 bg-[#2A2A2A] rounded-xl overflow-hidden border border-[#333333] shadow-md"
              >
                  <div class="p-6 border-b border-[#333333]">
                      <h2 class="font-bold text-white">Related Items</h2>
                  </div>
                  <div class="p-4">
                      <div class="space-y-3">
                          {#each relatedItems as relatedItem}
                              <a
                                  href={`/item/${relatedItem.id}`}
                                  class="block p-3 bg-[#1E1E1E] rounded-lg hover:bg-[#333333] transition-colors"
                              >
                                  <div class="flex items-center">
                                      <div
                                          class="h-10 w-10 bg-[#2A2A2A] rounded-md flex items-center justify-center mr-3"
                                      >
                                          <div
                                              class="h-6 w-6 bg-[#6AB1EB] rounded-sm"
                                          ></div>
                                      </div>
                                      <div>
                                          <p class="text-white font-medium">
                                              {relatedItem.name}
                                          </p>
                                          <p class="text-xs text-gray-400">
                                              {relatedItem.category}
                                          </p>
                                      </div>
                                  </div>
                              </a>
                          {/each}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
