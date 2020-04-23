import React from 'react'
import PropTypes from 'prop-types'

// Styles
import { black, primary } from '../../styles/utils/colors'

const AddLinkSVG = ({ active }) => {
  const stroke = active ? primary : black
  const fill = 'none'
  return (
    <svg
      version='1.1'
      id='svg-addlink'
      xmlns='http://www.w3.org/2000/svg'
      width='22.000000pt'
      height='22.000000pt'
      viewBox='0 0 512 512'
    >
      <g
        fill={fill}
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32px'
      >
        <path d='M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z' />
        <line x1='256' y1='176' x2='256' y2='336' />
        <line x1='336' y1='256' x2='176' y2='256' />
      </g>
    </svg>
  )
}

AddLinkSVG.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default AddLinkSVG
