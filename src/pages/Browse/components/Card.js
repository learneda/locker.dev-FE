import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAlert } from 'react-alert'
import LockerSVG from './Locker01SVG'
import { smartTruncate } from 'components/mixins'
import { useMedia } from 'use-media'
import styled from 'styled-components'

const Card = props => {
  const { item, type, createCollection } = props
  const alert = useAlert()
  const isSingle = useMedia({ maxWidth: 820 })
  const [saveActive, setSaveActive] = useState(false)
  const [saveText, setSaveText] = useState('Save')
  const saveToLocker = async () => {
    await createCollection({
      type,
      post_url: item.url,
      title: item.title,
      description: item.description,
      thumbnail_url: item.thumbnail,
    })
    alert.success(
      `${type.slice(0, 1).toUpperCase() + type.slice(1)} added to Locker`
    )
  }

  //TODO: Clean logic
  const handleClick = async () => {
    setSaveText('Saving')
    setSaveActive(prev => !prev)
    await saveToLocker()
    if (saveActive) {
      setSaveText('Save')
    } else {
      setSaveText('Saved')
    }
  }
  const cropTitle = isSingle ? 100 : 80
  const cropDesc = isSingle ? 190 : 135

  return (
    <Container>
      <div className='card-cover'>
        <a href={item.url} target='_blank' rel='noopener noreferrer'>
          <img
            src={item.thumbnail || 'https://source.unsplash.com/random/345x180'}
            alt={`${type}-thumbnail`}
          />
        </a>
      </div>
      <div className='card-content'>
        <h3>{smartTruncate(item.title, cropTitle)}</h3>
        <p>{smartTruncate(item.description, cropDesc)}</p>
      </div>
      <div className='card-bar'>
        <div className='card-info-bar'>InfoBar</div>
        <div className='card-action-bar'>
          <div className='wrap-save' onClick={handleClick}>
            <LockerSVG className='save-icon' active={saveActive} />
            <span
              style={{ color: saveActive ? 'dodgerblue' : 'black' }}
              className='save-label'
            >
              {saveText}
            </span>
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
      .wrap-save {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 70px;
        transition: 1s ease-in-out;
      }
      .save-label {
        font-weight: 600;
        padding-top: 2px;
      }
    }
  }
`
