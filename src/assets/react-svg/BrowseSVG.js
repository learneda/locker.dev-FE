import React from 'react'
import PropTypes from 'prop-types'

const BrowseSVG = ({ browseColor }) => {
  return (
    <svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width='20.000000pt'
      height='20.000000pt'
      viewBox='0 0 524.000000 422.000000'
      preserveAspectRatio='xMidYMid meet'
    >
      <metadata>
        Created by potrace 1.15, written by Peter Selinger 2001-2017
      </metadata>
      <g
        transform='translate(0.000000,422.000000) scale(0.100000,-0.100000)'
        fill={browseColor}
        stroke='none'
      >
        <path
          d='M503 4020 c-90 -18 -174 -86 -214 -174 -18 -40 -19 -102 -19 -1847
l0 -1805 28 -27 28 -27 2296 0 2296 0 26 31 26 31 0 1792 c0 2010 7 1843 -76
1935 -26 29 -65 58 -96 72 l-53 24 -2100 1 c-1155 1 -2119 -2 -2142 -6z m4238
-229 l29 -29 0 -481 0 -481 -2150 0 -2150 0 0 481 0 481 29 29 29 29 2092 0
2092 0 29 -29z m29 -2326 l0 -1125 -2150 0 -2150 0 0 1125 0 1125 2150 0 2150
0 0 -1125z'
        />
        <path
          d='M2010 3310 l0 -310 1223 2 1222 3 0 305 0 305 -1222 3 -1223 2 0
-310z m2250 0 l0 -100 -1025 0 -1025 0 0 100 0 100 1025 0 1025 0 0 -100z'
        />
        <path
          d='M813 3504 c-35 -8 -111 -81 -124 -121 -30 -93 2 -192 79 -243 43 -29
52 -31 117 -28 78 4 115 23 162 85 22 29 28 48 31 102 3 77 -18 124 -80 174
-30 24 -47 30 -100 32 -35 2 -73 1 -85 -1z'
        />
        <path
          d='M1420 3499 c-132 -53 -173 -225 -77 -327 82 -88 239 -82 309 11 104
136 11 329 -158 326 -27 0 -60 -5 -74 -10z'
        />
      </g>
    </svg>
  )
}

BrowseSVG.propTypes = {
  browseColor: PropTypes.string.isRequired,
}

export default BrowseSVG
