import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as Settings } from '../../assets/svg/settings.svg'
import { ReactComponent as Logout } from '../../assets/svg/logout.svg'
import { authURL } from '../../services/authURL'

const DropDown = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  font-weight: 500;
  padding: 10px 10px 0 10px;
  position: absolute;
  right: 10%;
  top: 66px;
  width: 110px;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
`

export default function ProfileDropDown({ auth }) {
  const [toggle, set] = useState(false)
  const node = useRef()

  const handleClick = useCallback(() => set(state => !state), [])

  const handleRefClick = e => {
    if (node.current.contains(e.target)) {
      return
    }
    set(false)
  }

  useEffect(() => {
    console.log('addingEventListenerOnBookmarks!')
    document.addEventListener('mousedown', handleRefClick)
    return () => {
      console.log('removingEventListener!')

      document.removeEventListener('mousedown', handleRefClick)
    }
  }, [])

  return (
    <div ref={node}>
      <img
        src={auth.profile_picture}
        className="auth-icon"
        alt="avatar"
        onClick={handleClick}
      />
      {toggle && (
        <DropDown>
          <li>
            <Link to="/settings">
              <Settings
                style={{ width: '24px', height: '24px', paddingRight: '9px' }}
              />
            </Link>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <a href={`${authURL}logout`}>
              <Logout
                style={{ width: '24px', height: '24px', paddingRight: '9px' }}
              />
            </a>
            <a href={`${authURL}logout`}>Logout</a>
          </li>
        </DropDown>
      )}
    </div>
  )
}
