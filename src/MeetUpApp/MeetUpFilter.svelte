<script>
  import { createEventDispatcher } from 'svelte'
  export let favsOnly

  const dispatch = createEventDispatcher()
</script>

<style>
  div {
    font-size: 0px;
  }

  button {
    background: #aaaaaa;
    font: inherit;
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid #aaaaaa;
    padding: 0.5rem 1rem;
  }

  button:focus {
    outline: none;
  }

  button:first-of-type {
    border-radius: 5px 0 0 5px;
  }

  button:last-of-type {
    border-radius: 0 5px 5px 0;
  }

  button:hover,
  button:active,
  .active {
    background: rgb(37, 108, 110);
    border-color: rgb(37, 108, 110);
    color: white;
  }
</style>

<div>
  <button
    class:active={!favsOnly}
    type="button"
    on:click={() => {
      dispatch('select', false)
    }}>
    All
  </button>
  <button
    class:active={favsOnly}
    type="button"
    on:click={() => {
      dispatch('select', true)
    }}>
    Favourites
  </button>
</div>
