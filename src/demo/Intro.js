import React from 'react'

const Intro = () => (
  <div className="Intro">
    <h1>Demo Modular React</h1>
    <p>
      I did the thing from{' '}
      <a href="https://scotch.io/tutorials/lazy-loading-routes-in-react">
        this awesome article
      </a>. Watch the network tab in the dev console as you load different pages
      in this app. Every page is loaded asynchronously on the first visit.
    </p>
    <p>
      While an intersting exercise, and the high granularity of control, we will
      probably use the implementation provided by Facebook and React in{' '}
      <a href="https://reactjs.org/docs/code-splitting.html#react-loadable">
        <code>react-loadable</code>.
      </a>
    </p>
  </div>
)

export default Intro
