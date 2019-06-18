import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useThrottle } from 'use-throttle'
import ScrollToTopOnMount from 'components/utils/ScrollToTopOnMount'
import Card from './Card'
import Loader from './Loader'
import EndMessage from './EndMessage'
import styled from 'styled-components'

const Articles = props => {
  const {
    articles,
    searchTerm,
    articleOffset,
    fetchArticles,
    searchArticles,
    createCollection,
  } = props
  const [isLoading, setIsLoading] = useState(false)
  const [didMount, setDidMount] = useState(false)
  const throttledSearch = useThrottle(searchTerm, 1000)
  // Performs throttled search and prevents search on initial mount
  useEffect(() => {
    const asyncSearchArticles = async () => {
      // Search resets offset=0
      const offset = 0
      await searchArticles(searchTerm, offset)
      setIsLoading(false)
    }
    if (didMount) {
      setIsLoading(true)
      asyncSearchArticles()
    }
    setDidMount(true)
  }, [throttledSearch])
  // hasMore false only when searchQuery returns no matches
  const hasMore = !Boolean(searchTerm) || Boolean(articles.length)
  const next = () => fetchArticles(searchTerm, articleOffset)

  return (
    <Cards>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ScrollToTopOnMount />
          <InfiniteScroll
            dataLength={articles.length}
            next={next}
            hasMore={hasMore}
            className='infinite-scroll'
            endMessage={<EndMessage />}
          >
            {articles.map((article, index) => (
              <Card
                type='article'
                key={article.id}
                item={article}
                createCollection={createCollection}
              />
            ))}
          </InfiniteScroll>
        </>
      )}
    </Cards>
  )
}

export default Articles

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
