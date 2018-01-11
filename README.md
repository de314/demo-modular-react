# Demo Modular React

I did the thing from [this awesome article](https://scotch.io/tutorials/lazy-loading-routes-in-react).
You can see the [live demo](https://de314.github.io/demo-modular-react/) thanks to Github Pages

### How It Works

There is a lot of extra stuff going on in the demo app. I am using
[recompose](https://github.com/acdlite/recompose/blob/master/docs/API.md) for HOC's and
[Redux](https://redux.js.org/) for state management.

But if you are interested in the meat of the functionality then take a look at `src/asAsync.js`
and `src/Routes.js`. Let me know if you want more details but they are pretty well commented.
This project really just takes the above article to the next level by adding preloading,
and metrics.

### Installation and Usage

Its a `create-react-app` so just

```
git clone https://github.com/de314/demo-modular-react.git
cd demo-modular-react
npm start
echo 'Go to http://localhost:3000/'
echo 'Take a look at ./src/Routes.js to get started loading your own async components!'
```

### Development

Feel free to contribute, request more details, or more functionality

```
# Push the gh-pages
npm run publish
```
