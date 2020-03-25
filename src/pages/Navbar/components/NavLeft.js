import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import BrowseSVG from 'assets/react-svg/BrowseSVG'
import HomeSVG from 'assets/react-svg/HomeSVG'
import LockerSVG from 'assets/react-svg/Locker04SVG'

// Styles
import { primary } from '../../../styles/utils/colors'

const NavLeft = props => {
  const { location } = props

  return (
    <StyledNavLeft>
      <ul>
        <li>
          <NavLink exact to='/'>
            <HomeSVG active={location.pathname === '/'} />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/browse'>
            <BrowseSVG active={location.pathname.includes('browse')} />
            <span className='browse-span'>Browse</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/locker'>
            <LockerSVG active={location.pathname.includes('locker')} />
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
      padding: 0 10px;
      color: rgb(102, 117, 127);
      transition: border-bottom 0.3s ease;
      border-bottom: 3px solid transparent;
      &:hover {
        border-bottom: 3px solid ${primary};
      }
      @media (max-width: 650px) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      @media (max-width: 500px) {
        padding: 0 15px;
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
    color: ${primary};
    border-bottom: 3px solid ${primary};
  }
`
