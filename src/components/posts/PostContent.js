import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { smartTruncate } from 'styles'

import styled from 'styled-components'

const PostContent = ({ post }) => {
  return (
    <>
      <Container>
        <a href={post.url} target='_blank' rel='noopener noreferrer'>
          <h2>{smartTruncate(post.title, 100)}</h2>
        </a>
        <p>{smartTruncate(post.description, 180)}</p>
      </Container>
      <TagBar>
        {post.tags.map((tag, index) => {
          return (
            <Link key={index} className='tag' to={`/tag/${tag.hashtag}`}>{`#${
              tag.hashtag
            }`}</Link>
          )
        })}
      </TagBar>
    </>
  )
}

PostContent.propTypes = {}

export default PostContent

const Container = styled.div`
  padding: 15px;
  h2 {
    overflow: hidden;
    margin-bottom: 10px;
    font-size: 2.2rem;
    line-height: 2.6rem;
    letter-spacing: 0.5px;
    transition: 100ms ease;
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
  padding: 15px;
  display: flex;
  align-items: center;
  overflow: hidden;
  .tag {
    font-size: 1.6rem;
    letter-spacing: 1.5px;
    padding-right: 10px;
    transition: color 0.2s ease;
    &:hover {
      color: dodgerblue;
    }
  }
`
