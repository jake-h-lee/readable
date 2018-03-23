import React from 'react'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { loadPosts } from './actions/postActions'
import App from './components/App'
import ReactDOM from 'react-dom'


const store = configureStore()

store.dispatch(loadPosts())

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>, document.getElementById('root')
)
