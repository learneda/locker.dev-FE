import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useThrottle } from 'use-throttle'
import ScrollToTopOnMount from 'components/utils/ScrollToTopOnMount'
import Card from 'components/Card/index'
import EndMessage from './EndMessage'
import styled from 'styled-components'
import he from 'he'

const Items = props => {
  const { type, items, searchTerm, offset, fetch, search, save, share } = props
  const { showIframe, resetIframe } = props
  const [isLoading, setIsLoading] = useState(false)
  const [didMount, setDidMount] = useState(false)
  const throttledSearch = useThrottle(searchTerm, 1000)

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
            key={type === 'video' ? index : item.id}
            item={item}
            save={save}
            share={share}
            showIframe={showIframe}
          />
        ))}
      </InfiniteScroll>
    </Cards>
  )
}

export default Items

const Cards = styled.div`
  /* border: 1px solid magenta; */
  margin: 0 auto;
  .infinite-scroll {
    /* border: 1px solid green; */
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 1218px) {
      justify-content: space-evenly;
    }
  }
`
