<script>
  import { createEventDispatcher } from 'svelte'
  import TextInput from './TextInput.svelte'
  import Button from './Button.svelte'
  import Modal from './Modal.svelte'
  import { isEmpty, isValidEmail } from '../helpers/validation.js'

  const dispatch = createEventDispatcher()

  let title = ''
  let subtitle = ''
  let description = ''
  let imageUrl = ''
  let address = ''
  let contactEmail = ''

  $: titleValid = !isEmpty(title)
  $: subtitleValid = !isEmpty(subtitle)
  $: descriptionValid = !isEmpty(description)
  $: imageUrlValid = !isEmpty(imageUrl)
  $: addressValid = !isEmpty(address)
  $: contactEmailValid = !isValidEmail(contactEmail)

  $: formIsValid =
    titleValid &&
    subtitleValid &&
    descriptionValid &&
    imageUrlValid &&
    addressValid &&
    contactEmailValid

  const addMeetUp = () => {
    dispatch('addMeetup', {
      title,
      subtitle,
      description,
      imageUrl,
      address,
      contactEmail,
    })
  }

  const close = () => {
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
  </div>
</Modal>
