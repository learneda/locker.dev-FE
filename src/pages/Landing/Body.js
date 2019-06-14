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
            height: `calc((100vh - 100px)/1.66)`,
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '50px 50px',
            transformOrigin: 'center',
          }}
        >
          <img
            style={{
              position: 'absolute',
              left: '100px',
              top: '-90px',
              transform: `scale(1.0) rotate(-45deg)`,
            
            }}
            src={learnLocker}
            alt='logo'
          />
        </div>
        <StyledFeature
          style={{
            width: '50%',
            height: `calc((100vh - 100px)/1.66)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
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
    </CallToAction>
  )
}

export default Body

const CallToAction = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  padding: 4vh 2vw;
  min-height: calc(100vh - 100px);
  .button-cta {
    height: 50px;
    width: 56%;
    border: 1px solid #1da1f2;
    font-size: 1.8rem;
    color: white;
    border-radius: 20px;
    letter-spacing: 4px;
    line-height: 20px;
    background: #1da1f2;
    transition: all 300ms ease-out;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    &:hover {
      cursor: pointer;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      transform: translateY(-1px) scale(1.02);
      border: 1px solid dodgerblue;

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
    width: 50%;
  display: flex;
flex-direction: colum;
            align-items: center;
            justify-content: space-around;
            margin: 0 auto;
            text-align: center ;
  img {
    width: 90%;
 
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
  color: #14171a;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`

const StyledFeaturesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  padding: 0 3.0%;
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
    height: calc((100vh - 90px)/6);
  }
  img {
    width: 100%;
    height: 100%;
  }
`

