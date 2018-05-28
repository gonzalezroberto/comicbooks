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

router.post('/getarticle', function(req, res, next) {
pool.getConnection(function(err, connection) {
// Use the connection
console.log("id", req.body.newsId)
connection.query("SELECT * FROM newsfeed WHERE id=?;", [req.body.newsId], function (error, results, fields) {
  console.log(results)
  res.json(results[0])
  connection.release();
  if (error) throw error;

// And done with the connection.

// Handle error after the release.

// Don't use the connection here, it has been returned to the pool.
});
});
});

module.exports = router;
