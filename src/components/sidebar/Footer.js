import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FooterSvg from './footerSVG'

const Footer = props => {
  return (
    <Container>
      <div className='top'>
        <div className='a'>&copy;2019 Locker About Help Terms</div>
        <div className='a'>Privacy Policy Cookies Ads Info Brand</div>
        <div className='a'>Blog Status Apps Jobs Marketing</div>
        <div>Businesses Developers</div>
      </div>
      <div className='bottom'>
        <FooterSvg />
        <div>Contact Us</div>
      </div>
    </Container>
  )
}

Footer.propTypes = {}

export default Footer

const Container = styled.section`
  position: sticky;
  top: 485px;
  left: 0px;
  height: 150px;
  width: 100%;
  border: 1px solid powderblue;
  z-index: 1;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1px;
  color: #657786;
  .top {
    height: 75%;
    padding: 15px 15px 0 15px;
    border-bottom: 1px solid gray;
  }
  .bottom {
    padding: 11px;
    color: black;
    display: flex;
    align-items: center;
    font-size: 13px;
  }
  .a {
    margin-bottom: 11px;
  }
  svg {
    height: 13px;
    margin: 1px 0;
  }
`
