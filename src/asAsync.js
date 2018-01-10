import React, { Component } from 'react'

import Loading from './Loading'

const defaultAsyncOptions = {
  preload: {
    enabled: false,
    delay: 0,
  },
  LoadingComponent: Loading,
}

export default function asAsync(getComponent, options = defaultAsyncOptions) {
  const {
    preload = defaultAsyncOptions.preload,
    LoadingComponent = Loading,
  } = options
  const { enabled: preloadEnabled, delay } = preload
  let promise
  let timeoutHandle

  function loadComponent() {
    return getComponent().then(Component => {
      AsyncComponent.Component = Component
      return Component
    })
  }

  class AsyncComponent extends Component {
    static Component = null
    state = { Component: AsyncComponent.Component }

    componentWillMount() {
      if (!this.state.Component) {
        if (!!AsyncComponent.Component) {
          this.setState({ Component: AsyncComponent.Component })
        } else if (promise) {
          promise.then(Component => this.setState({ Component }))
        } else if (timeoutHandle) {
          clearTimeout(timeoutHandle)
          loadComponent().then(Component => this.setState({ Component }))
        } else {
          loadComponent().then(Component => this.setState({ Component }))
        }
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return <LoadingComponent {...this.props} />
    }
  }

  if (preloadEnabled) {
    if (delay > 0) {
      timeoutHandle = setTimeout(() => {
        promise = loadComponent()
      }, delay)
    } else {
      promise = loadComponent()
    }
  }

  return AsyncComponent
}
