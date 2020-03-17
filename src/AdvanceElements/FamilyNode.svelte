<script>
  export let member
</script>

<h1>{member.name}</h1>
<hr />
{#if member.isParent}
  <ul>
    {#each member.children as child}
      <svelte:self member={child} />
    {/each}
  </ul>
{/if}
