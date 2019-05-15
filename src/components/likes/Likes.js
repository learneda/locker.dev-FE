import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import NoPostScreen from '../utils/screens/NoPostScreen'
import HelpScreen from '../utils/screens/HelpScreen'
import LoveItSVG from '../../assets/svg/love-it-drawing.svg'

import { truncateText } from '../mixins'
import { Wrapper, Post } from '../bookmarks'
import { fetchUser, fetchLocker } from '../../actions'

import axios from 'axios'
axios.defaults.withCredentials = true

class Likes extends Component {
	componentDidMount = () => {
		this.props.fetchUser()

		this.props.fetchLocker()
		console.log(this.props.locker)
	}

	handleTruncateText = (content, limit = 10) => {
		return truncateText(content, limit)
	}

	render() {
		let path = this.props.location.pathname
		let likedPostsById = []
		let likedPosts = []

		if (path.includes('profile')) {
			// Filter liked posts for other users
			likedPostsById = this.props.likedPosts.filter((post) => post.user_id === Number(this.props.match.params.id))

			// If user doesn't have liked posts
			if (likedPostsById.length === 0) {
				return <NoPostScreen textDescription="No courses or articles have been recommended yet." />
			}

			likedPosts = likedPostsById
				.map((post) => <SinglePost key={post.id} post={post} handleTruncateText={this.handleTruncateText} />)
				.reverse()
		} else {
			// Filter liked posts for the logged in user
			// likedPostsById = this.props.likedPosts.filter(
			//   post => post.user_id === this.props.auth.id
			// );

			// If user doesn't have liked posts
			if (this.props.likedPosts.length === 0) {
				return (
					<HelpScreen
						imgSource={LoveItSVG}
						headerText="Your recommended courses and articles will be stored here."
					/>
				)
			}

			likedPosts = this.props.likedPosts
				.map((post) => <SinglePost key={post.id} post={post} handleTruncateText={this.handleTruncateText} />)
				.reverse()
		}

		return (
			<Wrapper>
				{this.props.locker.map((obj) => {
					return <div>{obj.resolved_title}</div>
				})}
			</Wrapper>
		)
	}
}
const mapStateToProps = ({ likedPosts, auth, locker }) => ({ likedPosts, auth, locker })

export default withRouter(connect(mapStateToProps, { fetchUser, fetchLocker })(Likes))

// Extracted single post in a stateless component
const SinglePost = ({ post, handleTruncateText }) => {
	return (
		<Post key={post.id}>
			<a href={post.post_url} target="_blank" rel="noopener noreferrer">
				<img src={post.thumbnail_url} alt="" />
			</a>
			<div className="post-content">
				<a href={post.post_url} target="_blank" rel="noopener noreferrer">
					<h1>{handleTruncateText(post.title)}</h1>
				</a>
				<p>{handleTruncateText(post.description, 15)}</p>
				<div className="date-like-heart">
					<span className="formatted-date">
						Added <Moment fromNow>{post.created_at}</Moment>
					</span>
				</div>
			</div>
		</Post>
	)
}
