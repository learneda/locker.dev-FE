import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate, { options } from 'components/utils/AlertTemplate'
import App from 'App/index'
import store from 'App/store'
import * as serviceWorker from 'serviceWorker'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()
