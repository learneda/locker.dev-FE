import React, { useRef } from 'react';
import styled from 'styled-components';
import { Button, Grommet } from 'grommet';

import { buttonBg } from '../../components/mixins';
import friendsSVG from '../../assets/svg/online_friends.svg';
import booksSVG from '../../assets/svg/reading-list-drawing.svg';
import videosSVG from '../../assets/svg/video-drawing.svg';
import shareSVG from '../../assets/svg/wall_post-drawing.svg';
import landingVideo from '../../assets/video/landing.mp4';
import browser from '../../assets/img/browser.png';
import downIcon from '../../assets/svg/down-icon.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authModalToggle, modalSignUp } from '../../actions/index';
import {
  Feature,
  FeatureTitle,
  FeaturesContainer,
  StyledCallToAction,
  StyledFooter,
} from './StyledBody';

function Body(props) {
  const { authModalToggle, modalSignUp } = props;
  const scrollDown = useRef();
  const handleClick = () =>
    scrollDown.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <Grommet theme={theme}>
      <CallToAction>
        <div className="landing-content">
          <h1>The exciting new way to learn.</h1>
          <Button
            className="get-started"
            primary
            label="Find Out More"
            onClick={handleClick}
            reverse
          />
        </div>
        <div className="landing-img">
          <img src={browser} alt="browser top section" />
          <video
            className="landing-video"
            src={landingVideo}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <img
          src={downIcon}
          className="down-arrow"
          alt="arrow facing downwards"
          onClick={handleClick}
        />
      </CallToAction>
      <StyledFeature textAlign="center" ref={scrollDown}>
        <StyledFeatureTitle marginBottom="60px">
          See What your Friends Are Learning
        </StyledFeatureTitle>
        <img src={friendsSVG} alt="friends" />
      </StyledFeature>
      <StyledFeaturesContainer>
        <div className="feature-card">
          <h4>Keep track of your favorite books</h4>
          <img src={booksSVG} alt="books" />
        </div>
        <div className="feature-card">
          <h4>Keep track of your favorite videos</h4>
          <img src={videosSVG} alt="videos" />
        </div>
        <div className="feature-card">
          <h4>Share the best resources with your friends</h4>
          <img src={shareSVG} alt="share" />
        </div>
      </StyledFeaturesContainer>
      <StyledFeature textAlign="center">
        <div className="try-learnlocker">
          <h2>Try LearnLocker for Free</h2>
          <Button
            className="create-acct-btn"
            primary
            label="Create an Account"
            reverse
            onClick={() => {
              authModalToggle();
              modalSignUp();
            }}
          />
        </div>
      </StyledFeature>
      <Footer>
        <div className="footer-links">
          <nav>
            <Link to="#">Privacy</Link>
            <Link to="#">Terms of Use</Link>
            <Link to="#">Cookies</Link>
            <Link to="#">Help</Link>
          </nav>
        </div>

        <div className="copyright-text">
          <p>&copy; 2019 LearnLocker, Inc.</p>
        </div>
      </Footer>
    </Grommet>
  );
}

export default connect(
  null,
  { authModalToggle, modalSignUp }
)(Body);

const StyledFeature = styled.div`
  text-align: ${props => props.textAlign};
  ${Feature}
`;

const StyledFeatureTitle = styled.h3`
  ${FeatureTitle}
  margin-bottom: ${props => props.marginBottom};
`;

const theme = {
  button: {
    padding: {
      vertical: '20px',
    },
    border: {
      radius: '5px',
      color: buttonBg,
    },
    primary: {
      color: buttonBg,
    },
  },
};

const StyledFeaturesContainer = styled.div`
  ${FeaturesContainer}
`;

const CallToAction = styled.div`
  ${StyledCallToAction}
`;

const Footer = styled.footer`
  ${StyledFooter}
`;
