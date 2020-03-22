import React from 'react'
import styled from 'styled-components'
import FooterSvg from 'assets/react-svg/FooterSVG'

const Footer = () => {
  return (
    <Container>
      <div className='top'>
        <div className='a'>&copy;2019 locker.dev About Help Terms</div>
        <div className='a'>Privacy Cookies Funding Status</div>
        <div className='a'>Blog Developers Code Suggestions</div>
      </div>
      <div className='bottom'>
        <FooterSvg />
        <div>Contact Us</div>
      </div>
    </Container>
  )
}

export default Footer

const Container = styled.section`
  position: sticky;
  top: 485px;
  width: 100%;
  border: 1px solid powderblue;
  z-index: 1;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1px;
  color: #657786;
  .top {
    height: 75%;
    padding: 15px 15px;
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
    &:last-child:
    margin-bottom: 0px;
  }
  svg {
    height: 13px;
    margin: 1px 0;
  }
`
