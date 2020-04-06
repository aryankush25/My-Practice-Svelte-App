<script>
  import Header from './Header.svelte'
  import MeetUpGrid from './MeetUpGrid.svelte'
  import EditMeetup from './EditMeetup.svelte'
  import Button from './Button.svelte'
  import MeetupDetails from './MeetupDetails.svelte'
  import meetupsStore from './meetups-store.js'

  fetch('https://my-practice-svelte-app.firebaseio.com/meetups.json')
    .then(res => {
      if (!res.ok) {
        throw new Error('An error occured please try again')
      }
      return res.json()
    })
    .then(data => {
      const loadedMeetups = []

      for (const key in data) {
        loadedMeetups.push({
          ...data[key],
          id: key,
        })
      }

      meetupsStore.setMeetups(loadedMeetups.reverse())
    })
    .catch(error => {
      console.log('Error', error)
    })

  let isEditing = false
  let showDetails = false
  let currentId
  let editMeetUpId = null

  const closeModal = () => {
    isEditing = !isEditing
    editMeetUpId = null
  }

  const handelShowDetails = ({ detail }) => {
    currentId = detail
    showDetails = true
  }

  const handelHideDetails = () => {
    currentId = null
    showDetails = false
  }

  const handelEditMeetupData = ({ detail }) => {
    isEditing = !isEditing
    editMeetUpId = detail
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
      <svelte:component
        this={EditMeetup}
        on:close={closeModal}
        id={editMeetUpId} />
    {/if}

    <MeetUpGrid
      meetups={$meetupsStore}
      on:showDetails={handelShowDetails}
      on:edit={handelEditMeetupData} />
  {/if}

</section>
