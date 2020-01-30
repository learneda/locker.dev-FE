import React from 'react'
import PropTypes from 'prop-types'

const AddLinkSVG = ({ active }) => {
  const color = active ? 'dodgerblue' : 'black'
  return (
    <svg
      version='1.1'
      id='svg-addlink'
      xmlns='http://www.w3.org/2000/svg'
      width='20.000000pt'
      height='20.000000pt'
      viewBox='0 0 512 512'
    >
      <g
        // transform='translate(0.000000,548.000000) scale(0.100000,-0.100000)'
        fill={color}
        stroke='none'
      >
        <path d='M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm90.5 224H272v74.5c0 8.8-7.2 16-16 16-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3V272h-74.5c-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3 0-8.8 7.2-16 16-16H240v-74.5c0-8.8 7.2-16 16-16s16 7.2 16 16V240h74.5c8.8 0 16 7.2 16 16s-7.2 16-16 16z' />
      </g>
    </svg>
  )
}

AddLinkSVG.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default AddLinkSVG
