import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { AttributionBar } from 'components/Bars'
import styled from 'styled-components'

const PostHeader = props => {
  const { className, post } = props
  return (
    <Container>
      <Link to={`/profile/${post.user_id}`} className='post-header-left'>
        <img
          className='post-avatar'
          src={`${post.profile_picture}`}
          alt='avatar'
        />
      </Link>
      <div className='post-header-middle'>
        <Link to={`/profile/${post.user_id}`} className='post-user-info'>
          <span className='post-display-name'>{post.display_name}</span>
          <span className='post-username'>{`@${post.username}`}</span>
          <span>&#183;</span>
          <Moment className='post-date' fromNow>
            {post.posted_at_date}
          </Moment>
        </Link>
        <p className='post-thought'>{post.user_thoughts}</p>
      </div>
      <div className='post-header-right'>
        <div className='post-root-url'>
          <StyledAttributionBar className={className} url={post.url} />
        </div>
      </div>
    </Container>
  )
}

PostHeader.propTypes = {
  className: PropTypes.string,
  post: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    profile_picture: PropTypes.string.isRequired,
    display_name: PropTypes.string,
    username: PropTypes.string.isRequired,
    //? Why is posted_at_date a string
    posted_at_date: PropTypes.string.isRequired,
    user_thoughts: PropTypes.string,
    url: PropTypes.string.isRequired,
  }),
}

export default PostHeader

const Container = styled.div`
  display: flex;
  height: 100px;
  border-bottom: 1px solid #e6ecf0;
  position: relative;
  .post-header-left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    .post-avatar {
      position: relative;
      top: 4px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }

  .post-header-middle {
    display: flex;
    position: relative;
    top: 5px;
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 340px;
    .post-user-info {
      color: #657786;
      font-size: 1.2rem;
      padding: 8px 0px 5px;
      .post-display-name {
        font-size: 1.3rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        color: #14171a;
      }
      .post-username {
        margin: 0px 6px;
      }
      .post-date {
        margin-left: 6px;
      }
    }
    .post-thought {
      font-size: 1.6rem;
      letter-spacing: 0.5px;
      line-height: 2rem;
      word-break: break-all;
    }
  }

  .post-header-right {
    position: relative;
    top: 5px;
    right: 10px;
    height: 100%;
    justify-self: flex-end;
    flex-grow: 1;
  }
`

const StyledAttributionBar = styled(AttributionBar)`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 0;
  padding-right: 8px;
  height: 30px;
`
