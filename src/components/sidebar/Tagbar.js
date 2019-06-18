import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Tagbar = ({ topTags }) => {
  return (
    <Container>
      <h3>Top Tags</h3>
      {topTags.map(tag => {
        return (
          <div key={tag.id}>
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
  height: 420px;
  width: 290px;
  border: 1px solid dodgerblue;
  position: sticky;
  top: 310px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  h3 {
    align-self: center;
  }
  @media (max-width: 910px) {
    display: none;
  }
`
