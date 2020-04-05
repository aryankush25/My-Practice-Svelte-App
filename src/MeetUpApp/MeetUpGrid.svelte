<script>
  import MeetUpItem from './MeetUpItem.svelte'
  import MeetUpFilter from './MeetUpFilter.svelte'

  export let meetups
</script>

<MeetUpFilter />

{#each meetups as meetup}
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
