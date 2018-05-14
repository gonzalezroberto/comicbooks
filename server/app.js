const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const passport = require('passport');
var app = express();
var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session);
var validate = require('express-validator')
//var exphbs  = require('express-handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validate());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
//sessions
var options  = {
  host     : 'us-cdbr-iron-east-04.cleardb.net',
  user     : 'bb353640536722',
  password : 'f408fb6c',
  database : 'heroku_f8d562e61e70440'
};
var sessionStore = new MySQLStore(options);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  store: sessionStore,
  saveUninitialized: true,
  //cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());
//app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 60000 }}));

// view engine setup
//app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'handlebars');
app.use('/api', index);
app.get('*', (req, res) => {
  res.sendFile('build/index.html', { root: global });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
