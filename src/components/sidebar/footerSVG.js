import React from 'react'
import PropTypes from 'prop-types'

const FooterSvg = ({ active }) => {
  console.log(active, 'from pony')
  const color = active ? 'magenta' : 'black'
  return (
    <svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width='20.000000pt'
      height='20.000000pt'
      viewBox='0 0 326.000000 324.000000'
      preserveAspectRatio='xMidYMid meet'
    >
      <metadata>
        Created by potrace 1.15, written by Peter Selinger 2001-2017
      </metadata>
      <g
        transform='translate(0.000000,324.000000) scale(0.100000,-0.100000)'
        fill='#000000'
        stroke='none'
      >
        <path
          d='M1356 3160 c-570 -103 -1034 -504 -1217 -1050 -62 -185 -82 -329 -76
-540 7 -253 44 -411 148 -630 159 -334 456 -622 786 -764 436 -186 907 -174
1328 35 570 282 916 892 865 1521 -33 402 -193 736 -488 1019 -207 199 -471
338 -759 400 -145 32 -437 36 -587 9z m402 -120 c454 -48 840 -285 1084 -666
81 -126 154 -310 190 -477 31 -147 31 -419 0 -564 -124 -576 -549 -1001 -1125
-1125 -145 -31 -417 -31 -564 0 -299 64 -552 205 -760 426 -145 152 -245 321
-313 525 -55 165 -73 277 -73 456 0 355 115 666 347 937 295 345 768 535 1214
488z'
        />
        <path
          d='M1355 2205 c-14 -13 -25 -33 -25 -45 0 -11 11 -32 25 -45 l24 -25
313 0 313 0 -498 -498 c-339 -339 -497 -504 -497 -518 0 -12 9 -33 21 -48 45
-57 35 -65 569 469 l495 495 5 -314 c5 -291 6 -315 24 -335 24 -27 70 -27 96
-1 19 19 20 33 20 434 l0 415 -26 20 c-26 20 -37 21 -431 21 l-404 0 -24 -25z'
        />
      </g>
    </svg>
  )
}

FooterSvg.propTypes = {}

export default FooterSvg
