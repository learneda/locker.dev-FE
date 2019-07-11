import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import BrowseSVG from 'assets/react-svg/BrowseSVG'
import HomeSVG from 'assets/react-svg/HomeSVG'
import LockerSVG from 'assets/react-svg/Locker04SVG'
// import Bell from 'containers/Bell'

const NavLeft = props => {
  const { location } = props
  const [homeColor, setHomeColor] = useState('black')
  const [browseColor, setBrowseColor] = useState('black')
  const [lockerColor, setLockerColor] = useState(false)

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setHomeColor('dodgerblue')
        setBrowseColor('black')
        setLockerColor(false)
        break
      case '/browse':
        setHomeColor('black')
        setBrowseColor('dodgerblue')
        setLockerColor(false)
        break
      case '/locker':
        setHomeColor('black')
        setBrowseColor('black')
        setLockerColor(true)
        break
      default:
        setHomeColor('black')
        setBrowseColor('black')
        setLockerColor(false)
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
          <NavLink to='/locker'>
            <LockerSVG active={lockerColor} />
            <span>Locker</span>
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
  height: 100%;
  ul {
    height: 100%;
    display: flex;
    a {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      border-bottom: 3px solid transparent;
      transition: all 0.3s ease;
      padding: 0 10px;
      color: rgb(102, 117, 127);
      &:hover {
        border-bottom: 3px solid dodgerblue;
      }
      @media (max-width: 650px) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      span {
        margin-left: 5px;
        font-size: 1.3rem;
        line-height: 1.3rem;
        font-weight: bold;
        letter-spacing: 1px;
        @media (max-width: 650px) {
          margin-left: 0px;
        }
        @media (max-width: 500px) {
          display: none;
        }
      }
    }
  }
  .active {
    color: dodgerblue;
    border-bottom: 3px solid dodgerblue;
  }
`
