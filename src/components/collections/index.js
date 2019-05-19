import React, { Component } from 'react'
import { truncateText } from '../mixins'
import HelpScreen from '../utils/screens/HelpScreen'
import BookmarkSVG from '../../assets/svg/bookmark-drawing.svg'
import Collection from './Collection'

class Collections extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      editPost: null,
    }
  }

  handleTruncateText = (content, limit = 10) => truncateText(content, limit)

  handleModalOpen = editPost => {
    this.setState({ editPost: editPost, modalOpen: !this.state.modalOpen })
  }

  handleDelete = postId => {
    this.props.deletePost(postId)
  }

  render() {
    const { modalOpen, editPost } = this.state
    const { handleTruncateText, handleModalOpen } = this
    const { searchTerm: search } = this.props
    if (this.props.posts.length) {
      const filteredPosts = this.props.posts.filter(post => {
        return post.title
          ? post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
          : null || post.thumbnail_url
          ? post.thumbnail_url.toLowerCase().indexOf(search.toLowerCase()) !==
            -1
          : null || post.description
          ? post.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
          : null
      })
      return (
        <Collection
          handleDelete={this.handleDelete}
          handleTruncateText={this.handleTruncateText}
          posts={filteredPosts}
          handleModalOpen={this.handleModalOpen}
          modalOpen={this.state.modalOpen}
          editPost={this.state.editPost}
        />
      )
    }

    if (this.props.posts.length === 0) {
      return (
        <HelpScreen
          imgSource={BookmarkSVG}
          headerText='Your saved courses and articles will be stored here.'
        />
      )
    }
  }
}

export default Collections
