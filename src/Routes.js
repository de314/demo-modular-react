import React from 'react'
import store from './rdx/store'
import { pageRegistered, pageRequested, pageLoaded } from './rdx/actions'

import asAsync from './asAsync'

import { Route, Switch } from 'react-router-dom'
import CustomLoadingComponent from './demo/CustomLoadingComponent'
import Home from './pages/Home'

store.dispatch(pageRegistered('Home', '/'))
store.dispatch(pageRequested('Home'))
store.dispatch(pageLoaded('Home'))

const slowNetworkComp = (getImport, options, info, delay) => {
  return toComp(
    () =>
      new Promise(resolve => {
        setTimeout(() => resolve(getImport()), delay)
      }),
    options,
    info,
  )
}

// This does the same thing as `toAsyncComp` but add Redux dispatch actions
const toComp = (getImport, options, info) => {
  const { name, href } = info
  store.dispatch(pageRegistered(name, href))
  return asAsync(() => {
    store.dispatch(pageRequested(name))
    return getImport().then(module => {
      store.dispatch(pageLoaded(name))
      return module.default
    })
  }, options)
}

const toAsyncComp = (getImport, options) =>
  asAsync(() => getImport().then(module => module.default), options)

const toInfo = (name, href) => ({ name, href })

const Page1 = toComp(() => import('./pages/Page1'), {}, toInfo('Page 1', '/p1'))
const Page2 = toComp(() => import('./pages/Page2'), {}, toInfo('Page 2', '/p2'))
const Page3 = toComp(() => import('./pages/Page3'), {}, toInfo('Page 3', '/p3'))

const Preloaded = toComp(
  () => import('./pages/Preloaded'),
  { preload: { enabled: true } },
  toInfo('Preloaded', '/pre'),
)

const PreloadedWithDelay = toComp(
  () => import('./pages/PreloadedWithDelay'),
  { preload: { enabled: true, delay: 2000 } },
  toInfo('Preloaded With Delay', '/pre/delay'),
)

const SlowNetwork = slowNetworkComp(
  () => import('./pages/SlowNetwork'),
  {},
  toInfo('Slow Network', '/slow'),
  2500,
)

const CustomLoader = slowNetworkComp(
  () => import('./pages/CustomLoader'),
  { LoadingComponent: CustomLoadingComponent },
  toInfo('Slow Network with Custom Loader', '/loader'),
  2500,
)

const Routes = () => (
  <div className="Routes">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/p1" component={Page1} />
      <Route exact path="/p2" component={Page2} />
      <Route exact path="/p3" component={Page3} />
      <Route exact path="/pre" component={Preloaded} />
      <Route exact path="/pre/delay" component={PreloadedWithDelay} />
      <Route exact path="/slow" component={SlowNetwork} />
      <Route exact path="/loader" component={CustomLoader} />
    </Switch>
  </div>
)

export default Routes
