import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AddLink from 'containers/AddLink'
import NotFoundSVG from 'assets/svg/not-found-drawing.svg'

const HelpScreen = ({ headerText, bodyText, imgSource }) => {
  return (
    <Container>
      <img src={imgSource ? imgSource : NotFoundSVG} alt='Drawing' />
      <div className='prompt-text'>
        <h2>{headerText}</h2>
        <div>
          To get started, go to{' '}
          <Link to='/browse'>
            <span className='browse-btn'>Browse</span>
          </Link>{' '}
          to look around and find the latest learning resources or save your
          favorite link{' '}
          <div className='add-link-wrapper'>
            <AddLink />
          </div>
        </div>
      </div>
    </Container>
  )
}

export const Container = styled.div`
  position: relative;
  border: 1px solid powderblue;
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
      letter-spacing: 1.2px;
    }

    div {
      display: inline-block;
      font-size: 1.6rem;
      text-align: left;
      letter-spacing: 0.8px;
      line-height: 2.4rem;
      div {
        display: inline-block;
        color: #3f65f2;
        transition: 150ms ease-in;
        cursor: pointer;
        &:hover {
          color: #2544c7;
        }
      }
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

  .add-link-wrapper {
    position: relative;
    top: 5px;
    left: -15px;
  }
`

export default HelpScreen
