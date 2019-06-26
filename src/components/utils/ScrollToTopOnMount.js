import { useEffect } from 'react'

const ScrollToTopOnMount = () => {
  useEffect(() => {
    window.scrollTo(0, 0) || window.scroll(0, 0)
    return () => {
      window.scrollTo(0, 0) || window.scroll(0, 0)
    }
  }, [])

  return null
}

export default ScrollToTopOnMount
