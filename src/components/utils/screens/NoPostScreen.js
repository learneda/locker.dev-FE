import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Container } from './HelpScreen';
import EmptyBoxSVG from '../../../assets/svg/empty-box-drawing.svg';

const NoPostScreen = ({ descriptionText }) => {
  return (
    <Container>
      <img src={EmptyBoxSVG} alt="Drawing" />
      <div className="prompt-text">
        <p>{descriptionText}</p>
      </div>
    </Container>
  );
};

export default NoPostScreen;
