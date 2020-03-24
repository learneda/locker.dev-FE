import React from 'react'
import PropTypes from 'prop-types'

// Styles
import { black, primary } from '../../styles/utils/colors'

// Lock Icon for NavBar
const Locker04SVG = ({ active }) => {
  const fill = 'none'
  const stroke = active ? primary : black

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
        fill={fill}
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32px'
      >
        {active ? (
          <>
            <path d='M336,112a80,80,0,0,0-160,0v96' />
            <rect x='96' y='208' width='320' height='272' rx='48' ry='48' />
          </>
        ) : (
          <>
            <path d='M336,208V113a80,80,0,0,0-160,0v95' />
            <rect x='96' y='208' width='320' height='272' rx='48' ry='48' />
          </>
        )}
      </g>
    </svg>
  )
}

Locker04SVG.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default Locker04SVG
