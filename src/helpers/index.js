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
      'hackernoon',
      'listen',
      'book',
      'daveceddia',
      'overreacted',
      'ryanflorence',
      'robinwieruch',
      'alligator',
      'leighhalliday',
    ]
    const newUrl = url.includes('http') ? url : `http://www.udemy.com${url}`

    const logo = logos.find(logo => newUrl.includes(logo))
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
      case 'daveceddia':
        return (
          <a
            href='https://daveceddia.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://daveceddia.com/images/logo@2x.png'
              className='attribution-logo'
              height='25px'
              alt='logo'
            />
          </a>
        )
      case 'overreacted':
        return (
          <a
            href='https://overreacted.io/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg'
              className='attribution-logo'
              height='25px'
              alt='logo'
            />
          </a>
        )
      case 'ryanflorence':
        return (
          <a
            href='https://medium.com/@ryanflorence'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://miro.medium.com/fit/c/256/256/1*zL-dNpRSeVDW6m-4f8NgUA.jpeg'
              className='attribution-logo'
              height='25px'
              alt='logo'
            />
          </a>
        )
      case 'robinwieruch':
        return (
          <a
            href='https://www.robinwieruch.de/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://www.robinwieruch.de/img/page/profile.jpg'
              className='attribution-logo'
              height='25px'
              alt='logo'
            />
          </a>
        )
      case 'alligator':
        return (
          <a
            href='https://alligator.io/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://d33wubrfki0l68.cloudfront.net/4e5626a0b7db6b84c0b51f1c0cfd56490fc19b74/7a5ad/images/logo-fancy.svg'
              className='attribution-logo'
              height='25px'
              alt='logo'
            />
          </a>
        )
      case 'leighhalliday':
        return (
          <a
            href='https://www.leighhalliday.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='https://www.leighhalliday.com/static/5a244d4c0a078786d713ad9307f8f400/3a627/leigh.jpg'
              className='attribution-logo'
              height='25px'
              alt='logo'
            />
          </a>
        )
      case 'book':
        return (
          <Google className='attribution-logo' height='20px' width='20px' />
        )
      default:
        return
    }
  }
}

//* Returns a link to rootUrl
export const printRootUrl = url => {
  if (!url) {
    return
  }
  //TODO: FIX UDEMY HACK
  const newUrl = url.includes('http') ? url : `http://www.udemy.com${url}`

  let rootUrl
  try {
    rootUrl = new URL(newUrl)
  } catch (error) {}

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

//* Creates a popup to url and on close redirects parent to redirectUrl
export function createPopup(
  url,
  redirectUrl = '/',
  title = 'OAuth',
  w = 460,
  h = 560
) {
  //* Extra OStack trickier, to handel dual screens. Sets x (left) and y (top) position of window on screen.
  const dualScreenLeft =
    window.screenLeft != undefined ? window.screenLeft : window.screenX
  const dualScreenTop =
    window.screenTop != undefined ? window.screenTop : window.screenY

  const width = window.outerWidth
  const height = window.outerHeight

  // Centers popup on screen
  const left = (width - w) / 2 + dualScreenLeft
  const top = (height - h) / 2 + dualScreenTop
  // Creates and opens auth popup.
  const newWindow = window.open(
    url,
    title,
    `resizable=no,titlebar=yes,menubar=no,dependent=no,scrollbars=no,width=${w},height=${h},top=${top},left=${left}`
  )

  // Sets focus on the auth popup if window exist
  if (window.focus && !newWindow) newWindow.focus()
  // Check to see if auth popup has closed every 0.5s. If so, clear interval interval
  // and force refresh to root to check if user has successfully authenticated.
  const timer = setInterval(() => {
    if (newWindow.closed) {
      window.location.assign(redirectUrl)
      clearInterval(timer)
    }
  }, 500)
}
