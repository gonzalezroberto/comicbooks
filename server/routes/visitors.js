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
  console.log('visitors req.body', req.body)
  res.json(typeof req.session.passport !== 'undefined' && req.session.passport !== null);
});
router.post('/checkIfFollowed', function(req,res, next){
  var followerid = req.session.passport.user, followedid = req.body.receiverid;
  pool.getConnection(function(err, connection) {
    if (err) throw err;
  connection.query("select * from conections where follower=? and followed=?;", [followerid,followedid], function (error, results, fields) {
    console.log('checkIfFollowed resutls', results)
    if (error) throw error;
    if(results.length===0)
      {res.json(false)}
    else{res.json(true)};
    connection.release();
})
})
})
router.post('/loadfollowers', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    var userid = req.body.receiverid;
    connection.query("select * from conections where followed=?;", [userid], function (error, results, fields) {
      res.json(results)
      connection.release();
      if (error) throw error;
    });
  });
});
router.post('/loadfollowing', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    var userid = req.body.receiverid;
    connection.query("select * from conections where follower=?;", [userid], function (error, results, fields) {
      res.json(results)
      connection.release();
      if (error) throw error;
    });
  });
});
router.post('/follow', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log('follow req body', req.body);
    var followerid = req.session.passport.user, followedid = req.body.receiverid, followedInfo = req.body.receiverInfo;
    connection.query("select * from accounts where id=?;", [followerid], function (error, result, fields) {
      console.log('load followerid res', result)
      var followerInfo = result[0];
    connection.query("INSERT INTO conections (follower, \
      followed, followerpic, followedpic, followername,followedname) \
      VALUES (?,?,?,?,?,?);",
      [followerid, followedid,followerInfo.profilepicture,
        followedInfo.profilepicture, (followerInfo.firstname+' '+followerInfo.lastname),(followedInfo.firstname+' '+followedInfo.lastname)], function (error, results, fields) {
      res.json(true)
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
    });
  });
});
router.post('/loadposts', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    // Use the connection
    var userid = req.body.receiverid;   //<---- this is the actual way to get user id from current user
    connection.query("select * from posts where receiverid=? order by postid DESC", [userid], function (error, results, fields) {
      console.log('loadposts res', results)
      res.json(results)
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});
router.post('/makepost', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    var postername, posterpicture;
    connection.query("select * from accounts where id=?;",[req.session.passport.user], function (error, result, fields) {
      console.log('result', result);
      console.log('result[0]', result[0]);
      postername = result[0].firstname;
      posterpicture = result[0].profilepicture;
      var posterid = req.session.passport.user;  // <---- this is the actual way to get user id from current user
      var receiverid = req.body.receiverid;
      var content = req.body.content;
      var d = new Date();
      var year=d.getFullYear(),month = d.getMonth()+1, day=d.getDate()
      var date=month+"-"+day+"-"+year
      var hour = d.getHours(), dayornight="am";
      if(parseInt(hour) > 11){dayornight="pm";}
      if(parseInt(hour) > 12){hour= (parseInt(hour)-12).toString()}
      var min = (d.getMinutes()).toString()
      console.log('postername', postername)
      if(min.length===1){
        min='0'+min;}
      var time = hour+":"+min+dayornight;
      connection.query("INSERT INTO posts (posterid, receiverid, postername, posterpicture, content,date, time) VALUES (?,?,?,?,?,?,?);",[posterid, receiverid,postername, posterpicture,content,date,time], function (error, results, fields) {
        console.log('results', results);
         res.json(results)
        // And done with the connection.
        connection.release();
        // Handle error after the release.
        if (error) throw error;
        // Don't use the connection here, it has been returned to the pool.
      });
    });

  });
});
router.post('/deletepost', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    var postid = req.body.postid;
    connection.query("DELETE FROM posts WHERE postid=?;",[postid], function (error, results, fields) {
      console.log('results', results);
       res.json(results)
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});
router.post('/getuser', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log('getuser')
    console.log('userid', req.body)
    var userid = req.body.loadid

    connection.query('select * from accounts where id = ?;',[userid], function (error, results, fields) {

      console.log('results in getuser', results[0]);
      res.json(results[0]);
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});
module.exports = router;
