<script>
  import FamilyNode from './FamilyNode.svelte'
  const jhaData = {
    isParent: false,
    name: 'Jha',
    children: [],
  }

  const aryanData = {
    isParent: true,
    name: 'Aryan',
    children: [jhaData],
  }

  const yoyo = {
    isParent: false,
    name: 'YoYo',
  }

  const sakshyaData = {
    isParent: true,
    name: 'Sakshya',
    children: [yoyo],
  }

  const tanmayData = {
    isParent: false,
    name: 'Tanmay',
  }
  const chandanData = {
    isParent: true,
    name: 'Chandan',
    children: [sakshyaData, tanmayData],
  }

  const familyTree = [aryanData, chandanData]

  let yAxis

  $: console.log('Y-Axis', yAxis)
</script>

<style>
  div {
    height: 3000px;
  }
</style>

<svelte:window
  on:keydown={e => {
    console.log('Pressed key', e.key)
  }}
  bind:scrollY={yAxis} />

<svelte:head>
  <title>Practice</title>
</svelte:head>

<div>
  {#each familyTree as familyMember}
    <FamilyNode member={familyMember} />
  {/each}
</div>
