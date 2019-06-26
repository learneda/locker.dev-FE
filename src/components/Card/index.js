import React from 'react'
import PropTypes from 'prop-types'
import { smartTruncate } from 'styles'
import { useMedia } from 'use-media'
import styled from 'styled-components'
import CoverBook from './CoverBook'
import CoverPodcast from './CoverPodcast'
import CoverVideo from './CoverVideo'
import AttributionBar from 'components/Bars/AttributionBar'
import ActionBar from 'containers/ActionBar'
import he from 'he'

const Card = props => {
  const { type, item } = props
  // showIframe only needed for videos
  const { showIframe } = props
  const isSingle = useMedia({ maxWidth: 820 })

  let insertItem

  switch (type) {
    case 'article':
      insertItem = {
        type,
        title: item.title,
        description: item.description,
        post_url: item.url,
        thumbnail_url: item.thumbnail,
      }
      break
    case 'course':
      const tempUrl = `https://www.udemy.com${item.url}`
      item.thumbnail = item.image_480x270
      item.description = item.headline
      insertItem = {
        type,
        title: item.title,
        description: item.headline,
        post_url: tempUrl,
        thumbnail_url: item.image_480x270,
      }
      break
    case 'book':
      item.url = item.link
      insertItem = {
        type,
        title: item.title,
        description: item.description,
        post_url: item.link,
        thumbnail_url: item.thumbnail,
      }
      break
    case 'video':
      item.title = he.decode(item.snippet.title)
      item.description = item.snippet.description
      item.post_url = `https://www.youtube.com/watch?v=${item.id.videoId}`
      item.url = item.post_url
      item.thumbnail_url = item.snippet.thumbnails.medium.url
      insertItem = {
        type,
        title: item.title,
        description: item.description,
        post_url: item.post_url,
        thumbnail_url: item.thumbnail_url,
      }
      break
    case 'podcast':
      item.title = item.title_original
      item.description = he.decode(item.description_original)
      item.url = item.audio
      item.thumbnail = item.image
      insertItem = {
        type,
        title: item.title,
        description: item.description,
        post_url: item.url,
        thumbnail_url: item.thumbnail,
      }
      break
    case 'locker':
      item.thumbnail = item.thumbnail_url
      item.url = item.post_url
      break
    default:
      return
  }

  const cropTitle = isSingle ? 100 : 80
  const cropDesc = isSingle ? 190 : 135

  return (
    <Container>
      {type === 'book' ? (
        <CoverBook item={item} />
      ) : type === 'podcast' ? (
        <CoverPodcast item={item} />
      ) : type === 'video' ? (
        <CoverVideo item={item} showIframe={showIframe} />
      ) : (
        <div className='card-cover'>
          <a href={item.url} target='_blank' rel='noopener noreferrer'>
            <img
              src={
                item.thumbnail || 'https://source.unsplash.com/random/345x180'
              }
              alt={`${type}-thumbnail`}
            />
          </a>
        </div>
      )}
      <div className='card-content'>
        <h3>{smartTruncate(item.title, cropTitle)}</h3>
        <p>{smartTruncate(item.description, cropDesc)}</p>
      </div>
      <div className='card-bar'>
        <AttributionBar url={item.url} />
        <ActionBar type={type} item={item} insertItem={insertItem} />
      </div>
    </Container>
  )
}

Card.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.shape({
    url: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  showIframe: PropTypes.func,
}

export default Card

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 358px;
  height: 360px;
  margin: 15px 20px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  @media (max-width: 820px) {
    width: 500px;
    height: 450px;
  }
  @media (max-width: 570px) {
    width: 100%;
  }
  .card-cover {
    img {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      width: 100%;
      height: 180px;
      object-fit: cover;
      @media (max-width: 820px) {
        height: 260px;
      }
    }
  }

  .card-content {
    height: 100%;
    h3 {
      color: rgb(51, 51, 51);
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 25px;
      max-height: 50px;
      overflow: hidden;
      word-break: break-word;
      padding: 6px 10px 0px;
    }
    p {
      padding: 10px 10px 5px;
      font-size: 1.4rem;
      line-height: 2rem;
      max-height: 7.2rem;
      overflow: hidden;
      letter-spacing: 1px;
      color: #6d767e;
    }
  }
  .card-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: absolute;
    bottom: 0px;
    height: 50px;
    width: 100%;
    margin-bottom: 4px;
    .card-attribution-bar {
      padding: 0 10px;
    }
  }
`
