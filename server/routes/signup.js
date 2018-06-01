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
router.get('/login', function(req,res, next){
  res.json(typeof req.session.passport !== 'undefined' && req.session.passport !== null);
});
router.post('/signup', function(req, res, next) {
  var user = req.body;
  var username=user.username,pass=user.pass,first=user.firstname,last=user.lastname,pic="https://imageshack.com/a/img540/7545/KQQN7U.jpg";
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM accounts WHERE username= ?', [username],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length === 0){ //if account does not exist
        connection.query('INSERT INTO accounts (firstname,lastname, username, password, profilepicture) \
        VALUES (?,?,?,?,?)', [first, last, username, pass, pic], function (error, results, fields) {
          if (error) throw error;
          console.log(results)
        });
        res.send("Account Created!");
      }else{ res.send("Account already exists!");}
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
