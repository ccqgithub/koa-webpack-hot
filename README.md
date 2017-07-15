# koa-webpack-hot

> make `webpack-hot-middleware` to be used in koa website, no need work with `webpack-dev-middleware`

## dependeces

- webpack@3.x
- koa@2.x
- webpack-hot-middleware@2.x

## Difference with `webpack-dev-middleware` or `webpack-dev-server`

- just inject hot-reload function into existing koa site, work with `koa-router` and other koa site features
- build files output to a `real dir`, so koa can use the output htmls as templates(like koa-views ...)

## use

install

```sh
npm install koa-webpack-hot webpack
```

koa server

```js
var webpack = require('webpack')
var hotMiddleware = require('koa-webpack-hot')
var webpackConfig = require('../build/webpack.conf')
var compiler = webpack(webpackConfig)

// run webpack
var watching = compiler.watch({
  // aggregateTimeout: 300,
  // poll: undefined
}, (err, stats) => {
  console.log(err)
  // console.log(stats)
})

// some other middlewares, like router

app.use(hotMiddleware(compiler, {
  // log: console.log,
  // path: '/__webpack_hmr',
  // heartbeat: 10 * 1000
}))
```

## webpack conf: see [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)

```js
entry: {
    vendor: ['jquery', 'webpack-hot-middleware/client'],
    index: ['./src/index', 'webpack-hot-middleware/client']
}

plugins: [
  // OccurenceOrderPlugin is needed for webpack 1.x only
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]
```
