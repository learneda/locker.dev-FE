import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as Settings } from 'assets/svg/settings.svg'
import { ReactComponent as Logout } from 'assets/svg/logout.svg'
import { authURL } from 'services'

const ProfileDropDown = ({ user }) => {
  const [toggle, set] = useState(false)

  return (
    <Container>
      {user && (
        <img
          style={
            toggle
              ? { border: '1px solid dodgerblue' }
              : { border: '1px solid transparent' }
          }
          src={user.profile_picture}
          className='auth-icon'
          alt='avatar'
          onClick={() => {
            set(prevToggle => !prevToggle)
          }}
        />
      )}
      {toggle && (
        <DropDown
          onClick={() => {
            set(prevToggle => !prevToggle)
          }}
        >
          <li>
            <Link to='/settings'>
              <Settings />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <a href={`${authURL}/logout`}>
              <Logout />
              <span>Logout</span>
            </a>
          </li>
        </DropDown>
      )}
    </Container>
  )
}

export default ProfileDropDown

const Container = styled.div`
  position: relative;
  img {
    width: 35px;
    height: 35px;
    margin-left: 20px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;

    /* &:hover {
      border: 2px solid dodgerblue;
    } */
  }
`

const DropDown = styled.ul`
  display: flex;
  position: absolute;
  width: 150px;
  top: 48px;
  right: 0px;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  font-weight: 500;
  border: 1px solid dodgerblue;
  li {
    height: 40px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #e8f4fb;
    }
    a {
      letter-spacing: 1px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  svg {
    width: 18px;
    height: 18px;
    margin: 0 10px;
  }
`
