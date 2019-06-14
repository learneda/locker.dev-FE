import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import newsvg from 'assets/svg/new.svg'
import developerSVG from 'assets/svg/developer.svg'
import videosSVG from 'assets/svg/youtube2.svg'
import shareSVG from 'assets/svg/sharenew.svg'
import landingVideo from 'assets/video/landing.mp4'
import browser from 'assets/img/browser.png'
import downIcon from 'assets/svg/down-icon.svg'
import learnLocker from 'assets/svg/learnlocker.svg'
function Body(props) {
  const { authModalToggle, modalSignUp } = props

  return (
    <CallToAction>
      <div className='cta' style={{ display: 'flex' }}>
        <div
          style={{
            height: '500px',
            width: '50%',
            display: 'flex',
            padding: '150px 100px',
            lineHeight: '4rem',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'white',
            position: 'relative',
            overflow: 'hidden',
            fontSize: '2.4rem',
            fontWeight: 'bold',
            color: 'white',
            borderRadius: '50px 100px',
          }}
        >
          <img
            style={{
              position: 'absolute',
              left: '110px',
              top: '70px',
              transform: `scale(1.4) rotate(-45deg)`,
              objectFit: 'cover',
            }}
            src={learnLocker}
            alt='logo'
          />
        </div>
        <StyledFeature
          style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 auto',
            textAlign: 'center ',
          }}
        >
          <StyledFeatureTitle>
            See What your Friends Are Learning
          </StyledFeatureTitle>
          <img src={newsvg} alt='friends' />
          <button className='button-cta'>Get Started!</button>
        </StyledFeature>
      </div>
      <StyledFeaturesContainer>
        <div className='feature-card'>
          <h4>Share the best resources with your friends</h4>
          <div className='svg-container'>
            <img src={shareSVG} alt='share' />
          </div>
        </div>
        <div className='feature-card'>
          <h4>Keep it green.</h4>
          <div className='svg-container'>
            <img src={developerSVG} alt='books' />
          </div>
        </div>
        <div className='feature-card'>
          <h4>Save your favorites to your locker!</h4>
          <div className='svg-container'>
            <img src={videosSVG} alt='videos' />
          </div>
        </div>
      </StyledFeaturesContainer>

      <Footer>
        <nav>
          <Link to='#'>Privacy</Link>
          <Link to='#'>Terms of Use</Link>
          <Link to='#'>Cookies</Link>
          <Link to='#'>Help</Link>
          <Link>&copy; 2019 locker.dev</Link>
        </nav>
      </Footer>
    </CallToAction>
  )
}

export default Body

const CallToAction = styled.div`
  .cta {
    margin-top: 10px;
  }
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 50px);
  .button-cta {
    height: 60px;
    width: 70%;
    margin: 70px auto 0;
    border: 1px solid #1da1f2;
    font-size: 1.8rem;
    color: white;
    border-radius: 100px;
    line-height: 20px;
    background: #1da1f2;
    transition: all 300ms ease-out;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    &:hover {
      cursor: pointer;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      transform: translateY(-1px) scale(1.02);
    }
  }
  h1 {
    padding-bottom: 45px;
    font-size: 8rem;
    line-height: 8.5rem;
    font-weight: 700;
  }
`

const StyledFeature = styled.div`
  padding: 40px 0;
  display: flex;
  align-items: center;
  img {
    width: 90%;
  }
  h2 {
    margin-bottom: 40px;
    font-size: 4rem;
    font-weight: 700;
    line-height: 50px;
  }
  .create-acct-btn {
    font-size: 2.5rem;
    cursor: pointer;
  }
`

const StyledFeatureTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 3.5rem;
  margin-bottom: 50px;
  color: #14171a;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin-bottom: ${props => props.marginBottom};
`

const StyledFeaturesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 0 3.5%;
  .feature-card {
    display: flex;
    flex-direction: column;
    width: 325px;
    padding: 5px 0;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.16), 0 0 3px rgba(0, 0, 0, 0.23);
  }
  h4 {
    font-size: 2rem;
    max-width: 80%;
    text-align: center;
    margin: 10px 0;
    color: #14171a;
  }
  .svg-container {
    height: 160px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`

const Footer = styled.footer`
  width: 100%;
  border-top: 1px solid #e6ecf0;
  font-size: 1.2rem;
  background: #fefefe;
  padding: 15px 0;
  nav {
    display: flex;
    justify-content: center;
    a {
      color: #aab8c2;
      cursor: pointer;
      padding: 0 20px;
    }
  }
`
