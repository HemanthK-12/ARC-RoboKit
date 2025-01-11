<script>
  export let variant = 'default';
  export let size = 'default';
</script>

<button
  class="inline-flex items-center justify-center rounded-md font-medium transition-colors
  {variant === 'outline' 
    ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' 
    : 'bg-primary text-primary-foreground hover:bg-primary/90'}
  {size === 'lg' ? 'h-11 px-8 text-lg' : 'h-10 px-4 py-2'}"
>
  <slot />
</button>