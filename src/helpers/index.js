import React from 'react'
import { ReactComponent as YouTube } from 'assets/svg/youtube.svg'
import { ReactComponent as Udemy } from 'assets/svg/udemy.svg'
import { ReactComponent as Hackernoon } from 'assets/svg/hackernoon.svg'
import { ReactComponent as Google } from 'assets/svg/google.svg'
import { ReactComponent as FreeCodeCamp } from 'assets/svg/freecodecamp.svg'
import { ReactComponent as ListenApi } from 'assets/svg/listenapi.svg'

//* Selects proper logo to display based on url
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
    const newUrl = url.includes('http') ? url : `http://www.udemy.com${url}`

    const logo = logos.filter(logo => newUrl.includes(logo))[0]
    switch (logo) {
      case 'youtube':
        return (
          <YouTube className='attribution-logo' height='20px' width='20px' />
        )
      case 'udemy':
        return <Udemy className='attribution-logo' height='20px' width='20px' />
      case 'freecodecamp':
        return (
          <FreeCodeCamp
            className='attribution-logo'
            height='20px'
            width='20px'
          />
        )
      case 'book':
        return (
          <Google className='attribution-logo' height='20px' width='20px' />
        )
      case 'hackernoon':
        return (
          <Hackernoon className='attribution-logo' height='20px' width='20px' />
        )
      case 'listen':
        return (
          <a
            href='https://www.listennotes.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <ListenApi
              className='attribution-logo'
              height='20px'
              width='120px'
            />
          </a>
        )
      default:
        return
    }
  }
}

export const printRootUrl = url => {
  if (!url) {
    return
  }
  //TODO: FIX UDEMY HACK
  const newUrl = url.includes('http') ? url : `http://www.udemy.com${url}`

  let rootUrl
  try {
    rootUrl = new URL(newUrl)
  } catch (error) {
    console.log(error)
  }

  rootUrl =
    rootUrl &&
    rootUrl.hostname.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]

  return rootUrl && rootUrl.includes('listen') ? null : (
    <a href={`https://${rootUrl}`} target='_blank' rel='noopener noreferrer'>
      <span className='attribution-url'>{rootUrl}</span>
    </a>
  )
}

//* Return random element from an array
export const selectRandom = arr => {
  if (arr && arr.length) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
}
