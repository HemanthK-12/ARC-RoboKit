<script>
    export let form;
    import { Search, Zap,House, AlertTriangle } from "lucide-svelte";
    import Button from "$lib/components/Button.svelte";
    import Input from "$lib/components/Input.svelte";
    import Card from "$lib/components/Card.svelte";

    const categories = ["Electronics", "Mechanics", "Sensors", "Tools"];
    const popularItems = ["Arduino Uno", "Servo Motor", "Ultrasonic Sensor"];
    const lowStockItems = ["LED", "Resistor", "Capacitor"];
</script>
<div class="space-y-8">
    <section class="text-center space-y-4">
        <h1
            class="text-4xl font-bold bg-gradient-to-r from-[#FF4413] via-[#4B4B4B] via-[#FEFB0E]  to-[#6AB1EB] bg-clip-text text-transparent"
        >
            Welcome to Robokit
        </h1>
        <p class="text-muted-foreground max-w-2xl mx-auto">
            Your one-stop solution for managing the robotics club inventory at
            BITS Hyderabad
        </p>
        <form
            class="flex flex-col justify-center text-center items-center"
            method="post"
            action="?/OAuth2"
        >
            <button class="google-btn" type="submit">Sign In with Google</button
            >
        </form>
    </section>
    <div class="max-w-2xl mx-auto">
        <div class="relative">
            <Input placeholder="Search for items..." class="pl-10" />
            <Search
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4"
            />
        </div>
    </div>
    <div>
        <h2 class="text-xl font-semibold mb-4">Categories</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            {#each categories as category}
                <Button
                    variant="outline"
                    class="h-auto py-8 flex flex-col gap-2 hover:bg-accent hover:text-accent-foreground"
                >
                    <span class="text-lg">{category}</span>
                </Button>
            {/each}
        </div>
    </div>
    <div>
        <h2 class="text-xl font-semibold mb-4">Popular Items</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            {#each popularItems as item}
                <Card
                    class="hover:shadow-lg transition-shadow border-border hover:border-primary/50"
                >
                    <div slot="header" class="p-6">
                        <h3
                            class="flex items-center gap-2 font-semibold text-lg"
                        >
                            <Zap class="h-5 w-5 text-primary" />
                            {item}
                        </h3>
                    </div>
                    <div slot="content" class="p-6 pt-0">
                        <p class="text-muted-foreground">
                            Short description of {item}
                        </p>
                    </div>
                </Card>
            {/each}
        </div>
    </div>

    <!-- Low In Stock Items -->
    <div>
        <h2 class="text-xl font-semibold mb-4">Low In Stock Items</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            {#each lowStockItems as item}
                <Card class="border-destructive/30 hover:border-destructive/50">
                    <div slot="header" class="p-6">
                        <h3
                            class="flex items-center gap-2 font-semibold text-lg"
                        >
                            <AlertTriangle class="h-5 w-5 text-destructive" />
                            {item}
                        </h3>
                    </div>
                    <div slot="content" class="p-6 pt-0">
                        <p class="text-destructive">Only 5 left in stock</p>
                    </div>
                </Card>
            {/each}
        </div>
    </div>
    <!-- Request for Item -->
    <div class="text-center">
        <a href="/request">
            <Button size="lg" class="bg-primary hover:bg-primary/90">
                Request for Item
            </Button>
        </a>
    </div>
</div>
<style>
    h1{
        background-size: 200% 100%;
    }
</style>
