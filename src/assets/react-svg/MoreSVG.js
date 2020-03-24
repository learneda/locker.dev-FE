import React from 'react'
import PropTypes from 'prop-types'

const MoreSVG = ({ active }) => {
  const color = active ? 'dodgerblue' : 'black'
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
      <g fill={color} stroke={color} strokeMiterlimit='10' strokeWidth='28px'>
        <circle cx='256' cy='256' r='32' />
        <circle cx='416' cy='256' r='32' />
        <circle cx='96' cy='256' r='32' />
      </g>
    </svg>
  )
}

MoreSVG.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default MoreSVG
