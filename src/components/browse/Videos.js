import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ReactComponent as Loading } from '../../assets/svg/circles.svg'
import { ReactComponent as Add } from '../../assets/svg/add-icon.svg'
import { useAlert } from 'react-alert'
import { useThrottle } from 'use-throttle'
import { customLayout, smartTruncate } from '../mixins'
import ScrollToTopOnMount from 'components/utils/ScrollToTopOnMount'

const Videos = props => {
  const {
    videos,
    searchTerm,
    videoPageToken,
    fetchMoreVideos,
    searchVideos,
    setVideoPageToken,
    handleSaveMedia,
    showIframe,
    resetIframe,
  } = props
  const alert = useAlert()
  const [isLoading, setIsLoading] = useState(false)
  const [didMount, setDidMount] = useState(false)
  const throttledSearch = useThrottle(searchTerm, 1000)

  useEffect(() => {
    const asyncSearchVideos = async () => {
      //* Don't send videoPageToken on initial search query
      await searchVideos(searchTerm)
      setIsLoading(false)
    }
    if (didMount) {
      setIsLoading(true)
      asyncSearchVideos()
    } else {
      resetIframe()
    }
    setDidMount(true)
  }, [throttledSearch])

  const hasMore = !Boolean(searchTerm) || Boolean(videos.length)

  const renderLoader = () => (
    <Loader>
      <Loading />
    </Loader>
  )

  const renderVideos = () => (
    <>
      <ScrollToTopOnMount />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchMoreVideos}
        hasMore={hasMore}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {videos.map((video, index) => (
          <Card key={video.id.videoId}>
            <div
              style={{
                overflow: 'hidden',
                paddingTop: '56.25%',
                position: 'relative',
                backgroundImage: `url(${video.snippet.thumbnails.medium.url})`,
                backgroundRepeat: 'norepeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {video.isThumbnail ? (
                <img
                  onClick={() => showIframe(video.id.videoId)}
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.title}
                />
              ) : (
                <iframe
                  style={{
                    border: '0px',
                    height: '100%',
                    left: '0px',
                    position: 'absolute',
                    top: '0px',
                    width: '100%',
                  }}
                  frameBorder='0'
                  width='560'
                  height='315'
                  title={video.title}
                  src={`https://www.youtube.com/embed/${
                    video.id.videoId
                  }?autoplay=1`}
                  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              )}
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <h3 style={{ marginTop: '20px' }}>
                {smartTruncate(video.snippet.title, 75)}
              </h3>
              <p>{smartTruncate(video.snippet.description, 80)}</p>
            </a>
            <SaveIcon>
              <Add
                className='save-icon'
                onClick={() => {
                  handleSaveMedia({
                    type: 'video',
                    post_url: `https://www.youtube.com/watch?v=${
                      video.id.videoId
                    }`,
                    title: video.snippet.title,
                    description: video.snippet.description,
                    thumbnail_url: video.snippet.thumbnails.medium.url,
                  })
                  alert.success('Article added to Collections')
                }}
              />
            </SaveIcon>
          </Card>
        ))}
      </InfiniteScroll>
    </>
  )

  return <Cards>{isLoading ? renderLoader() : renderVideos()}</Cards>
}

export default Videos

const Loader = styled.div`
  margin: 75px auto;
  text-align: center;
`
const Cards = styled.div`
  ${customLayout('space-between')}
  flex-wrap: wrap;
  width: 100%;
  margin-top: -12px;
  @media (max-width: 768px) {
    margin: -12px auto 0;
  }
`
const Card = styled.div`
  position: relative;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  width: 22%;
  height: 350px;
  margin-bottom: 30px;
  background-color: #fff;
  cursor: pointer;
  @media (max-width: 1500px) {
    width: 30%;
  }
  @media (max-width: 960px) {
    width: 45%;
  }
  @media (max-width: 570px) {
    width: 100%;
  }
  a {
    &:hover {
      h3 {
        text-decoration: underline;
      }
    }
  }
  img {
    border: 0px;
    height: 100%;
    left: 0px;
    position: absolute;
    top: 0px;
    width: 100%;
  }
  h3 {
    max-height: 50px;
    margin: 10px 0;
    padding: 0 3%;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 25px;
    word-break: break-word;
    overflow: hidden;
  }
  p {
    padding: 0 4%;
    height: 60px;
    font-size: 1.5rem;
    line-height: 20px;
    color: #6d767e;
    overflow: hidden;
  }
`
const SaveIcon = styled.div`
  position: absolute;
  right: 15px;
  bottom: 10px;
  opacity: 0.8;
  transition: 200ms ease-out;
  &:hover {
    opacity: 1;
    transition: 200ms ease-in;
  }
`
