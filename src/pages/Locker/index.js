import React, { useState, useCallback, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import HelpScreen from 'components/utils/screens/HelpScreen'
import BookmarkSVG from 'assets/svg/bookmark-drawing.svg'
import Collection from './components/Collection'
import ScrollToTopOnMount from 'components/utils/ScrollToTopOnMount'
import SubNav from 'components/SubNav'
import { deleteCollection, fetchCollections } from 'actions'

const Collections = props => {
  const { location } = props
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
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalOpen = editPost => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen)
  }

  const handleDelete = postId => {
    dispatch(deleteCollection(postId))
  }

  console.log(location.pathname)
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
      post => post.type_id === '1'
    )
    return (
      <>
        <ScrollToTopOnMount />
        <SubNav />
        <Collection
          collections={filterTypeCollections}
          modalOpen={isModalOpen}
          handleModalOpen={handleModalOpen}
          handleDelete={handleDelete}
        />
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
