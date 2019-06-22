import React, { useState, useCallback, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import HelpScreen from 'components/utils/screens/HelpScreen'
import BookmarkSVG from 'assets/svg/bookmark-drawing.svg'
import Collection from './components/Collection'
import ScrollToTopOnMount from 'components/utils/ScrollToTopOnMount'
import SubNav from 'components/SubNav'
import {
  deleteCollection,
  fetchCollections,
  createCollection,
  postToFeed,
} from 'actions'
import Items from 'pages/Browse/components/Items'
import Card from 'pages/Browse/components/Card'

const Collections = props => {
  const { location } = props
  const [typeFilter, setTypeFilter] = useState('')

  const dispatch = useDispatch()

  const { searchTerm: search, collections } = useSelector(
    ({ search, collections }) => ({
      searchTerm: search.searchTerm,
      collections,
    })
  )

  useEffect(() => {
    if (!collections.length) {
      dispatch(fetchCollections())
    }
    switch (location.pathname) {
      case '/locker':
        setTypeFilter('1')
        break
      case '/locker/articles':
        setTypeFilter('1')
        break
      case '/locker/courses':
        setTypeFilter('2')
        break
      case '/locker/books':
        setTypeFilter('3')
        break
      case '/locker/videos':
        setTypeFilter('4')
        break
      case '/locker/podcasts':
        setTypeFilter('5')
        break
      default:
        setTypeFilter('1')
        return
    }
  }, [location.pathname])

  if (collections.length) {
    const searchedCollections = collections.filter(post => {
      return (
        (post.title &&
          post.title.toLowerCase().includes(search.toLowerCase())) ||
        (post.thumbnail_url &&
          post.thumbnail_url.toLowerCase().includes(search.toLowerCase())) ||
        (post.description &&
          post.description.toLowerCase().includes(search.toLowerCase()))
      )
    })

    const filterTypeCollections = collections.filter(
      post => post.type_id === typeFilter
    )
    return (
      <>
        <ScrollToTopOnMount />
        <SubNav />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          {filterTypeCollections.map((post, index) => {
            return (
              <Card
                key={index}
                item={post}
                type='locker'
                save={() => dispatch(createCollection)}
                share={() => dispatch(postToFeed)}
              />
            )
          })}
        </div>
      </>
    )
  }

  if (collections.length === 0) {
    return (
      <HelpScreen
        imgSource={BookmarkSVG}
        headerText='Your saved courses and articles will be stored here.'
      />
    )
  }
}

export default withRouter(Collections)
