const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const userAPI = require('./routes/user');
const airportAPI = require('./routes/airport')
const flightAPI = require('./routes/flight')
const baggageAPI = require('./routes/baggage')
const superUserAPI = require('./routes/superUser');

const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const {tokenFailInfo} = require("./db/model/ErrorInfo");
const {ErrorModel} = require("./db/model/ResModel");





/* 跨域设置 */
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');//访问控制允许来源：*为所有
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild'); //访问控制允许报头Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//访问控制允许方法
  ctx.set('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
  if (ctx.method === 'OPTIONS') {
    ctx.body = 200; //OPTIONS类型的请求直接返回200
  } else {
    await next();
  }
});



// token 处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if(err.status === 401){
      ctx.status = 200;		//失效token也返回200 根据个人喜好
      ctx.body = new ErrorModel(tokenFailInfo);
    }else{
      throw err;
    }
  })
})


app.use(koaJwt({
  secret: 'dtf'   // 密钥 jwtSecret 是一个字符串
}).unless({
  path: [
      /\/user\/login/,
      /\/user\/register/,
      /\/admin\/login/,
      /\/admin\/addSuperUser/,
      /\/user\/getOneUserByCardId/,
      /\/baggage\/*/,
      /\/airport\/*/,
      /\/flight\/*/,
  ]
}));


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// routes
app.use(userAPI.routes(), userAPI.allowedMethods())
app.use(flightAPI.routes(), flightAPI.allowedMethods())
app.use(airportAPI.routes(), airportAPI.allowedMethods())
app.use(superUserAPI.routes(), superUserAPI.allowedMethods())
app.use(baggageAPI.routes(), baggageAPI.allowedMethods())



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
