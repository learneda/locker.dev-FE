import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAlert } from 'react-alert'
import LockerSVG from './Locker01SVG'
import ShareSVG from './ShareSVG'
import { smartTruncate } from 'components/mixins'
import { useMedia } from 'use-media'
import styled from 'styled-components'
import CoverBook from './CoverBook'
import CoverPodcast from './CoverPodcast'
import he from 'he'

const Card = props => {
  const { item, type, save, share } = props
  const alert = useAlert()
  const isSingle = useMedia({ maxWidth: 820 })
  const [saveActive, setSaveActive] = useState(false)
  const [shareActive, setShareActive] = useState(false)
  const [shareText, setShareText] = useState('Share')
  const [saveText, setSaveText] = useState('Save')

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
      item.url = `https://www.udemy.com${item.url}`
      item.thumbnail = item.image_480x270
      item.description = item.headline

      insertItem = {
        type,
        title: item.title,
        description: item.headline,
        post_url: `https://www.udemy.com${item.url}`,
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
    case 'podcast':
      item.title = item.title_original
      item.description = he.decode(item.description_original)
      item.url = item.link
      item.thumbnail = item.image
      insertItem = {
        type,
        title: item.title_original,
        description: item.description,
        post_url: item.link,
        thumbnail_url: item.thumbnail,
      }
      break
    default:
      return
  }

  const saveToLocker = async () => {
    await save(insertItem)
    alert.success(
      `${type.slice(0, 1).toUpperCase() + type.slice(1)} added to Locker`
    )
  }

  const shareToFeed = async () => {
    await share(insertItem)
    alert.success(
      `${type.slice(0, 1).toUpperCase() + type.slice(1)} shared to Feed`
    )
  }

  //TODO: Clean logic
  const handleSaveClick = async () => {
    setSaveText('Saving')
    setSaveActive(prev => !prev)
    await saveToLocker()
    if (saveActive) {
      setSaveText('Save')
    } else {
      setSaveText('Saved')
    }
  }

  const handleShareClick = async () => {
    setShareText('Sharing')
    setShareActive(prev => !prev)
    await shareToFeed()

    if (shareActive) {
      setShareText('Share')
    } else {
      setShareText('Shared')
    }
  }
  const cropTitle = isSingle ? 100 : 80
  const cropDesc = isSingle ? 190 : 135

  return (
    <Container saveActive={saveActive} shareActive={shareActive}>
      {type === 'book' ? (
        <CoverBook item={item} />
      ) : type === 'podcast' ? (
        <CoverPodcast item={item} />
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
        <div className='card-info-bar'>InfoBar</div>
        <div className='card-action-bar'>
          <div className='wrap-svg share' onClick={handleShareClick}>
            <ShareSVG className='icon' active={shareActive} />
            <span className='label'>{shareText}</span>
          </div>
          <div className='wrap-svg save' onClick={handleSaveClick}>
            <LockerSVG className='icon' active={saveActive} />
            <span className='label'>{saveText}</span>
          </div>
        </div>
      </div>
    </Container>
  )
}

Card.propTypes = {}

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
      line-height: 20px;
      max-height: 72px;
      overflow: hidden;
      letter-spacing: 1px;
      color: #6d767e;
    }
  }
  .card-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0px;
    height: 50px;
    width: 100%;
    .card-info-bar {
      padding: 0 10px;
    }
    .card-action-bar {
      font-size: 1.2rem;
      display: flex;
      .wrap-svg {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 70px;
        transition: 0.3s ease-in-out;
        &:hover {
          color: dodgerblue;
        }
      }
      .save {
        color: ${props => (props.saveActive ? 'dodgerblue' : 'black')};
      }
      .share {
        color: ${props => (props.shareActive ? 'dodgerblue' : 'black')};
      }
      .label {
        font-weight: 600;
        padding-top: 2px;
      }
    }
  }
`
