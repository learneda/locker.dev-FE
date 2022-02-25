import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import rootReducer from 'reducers'
import thunk from 'redux-thunk'
import LogRocket from 'logrocket'

if (process.env.NODE_ENV === 'production') {
  LogRocket.init('q5iksv/learnlocker')
}
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
