import React from 'react'
import PropTypes from 'prop-types'

const BellSVG = ({ active }) => {
  const color = active ? 'dodgerblue' : 'black'
  return (
    <svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width='22.000000pt'
      height='22.000000pt'
      viewBox='0 0 512 512'
      // preserveAspectRatio='xMidYMid meet'
    >
      <metadata>
        Created by potrace 1.15, written by Peter Selinger 2001-2017
      </metadata>
      <g
        // transform='translate(0.000000,406.000000) scale(0.100000,-0.100000)'
        fill={color}
        stroke='none'
      >
        <path d='M255.9 456c31.1 0 48.1-22 48.1-53h-96.3c0 31 17 53 48.2 53zM412 352.2c-15.4-20.3-45.7-32.2-45.7-123.1 0-93.3-41.2-130.8-79.6-139.8-3.6-.9-6.2-2.1-6.2-5.9v-2.9c0-13.4-11-24.7-24.4-24.6-13.4-.2-24.4 11.2-24.4 24.6v2.9c0 3.7-2.6 5-6.2 5.9-38.5 9.1-79.6 46.5-79.6 139.8 0 90.9-30.3 102.7-45.7 123.1-9.9 13.1-.5 31.8 15.9 31.8h280.1c16.3 0 25.7-18.8 15.8-31.8z' />
      </g>
    </svg>
  )
}

BellSVG.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default BellSVG
