import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createCollection, postToFeed, deleteCollection } from 'actions'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import LockerSVG from 'assets/react-svg/Locker01SVG'
import ShareSVG from 'assets/react-svg/ShareSVG'
import MoreSVG from 'assets/react-svg/MoreSVG'
import DeleteSVG from 'assets/react-svg/DeleteSVG'

import PropTypes from 'prop-types'
import ShareModal from './ActionBarModal'
import DropDown from './DropDown'

const ActionBar = props => {
  const {
    type,
    item,
    insertItem,
    save,
    share,
    className,
    createCollection,
    authId,
    postToFeed,
    location,
    deleteCollection,
  } = props
  console.log(props, 'PROPS')
  const [saveActive, setSaveActive] = useState(false)
  const [shareActive, setShareActive] = useState(false)
  const [moreActive, setMoreActive] = useState(false)
  const [isSharingModal, setIsSharingModal] = useState(false)
  const [shareText, setShareText] = useState('Share')
  const [saveText, setSaveText] = useState('Save')
  const [dropDownActive, setDropDownActive] = useState(false)

  const saveToLocker = async () => {
    if (!insertItem.post_url) {
      insertItem.post_url = insertItem.url
    }
    await createCollection(insertItem)
  }

  const shareToFeed = async (thoughts, tags) => {
    // Locker component passes obj as item

    if (type === 'locker') {
      item.tags = tags
      item.user_thoughts = thoughts

      return await share(item)
    }
    // browse component passes obj as insertItem
    insertItem.tags = tags
    insertItem.user_thoughts = thoughts
    await share(insertItem)
  }

  //TODO: Clean logic
  const handleSaveClick = async () => {
    if (saveActive) {
      return
    }
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
    console.log('seting state ???', isSharingModal)
    setIsSharingModal(prev => !prev)
  }

  const handleSubmit = async (thoughts, tags) => {
    console.log('LAUNCHED SHARE')
    console.log(insertItem)
    setIsSharingModal(false)
    setShareText('Sharing')
    setShareActive(prev => !prev)
    await shareToFeed(thoughts, tags)

    if (shareActive) {
      setShareText('Share')
    } else {
      setShareText('Shared')
    }
  }

  const handleMore = async () => {
    setMoreActive(prev => !prev)
  }

  const handleSaveSvg = () => {
    // do not render saveSvg on locker route
    if (window.location.pathname.includes('locker')) return
    // on feed only render saveSvg when the post is not yours
    // on Browse user_id is undefined therefore condition is true & will render
    return (
      insertItem.user_id !== authId && (
        <div className='wrap-svg save' onClick={handleSaveClick}>
          <LockerSVG className='icon' active={saveActive} />
          <span className='label'>{saveText}</span>
        </div>
      )
    )
  }

  const showMore = () => {
    return location.pathname === '/' || location.pathname.includes('/tag')
  }

  const showDelete = () => {
    return location.pathname.includes('/locker')
  }

  return (
    <StyledActionBar
      className={className}
      saveActive={saveActive}
      shareActive={shareActive}
    >
      {window.location.pathname !== '/' && (
        <div className='wrap-svg share' onClick={handleShareClick}>
          <ShareSVG className='icon' active={shareActive} />
          {/* modal should be placed here :) */}
          <span className='label'>{shareText}</span>
        </div>
      )}
      <ShareModal
        handleSubmit={handleSubmit}
        setIsActive={handleShareClick}
        isActive={isSharingModal}
      />
      {handleSaveSvg()}

      {showMore() && (
        <div
          className='wrap-svg more'
          onMouseEnter={() => {
            handleMore()
            setDropDownActive(prev => !prev)
          }}
          onMouseLeave={() => {
            handleMore()
            setDropDownActive(prev => !prev)
          }}
        >
          <MoreSVG className='icon' active={moreActive} />
          <span className='label'>Menu</span>
          <DropDown
            className='DropDown'
            isActive={dropDownActive}
            authId={authId}
            userId={insertItem.user_id}
            username={insertItem.username}
          />
        </div>
      )}
      {showDelete() && (
        <div
          onClick={() => deleteCollection(item.id)}
          className='wrap-svg delete'
        >
          <DeleteSVG className='icon' />
          <span className='label'>Delete</span>
        </div>
      )}
    </StyledActionBar>
  )
}

ActionBar.propTypes = {}

const mapStateToProps = ({ auth }) => ({
  authId: auth.id,
})

export default connect(
  mapStateToProps,
  { createCollection, postToFeed, deleteCollection }
)(withRouter(ActionBar))

const StyledActionBar = styled.div`
  font-size: 1.2rem;
  display: flex;
  height: 46px;
  .wrap-svg {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    cursor: ${props => (props.saveActive ? 'default' : 'pointer')};
    width: 60px;
    transition: 0.1s ease-in-out;
    &:hover {
      color: dodgerblue;
    }
  }
  .delete {
    &:hover {
      color: red;
    }
    #delete-svg {
      fill: currentColor;
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
