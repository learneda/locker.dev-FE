import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
const Footer = props => {
  return (
    <Container>
      <div className='top'>
        <div className='a'>&copy;2019 Locker About Help Terms</div>
        <div className='a'>Privacy Policy Cookies Ads Info Brand</div>
        <div className='a'>Blog Status Apps Jobs Marketing</div>
        <div>Businesses Developers</div>
      </div>
      <div className='bottom'>Contact Us</div>
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
    height: 90%;
    padding: 15px;
    border-bottom: 1px solid gray;
  }
  .bottom {
    height: 10%;
    margin: 0px 0px 22px 15px;
    padding-top: 12px;
    color: black;
  }
  .a {
    margin-bottom: 11px;
  }
`
