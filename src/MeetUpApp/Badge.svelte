<script>
  import { slide } from 'svelte/transition'
</script>

<style>
  span {
    display: inline-block;
    margin: 0 0.25rem;
    border-radius: 3px;
    border: solid 1px #01a129;
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    font-size: 0.8rem;
  }
</style>

<span transition:slide>
  <slot />
</span>
