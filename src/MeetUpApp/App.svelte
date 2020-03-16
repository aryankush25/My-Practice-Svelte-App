<script>
  import Header from './Header.svelte'
  import MeetUpGrid from './MeetUpGrid.svelte'
  import EditMeetup from './EditMeetup.svelte'
  import Button from './Button.svelte'

  let meetups = [
    {
      id: 'm1',
      title: 'Coding Bootcamp',
      subtitle: 'Learn to code in 2 hours',
      description:
        'In this meetup, we will have some experts that teach you how to code!',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG',
      address: '27th Nerd Road, 32523 New York',
      contactEmail: 'code@test.com',
      isFavourite: false,
    },
    {
      id: 'm2',
      title: 'Swim Together',
      subtitle: "Let's go for some swimming",
      description: 'We will simply swim some rounds!',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg',
      address: '27th Nerd Road, 32523 New York',
      contactEmail: 'swim@test.com',
      isFavourite: false,
    },
  ]

  let isEditing = false

  const addMeetUp = event => {
    const values = event.detail

    const newMeetUpObj = {
      id: Math.random().toString(),
      ...values,
    }

    meetups = [newMeetUpObj, ...meetups]

    isEditing = !isEditing
  }

  const toggleFavourite = ({ detail }) => {
    const updatedMeetup = { ...meetups.find(m => m.id === detail) }
    updatedMeetup.isFavourite = !updatedMeetup.isFavourite
    const meetupIndex = meetups.findIndex(m => m.id === detail)
    const updatedMeetups = [...meetups]
    updatedMeetups[meetupIndex] = updatedMeetup
    meetups = updatedMeetups
  }

  const closeModal = () => {
    isEditing = !isEditing
  }
</script>

<style>
  .meetups-section {
    margin-top: 5rem;
  }
</style>

<Header />

<section class="meetups-section">

  <Button on:click={() => (isEditing = !isEditing)}>Add Meetup</Button>

  {#if isEditing}
    <EditMeetup on:addMeetup={addMeetUp} on:close={closeModal} />
  {/if}
  <MeetUpGrid {meetups} on:toggleFavourite={toggleFavourite} />

</section>
