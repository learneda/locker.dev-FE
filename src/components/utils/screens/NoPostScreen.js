import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Container } from './HelpScreen';
import EmptyBoxSVG from '../../../assets/svg/empty-box-drawing.svg';

const NoPostScreen = ({ textDescription }) => {
  return (
    <Container>
      <img src={EmptyBoxSVG} alt="Drawing" />
      <div className="prompt-text">
        <p>{textDescription}</p>
      </div>
    </Container>
  );
};

export default NoPostScreen;
