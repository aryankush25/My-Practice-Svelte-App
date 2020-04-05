<script>
  import { fade, fly, slide, scale } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  let boxInput
  let showParagraph = false
  let boxes = []

  const addBoxes = () => {
    boxes = [boxInput.value, ...boxes]
  }

  const discard = value => {
    boxes = boxes.filter(box => box !== value)
  }
</script>

<style>
  div {
    height: 10rem;
    width: 10rem;
    background-color: #ccc;
    margin: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    padding: 1rem;
  }
</style>

<button
  on:click={() => {
    showParagraph = !showParagraph
  }}>
  Toggle Paragraph
</button>
{#if showParagraph}
  <p out:fade in:slide={{ x: 1000, y: 0 }}>Yes I can!</p>
  <p transition:fly={{ x: 1000, y: 0 }}>Can you see me?</p>
{/if}

<hr />

<input type="text" bind:this={boxInput} />
<button on:click={addBoxes}>Add</button>

{#if showParagraph}
  {#each boxes as box (box)}
    <div
      transition:fly|local={{ x: 1000, y: 0 }}
      on:introstart={() => {
        console.log('On Intro Starts')
      }}
      on:introend={() => {
        console.log('On Intro End')
      }}
      on:outrostart={() => {
        console.log('On Outro Start')
      }}
      on:outroend={() => {
        console.log('On Outro End')
      }}
      animate:flip={{ duration: 300 }}
      on:click={discard.bind(this, box)}>
      {box}
    </div>
  {/each}
{/if}
