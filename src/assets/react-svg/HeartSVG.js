import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const HeartSVG = ({ active }) => {
  const color = active ? '#e94856' : 'dodgerblue'
  const fill = active ? color : 'none'
  const stroke = active ? '#e94856' : 'dodgerblue'

  // Conditionally render heart outline svg vs heart fill depending on active status
  const dAttrib = active
    ? 'M256,448a32,32,0,0,1-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63,114.52,98.46,64,159.08,64c44.08,0,74.61,24.83,92.39,45.51a6,6,0,0,0,9.06,0C278.31,88.81,308.84,64,352.92,64,413.54,64,463.37,114.52,464,176.64c.54,54.21-18.63,104.26-58.61,153-18.77,22.87-52.8,59.45-131.39,112.8A32,32,0,0,1,256,448Z'
    : 'M352.92,80C288,80,256,144,256,144s-32-64-96.92-64C106.32,80,64.54,124.14,64,176.81c-1.1,109.33,86.73,187.08,183,252.42a16,16,0,0,0,18,0c96.26-65.34,184.09-143.09,183-252.42C447.46,124.14,405.68,80,352.92,80Z'
  return (
    <Wrapper>
      <svg
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
          fill={fill}
          stroke={stroke}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='32px'
        >
          <path d={dAttrib} />
        </g>
      </svg>
    </Wrapper>
  )
}

HeartSVG.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default HeartSVG

const Wrapper = styled.div`
  cursor: pointer;
`
