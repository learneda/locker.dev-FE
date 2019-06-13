import styled from 'styled-components'
import { device } from '../utils'

export const Heading = styled.h1`
  font-size: 2rem;
  @media ${device.tablet} {
    color: blue;
  }
`
