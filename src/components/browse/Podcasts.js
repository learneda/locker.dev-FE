import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import listenAPI from '../../apis/listen'
import styled from 'styled-components'
import { customLayout, smartTruncate } from '../mixins'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ReactComponent as Loading } from '../../assets/svg/circles.svg'
import { ReactComponent as Add } from '../../assets/svg/add-icon.svg'
import { useThrottle } from 'use-throttle'

import he from 'he'

const Podcasts = ({ search, handleSaveMedia, alert }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [podcasts, setPodcasts] = useState([])
  const [offset, setOffset] = useState(null)
  const throttledSearch = useThrottle(search, 1000)

  const fetchMorePodcasts = () => {
    listenAPI
      .get('/search', {
        params: {
          q: search || 'react',
          offset,
        },
      })
      .then(res => {
        setPodcasts(prevPodcasts => [...prevPodcasts, ...res.data.results])
        setOffset(res.data.next_offset)
      })
  }

  useEffect(() => {
    setIsLoading(true)
    fetchPodcasts(search)
  }, [throttledSearch])

  const fetchPodcasts = query => {
    listenAPI
      .get('/search', {
        params: {
          q: query || 'react',
        },
      })
      .then(res => {
        setPodcasts(res.data.results)
        setOffset(res.data.next_offset)
        setIsLoading(false)
      })
  }

  const renderLoader = () => (
    <Loader>
      <Loading />
    </Loader>
  )

  const renderPodcasts = () => (
    <InfiniteScroll
      dataLength={podcasts.length}
      next={fetchMorePodcasts}
      hasMore={true}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {podcasts.map(podcast => (
        <Card key={podcast.id}>
          <a href={podcast.audio} target='_blank' rel='noopener noreferrer'>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '190px',
                  position: 'relative',
                  backgroundImage: `url(${podcast.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: `blur(1.5rem)`,
                }}
              />
              <img
                style={{
                  display: 'inline-block',
                  width: '150px',
                  height: '150px',
                  alignSelf: 'center',
                  justifySelf: 'center',
                  position: 'absolute',
                  top: '20px',
                }}
                src={podcast.image}
                alt='youtube'
              />
            </div>
            <h3>{smartTruncate(podcast.title_original, 75)}</h3>
            <p>{smartTruncate(he.decode(podcast.description_original), 120)}</p>
          </a>
          <SaveIcon>
            <Add
              className='save-icon'
              onClick={() => {
                handleSaveMedia({
                  type: 'podcast',
                  post_url: podcast.audio,
                  title: podcast.title_original,
                  description: he.decode(podcast.description_original),
                  thumbnail_url: podcast.image,
                })
                alert.success('Article added to Bookmarks')
              }}
            />
          </SaveIcon>
        </Card>
      ))}
    </InfiniteScroll>
  )
  return <Cards>{isLoading ? renderLoader() : renderPodcasts()}</Cards>
}

const mapStateToProps = ({ searchTerm }) => ({
  search: searchTerm,
})

export default connect(
  mapStateToProps,
  null
)(Podcasts)

const Loader = styled.div`
  margin: 75px auto;
  text-align: center;
`

const Cards = styled.div`
  border-top: 1px solid #bdbdbd;
  ${customLayout('space-between')}
  flex-wrap: wrap;
  width: 100%;
  margin: 0 6px;
  margin-top: -12px;
  padding: 40px 0;
  @media (max-width: 768px) {
    margin: -12px auto 0;
  }
`

const Card = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  width: 22%;
  height: 350px;
  margin-bottom: 30px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
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
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 100%;
    height: 180px;
    object-fit: contain;
  }

  h3 {
    // border: 1px solid red;
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
  // border: 1px solid red;
  /* ${customLayout('flex-end')} */
  position: absolute;
  bottom: 10px;
  right: 15px;
  opacity: 0.8;
  transition: 200ms ease-out;
  &:hover {
    opacity: 1;
    transition: 200ms ease-in;
  }
`
