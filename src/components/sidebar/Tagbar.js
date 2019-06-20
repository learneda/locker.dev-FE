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
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;

  h3 {
    background: #b8c1c8;
    border-bottom: 1px solid #989ea4;
    color: #fff;
    font: bold 18px/21px Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 2px 0 0 12px;
    position: -webkit-sticky;
    position: sticky;
    top: -1px;
  }
  .tag {
    padding: 0 0 0 12px;
    font: bold 20px/45px Helvetica, Arial, sans-serif;
    margin: 0;
  }
`
