import { writable } from 'svelte/store'

const initialValue = []

const meetups = writable(initialValue)

const customMeetupStore = {
  subscribe: meetups.subscribe,
  setMeetups: meetUpArray => {
    meetups.set(meetUpArray)
  },
  addMeetup: values => {
    const newMeetUpObj = values

    meetups.update(items => {
      return [newMeetUpObj, ...items]
    })
  },
  toggleFavourite: id => {
    meetups.update(items => {
      const updatedMeetup = { ...items.find(m => m.id === id) }
      updatedMeetup.isFavourite = !updatedMeetup.isFavourite
      const meetupIndex = items.findIndex(m => m.id === id)
      const updatedMeetups = [...items]
      updatedMeetups[meetupIndex] = updatedMeetup
      return updatedMeetups
    })
  },
  updateMeetup: (id, values) => {
    meetups.update(items => {
      const updatedIndex = items.findIndex(item => item.id === id)
      const updatedMeetups = [...items]
      updatedMeetups[updatedIndex] = { ...items[updatedIndex], ...values }
      return updatedMeetups
    })
  },
  deleteMeetup: id => {
    meetups.update(items => {
      return items.filter(item => item.id !== id)
    })
  },
}

export default customMeetupStore
