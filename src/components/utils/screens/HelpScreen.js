import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddLink from '../AddLink';

import { customWrapper } from '../../mixins';
import NotFoundSVG from '../../../assets/svg/not-found-drawing.svg';

const HelpScreen = ({ headerText, imgSource }) => {
  return (
    <Container>
      <img src={imgSource ? imgSource : NotFoundSVG} alt="Drawing" />
      <div className="prompt-text">
        <h2>{headerText}</h2>
        <div>
          To get started, go to{' '}
          <Link to="/browse">
            <span className="browse-btn">Browse</span>
          </Link>{' '}
          to look around and find the latest courses and blogs or save your
          favorite link <AddLink buttonName="here" />.

        </div>
      </div>
    </Container>
  );
};

export const Container = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  ${customWrapper('80%', '0 auto')}
  border-radius: 5px;
  padding: 20px 0;
  background-color: white;
  text-align: center;

  img {
    width: 35%;
    height: 100px;
    margin: 15px 0;
  }

  .prompt-text {
    border-top: 1px solid #efefef;
    padding: 20px 25px;

    h2 {
      margin-bottom: 15px;
      font-size: 1.8rem;
      font-weight: 700;
    }

    div {
      diplay: inline-block
      font-size: 1.6rem;
      div {
        display: inline-block;
        color: #3f65f2;
        transition: 150ms ease-in;
        cursor: pointer;
        &:hover {
          color: #2544c7;
        }
    }


    .browse-btn {
      color: #3f65f2;
      transition: 150ms ease-in;
      cursor: pointer;

      &:hover {
        color: #2544c7;
      }
    }
  }
`;

export default HelpScreen;
