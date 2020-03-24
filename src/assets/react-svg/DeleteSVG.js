import React from 'react'
import PropTypes from 'prop-types'

const DeleteSVG = ({ active }) => {
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
      <g fill='none' stroke={color} strokeMiterlimit='10' strokeWidth='32px'>
        <path d='M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z' />
      </g>
      <g
        fill={color}
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32px'
      >
        <line x1='320' y1='320' x2='192' y2='192' />
        <line x1='192' y1='320' x2='320' y2='192' />
      </g>
    </svg>
  )
}

DeleteSVG.propTypes = {
  active: PropTypes.bool,
}

export default DeleteSVG
