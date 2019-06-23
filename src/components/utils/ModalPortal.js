import { useEffect } from 'react'
import ReactDOM from 'react-dom'

const ReusablePortal = props => {
  const { children } = props
  const portalRoot = document.getElementById('modalPortal')
  const el = document.createElement('div')

  useEffect(() => {
    portalRoot.appendChild(el)
    return () => {
      // portalRoot.remove(this.el)
      // document.getElementById('body').setAttribute('style', 'overflow: auto');
    }
  })

  // document.getElementById('body').setAttribute('style', 'overflow: hidden');
  return ReactDOM.createPortal(children, el)
}

export default ReusablePortal
