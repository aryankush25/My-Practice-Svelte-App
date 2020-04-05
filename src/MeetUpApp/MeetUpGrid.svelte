<script>
  import MeetUpItem from './MeetUpItem.svelte'
  import MeetUpFilter from './MeetUpFilter.svelte'

  export let meetups

  let favsOnly = false

  $: filteredMeetups = favsOnly
    ? meetups.filter(meetUp => meetUp.isFavourite)
    : meetups

  console.log('$$$$ meetups', meetups)

  const setFilter = event => {
    favsOnly = event.detail
  }
</script>

<MeetUpFilter on:select={setFilter} {favsOnly} />

{#each filteredMeetups as meetup}
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
{/each}
