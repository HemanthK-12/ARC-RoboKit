<script>
    import { page } from "$app/stores";
    import "../app.css";
    import NavBar from "$lib/components/NavBar.svelte";
    import TopBar from "$lib/components/TopBar.svelte";
    $: showNavBar = $page.url.pathname !== '/unauthorized' || $page.url.pathname === '/';
    $: showTopBar = $page.url.pathname !== '/';
</script>
{#if showTopBar}
<TopBar />
{/if}
 <slot />
{#if showNavBar}
<NavBar />
{/if}