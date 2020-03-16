<script>
  import MeetUpItem from './MeetUpItem.svelte'

  export let meetups
</script>

{#each meetups as meetup}
  <MeetUpItem
    title={meetup.title}
    subtitle={meetup.subtitle}
    description={meetup.description}
    imageUrl={meetup.imageUrl}
    address={meetup.address}
    contactEmail={meetup.contactEmail} />
{/each}
