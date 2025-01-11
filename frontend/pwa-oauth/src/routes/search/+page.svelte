<script>
    import { onMount } from "svelte";
    import Input from "$lib/components/Input.svelte";
    import Button from "$lib/components/Button.svelte";
    import Card from "$lib/components/Card.svelte";
    import Select from "$lib/components/Select.svelte";
    import Checkbox from "$lib/components/Checkbox.svelte";
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

    let sortBy = writable("name");
    let sortOrder = writable("asc");
    let filterCategory = writable([]);
    let filterStatus = writable([]);

    let filteredItems = [];

    function updateFilteredItems() {
        filteredItems = items
            .filter(
                (item) =>
                    filterCategory.length === 0 ||
                    filterCategory.includes(item.category),
            )
            .filter(
                (item) =>
                    filterStatus.length === 0 ||
                    filterStatus.includes(item.status),
            )
            .sort((a, b) => {
                if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
                if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
    }

    $: updateFilteredItems();

    function handleCategoryChange(category, checked) {
        filterCategory.update((prev) =>
            checked ? [...prev, category] : prev.filter((c) => c !== category),
        );
    }

    function handleStatusChange(status, checked) {
        filterStatus.update((prev) =>
            checked ? [...prev, status] : prev.filter((s) => s !== status),
        );
    }
</script>

<div class="space-y-6">
    <h1 class="text-3xl font-bold">Search Inventory</h1>

    <div class="flex gap-4 flex-wrap">
        <Input placeholder="Search items..." class="flex-grow" />
        <Button>Search</Button>
    </div>

    <div class="flex gap-4 flex-wrap">
        <Select
            placeholder="Sort by"
            options={[
                { value: "name", label: "Name" },
                { value: "category", label: "Category" },
                { value: "quantity", label: "Quantity" },
                { value: "status", label: "Status" },
            ]}
            onValueChange={(value) => sortBy.set(value)}
        />

        <Select
            placeholder="Sort order"
            options={[
                { value: "asc", label: "Ascending" },
                { value: "desc", label: "Descending" },
            ]}
            onValueChange={(value) => sortOrder.set(value)}
        />
    </div>

    <div class="flex gap-4 flex-wrap">
        <div>
            <h3 class="mb-2 font-semibold">Filter by Category:</h3>
            {#each ["Electronics", "Mechanics", "Sensors"] as category}
                <div class="flex items-center space-x-2 mb-2">
                    <Checkbox
                        id={`category-${category}`}
                        onCheckedChange={(checked) =>
                            handleCategoryChange(category, checked)}
                    />
                    <label for={`category-${category}`}>{category}</label>
                </div>
            {/each}
        </div>
        <div>
            <h3 class="mb-2 font-semibold">Filter by Status:</h3>
            {#each ["Available", "Running Out", "Out of Stock"] as status}
                <div class="flex items-center space-x-2 mb-2">
                    <Checkbox
                        id={`status-${status}`}
                        onCheckedChange={(checked) =>
                            handleStatusChange(status, checked)}
                    />
                    <label for={`status-${status}`}>{status}</label>
                </div>
            {/each}
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each filteredItems as item}
            <Card>
                <div slot="header" class="p-6">
                    <h3 class="font-semibold text-lg">{item.name}</h3>
                </div>
                <div slot="content" class="p-6 pt-0">
                    <img
                        src={item.photo}
                        alt={item.name}
                        width={200}
                        height={200}
                        class="mb-2"
                    />
                    <p>Category: {item.category}</p>
                    <p>Status: {item.status}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            </Card>
        {/each}
    </div>
</div>
