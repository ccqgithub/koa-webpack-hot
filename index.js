var hotMiddleware = require('webpack-hot-middleware')
var PassThrough = require('stream').PassThrough

module.exports = (compiler, opts) => {
  opts.path = opts.path || '/__webpack_hmr'
  
  let middleware = hotMiddleware(compiler, opts)

  return async (ctx, next) => {

    if (ctx.request.path != opts.path) {
      return await next()
    }

    let stream = new PassThrough()
    ctx.body = stream

    middleware(ctx.req, {
      write: stream.write.bind(stream),
      writeHead: (status, headers) => {
        ctx.status = status
        Object.keys(headers).forEach(key => {
          ctx.set(key, headers[key])
        })
      },
      end: () => {
        stream.end();
      }
    }, next)
  }
}
