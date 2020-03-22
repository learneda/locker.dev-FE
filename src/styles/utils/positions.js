import { css } from 'styled-components'

export const fixed = ({
  x = 0,
  y = 0,
  xProp = 'left',
  yProp = 'top',
} = {}) => css`
  position: fixed;
  ${xProp}: ${x};
  ${yProp}: ${y};
`

export const absolute = ({
  x = 0,
  y = 0,
  xProp = 'left',
  yProp = 'top',
} = {}) => css`
  position: absolute;
  ${xProp}: ${x};
  ${yProp}: ${y};
`
