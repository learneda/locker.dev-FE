import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Toggle from '../Toggle';

import { Container } from './HelpScreen';
import EmptyBoxSVG from '../../../assets/svg/empty-box-drawing.svg';

const NoPostScreen = ({ headerText, imgSource }) => {
  return (
    <Container>
      <img src={EmptyBoxSVG} alt="Drawing" />
      <div className="prompt-text">
        <h2>{headerText}</h2>
        <p>
          To get started, go to{' '}
          <Link to="/browse">
            <span class="browse-btn">Browse</span>
          </Link>{' '}
          to look around and find the latest courses and blogs or save your
          favorite link <Toggle buttonName="here" />.
        </p>
      </div>
    </Container>
  );
};

export default NoPostScreen;
