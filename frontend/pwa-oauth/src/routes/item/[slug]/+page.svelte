<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let inventory = [];
  let users = [];
  let currentItem = null;
  let borrowersList = [];
  let userList = null;
  let isLoading = true;
  let error = null;
  let currentPhotoIndex = 0;

  async function fetchInventory() {
    try {
      const response = await fetch("https://whjpx3pm-5000.inc1.devtunnels.ms/api/inventory");
      if (!response.ok) throw new Error("Failed to fetch inventory");

      inventory = await response.json();
      console.log(inventory);
      currentItem = inventory.find((item) => item.id === $page.params.slug);
      console.log(currentItem);
      if (!currentItem) {
        error = "Item not found";
      }

      const response2 = await fetch("http://localhost:5000/api/users");
      if (!response2.ok) throw new Error("Failed to fetch users");
      const users = await response2.json();
      console.log(users);
      for (let a in currentItem.borrowers) {
        for (let b in currentItem.borrowers[a]) {
          //this is how i got this speciifc path of _path,segments and all : https://imgur.com/a/sGSiXRn
          console.log(
            "Borrowers = ",
            currentItem.borrowers[a][b]._path.segments[1],
          );
          borrowersList.push(
            users.find(
              (u) =>
                u.id == currentItem.borrowers[a][b]._path.segments[1].trim(),
            ),
          );
          console.log("UserList = ", userList);
        }
      }
      console.log(borrowersList);
      if (currentItem.borrowers) {
        currentItem.borrowers = currentItem.borrowers.map((borrower) => {
          const user = users.find((u) => u.id === borrower.userId);
          return {
            ...borrower,
            name: user?.name || "Unknown User",
            email: user?.email || "No email",
          };
        });
      }
    } catch (err) {
      error = "Error loading inventory";
      console.error(err);
    } finally {
      isLoading = false;
    }
  }

  function requestItem() {
    if (currentItem) {
      alert(`Requesting ${currentItem.name}`);
    }
  }

  function showPhoto(index) {
    currentPhotoIndex = index;
  }

  // Add safe navigation helper
  const safeGet = (obj, path, defaultValue = "") => {
    return (
      path.split(".").reduce((acc, part) => acc && acc[part], obj) ??
      defaultValue
    );
  };

  // Reactive declarations with null checks
  $: availabilityPercentage = currentItem?.availableQuantity
    ? (currentItem.availableQuantity / currentItem.quantity) * 100
    : 0;

  $: availabilityStatus = currentItem
    ? availabilityPercentage > 66
      ? "High"
      : availabilityPercentage > 33
        ? "Medium"
        : "Low"
    : "Unknown";

  $: availabilityColor =
    availabilityStatus === "High"
      ? "#10B981"
      : availabilityStatus === "Medium"
        ? "#F59E0B"
        : "#EF4444";

  $: borrowersCount = currentItem?.borrowers?.length ?? 0;
  $: checkedOutCount = currentItem
    ? currentItem.quantity - (currentItem.availableQuantity ?? 0)
    : 0;

  $: relatedItems = currentItem
    ? getRandomRelatedItems(inventory, currentItem)
    : [];

  function getRandomRelatedItems(inventory, currentItem, count = 3) {
    if (!inventory || !currentItem || inventory.length <= 1) {
      return [];
    }

    const availableIndices = Array.from(
      { length: inventory.length },
      (_, i) => i,
    ).filter((i) => inventory[i].id !== currentItem.id);

    const selectedIndices = availableIndices
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(count, availableIndices.length));

    return selectedIndices.map((index) => inventory[index]);
  }

  onMount(fetchInventory);
</script>

<div class="min-h-screen bg-[#121212]">
  <div class="container mx-auto px-4 py-6">
    {#if isLoading}
      <div class="flex justify-center items-center h-64">
        <div class="text-white">Loading...</div>
      </div>
    {:else if error}
      <div class="flex flex-col items-center justify-center h-64">
        <div class="text-red-500 mb-4">{error}</div>
        <a href="/search" class="text-[#6AB1EB] hover:underline">
          Return to Search
        </a>
      </div>
    {:else if currentItem}
      <!-- Breadcrumb -->
      <div class="flex items-center text-sm mb-6">
        <a href="/" class="text-gray-400 hover:text-[#6AB1EB]">Home</a>
        <span class="mx-2 text-gray-500">/</span>
        <a href="/search" class="text-gray-400 hover:text-[#6AB1EB]"
          >Inventory</a
        >
        <span class="mx-2 text-gray-500">/</span>
        <span class="text-white">{currentItem.name}</span>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <!-- Image Gallery -->
          {#if currentItem.photos && currentItem.photos.length > 0}
            <div
              class="bg-[#2A2A2A] rounded-xl overflow-hidden border border-[#333333] shadow-md mb-6"
            >
              <div class="aspect-video bg-[#1E1E1E] relative">
                <img
                  src={currentItem.photos[currentPhotoIndex] ||
                    "/placeholder.svg"}
                  alt={currentItem.photos[currentPhotoIndex] || "Item photo"}
                  class="w-full h-full object-contain"
                />
                {#if currentItem.photos[currentPhotoIndex]?.type}
                  <div
                    class="absolute bottom-2 right-2 bg-[#1E1E1E]/80 px-2 py-1 rounded text-xs text-white"
                  >
                    {currentItem.photos[currentPhotoIndex].type}
                  </div>
                {/if}
              </div>

              <!-- Thumbnail Navigation -->
              <div class="p-4 flex gap-2 overflow-x-auto">
                {#each currentItem.photos as photo, index}
                  <button
                    aria-label={`View ${photo.alt || `photo ${index + 1}`}`}
                    class="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all"
                    class:border-[#6AB1EB]={currentPhotoIndex === index}
                    class:border-[#333333]={currentPhotoIndex !== index}
                    on:click={() => showPhoto(index)}
                  >
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      class="w-full h-full object-cover"
                    />
                  </button>
                {/each}
              </div>
            </div>
          {/if}

          <!-- Item Details -->
          <div
            class="bg-[#2A2A2A] rounded-xl overflow-hidden border border-[#333333] shadow-md mb-6"
          >
            <div class="p-6 bg-[#1E1E1E] border-b border-[#333333]">
              <div class="flex items-start justify-between">
                <div>
                  <h1 class="text-2xl font-bold text-white">
                    {currentItem.name}
                  </h1>
                  <div
                    class="mt-1 inline-block bg-[#FF4413] text-white text-xs px-2 py-1 rounded-full"
                  >
                    {currentItem.category}
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
                    >{currentItem.availableQuantity} of {currentItem.totalQuantity}
                    available</span
                  >
                  <span
                    class="text-xs px-2 py-1 rounded-full"
                    style="background-color: rgba({availabilityStatus === 'High'
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
                        {currentItem.quantity - currentItem.availableQuantity} items
                        checked out
                      </p>
                      <p class="text-xs text-gray-400">
                        By {currentItem.borrowers.length} members
                      </p>
                    </div>
                    <div
                      class="h-10 w-10 bg-[#FEFB0E] rounded-full flex items-center justify-center text-[#1E1E1E] font-bold"
                    >
                      {currentItem.quantity - currentItem.availableQuantity}
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
                  disabled={currentItem.availableQuantity === 0}
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
              <h2 class="text-xl font-bold text-white">Description</h2>
            </div>
            <div class="p-6">
              <p class="text-gray-300">{currentItem.description}</p>
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
                  {#each currentItem.specifications as spec}
                    <tr>
                      <td class="px-6 py-4 text-gray-300 font-medium"
                        >{spec.name}</td
                      >
                      <td class="px-6 py-4 text-white">{spec.value}</td>
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
              <h2 class="text-xl font-bold text-white">Schematic PDF</h2>
              <a
                href="google.com"
                download="Arduino_Uno_R3_Schematic.pdf"
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
                <span class="text-gray-300">Arduino_Uno_R3_Schematic.pdf</span>
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
                <span class="text-gray-300">1.2 MB</span>
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
                <span class="text-gray-300">4 pages</span>
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
          {#if borrowersList.length > 0}
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
                  {#each borrowersList as borrower}
                    <tr class="hover:bg-[#333333]">
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <div
                            class="h-8 w-8 bg-[#6AB1EB] rounded-full flex items-center justify-center text-white text-xs"
                          >
                            {(borrower.name ?? "")
                              .split(" ")
                              .map((n) => n?.[0] ?? "")
                              .join("")}
                          </div>
                          <div class="ml-3">
                            <p class="text-sm font-medium text-white">
                              {borrower.name ?? "Unknown User"}
                            </p>
                            <p class="text-xs text-gray-400">
                              {borrower.email ?? "No email provided"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-white">
                        {currentItem.availableQuantity ?? 0}
                      </td>
                      <td class="px-6 py-4 text-gray-300">
                        {borrower?.borrowDate ?? "Unknown date"}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {:else}
            <div class="p-6 text-center text-gray-400">
              No current borrowers
            </div>
          {/if}
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
                        <div class="h-6 w-6 bg-[#6AB1EB] rounded-sm"></div>
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
    {:else}
      <div class="flex flex-col items-center justify-center h-64">
        <div class="text-white mb-4">Item not found</div>
        <a href="/search" class="text-[#6AB1EB] hover:underline">
          Return to Search
        </a>
      </div>
    {/if}
  </div>
</div>
