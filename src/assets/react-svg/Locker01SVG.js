import React from 'react'
import PropTypes from 'prop-types'

// Styles
import { black, primary } from '../../styles/utils/colors'

// TODO: change naming convention to bookmark or save
const Locker01SVG = ({ active }) => {
  const fill = active ? primary : 'none'
  const stroke = active ? primary : black

  return (
    <svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width='20.000000pt'
      height='20.000000pt'
      viewBox='0 0 512.000000 512.000000'
      preserveAspectRatio='xMidYMid meet'
    >
      <g
        fill={fill}
        stroke={stroke}
        strokeLinejoin='round'
        strokeWidth='32px'
        strokeLinecap='round'
      >
        <path d='M352,48H160a48,48,0,0,0-48,48V464L256,336,400,464V96A48,48,0,0,0,352,48Z' />
      </g>
    </svg>
  )
}

Locker01SVG.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default Locker01SVG
