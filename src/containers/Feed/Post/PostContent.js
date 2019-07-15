import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { smartTruncate } from 'styles'

import styled from 'styled-components'

const PostContent = props => {
  const { post } = props
  return (
    <Fragment>
      <Container>
        <a href={post.url} target='_blank' rel='noopener noreferrer'>
          <h2>{smartTruncate(post.title, 100)}</h2>
        </a>
        <p>{smartTruncate(post.description, 180)}</p>
      </Container>
      {!!post.tags.length && (
        <TagBar>
          {post.tags.map((tag, index) => {
            return (
              <Link key={index} className='tag' to={`/tag/${tag.hashtag}`}>{`#${
                tag.hashtag
              }`}</Link>
            )
          })}
        </TagBar>
      )}
    </Fragment>
  )
}

export default PostContent

PostContent.propTypes = {
  posts: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        hashtag: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
}

const Container = styled.div`
  padding: 15px;
  h2 {
    overflow: hidden;
    margin-bottom: 10px;
    font-size: 2.2rem;
    line-height: 2.6rem;
    letter-spacing: 0.5px;
    transition: color 300ms ease;
    &:hover {
      color: dodgerblue;
    }
  }
  p {
    line-height: 1.3;
    opacity: 0.9;
    letter-spacing: 0.5px;
  }
`

const TagBar = styled.div`
  padding: 0 15px 10px;
  display: flex;
  align-items: center;
  overflow: hidden;
  .tag {
    font-size: 1.6rem;
    letter-spacing: 1.5px;
    padding-right: 10px;
    transition: color 0.3s ease;
    &:hover {
      color: dodgerblue;
    }
  }
`
