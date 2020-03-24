import React from 'react'
import PropTypes from 'prop-types'

// Styles
import { bg, red } from '../../styles/utils/colors'

const PinSVG = ({ active }) => {
  const color = active ? red : bg
  return (
    <svg
      style={{ position: 'relative', top: 1 }}
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width='17.000000pt'
      height='17.000000pt'
      viewBox='0 0 512.000000 512.000000'
      preserveAspectRatio='xMidYMid meet'
    >
      <metadata>
        Created by potrace 1.15, written by Peter Selinger 2001-2017
      </metadata>
      <g
        fill='none'
        stroke={color}
        strokeMiterlimit='10'
        strokeWidth='32px'
        strokeLinecap='square'
      >
        <polyline points='112 184 256 328 400 184' />
      </g>
    </svg>
  )
}

PinSVG.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default PinSVG
