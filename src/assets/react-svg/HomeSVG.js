import React from 'react'
import PropTypes from 'prop-types'

// Styles
import { black, primary } from '../../styles/utils/colors'

const HomeSVG = ({ active }) => {
  const color = active ? primary : black

  return (
    <svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width='20.000000pt'
      height='20.000000pt'
      viewBox='0 0 512 512'
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
        <path d='M80,212V448a16,16,0,0,0,16,16h96V328a24,24,0,0,1,24-24h80a24,24,0,0,1,24,24V464h96a16,16,0,0,0,16-16V212' />
        <path d='M480,256,266.89,52c-5-5.28-16.69-5.34-21.78,0L32,256' />
        <polyline points='400 179 400 64 352 64 352 133' />
      </g>
    </svg>
  )
}

HomeSVG.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default HomeSVG
