<script>
  export let id;
  export let onCheckedChange;
</script>

<input
  type="checkbox"
  id={id}
  on:change={(e) => onCheckedChange(e.target.checked)}
  class="form-checkbox h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
/>