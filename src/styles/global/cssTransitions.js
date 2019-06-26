import { createGlobalStyle } from 'styled-components'

const CSSTransitions = createGlobalStyle`
.add-link-appear {
  opacity: 0;
  z-index: 1;
}
.add-link-appear.add-link-appear-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}
.add-link-enter {
  opacity: 0;
  z-index: 1;
}
.add-link-enter.add-link-enter-active {
  opacity: 1;
  transition: opacity 300ms linear;
}
.add-link-exit {
  opacity: 1;
}
.add-link-exit.add-link-exit-active {
  opacity: 0;
  transition: opacity 300ms linear;
}
.add-link-exit-done {
  opacity: 0;
}
`

export default CSSTransitions
