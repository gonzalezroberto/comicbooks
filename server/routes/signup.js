var express = require('express');
var router = express.Router();
var passport = require('passport')
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

router.post('/signup', function(req, res, next) {
  var user = req.body;
  var email=user.email,pass=user.pass,first=user.firstname,last=user.lastname;
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM accounts WHERE username= ?', [email],
    function (error, results, fields) {
      if (error) throw error;
      if (Object.keys(JSON.stringify(results)).length == 2){ //if account does not exist
        connection.query('INSERT INTO accounts (firstname,lastname, username, password) \
        VALUES (?,?,?,?)', [first, last, email, pass], function (error, results, fields) {
          if (error) throw error;
        });

        console.log("Account created!");
        res.send("Account Created");
          }else{console.log("Account already exists!");}
        connection.release();
        });});});

  passport.serializeUser(function(user_id, done) {
    console.log("serializing");
    done(null, user_id);
  });

  passport.deserializeUser(function(user_id, done) {
    console.log("de serializing");
      done(null, user_id);
  });

module.exports = router;
