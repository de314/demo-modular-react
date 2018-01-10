import React from 'react'
import { selectPages } from './rdx/selectors'

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Intro from './demo/Intro'
import LinksTable from './demo/LinksTable'
import Routes from './Routes'

const App = ({ pages }) => (
  <div className="App container">
    <Intro />
    <hr className="p-2" />
    <LinksTable pages={pages} />
    <h3>Content</h3>
    <div
      style={{
        border: '3px solid #000',
        borderRadius: '10px',
        margin: '15px',
        padding: '35px',
      }}
    >
      <Routes />
    </div>
  </div>
)

export default compose(
  withRouter,
  connect(state => ({
    pages: selectPages(state),
  })),
)(App)
