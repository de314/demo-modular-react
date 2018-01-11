import React from 'react'

const Intro = () => (
  <div className="Intro">
    <h1>Demo Modular React</h1>
    <p>
      View the code on{' '}
      <a
        href="https://github.com/de314/demo-modular-react"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-github" />/de314/demo-modular-react{' '}
        <i className="fa fa-external-link" />
      </a>
    </p>
    <p>
      I did the thing from{' '}
      <a
        href="https://scotch.io/tutorials/lazy-loading-routes-in-react"
        target="_blank"
        rel="noopener noreferrer"
      >
        this awesome article <i className="fa fa-external-link" />
      </a>. Watch the network tab in the dev console as you load different pages
      in this app. Every page is loaded asynchronously on the first visit.
    </p>
    <p>
      While an intersting exercise, and the high granularity of control, we will
      probably use the implementation provided by Facebook and React in{' '}
      <a
        href="https://reactjs.org/docs/code-splitting.html#react-loadable"
        target="_blank"
        rel="noopener noreferrer"
      >
        <code>react-loadable</code>{' '}
        <i className="fa fa-external-link" rel="noopener noreferrer" />
      </a>.
    </p>
  </div>
)

export default Intro
