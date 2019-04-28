import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { positions, Provider as AlertProvider } from 'react-alert'
import Alert from './components/utils/Alert'

import App from './App'
import store from './store'
import * as serviceWorker from './serviceWorker'

import 'typeface-roboto'

import '/Users/StarTask/lambda/labs/labs11_learned_a-FE/src/styles/index.css'

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AlertProvider template={Alert} {...options}>
        <App />
      </AlertProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()
