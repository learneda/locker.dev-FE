import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CoverVideo = ({ item, showIframe }) => {
  return (
    <Container url={item.snippet.thumbnails.medium.url}>
      {item.isThumbnail ? (
        <img
          className='video-image'
          onClick={() => showIframe(item.id.videoId)}
          src={item.snippet.thumbnails.medium.url}
          alt={item.title}
        />
      ) : (
        <iframe
          className='i-frame'
          frameBorder='0'
          title={item.title}
          src={`https://www.youtube.com/embed/${item.id.videoId}?autoplay=1`}
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      )}
    </Container>
  )
}

CoverVideo.propTypes = {
  item: PropTypes.shape({
    isThumbnail: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
  }).isRequired,
  showIframe: PropTypes.func.isRequired,
}

export default CoverVideo

const Container = styled.div`
  position: relative;
  min-height: 180px;
  width: 358px;
  overflow: hidden;
  @media (max-width: 820px) {
    min-height: 260px;
    width: 500px;
  }
  @media (max-width: 570px) {
    width: 100%;
  }
  .video-image {
    width: 100%;
    height: 100%;
  }
  .i-frame {
    width: 100%;
    height: 100%;
    border: 0px;
  }
`
