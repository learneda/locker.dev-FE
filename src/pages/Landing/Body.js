import React from 'react';
import { Button, Grommet } from 'grommet';
import { FormNextLink } from 'grommet-icons';
import styled from 'styled-components';
import { buttonBg } from '../../components/mixins';
import landingSVG from '../../assets/svg/landing.svg';

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
    font-size: 7rem;
    line-height: 8.5rem;
    font-weight: 700;
    // max-width: 70%;
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


}


`;

const Body = () => {
  return (
    <Grommet theme={theme}>
      <CallToAction>
        <div className="landing-content">
          <h1>
            The exciting new way <br /> to learn.
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
    </Grommet>
  );
};

export default Body;
