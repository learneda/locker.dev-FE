import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useThrottle } from 'use-throttle'
import ScrollToTopOnMount from 'components/utils/ScrollToTopOnMount'
import Card from './Card'
import Loader from './Loader'
import EndMessage from './EndMessage'
import styled from 'styled-components'

const Items = props => {
  const { type, items, searchTerm, offset, fetch, search, save, share } = props
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
        default:
          return
      }
      await search(searchTerm, offset)
      setIsLoading(false)
    }
    if (didMount) {
      setIsLoading(true)
      asyncSearchItems()
    }
    setDidMount(true)
  }, [throttledSearch])
  // hasMore false only when searchQuery returns no matches
  const hasMore = !Boolean(searchTerm) || Boolean(items.length)
  const next = () => fetch(searchTerm, offset)

  return (
    <Cards>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ScrollToTopOnMount />
          <InfiniteScroll
            dataLength={items.length}
            next={next}
            hasMore={hasMore}
            className='infinite-scroll'
            endMessage={<EndMessage />}
          >
            {items.map((item, index) => (
              <Card
                type={type}
                key={item.id}
                item={item}
                save={save}
                share={share}
              />
            ))}
          </InfiniteScroll>
        </>
      )}
    </Cards>
  )
}

export default Items

const Cards = styled.div`
  margin: 0 auto;
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
