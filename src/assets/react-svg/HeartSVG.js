import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const HeartSVG = ({ active }) => {
  const color = active ? '#e94856' : 'black'
  return (
    <Wrapper>
      {/* <svg
        version='1.0'
        xmlns='http://www.w3.org/2000/svg'
        width='20.000000pt'
        height='20.000000pt'
        viewBox='0 0 512.000000 512.000000'
        preserveAspectRatio='xMidYMid meet'
      >
        <metadata>
          Created by potrace 1.15, written by Peter Selinger 2001-2017
        </metadata>
        <g
          // transform='translate(0.000000,354.000000) scale(0.100000,-0.100000)'
          fill={color}
          stroke='none'
        >
          <path d='M349.6 64c-36.4 0-70.7 16.7-93.6 43.9C233.1 80.7 198.8 64 162.4 64 97.9 64 48 114.2 48 179.1c0 79.5 70.7 143.3 177.8 241.7L256 448l30.2-27.2C393.3 322.4 464 258.6 464 179.1 464 114.2 414.1 64 349.6 64zm-80.8 329.3l-4.2 3.9-8.6 7.8-8.6-7.8-4.2-3.9c-50.4-46.3-94-86.3-122.7-122-28-34.7-40.4-63.1-40.4-92.2 0-22.9 8.4-43.9 23.7-59.3 15.2-15.4 36-23.8 58.6-23.8 26.1 0 52 12.2 69.1 32.5l24.5 29.1 24.5-29.1c17.1-20.4 43-32.5 69.1-32.5 22.6 0 43.4 8.4 58.7 23.8 15.3 15.4 23.7 36.5 23.7 59.3 0 29-12.5 57.5-40.4 92.2-28.8 35.7-72.3 75.7-122.8 122z' />
        </g>
      </svg> */}
    </Wrapper>
  )
}

HeartSVG.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default HeartSVG

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  background: url('https://cssanimation.rocks/images/posts/steps/heart.png')
    no-repeat;
  background-position: 0 0;
  cursor: pointer;
  transition: background-position 1s steps(28);
  transition-duration: 0s;
`
