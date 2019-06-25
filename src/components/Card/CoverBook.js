import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CoverBook = ({ item }) => {
  if (!item.thumbnail) {
    item.thumbnail = 'https://source.unsplash.com/random/128x190'
  }
  return (
    <Container url={item.thumbnail}>
      <div className='cover-blur' />
      <img className='cover-image' alt={item.title} src={item.thumbnail} />
    </Container>
  )
}

CoverBook.propTypes = {
  item: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export default CoverBook
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 358px;
  min-height: 180px;
  overflow: hidden;
  @media (max-width: 820px) {
    min-height: 260px;
    width: 500px;
  }
  @media (max-width: 570px) {
    width: 100%;
  }
  .cover-blur {
    height: 180px;
    width: 100%;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url(${props => props.url});
    filter: blur(1.5rem);
    @media (max-width: 820px) {
      height: 260px;
    }
  }
  .cover-image {
    position: absolute;
    transform: scale(0.85);
    @media (max-width: 820px) {
      transform: scale(1.2);
    }
  }
`
