import React, { useState } from 'react'
import styled from 'styled-components'
// import { useAlert } from 'react-alert'
import LockerSVG from './Locker01SVG'
import ShareSVG from './ShareSVG'
import MoreSVG from 'assets/react-svg/MoreSVG'
import PropTypes from 'prop-types'

const CardActionBar = props => {
  const { type, item, insertItem, save, share } = props
  // const alert = useAlert()
  const [saveActive, setSaveActive] = useState(false)
  const [shareActive, setShareActive] = useState(false)
  const [moreActive, setMoreActive] = useState(false)
  const [shareText, setShareText] = useState('Share')
  const [saveText, setSaveText] = useState('Save')

  const saveToLocker = async () => {
    await save(insertItem)
    // alert.success(
    //   `${type.slice(0, 1).toUpperCase() + type.slice(1)} added to Locker`
    // )
  }

  const shareToFeed = async () => {
    await share(insertItem)
    // alert.success(
    //   `${type.slice(0, 1).toUpperCase() + type.slice(1)} shared to Feed`
    // )
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

  const handleMore = async () => {
    setMoreActive(prev => !prev)
  }

  return (
    <StyledActionBar saveActive={saveActive} shareActive={shareActive}>
      <div className='wrap-svg share' onClick={handleShareClick}>
        <ShareSVG className='icon' active={shareActive} />
        <span className='label'>{shareText}</span>
      </div>
      <div className='wrap-svg save' onClick={handleSaveClick}>
        <LockerSVG className='icon' active={saveActive} />
        <span className='label'>{saveText}</span>
      </div>
      <div
        className='wrap-svg more'
        onMouseEnter={handleMore}
        onMouseLeave={handleMore}
      >
        <MoreSVG className='icon' active={moreActive} />
        <span className='label'>Menu</span>
      </div>
    </StyledActionBar>
  )
}

CardActionBar.propTypes = {}

export default CardActionBar

const StyledActionBar = styled.div`
  font-size: 1.2rem;
  display: flex;
  height: 40px;
  overflow: hidden;
  .wrap-svg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 60px;
    transition: 0.1s ease-in-out;
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
`
