import React, { useRef } from 'react';
import styled from 'styled-components';
import { Button, Grommet } from 'grommet';

import { buttonBg } from '../../components/mixins';
import bookmarkSVG from '../../assets/svg/bookmarks-drawing.svg';
import friendsSVG from '../../assets/svg/online_friends.svg';
import booksSVG from '../../assets/svg/reading-list-drawing.svg';
import videosSVG from '../../assets/svg/video-drawing.svg';
import shareSVG from '../../assets/svg/wall_post-drawing.svg';
import landingVideo from '../../assets/video/landing.mp4';
import browser from '../../assets/img/browser.png';
import downIcon from '../../assets/svg/down-icon.svg';

export default function Body() {
  const downArrow = useRef();
  const handleClick = () =>
    downArrow.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <Grommet theme={theme}>
      <CallToAction>
        <div className="landing-content">
          <h1>The exciting new way to learn.</h1>
          <Button
            className="get-started"
            primary
            label="Find Out More"
            // icon={<LinkDown />}
            reverse
          />
        </div>
        <div className="landing-img">
          {/* <img className="landing-svg" src={landingSVG} alt="" /> */}
          <img src={browser} alt="" />
          <video
            className="landing-video"
            src={landingVideo}
            autoPlay
            muted
            loop
          />
        </div>
        <img
          src={downIcon}
          className="down-arrow"
          alt="arrow facing downwards"
          onClick={handleClick}
        />
      </CallToAction>

      <StyledFeature textAlign="center" ref={downArrow}>
        <StyledFeatureTitle marginBottom="100px">
          Keep Track of Your Learning
        </StyledFeatureTitle>
        <img src={bookmarkSVG} alt="" />
      </StyledFeature>

      <StyledFeature textAlign="center">
        <StyledFeatureTitle marginBottom="60px">
          See What your Friends Are Learning
        </StyledFeatureTitle>
        <img src={friendsSVG} alt="" />
      </StyledFeature>
      <StyledFeaturesContainer>
        <div className="feature-card">
          <h4>Keep track of your favorite books</h4>
          <img src={booksSVG} alt="" />
        </div>
        <div className="feature-card">
          <h4>Keep track of your favorite videos</h4>
          <img src={videosSVG} alt="" />
        </div>
        <div className="feature-card">
          <h4>Share the best resources with your friends</h4>
          <img src={shareSVG} alt="" />
        </div>
      </StyledFeaturesContainer>
    </Grommet>
  );
}
const StyledFeature = styled.div`
  text-align: ${props => props.textAlign};
  padding: 100px 0;
  h3 {
    font-size: 5rem;
    font-weight: 500;
    margin-bottom: ${props => props.marginBottom}px;
  }
  img {
    width: 100%;
  }
`;
const StyledFeatureTitle = styled.h3`
  font-size: 5rem;
  font-weight: 500;
  margin-bottom: ${props => props.marginBottom};
`;
const theme = {
  button: {
    padding: {
      vertical: '20px'
    },
    border: {
      radius: '5px',
      color: buttonBg
    },
    primary: {
      color: buttonBg
    }
  }
};

const StyledFeaturesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 100px;
  .feature-card {
    // max-width: 0px;
    width: 32%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 15px;
    padding: 10px;
  }
  img {
    width: 200px;
  }
  h4 {
    font-size: 2.6rem;
    max-width: 80%;
    text-align: center;
    margin: 20px 0;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    .feature-card {
      width: 100%;
      margin-bottom: 15px;
    }
  }
`;

const CallToAction = styled.div`
  min-height: 100vh;
  padding: 0px 0;
  display: flex;
  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid red; */
  }

  .landing-img {
    width: 50%;
    @media (max-width: 992px) {
      width: 80%;
    }
  }

  .landing-content {
    width: 60%;
    margin-top: 50px;
    margin-right: 10px;
    @media (max-width: 992px) {
      margin: 20px 0 40px;
      width: 80%;
      .get-started {
        vertical-align: bottom;
        margin-left: 20px;
      }
    }
  }

  h1 {
    padding-bottom: 45px;
    font-size: 8rem;
    line-height: 8.5rem;
    font-weight: 700;
    @media (max-width: 1450px) {
      font-size: 7rem;
    }
    @media (max-width: 1250px) {
      font-size: 6.5rem;
    }
    @media (max-width: 992px) {
      display: inline;
    }
    @media (max-width: 500px) {
      font-size: 3.3rem;
      text-align: center;
      line-height: 5rem;
      padding-bottom: 20px;
    }
  }

  .landing-video {
    width: 100%;
    border: 3px solid #fff;
    position: relative;
  }
  .landing-img img {
    width: 100%;
    margin-bottom: -7px;
  }
  .down-arrow {
    position: absolute;
    bottom: 20px;
    width: 50px;
    left: 50%;
    transform: translateX(50%);
    animation: bounce 2s infinite;
    cursor: pointer;
  }
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;
