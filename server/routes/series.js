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
router.post('/comics', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    connection.query('select * from comics where series=?',[req.body.series], function (error, results, fields) {
      res.json(results);
      connection.release();
      if (error) throw error;
    });
  });
});
router.post('/postcomment', function(req, res, next) {
  var d = new Date();
  var year=d.getFullYear(),month = d.getMonth()+1, day=d.getDate()
  var date=month+"-"+day+"-"+year
  var hour = d.getHours(), dayornight="am";
  if(parseInt(hour) > 11){dayornight="pm";}
  if(parseInt(hour) > 12){hour= (parseInt(hour)-12).toString()}
  var min = (d.getMinutes()).toString()
  if(min.length===1){min='0'+min;}
  var time = hour+":"+min+dayornight;
  pool.getConnection(function(err, connection) {
    connection.query("select * from accounts where id=?;", [req.session.passport.user], function (error, result, fields) {
      var posterInfo = result[0];
      connection.query("insert into comments (series, commenterid, comment,date,time,posterpic,postername) values(?,?,?,?,?,?,?);",
      [req.body.series,req.session.passport.user,req.body.comment,date,time,posterInfo.profilepicture,posterInfo.firstname],function (error, results, fields) {
        console.log(results)
        res.json(results)
        connection.release();
        if (error) throw error;
      });
    })
  });
});

router.post('/getcomments', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    connection.query("SELECT * FROM comments WHERE series=?;", [req.body.series], function (error, results, fields) {
      console.log(results)
      res.json(results)
      connection.release();
      if (error) throw error;
    })
  });
});
module.exports = router;
