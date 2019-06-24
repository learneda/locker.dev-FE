export const transitionClasses = (name, timeout) => `
.${name}-appear {
  opacity: 0;
  z-index: 1;
}
.${name}-appear.${name}-appear-active {
  opacity: 1;
  transition: opacity ${timeout}ms ease-in;
}
.${name}-enter {
  opacity: 0;
  z-index: 1;
}
.${name}-enter.${name}-enter-active {
  opacity: 1;
  transition: opacity ${timeout}ms linear;
}
.${name}-exit {
  opacity: 1;
}
.${name}-exit.${name}-exit-active {
  opacity: 0;
  transition: opacity ${timeout}ms linear;
}
.${name}-exit-done {
  opacity: 0;
}
`
