import React, { useState } from 'react'
import HelpScreen from '../utils/screens/HelpScreen'
import BookmarkSVG from 'assets/svg/bookmark-drawing.svg'
import Collection from './Collection'
import ScrollToTopOnMount from 'components/utils/ScrollToTopOnMount'

const Collections = props => {
  const { searchTerm: search } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditPost, setIsEditPost] = useState(null)

  const handleModalOpen = editPost => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen)
    setIsEditPost(editPost)
  }

  const handleDelete = postId => {
    props.deleteCollection(postId)
  }

  if (props.collections.length) {
    const filteredCollections = props.collections.filter(post => {
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

  if (props.collections.length === 0) {
    return (
      <HelpScreen
        imgSource={BookmarkSVG}
        headerText='Your saved courses and articles will be stored here.'
      />
    )
  }
}

export default Collections
