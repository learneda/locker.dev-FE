import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate, { options } from './components/utils/AlertTemplate'
import App from './App'
import store from './store'
import * as serviceWorker from './serviceWorker'
import 'typeface-roboto'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AlertProvider template={AlertTemplate} {...options}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </AlertProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()
