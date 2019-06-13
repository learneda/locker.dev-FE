import styled from 'styled-components'
import { applyStyleModifiers } from 'styled-components-modifiers'
import { teal, elevations } from '../utils'

const BUTTON_MODIFIERS = {
  small: props => `
  font-size: 1rem;
      padding: 3px 10px;
  `,
  cancel: props => `
  background: tomato;
  `,
}
export const Button = styled.button`
  padding: 5px 10px;
  border-radius: 4px;
  color: white;
  font-size: 2rem;
  border: none;
  background: ${teal};
  transition: 0.3s ease box-shadow;
  ${elevations[1]};
  &:hover {
    ${elevations[2]}
  }
  ${applyStyleModifiers(BUTTON_MODIFIERS)};
`

export const CancelButton = styled(Button)`
  background: 'tomato';
`
