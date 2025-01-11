<script>
  export let type = 'button';
  export let onClick;
</script>

<button {type} on:click={onClick} class="google-btn">
  <slot></slot>
</button>

<style>
  .button {
    padding: 0.5rem 1rem;
    background-color: white;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
</style>