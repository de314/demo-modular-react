import React from 'react'
import ReactDOM from 'react-dom'
import store from './rdx/store'

import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
