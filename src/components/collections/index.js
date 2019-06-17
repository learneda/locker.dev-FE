import React, { useState } from 'react'
import HelpScreen from '../utils/screens/HelpScreen'
import BookmarkSVG from 'assets/svg/bookmark-drawing.svg'
import Collection from './Collection'
import { useSelector } from 'react-redux'
import ScrollToTopOnMount from 'components/utils/ScrollToTopOnMount'

const Collections = props => {
  const { searchTerm: search, collections } = useSelector(
    ({ searchTerm, collections }) => ({ searchTerm, collections })
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditPost, setIsEditPost] = useState(null)

  const handleModalOpen = editPost => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen)
    setIsEditPost(editPost)
  }

  const handleDelete = postId => {
    props.deleteCollection(postId)
  }

  if (collections.length) {
    const filteredCollections = collections.filter(post => {
      return (
        (post.title &&
          post.title.toLowerCase().includes(search.toLowerCase())) ||
        (post.thumbnail_url &&
          post.thumbnail_url.toLowerCase().includes(search.toLowerCase())) ||
        (post.description &&
          post.description.toLowerCase().includes(search.toLowerCase()))
      )
    })
    return (
      <>
        <ScrollToTopOnMount />
        <Collection
          handleDelete={handleDelete}
          collections={filteredCollections}
          handleModalOpen={handleModalOpen}
          modalOpen={isModalOpen}
          editPost={isEditPost}
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

export default Collections
