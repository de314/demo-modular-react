import React from 'react'

import asAsync from './asAsync'

import { Link, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import CustomLoadingComponent from './CustomLoadingComponent'
const Page1 = asAsync(() =>
  import('./pages/Page1').then(module => module.default),
)
const Page2 = asAsync(() =>
  import('./pages/Page2').then(module => module.default),
)
const Page3 = asAsync(() =>
  import('./pages/Page3').then(module => module.default),
)
const Preloaded = asAsync(
  () => import('./pages/Preloaded').then(module => module.default),
  { preload: { enabled: true } },
)
const PreloadedWithDelay = asAsync(
  () => import('./pages/PreloadedWithDelay').then(module => module.default),
  { preload: { enabled: true, delay: 2000 } },
)
const SlowNetwork = asAsync(
  () =>
    new Promise(resolve => {
      setTimeout(
        () =>
          resolve(import('./pages/SlowNetwork').then(module => module.default)),
        2500,
      )
    }),
)
const CustomLoader = asAsync(
  () =>
    new Promise(resolve => {
      setTimeout(
        () =>
          resolve(
            import('./pages/CustomLoader').then(module => module.default),
          ),
        2500,
      )
    }),
  { LoadingComponent: CustomLoadingComponent },
)

const App = () => (
  <div className="App">
    <h1>Hello, App!</h1>
    <p style={{ width: '500px' }}>
      I did the thing from{' '}
      <a href="https://scotch.io/tutorials/lazy-loading-routes-in-react">
        this awesome article
      </a>. Watch the network tab in the dev console as you load different pages
      in this app. Every page is loaded asynchronously on the first visit.
    </p>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/p1">Page 1</Link>
        </li>
        <li>
          <Link to="/p2">Page 2</Link>
        </li>
        <li>
          <Link to="/p3">Page 3</Link>
        </li>
        <li>
          <Link to="/pre">Preloaded Page</Link>
        </li>
        <li>
          <Link to="/pre/delay">Preloaded Page With 2 Second Delay</Link>
        </li>
        <li>
          <Link to="/slow">Slow Network Connection</Link>
        </li>
        <li>
          <Link to="/loader">Custom Loading Component</Link>
        </li>
      </ul>
    </div>
    <h3>Content</h3>
    <Switch>
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

export default App
