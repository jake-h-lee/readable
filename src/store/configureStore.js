import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export default function configureStore() {
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk, logger)
    )
  )
}
