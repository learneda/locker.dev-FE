import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { withRouter } from 'react-router-dom'
import { useThrottle } from 'use-throttle'
import Card from 'components/Card/index'
import EndMessage from './EndMessage'
import styled from 'styled-components'

const Items = props => {
  const { type, items, searchTerm, offset, fetch, search, location } = props
  const { showIframe, resetIframe } = props
  const [isLoading, setIsLoading] = useState(false)
  const [didMount, setDidMount] = useState(false)
  const throttledSearch = useThrottle(searchTerm, 1000)

  // Reset scroll position on tab switch
  useEffect(() => {
    window.scrollTo(0, 0)
    return () => {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  // Performs throttled search and prevents search on initial mount
  useEffect(() => {
    const asyncSearchItems = async () => {
      // Search resets offset=0
      let offset
      switch (type) {
        case 'article':
          offset = 0
          break
        case 'course':
          offset = 1
          break
        case 'book':
          offset = 0
          break
        case 'podcast':
          offset = 0
          break
        case 'video':
          offset = null
          break
        default:
          return
      }
      if (type === 'video') {
        await search(searchTerm)
      } else {
        await search(searchTerm, offset)
      }
      setIsLoading(false)
    }
    if (didMount) {
      setIsLoading(true)
      asyncSearchItems()
    } else {
      if (type === 'video') {
        resetIframe()
      }
    }
    setDidMount(true)
  }, [throttledSearch])

  // hasMore false only when searchQuery returns no matches
  const hasMore = !Boolean(searchTerm) || Boolean(items.length)
  const next = () => fetch(searchTerm, offset)

  return (
    <Cards>
      <InfiniteScroll
        className='infinite-scroll'
        dataLength={items.length}
        next={next}
        hasMore={hasMore}
        endMessage={<EndMessage />}
      >
        {items.map((item, index) => (
          <Card
            type={type}
            key={index}
            item={item}
            showIframe={showIframe}
            resetIframe={resetIframe}
          />
        ))}
      </InfiniteScroll>
    </Cards>
  )
}

export default withRouter(Items)

const Cards = styled.div`
  .infinite-scroll {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 1218px) {
      justify-content: space-evenly;
    }
  }
`
