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

router.post('/makepost', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    var userid = 82;
    var dataposted = new Date();
    connection.query("insert into " + String(userid) + "posts (content, dateposted) values (" + '\''+ "I think I made it work now."/*String(content)*/ + '\'' + "," + '\''+ String(dateposted) +'\''+ ");", function (error, results, fields) {
      //return res.json(results)
      // And done with the connection.
      connection.release();
      if (error) throw error;
    });
  });
});

router.get('/loadposts', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    // Use the connection
    var userid = 82;
    connection.query("select * from " + String(userid) + "posts order by id DESC", function (error, results, fields) {
      return res.json(results)
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});


router.get('/makepost', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    // Use the connection
    var userid = 82; // get user id
    var content = req.body.user.content;
    var dataposted = new Date();

    connection.query("insert into " + String(userid) + "posts (content, dateposted) values (" + String(content) + "," + String(dateposted) + ");", function (error, results, fields) {
       res.json(results)
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

router.get('/getuser', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    // Use the connection
    var id = 82; // get the id
    connection.query('select * from accounts where id = ' + String(id), function (error, results, fields) {
      res.json(results[0]);
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});

router.get('/loadnews', function(req, res, next) {
pool.getConnection(function(err, connection) {
// Use the connection
connection.query("select * from newsfeed order by id DESC", function (error, results, fields) {
  res.json(results)
  connection.release();
  if (error) throw error;

// And done with the connection.

// Handle error after the release.

// Don't use the connection here, it has been returned to the pool.
});
});
});


module.exports = router;
