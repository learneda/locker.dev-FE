import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CoverPodcast = ({ item }) => {
  const [isImage, setIsImage] = useState(true)

  return (
    <Container url={item.image}>
      <div className='cover-blur' />
      {isImage ? (
        <img
          onClick={() => setIsImage(prev => !prev)}
          className='cover-image'
          src={item.image}
          alt='podcast-thumbnail'
        />
      ) : (
        <>
          <audio className='cover-audio' src={item.audio} controls>
            Your browser does not support the <code>audio</code> element.
          </audio>
          <button
            onClick={() => setIsImage(prev => !prev)}
            className='cover-button'
          >
            close
          </button>
        </>
      )}
    </Container>
  )
}

CoverPodcast.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
  }).isRequired,
}

export default CoverPodcast

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  overflow: hidden;
  min-height: 180px;
  @media (max-width: 820px) {
    min-height: 260px;
    width: 500px;
  }
  @media (max-width: 570px) {
    width: 100%;
  }
  .cover-blur {
    height: 180px;
    position: relative;
    background-image: url(${props => props.url});
    background0repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(1.5rem);
    @media (max-width: 820px) {
      height: 260px;
    }
  }
  .cover-image {
    position: absolute;
    width: 150px;
    height: 150px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  .cover-audio {
    position: absolute;
    height: 50px;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .cover-button {
    position: absolute;
    display: inline-block;
    width: 50px;
    height: 20px;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
`
