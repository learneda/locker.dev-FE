import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import styled from 'styled-components'
import { customWrapper, truncateText } from '../mixins'
import { StyledBookmarks } from './StyledBookmarks'
import EditModal from '../utils/EditModal/EditModal'
import { getPosts, deletePost, getUserProfileDetails } from '../../actions'
import deleteIcon from '../../assets/svg/delete-icon.svg'
import editSvg from '../../assets/svg/edit.svg'
import HelpScreen from '../utils/screens/HelpScreen'
import BookmarkSVG from '../../assets/svg/bookmark-drawing.svg'
import SharedButton from '../shared'
import moment from 'moment'

class Collections extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modalOpen: false,
			editPost: null
		}
		const search = this.props.searchTerm
	}

	componentDidMount() {
		this.props.getPosts()
	}

	handleTruncateText = (content, limit = 10) => truncateText(content, limit)

	handleModalOpen = (editPost) => {
		this.setState({ editPost: editPost, modalOpen: !this.state.modalOpen })
	}

	handleDelete = (postId) => {
		this.props.deletePost(postId)
	}

	render() {
		const { modalOpen, editPost } = this.state
		const { handleTruncateText, handleModalOpen } = this
		if (this.props.posts.length > 0) {
			// const filteredPosts = this.props.posts.filter((post) => {
			// 	console.log(post)
			// 	return post.title
			// 		? post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
			// 		: null || post.thumbnail_url
			// 			? post.thumbnail_url.toLowerCase().indexOf(search.toLowerCase()) !== -1
			// 			: null || post.description
			// 				? post.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
			// 				: null
			// })

			const posts = this.props.posts
				.map((post) => (
					<Post key={post.id}>
						<a href={post.post_url} target="_blank" rel="noopener noreferrer">
							<img src={post.thumbnail_url} alt="" />
						</a>
						<div className="post-content">
							<a href={post.post_url} target="_blank" rel="noopener noreferrer">
								<h1>{handleTruncateText(post.title, 9)}</h1>
							</a>
							<p>{handleTruncateText(post.description, 15)}</p>
							<a className="post-root-url" href={post.post_url} target="_blank" rel="noopener noreferrer">
								{post.root_url}
							</a>
							<div className="date-like-heart">
								<span className="formatted-date">
									{moment(post.created_at).fromNow() === 'a few seconds ago' ? (
										'just now'
									) : (
										<Moment fromNow>{post.created_at}</Moment>
									)}
								</span>

								<SharedButton bookmark={post} />
								<div className="delete-bookmark" onClick={() => this.handleDelete(post.id)}>
									<img src={deleteIcon} className="delete-icon" alt="delete icon" />
									<span className="del-span">Delete</span>
								</div>
							</div>
							<div className="edit-icon">
								<img
									src={editSvg}
									alt=""
									onClick={() => {
										handleModalOpen(post)
									}}
								/>
							</div>
						</div>
					</Post>
				))
				.reverse()
			return (
				<Wrapper>
					{modalOpen && <EditModal open={modalOpen} handleModalOpen={handleModalOpen} post={editPost} />}
					{posts}
				</Wrapper>
			)
		}

		if (this.props.posts.length === 0) {
			return (
				<HelpScreen imgSource={BookmarkSVG} headerText="Your saved courses and articles will be stored here." />
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.id,
		posts: state.posts,
		deletePost: state.deletePost,
		searchTerm: state.searchTerm
	}
}

export default connect(mapStateToProps, {
	getPosts,
	deletePost,
	getUserProfileDetails
})(Collections)

export const Wrapper = styled.div`
	// border: 1px solid blue;
	${customWrapper('100%', '0 auto')};
`

export const Post = styled.div`${customWrapper('100%', 'auto')} ${StyledBookmarks};`
