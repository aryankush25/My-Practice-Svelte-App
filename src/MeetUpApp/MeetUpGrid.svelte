<script>
  import { scale } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import MeetUpItem from './MeetUpItem.svelte'
  import MeetUpFilter from './MeetUpFilter.svelte'

  export let meetups

  let favsOnly = false

  $: filteredMeetups = favsOnly
    ? meetups.filter(meetUp => meetUp.isFavourite)
    : meetups

  const setFilter = event => {
    favsOnly = event.detail
  }
</script>

<MeetUpFilter on:select={setFilter} {favsOnly} />

{#each filteredMeetups as meetup (meetup.id)}
  <div transition:scale animate:flip={{ duration: 300 }}>
    <MeetUpItem
      id={meetup.id}
      title={meetup.title}
      subtitle={meetup.subtitle}
      description={meetup.description}
      imageUrl={meetup.imageUrl}
      address={meetup.address}
      contactEmail={meetup.contactEmail}
      isFavourite={meetup.isFavourite}
      on:showDetails
      on:edit />
  </div>
{/each}
