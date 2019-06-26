import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { withRouter } from 'react-router-dom'
import { useThrottle } from 'use-throttle'
import Card from 'components/Card/index'
import EndMessage from './EndMessage'
import styled from 'styled-components'
import { setOffset } from 'helpers'

const Items = props => {
  const { type, items, searchTerm, offset, fetch, search, location } = props
  const { showIframe, resetIframe } = props
  const [didMount, setDidMount] = useState(false)
  const throttledSearch = useThrottle(searchTerm, 2000)

  // Reset scroll position on tab switch
  useEffect(() => {
    window.scrollTo(0, 0)
    // If type is video, resets iFrame on initial mount
    if (type === 'video') {
      console.log('trying to reset iframe')
      resetIframe()
    }
    return () => {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  // Performs throttled search and prevents search on initial mount
  useEffect(() => {
    const asyncSearchItems = async () => {
      // Resets offset on search change
      const offset = setOffset(type)

      // Video (YouTube) is unique; Initial offset not defined
      if (type === 'video') {
        await search(searchTerm)
      } else {
        await search(searchTerm, offset)
      }
    }
    // Prevents search on initial mount
    if (didMount) {
      asyncSearchItems()
    }
    // After mount, didMount is true
    setDidMount(true)
  }, [throttledSearch])

  // hasMore false only when searchQuery returns no matches
  const hasMore = !Boolean(searchTerm) || Boolean(items.length)
  // fetchMore logic
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

Items.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchTerm: PropTypes.string.isRequired,
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  fetch: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

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
