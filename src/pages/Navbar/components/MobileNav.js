import React from 'react'
import { Link } from 'react-router-dom'
import { authURL } from 'services'
import styled from 'styled-components'
import closeIcon from 'assets/svg/close.svg'
import { customLayout } from 'styles'

const MobileNav = ({ handleClose, show }) => {
  const showHideClassName = show
    ? 'burger display-block'
    : 'burger display-none'

  return (
    <BurgerMenu>
      <div className={showHideClassName}>
        <div className='close-btn'>
          <img
            src={closeIcon}
            alt='close-icon'
            onClick={handleClose}
            className='close-icon'
          />
        </div>
        <ul className='burger-main'>
          <li onClick={handleClose}>
            <Link to='/'>
              <div>Home</div>
            </Link>
          </li>
          <li onClick={handleClose}>
            <Link to='/browse'>
              <div>Browse</div>
            </Link>
          </li>
          <li onClick={handleClose}>
            <Link to='/social'>
              <div>Social</div>
            </Link>
          </li>
          <li onClick={handleClose}>
            <Link to='/settings'>
              <div>Settings</div>
            </Link>
          </li>
          <li>
            <a href={`${authURL}/logout`}>Log Out</a>
          </li>
        </ul>
      </div>
    </BurgerMenu>
  )
}

export default MobileNav

const BurgerMenu = styled.div`
  // min-height: 100vh;

  .burger {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: #fff;
    z-index: 10;

    animation: fadeBackground 200ms;

    @keyframes fadeBackground {
      from {
        background-color: transparent;
      }
      to {
        background-color: #fff;
      }
    }
  }

  .close-btn {
    ${customLayout('flex-end')}
    // border: 1px solid red;
    padding: 20px 8%;

    .close-icon {
      width: 25px;
      height: 25px;
      cursor: pointer;
      opacity: 0.7;
      transition: 200ms ease-in;

      &:hover {
        opacity: 1;
        transition: 200ms ease-in;
      }
    }
  }

  .burger-main {
    ${customLayout('center', 'center')}
    flex-wrap: wrap;
    margin: 20px 0;

    li {
      width: 100%;
      padding: 20px 0;
      text-align: center;
      font-size: 3rem;
      opacity: 0.8;
      transition: 200ms ease-in;

      &:hover {
        opacity: 1;
        transition: 200ms ease-in;
        background-color: #e6e8f3;
      }
    }
  }
`
