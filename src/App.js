import React from 'react'
import _ from 'lodash'
import store from './rdx/store'
import { pageRegistered } from './rdx/actions'
import { selectPages } from './rdx/selectors'

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Link, Route, Switch } from 'react-router-dom'
import LinksTable from './demo/LinksTable'
import Intro from './demo/Intro'
import Routes from './Routes'

const App = ({ pages }) => (
  <div className="App container">
    <Intro />
    <hr className="p-2" />
    <LinksTable pages={pages} />
    <h3>Content</h3>
    <Routes />
  </div>
)

export default compose(
  withRouter,
  connect(state => ({
    pages: selectPages(state),
  })),
)(App)
