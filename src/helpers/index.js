import React from 'react'
import { ReactComponent as YouTube } from '../assets/svg/youtube.svg'
import { ReactComponent as Udemy } from '../assets/svg/udemy.svg'
import { ReactComponent as Hackernoon } from '../assets/svg/hackernoon.svg'
import { ReactComponent as Google } from '../assets/svg/google.svg'
import { ReactComponent as FreeCodeCamp } from '../assets/svg/freecodecamp.svg'
import { ReactComponent as ListenApi } from '../assets/svg/listenapi.svg'

export const selectLogo = url => {
  if (url) {
    const logos = [
      'youtube',
      'udemy',
      'freecodecamp',
      'book',
      'hackernoon',
      'listen',
    ]
    const logo = logos.filter(logo => url.includes(logo))[0]
    switch (logo) {
      case 'youtube':
        return <YouTube height='20px' width='20px' />
      case 'udemy':
        return <Udemy height='20px' width='20px' />
      case 'freecodecamp':
        return <FreeCodeCamp height='20px' width='20px' />
      case 'book':
        return <Google height='20px' width='20px' />
      case 'hackernoon':
        return <Hackernoon height='20px' width='20px' />
      case 'listen':
        return <ListenApi height='20px' width='120px' />
      default:
        return
    }
  }
}
