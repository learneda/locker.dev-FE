import React from 'react'
import PropTypes from 'prop-types'

const PonySVG = ({ active }) => {
  const color = active ? 'magenta' : 'black'
  return (
    <svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width='20.000000pt'
      height='20.000000pt'
      viewBox='0 0 490.000000 490.000000'
      preserveAspectRatio='xMidYMid meet'
    >
      <metadata>
        Created by potrace 1.15, written by Peter Selinger 2001-2017
      </metadata>
      <g
        transform='translate(0.000000,490.000000) scale(0.100000,-0.100000)'
        fill={color}
        stroke='none'
      >
        <path
          d='M2365 4630 c-108 -13 -194 -32 -345 -78 -30 -9 -59 -20 -64 -24 -6
-4 -17 -8 -25 -8 -9 -1 -34 -9 -56 -20 -22 -11 -43 -19 -47 -20 -7 0 -117 -49
-177 -78 -19 -9 -79 -43 -133 -74 -54 -32 -100 -58 -103 -58 -7 0 -168 -111
-191 -131 -11 -11 -25 -19 -31 -19 -6 0 -13 -3 -15 -8 -1 -4 -34 -32 -73 -62
-283 -219 -548 -504 -731 -786 -58 -88 -184 -327 -184 -348 0 -6 -6 -23 -14
-38 -8 -15 -17 -42 -21 -60 -4 -18 -10 -37 -14 -43 -12 -20 -33 -133 -42 -240
-14 -146 -4 -503 16 -586 41 -172 107 -319 213 -477 102 -152 272 -335 457
-492 28 -23 61 -52 75 -64 74 -63 412 -301 470 -329 17 -9 40 -23 95 -58 22
-14 70 -42 107 -62 37 -20 85 -47 105 -60 21 -13 155 -81 298 -151 143 -70
268 -132 277 -137 33 -17 83 -10 106 14 29 31 104 179 125 247 61 198 70 374
28 550 -10 41 -28 105 -53 188 -16 52 -12 181 6 235 33 97 141 232 168 210 20
-17 166 -64 243 -79 98 -20 207 -33 295 -34 73 -2 80 -4 225 -78 103 -53 153
-85 162 -101 23 -48 144 -170 212 -215 38 -25 73 -46 77 -46 5 0 22 -7 37 -15
15 -8 64 -19 109 -25 160 -22 402 25 516 101 24 16 46 29 50 29 4 0 38 31 75
70 l69 69 -4 264 c-2 174 -7 269 -14 278 -6 8 -14 27 -18 43 -10 42 -80 131
-139 176 -154 119 -181 145 -315 304 -49 58 -212 311 -212 329 0 3 -13 34 -29
69 -16 35 -36 86 -46 113 -9 28 -21 59 -25 70 -5 11 -20 57 -34 103 -14 45
-35 101 -46 124 -20 43 -26 73 -12 64 4 -2 19 12 32 32 14 20 43 60 65 89 22
28 60 79 85 112 25 33 65 87 90 120 25 33 65 87 90 120 25 33 65 87 90 120 25
33 65 87 90 120 25 33 65 87 90 120 25 33 65 87 90 120 97 131 140 187 163
216 91 113 110 177 62 209 -13 9 -31 16 -39 16 -9 0 -244 -171 -523 -380 -279
-210 -509 -376 -511 -370 -2 6 11 36 28 67 140 247 192 357 185 386 -6 22 -43
54 -107 92 -63 37 -223 116 -273 135 -33 12 -69 26 -80 31 -90 37 -318 82
-495 99 -110 10 -447 10 -535 0z m675 -159 c144 -26 271 -59 360 -93 64 -24
267 -128 280 -142 12 -16 -4 -50 -134 -280 -31 -54 -56 -100 -56 -102 0 -2
-17 -32 -38 -66 -21 -35 -56 -96 -77 -136 -41 -75 -67 -90 -73 -43 -4 28 22
204 50 341 31 152 32 171 9 207 -11 18 -39 45 -62 60 -37 24 -52 28 -113 28
-69 0 -74 -2 -170 -60 -150 -91 -351 -268 -447 -393 -21 -27 -38 -35 -119 -56
-289 -73 -544 -196 -795 -385 -117 -87 -291 -238 -355 -307 -368 -398 -599
-793 -728 -1249 -29 -102 -52 -209 -52 -241 -1 -16 -6 -39 -13 -52 -13 -22
-13 -22 -48 25 -44 62 -49 71 -106 183 -52 101 -63 131 -94 249 -17 64 -19
109 -19 356 0 251 2 291 20 365 41 163 121 340 231 511 197 303 513 622 854
861 227 158 496 296 710 362 135 42 255 70 345 80 19 2 145 3 280 1 194 -3
269 -8 360 -24z m1226 -396 c-5 -14 -172 -242 -186 -255 -3 -3 -23 -30 -45
-60 -22 -30 -42 -57 -45 -60 -3 -3 -23 -30 -45 -60 -22 -30 -42 -57 -45 -60
-3 -3 -23 -30 -45 -60 -22 -30 -42 -57 -45 -60 -3 -3 -23 -30 -45 -60 -22 -30
-45 -61 -52 -68 -7 -8 -18 -22 -23 -33 -15 -28 -34 -24 -63 14 -13 17 -54 63
-91 101 -36 38 -66 73 -66 78 0 9 781 597 794 598 4 0 6 -7 2 -15z m-1284
-122 c-27 -39 -86 -151 -101 -193 -17 -46 -51 -198 -51 -226 0 -30 44 -74 75
-74 41 0 61 30 69 101 13 129 88 288 183 389 25 27 35 32 44 23 10 -10 10 -21
1 -50 -17 -57 -33 -185 -39 -309 -5 -104 -4 -113 16 -133 12 -12 32 -21 46
-21 14 0 35 -6 48 -12 52 -30 146 -110 197 -169 30 -35 64 -75 77 -89 12 -14
38 -43 57 -65 48 -55 71 -103 106 -225 12 -41 28 -89 36 -107 8 -17 14 -36 14
-42 0 -6 4 -19 9 -29 5 -9 37 -73 70 -142 33 -69 76 -149 96 -178 19 -30 35
-56 35 -58 0 -3 27 -41 60 -84 85 -111 221 -252 310 -320 172 -132 190 -177
190 -465 l0 -183 -47 -42 c-64 -55 -191 -115 -283 -134 -242 -51 -403 11 -551
210 l-62 84 -161 81 c-157 79 -164 82 -256 90 -137 11 -270 28 -305 39 -145
42 -188 58 -242 86 -180 93 -261 202 -288 387 -12 80 -20 106 -36 120 -31 25
-64 21 -89 -10 -20 -25 -22 -35 -16 -109 12 -150 75 -281 184 -386 34 -33 62
-64 62 -70 0 -5 -20 -32 -44 -60 -62 -71 -103 -162 -119 -260 -11 -73 -11 -96
4 -183 17 -96 33 -165 60 -250 16 -50 16 -293 0 -355 -7 -25 -17 -63 -22 -85
-5 -22 -24 -69 -42 -105 -28 -56 -35 -65 -57 -62 -51 6 -533 254 -765 394
-322 196 -565 379 -762 576 l-64 64 11 81 c19 151 30 222 36 237 3 8 12 40 19
70 28 115 36 145 46 155 5 5 9 15 9 23 0 56 202 479 276 579 13 17 24 34 24
37 0 6 130 188 140 196 3 3 28 34 54 68 58 76 272 294 371 379 79 66 192 153
201 153 3 0 23 14 44 30 21 17 41 30 44 30 3 0 34 17 69 39 56 34 142 77 247
124 49 21 188 69 230 78 69 16 135 30 156 34 11 3 36 26 54 52 33 46 209 228
260 269 76 60 102 63 62 7z'
        />
        <path
          d='M2360 4233 c-17 -22 -20 -34 -14 -72 12 -79 42 -173 61 -187 27 -21
67 -17 91 9 26 27 27 51 8 126 -8 31 -18 68 -21 84 -14 66 -86 90 -125 40z'
        />
        <path
          d='M1984 4120 c-11 -4 -26 -21 -33 -37 -11 -27 -8 -39 29 -124 22 -52
48 -100 57 -106 42 -31 113 0 113 50 0 27 -56 165 -79 195 -19 25 -57 35 -87
22z'
        />
        <path
          d='M1630 3933 c-55 -20 -65 -78 -25 -137 14 -20 25 -39 25 -41 0 -19 65
-94 87 -100 37 -9 77 22 81 64 4 40 -85 192 -123 209 -14 7 -27 12 -28 11 -1
0 -9 -3 -17 -6z'
        />
        <path
          d='M1283 3690 c-25 -10 -43 -39 -43 -70 0 -20 57 -103 113 -162 32 -34
78 -37 107 -8 32 32 25 71 -22 131 -86 108 -111 126 -155 109z'
        />
        <path
          d='M968 3404 c-24 -12 -28 -21 -28 -56 0 -37 6 -47 63 -103 75 -74 100
-89 135 -80 33 8 51 32 52 68 0 44 -145 189 -187 187 -4 -1 -20 -8 -35 -16z'
        />
        <path
          d='M687 3082 c-10 -10 -17 -35 -17 -55 0 -33 6 -41 81 -98 64 -49 88
-61 117 -61 44 0 64 24 60 72 -3 30 -13 42 -83 97 -87 67 -128 79 -158 45z'
        />
        <path
          d='M460 2730 c-27 -27 -26 -71 3 -97 41 -38 152 -93 189 -93 42 0 68 25
68 67 0 37 -14 50 -110 102 -84 45 -120 51 -150 21z'
        />
        <path
          d='M3234 2691 c-50 -30 -74 -72 -74 -128 0 -83 58 -144 139 -147 95 -3
151 53 151 152 0 53 -2 57 -45 99 -40 38 -50 43 -93 43 -28 0 -59 -7 -78 -19z'
        />
      </g>
    </svg>
  )
}

PonySVG.propTypes = {}

export default PonySVG
