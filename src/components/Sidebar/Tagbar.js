import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Styles
import { primary } from '../../styles/utils/colors'

const Tagbar = props => {
  const { topTags, myTags } = props
  return (
    <Container>
      <h3>My Tags</h3>
      {myTags.map((tag, index) => {
        return (
          <div className='tag' key={index}>
            <Link to={`tag/${tag.hashtag}`}>#{tag.hashtag}</Link>
            <br />
          </div>
        )
      })}
      <h3>Top Tags</h3>
      {topTags.map((tag, index) => {
        return (
          <div className='tag' key={index}>
            <Link to={`tag/${tag.hashtag}`}>#{tag.hashtag}</Link>
            <br />
          </div>
        )
      })}
    </Container>
  )
}

export default Tagbar

Tagbar.propTypes = {
  topTags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      hashtag: PropTypes.string,
    })
  ).isRequired,
  myTags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      hashtag: PropTypes.string,
    })
  ).isRequired,
}

const Container = styled.section`
  height: 350px;
  width: 100%;
  position: sticky;
  top: 300px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid lightgrey;
  background: #fff;
  h3 {
    background: #e8f4fb;
    border-bottom: 1px solid #989ea4;
    color: #fff;
    padding: 4px 12px;
    color: #14171a;
    font-size: 1.6rem;
    letter-spacing: 2px;
    line-height: 2.4rem;
  }
  .tag {
    font-size: 1.5rem;
    letter-spacing: 0.8px;
    padding: 10px 15px;
    font-weight: normal;
    transition: color 300ms ease;
    a {
      cursor: pointer;
      &:hover {
        color: ${primary};
      }
    }
  }
`
