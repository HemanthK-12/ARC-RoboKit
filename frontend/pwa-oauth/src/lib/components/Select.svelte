<script>
  import { createEventDispatcher } from 'svelte';
  export let options = [];
  export let placeholder = '';
  export let onValueChange;

  const dispatch = createEventDispatcher();

  function handleChange(event) {
    const value = event.target.value;
    dispatch('valueChange', value);
    onValueChange(value);
  }
</script>

<select on:change={handleChange} class="form-select block w-full mt-1">
  <option value="" disabled selected>{placeholder}</option>
  {#each options as option}
    <option value={option.value}>{option.label}</option>
  {/each}
</select>