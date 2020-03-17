import { writable } from 'svelte/store'

const initialValue = [
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

const meetups = writable(initialValue)

const customMeetupStore = {
  subscribe: meetups.subscribe,
  addMeetup: values => {
    const newMeetUpObj = {
      id: Math.random().toString(),
      isFavourite: false,
      ...values,
    }

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
