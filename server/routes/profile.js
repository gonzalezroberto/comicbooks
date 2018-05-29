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

router.get('/loadposts', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    // Use the connection
    var userid = 82; // <--- using this for now as a example test
    //var userid = req.body.passport.user;   <---- this is the actual way to get user id from current user
    connection.query("select * from " + String(userid) + "posts order by id DESC", function (error, results, fields) {
      res.json(results)
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});


module.exports = router;
