var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var login = require('./login')
var signup = require('./signup')
var app = express();
var pool  = mysql.createPool({
  host     : 'us-cdbr-iron-east-04.cleardb.net',
  user     : 'bb353640536722',
  password : 'f408fb6c',
  database : 'heroku_f8d562e61e70440'
});
var passport = require('passport');
router.get('/login', function(req,res, next){
  res.json(typeof req.session.passport !== 'undefined' && req.session.passport !== null);
});
router.get('/logout', function(req,res, next){
  req.logout();
  res.json(false);
});

router.post('/login', function(req, res, next) {
  var user = req.body;
  var username=user.username,pass=user.password;
pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM accounts WHERE username= ? and password= ?;', [username, pass],
    function (error, results, fields) {
      if (error) throw error;
      var user_id = results[0].id;
      console.log('userid:', user_id);
      req.login(user_id, function(error){
        if (error) throw error;
  });
  res.json(req.isAuthenticated());
  connection.release();
});
});
});

passport.serializeUser(function(user_id, done) {
  console.log("serializing");
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  console.log("de serializing");
    done(null, user_id);
});
module.exports = router;
