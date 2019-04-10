import React from 'react';
import { Button, Grommet } from 'grommet';
import { FormNextLink } from 'grommet-icons';
import styled from 'styled-components';
import { buttonBg } from '../../components/mixins';
import landingSVG from '../../assets/svg/landing.svg';
import bookmarkSVG from '../../assets/svg/bookmarks-drawing.svg';
import friendsSVG from '../../assets/svg/online_friends.svg';
import booksSVG from '../../assets/svg/reading-list-drawing.svg';
import videosSVG from '../../assets/svg/video-drawing.svg';
import shareSVG from '../../assets/svg/wall_post-drawing.svg';

const Body = () => {
  return (
    <Grommet theme={theme}>
      <CallToAction>
        <div className="landing-content">
          <h1>
            The exciting new <br /> way to learn.
          </h1>
          <Button
            className="get-started"
            primary
            label="Get Started for Free"
            icon={<FormNextLink />}
            reverse
          />
        </div>
        <div className="landing-img">
          <img className="landing-svg" src={landingSVG} alt="" />
        </div>
      </CallToAction>

      <StyledFeature textAlign="center">
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
};
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
`;

const CallToAction = styled.div`
  padding: 0px 0;
  display: grid;
 grid-template-columns: repeat(12, 1fr);
 grid-template-rows: repeat(12, 1fr);
 @media(max-width: 992px) {
   display: flex;
   flex-direction: column;
 }
}

  @media (max-width: 500px) {
    padding: 0px 0;
    .get-started {
      margin: auto;
      display: block;
    }
  }
  .landing-img {
    grid-column: 7 / span 12;
    grid-row: 1 / span 12;
  }
  .landing-content {
    grid-column: 1 / span 8;
    grid-row: 3 / span 8;
  }
  h1 {
    padding-bottom: 45px;
    font-size: 8rem;
    line-height: 8.5rem;
    font-weight: 700;
    // max-width: 70%;
    @media(max-width: 1250px) {
      font-size: 7rem;
    }
    @media (max-width: 500px) {
      font-size: 3.3rem;
      text-align: center;
      // margin: auto;
      line-height: 5rem;
      padding-bottom: 20px;
    }

  }
  .landing-svg {
    // position: absolute;
    // top: 0;
    // right: 0;

    // z-index: -1;
    width: 100%;
    // max-width: 800px;
    // max-height: 500px;
    // border: 1px solid red;
  }
}`;

export default Body;
