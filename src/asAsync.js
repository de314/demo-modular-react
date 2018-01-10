import React, { Component } from 'react'

import Loading from './Loading'

const defaultAsyncOptions = {
  preload: {
    enabled: false,
    delay: 0,
  },
  LoadingComponent: Loading,
}

/**
 *  `asAsync`
 *  - getComponent function: Returns a promise that resolves to the Component that
 *      should be lazy loaded
 *  - options [Object]
 *      - preload [Object]:
 *          - enabled [Boolean]: If the component should be pre loaded. default=false
 *          - delay [Number]: How long to wait before preloading the component. default=0
 *      - LoadingComponent: the default component to render while requesting the
 *          lazy loaded component. Defaults to `./Loading`
 */
export default function asAsync(getComponent, options = defaultAsyncOptions) {
  // setup the variables for this component
  // this just merges the provided options with the
  // default options.
  const {
    preload = defaultAsyncOptions.preload,
    LoadingComponent = Loading,
  } = options
  const { enabled: preloadEnabled, delay } = preload
  // Saved promise from the `getComponent` request
  let promise
  // Saved for delay pre loading
  let timeoutHandle

  // This is just a convenience
  function loadComponent() {
    return getComponent().then(Component => {
      AsyncComponent.Component = Component
      return Component
    })
  }

  class AsyncComponent extends Component {
    // set initial state
    static Component = null
    state = { Component: AsyncComponent.Component }

    componentWillMount() {
      // we need to make sure that the component is saved in state so that we re-render
      // when the request comes back
      if (!this.state.Component) {
        // If we are revisiting a page then the Component might already be loaded
        if (!!AsyncComponent.Component) {
          // this component is being mounded again, or rendered somewhere else
          this.setState({ Component: AsyncComponent.Component })
        } else if (promise) {
          // the component has already been requested
          promise.then(Component => this.setState({ Component }))
        } else if (timeoutHandle) {
          // we are in a preload delay state. So clear the delay timeout and make the request
          clearTimeout(timeoutHandle)
          loadComponent().then(Component => this.setState({ Component }))
        } else {
          // this component has never been mounted before
          loadComponent().then(Component => this.setState({ Component }))
        }
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        // if we have it, show it
        return <Component {...this.props} />
      }
      // otherwise, show the loading component
      return <LoadingComponent {...this.props} />
    }
  }

  // if we want to preload then we don't want to wait until it is mounted and
  // the lifecycle `componentWillMount` requests it
  if (preloadEnabled) {
    if (delay > 0) {
      // keep track of the timeout handle incase we need to render it before the
      // delay runs out
      timeoutHandle = setTimeout(() => {
        // set the promise after the delay
        promise = loadComponent()
      }, delay)
    } else {
      // no delay so preload it right now!
      promise = loadComponent()
    }
  }

  return AsyncComponent
}
