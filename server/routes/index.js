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
router.get('/loadusers', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query("select * from accounts;", function (error, results, fields) {
      res.json(results)
      connection.release();
      if (error) throw error;
    });
  });
});
router.get('/getuser', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    var userid = req.session.passport.user
    connection.query('select * from accounts where id = ?;',[userid], function (error, results, fields) {
      console.log('results in getuser', results[0]);
      res.json(results[0]);
      connection.release();
      if (error) throw error;
    });
  });
});
router.get('/loadnews', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query("select * from newsfeed order by id DESC", function (error, results, fields) {
      res.json(results)
      connection.release();
      if (error) throw error;
    });
  });
});


module.exports = router;
