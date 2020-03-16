<script>
  import Header from './Header.svelte'
  import MeetUpGrid from './MeetUpGrid.svelte'
  import TextInput from './TextInput.svelte'
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
    },
  ]

  let title = ''
  let subtitle = ''
  let description = ''
  let imageUrl = ''
  let address = ''
  let contactEmail = ''

  const addMeetUp = () => {
    const newMeetUpObj = {
      id: Math.random().toString(),
      title,
      subtitle,
      description,
      imageUrl,
      address,
      contactEmail,
    }

    meetups = [newMeetUpObj, ...meetups]
  }
</script>

<style>
  .meetups-section {
    margin-top: 5rem;
  }
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />

<section class="meetups-section">

  <form on:submit|preventDefault={addMeetUp}>
    <TextInput
      id="title"
      label="Title"
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="address"
      label="Address"
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      id="imageUrl"
      label="ImageUrl"
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      id="contactEmail"
      label="Contact Email"
      value={contactEmail}
      type="email"
      on:input={event => (contactEmail = event.target.value)} />
    <TextInput
      id="description"
      label="Description"
      value={description}
      controlType="textarea"
      rows="3"
      on:input={event => (description = event.target.value)} />

    <Button type="submit" caption="Save" />
  </form>

  <MeetUpGrid {meetups} />
</section>
