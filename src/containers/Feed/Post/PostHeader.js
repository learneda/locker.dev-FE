import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { AttributionBar } from 'components/Bars'
import { smartTruncate } from 'styles'
import { useMedia } from 'use-media'
import styled from 'styled-components'

const PostHeader = props => {
  const isLarge = useMedia({ minWidth: 580 })
  const isMobile = useMedia({ maxWidth: 500 })

  const cropText = isLarge ? 170 : isMobile ? 80 : 140
  const { className, post } = props
  return (
    <Container isMobile={isMobile}>
      {!isMobile && (
        <Link to={`/profile/${post.user_id}`} className='post-header-left'>
          <img
            className='post-avatar'
            src={`${post.profile_picture}`}
            alt='avatar'
          />
        </Link>
      )}
      <div class='right'>
        <div className='post-header-right-top'>
          <div className='post-header-middle'>
            <Link to={`/profile/${post.user_id}`} className='post-user-info'>
              <span className='post-display-name'>{post.display_name}</span>
              <span className='post-username'>
                {!isMobile ? `@${post.username}` : null}
              </span>
              {!isMobile && <span>&#183;</span>}
              {!isMobile && (
                <Moment className='post-date' fromNow>
                  {post.posted_at_date}
                </Moment>
              )}
            </Link>
          </div>
          <div className='post-header-right'>
            <StyledAttributionBar className={className} url={post.url} />
          </div>
        </div>
        <p className='post-thought'>
          {smartTruncate(post.user_thoughts, cropText)}
        </p>
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
  position: relative;
  padding-left: ${({ isMobile }) => (isMobile ? '10px' : null)};
  .post-header-left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85px;
    height: 100%;
    padding: 10px;
    .post-avatar {
      width: 66px;
      height: 66px;
      border-radius: 50%;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    height: 35%;
    width: 500px;
  }
  .post-header-right-top {
    display: flex;
    justify-content: space-between;
  }
  .post-header-middle {
    position: relative;
    flex-wrap: nowrap;
    display: flex;
    align-items: center;
    .post-user-info {
      color: #657786;
      font-size: 1.2rem;
      .post-display-name {
        font-size: 1.3rem;
        font-weight: 700;
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
  }
  .post-header-right {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
  .post-thought {
    height: 65%;
    font-size: 1.6rem;
    letter-spacing: 0.5px;
    line-height: 2rem;
    hyphens: auto;
    padding-right: ${({ isMobile }) => (isMobile ? '10px' : '20px')};
    padding-bottom: 8px;
  }
`

const StyledAttributionBar = styled(AttributionBar)`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 0;
  padding-right: 10px;
  height: 30px;
`
