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

router.get('/comics', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    connection.query('select * from comics', function (error, results, fields) {
      res.json(results);
      connection.release();
      if (error) throw error;
    });
  });
});
router.post('/comics', function(req, res, next) {
  var id = req.body.comicId
  console.log('post id: ' , id)
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM comics WHERE cid = ?;', [id], function (error, results, fields) {
      console.log('results',results);
      if(results.length !==0)
      {
        console.log('comic results:', results);
        res.json(results[0]);
      }
      else{res.json(false)}
      connection.release();
      if (error) throw error;
    });
  });
});
module.exports = router;
