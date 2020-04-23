import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as Settings } from 'assets/svg/settings2.svg'
import { ReactComponent as Logout } from 'assets/svg/logout2.svg'
import { authURL } from 'services'
import useOnClickOutside from 'use-onclickoutside'

// Styles
import { primary, bgHover } from '../../../styles/utils/colors'

const ProfileDropDown = props => {
  const { user } = props
  const ref = useRef()
  const [toggle, set] = useState(false)
  useOnClickOutside(ref, e => {
    if (e.target.className === 'auth-icon') {
      return
    }
    set(!toggle)
  })

  return (
    <Container>
      {user.username && (
        <img
          style={
            toggle
              ? { border: `1px solid ${primary}` }
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
          ref={ref}
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

ProfileDropDown.propTypes = {
  user: PropTypes.object.isRequired,
}
const Container = styled.div`
  position: relative;
  img {
    width: 35px;
    height: 35px;
    margin-left: 20px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
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
  border: 1px solid ${primary};
  li {
    height: 40px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: ${bgHover};
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
