import React from 'react'
import PropTypes from 'prop-types'

// Styles
import { primary } from '../../styles/utils/colors'

const CommentSVG = ({ active }) => {
  const fill = 'none'
  const stroke = primary

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
      <g fill={fill} stroke={stroke} strokeWidth='32px' strokeLinejoin='round'>
        <path d='M408,64H104a56.16,56.16,0,0,0-56,56V312a56.16,56.16,0,0,0,56,56h40v80l93.72-78.14a8,8,0,0,1,5.13-1.86H408a56.16,56.16,0,0,0,56-56V120A56.16,56.16,0,0,0,408,64Z' />
        <circle cx='160' cy='216' r='32' />
        <circle cx='256' cy='216' r='32' />
        <circle cx='352' cy='216' r='32' />
      </g>
    </svg>
  )
}

CommentSVG.propTypes = {
  active: PropTypes.number.isRequired,
}

export default CommentSVG
