import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Tagbar = ({ topTags, myTags }) => {
  return (
    <Container>
      <h3>My Tags</h3>
      {myTags.map(tag => {
        return (
          <div className='tag' key={tag.id}>
            <Link to={`tag/${tag.hashtag}`}>#{tag.hashtag}</Link>
            <br />
          </div>
        )
      })}
      <h3>Top Tags</h3>
      {topTags.map(tag => {
        return (
          <div className='tag' key={tag.id}>
            <Link to={`tag/${tag.hashtag}`}>#{tag.hashtag}</Link>
            <br />
          </div>
        )
      })}
    </Container>
  )
}

Tagbar.propTypes = {}

export default Tagbar

const Container = styled.section`
  height: 350px;
  width: 100%;
  position: sticky;
  top: 300px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid powderblue;
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
  /* border-radius: 5px; */
  background: #fff;
  h3 {
    background: #b8c1c8;
    border-bottom: 1px solid #989ea4;
    color: #fff;
    margin: 0;
    padding: 2px 0 0 12px;
    position: sticky;
    color: #14171a;
    font-size: 1.8rem;
    letter-spacing: 2px;
    line-height: 2.4rem;
  }
  .tag {
    padding: 10px 15px;
    margin: 0;
    font-size: 1.6rem;
    letter-spacing: 0.8px;
    font-weight: normal;
  }
`
