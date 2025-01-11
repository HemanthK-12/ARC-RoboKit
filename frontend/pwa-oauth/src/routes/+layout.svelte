<script>
    import { page } from "$app/stores";
    import "../app.css";
    import NavBar from "$lib/components/NavBar.svelte";
    $: showNavBar = $page.url.pathname !== '/login';
</script>
 <slot />
{#if showNavBar}
<NavBar />
{/if}