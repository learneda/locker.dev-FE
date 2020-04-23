import React from 'react'
import PropTypes from 'prop-types'

// Styles
import { primary, black } from '../../styles/utils/colors'

const ShareSVG = ({ active }) => {
  const color = active ? primary : black

  return (
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
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32px'
      >
        <circle cx='128' cy='256' r='48' />
        <circle cx='384' cy='112' r='48' />
        <circle cx='384' cy='400' r='48' />
        <line x1='169.83' y1='279.53' x2='342.17' y2='376.47' />
        <line x1='342.17' y1='135.53' x2='169.83' y2='232.47' />
      </g>
    </svg>
  )
}

ShareSVG.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default ShareSVG
