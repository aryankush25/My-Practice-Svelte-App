<script>
  import { createEventDispatcher } from 'svelte'
  import TextInput from './TextInput.svelte'
  import Button from './Button.svelte'
  import Modal from './Modal.svelte'
  import meetupsStore from './meetups-store.js'
  import { isEmpty, isValidEmail } from '../helpers/validation.js'

  const dispatch = createEventDispatcher()

  export let id

  let title = ''
  let subtitle = ''
  let description = ''
  let imageUrl = ''
  let address = ''
  let contactEmail = ''

  if (id) {
    const unsubscribe = meetupsStore.subscribe(items => {
      const selectedMeetup = items.find(item => item.id === id)
      title = selectedMeetup.title
      subtitle = selectedMeetup.subtitle
      description = selectedMeetup.description
      imageUrl = selectedMeetup.imageUrl
      address = selectedMeetup.address
      contactEmail = selectedMeetup.contactEmail
    })
    unsubscribe()
  }

  $: titleValid = !isEmpty(title)
  $: subtitleValid = !isEmpty(subtitle)
  $: descriptionValid = !isEmpty(description)
  $: imageUrlValid = !isEmpty(imageUrl)
  $: addressValid = !isEmpty(address)
  $: contactEmailValid = isValidEmail(contactEmail)

  $: formIsValid =
    titleValid &&
    subtitleValid &&
    descriptionValid &&
    imageUrlValid &&
    addressValid &&
    contactEmailValid

  const addMeetUp = () => {
    if (id) {
      fetch(
        `https://my-practice-svelte-app.firebaseio.com/meetups/${id}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            subtitle,
            description,
            imageUrl,
            address,
            contactEmail,
          }),
        },
      )
        .then(res => {
          if (!res.ok) {
            throw new Error('An error occured please try again')
          }
          meetupsStore.updateMeetup(id, {
            title,
            subtitle,
            description,
            imageUrl,
            address,
            contactEmail,
          })
        })
        .catch(error => {
          console.log('Error', error)
        })
    } else {
      fetch('https://my-practice-svelte-app.firebaseio.com/meetups.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          subtitle,
          description,
          imageUrl,
          address,
          contactEmail,
          isFavourite: false,
        }),
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('An error occured please try again')
          }
          return res.json()
        })
        .then(data => {
          meetupsStore.addMeetup({
            title,
            subtitle,
            description,
            imageUrl,
            address,
            contactEmail,
            isFavourite: false,
            id: data.name,
          })
        })
        .catch(error => {
          console.log('Error', error)
        })
    }

    dispatch('close')
  }

  const close = () => {
    dispatch('close')
  }

  const deleteMeetup = () => {
    fetch(`https://my-practice-svelte-app.firebaseio.com/meetups/${id}.json`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('An error occured please try again')
        }
        meetupsStore.deleteMeetup(id)
      })
      .catch(error => {
        console.log('Error', error)
      })
    dispatch('close')
  }
</script>

<style>
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Modal title="Edit Meetup" on:close>
  <form on:submit|preventDefault>

    <TextInput
      id="title"
      label="Title"
      value={title}
      valid={titleValid}
      validityMessage="Not Valid Title"
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      valid={subtitleValid}
      validityMessage="Not Valid Subtitle"
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="address"
      label="Address"
      value={address}
      valid={addressValid}
      validityMessage="Not Valid Address"
      on:input={event => (address = event.target.value)} />
    <TextInput
      id="imageUrl"
      label="ImageUrl"
      value={imageUrl}
      valid={imageUrlValid}
      validityMessage="Not Valid Image Url"
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      id="contactEmail"
      label="Contact Email"
      value={contactEmail}
      valid={contactEmailValid}
      validityMessage="Not Valid Email"
      on:input={event => (contactEmail = event.target.value)} />
    <TextInput
      id="description"
      label="Description"
      value={description}
      valid={descriptionValid}
      validityMessage="Not Valid Description"
      controlType="textarea"
      rows="3"
      on:input={event => (description = event.target.value)} />

  </form>
  <div slot="footer">
    <Button type="submit" on:click={addMeetUp} disabled={!formIsValid}>
      Save
    </Button>
    <Button type="submit" on:click={close}>Cancle</Button>
    {#if id}
      <Button type="submit" on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>
