import React from 'react';
import { Button } from 'grommet';
import { FormNextLink } from 'grommet-icons';
import styled from 'styled-components';

const CallToAction = styled.h1`
  padding-top: 90px;
  h1 {
    font-size: 7rem;
    line-height: 8.5rem;
    font-weight: 700;
  }
`;

const Body = () => {
  return (
    <div>
      <CallToAction>
        <h1>Lorem ipsum dolor sit amet, consectetur elit</h1>
      </CallToAction>
      <Button label="Get Started for Free" icon={<FormNextLink />} />
    </div>
  );
};

export default Body;
