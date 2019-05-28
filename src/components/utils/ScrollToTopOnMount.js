import React, { useEffect } from 'react'

const ScrollToTopOnMount = props => {
  useEffect(() => {
    window.scrollTo(0, 0)
    return window.scrollTo(0, 0)
  }, [])

  return null
}

export default ScrollToTopOnMount
