import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import BrowseSVG from 'assets/react-svg/BrowseSVG'
import HomeSVG from 'assets/react-svg/HomeSVG'
import Bell from 'containers/Bell'

const NavLeft = props => {
  const { location } = props
  const [homeColor, setHomeColor] = useState('black')
  const [browseColor, setBrowseColor] = useState('black')
  const [bellColor, setBellColor] = useState('black')

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setHomeColor('dodgerblue')
        setBrowseColor('black')
        setBellColor('black')
        break
      case '/browse':
        setHomeColor('black')
        setBrowseColor('dodgerblue')
        setBellColor('black')
        break
      case '/notifications':
        setHomeColor('black')
        setBrowseColor('black')
        setBellColor('dodgerblue')
        break
      default:
        setHomeColor('black')
        setBrowseColor('black')
        setBellColor('black')
    }
  }, [location.pathname])

  return (
    <StyledNavLeft>
      <ul>
        <li>
          <NavLink exact to='/'>
            <HomeSVG homeColor={homeColor} />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/browse'>
            <BrowseSVG browseColor={browseColor} />
            <span className='browse-span'>Browse</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/notifications'>
            <Bell bellColor={bellColor} />
            <span>Notifications</span>
          </NavLink>
        </li>
      </ul>
    </StyledNavLeft>
  )
}

export default withRouter(NavLeft)

NavLeft.propTypes = {
  location: PropTypes.object.isRequired,
}

const StyledNavLeft = styled.div`
  width: 330px;
  height: 100%;
  ul {
    height: 100%;
    display: flex;
    a {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      position: relative;
      border: none;
      border-bottom: 3px solid transparent;
      transition: all 0.3s ease;
      padding: 0 10px;
      color: rgb(102, 117, 127);
      &:hover {
        border-bottom: 3px solid dodgerblue;
      }
      span {
        margin-left: 5px;
        font-size: 1.3rem;
        line-height: 1.3rem;
        font-weight: bold;
        letter-spacing: 1px;
      }
    }
  }
  @media (max-width: 900px) {
    width: 150px;
    a {
      width: 50px;
      padding: 0;
    }
    span {
      display: none;
    }
  }
  .active {
    color: dodgerblue;
    border-bottom: 3px solid dodgerblue;
  }
`
