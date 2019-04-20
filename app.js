const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('cookie-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const logger = require('morgan');
const app = express();
const routes = require('./routes/index')
const db = require('./config/db')

mongoose.Promise = global.Promise;
mongoose.connect(db.URL, {useNewUrlParser: true})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 文件上传中间件
app.use(multipart()); 


// 保持用户回话
app.use(session({
  secret: 'blog',
  url: db.URL,
  conllection: 'sessions'
}))

// 将路由处理交给routes文件下的index.js文件
routes(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
