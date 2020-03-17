<script>
  import Header from './Header.svelte'
  import MeetUpGrid from './MeetUpGrid.svelte'
  import EditMeetup from './EditMeetup.svelte'
  import Button from './Button.svelte'
  import MeetupDetails from './MeetupDetails.svelte'
  import meetupsStore from './meetups-store.js'

  let isEditing = false
  let showDetails = false
  let currentId

  const closeModal = () => {
    isEditing = !isEditing
  }

  const handelShowDetails = ({ detail }) => {
    console.log('#### ', detail)
    currentId = detail
    showDetails = true
  }

  const handelHideDetails = () => {
    currentId = null
    showDetails = false
  }
</script>

<style>
  .meetups-section {
    margin-top: 5rem;
  }
</style>

<Header />

<section class="meetups-section">

  {#if showDetails}
    <MeetupDetails id={currentId} on:close={handelHideDetails} />
  {:else}
    <Button on:click={() => (isEditing = !isEditing)}>Add Meetup</Button>

    {#if isEditing}
      <EditMeetup on:close={closeModal} />
    {/if}

    <MeetUpGrid meetups={$meetupsStore} on:showDetails={handelShowDetails} />
  {/if}

</section>
