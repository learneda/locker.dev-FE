import React from 'react';
import { Button, Grommet } from 'grommet';
import { FormNextLink } from 'grommet-icons';
import styled from 'styled-components';
import { buttonBg } from '../../components/mixins';

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
  padding: 90px 0;
  @media (max-width: 900px) {
    padding: 0px 0;
  }
  h1 {
    padding-bottom: 45px;
    font-size: 7rem;
    line-height: 8.5rem;
    font-weight: 700;
    @media (max-width: 900px) {
      font-size: 3.3rem;
      text-align: center;
      margin: auto;
      line-height: 5rem;
      padding-bottom: 20px;
    }
  }
`;

const Body = () => {
  return (
    <Grommet theme={theme}>
      <CallToAction>
        <h1>Lorem ipsum dolor sit amet, consectetur elit</h1>
        <Button
          primary
          label="Get Started for Free"
          icon={<FormNextLink />}
          reverse
        />
      </CallToAction>
    </Grommet>
  );
};

export default Body;
