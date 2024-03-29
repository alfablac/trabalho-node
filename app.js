const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');


const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const listsRouter = require('./routes/lists');
const productsRouter = require('./routes/products');
const tasksRouter = require('./routes/tasks');

 const app = express();
// const http = require('http').createServer(app)
// http.listen(80, () => {
//   console.log('Listening on port 80')
// })


require('./configs/google.strategy');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(require('express-session')({ secret: 'shhhh...', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/lists', listsRouter);
app.use('/tasks', tasksRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

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
