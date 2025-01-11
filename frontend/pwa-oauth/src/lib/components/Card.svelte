<script>
  export let className = '';
</script>

<div class="rounded-lg border bg-card text-card-foreground shadow-sm {className}">
  <slot name="header" />
  <slot name="content" />
</div>