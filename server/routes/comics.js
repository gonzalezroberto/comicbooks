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
router.get('/comics', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query('select * from comics', function (error, results, fields) {
      res.json(results);
      connection.release();
      if (error) throw error;
    });
  });
});
router.post('/update', function(req, res, next) {
  var comic = req.body.comicchange;
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query("UPDATE comics SET series=?, \
      title=?, coverArt=?, publisher=?, datePublished=?, writers=?, coverArtists=?, editors=?,\
    characters=?,synopsis=? WHERE cid=?;",
      [comic.series, comic.title, comic.coverArt, comic.publisher,comic.datePublished, comic.writers,
        comic.coverArtists, comic.editors, comic.characters,
        comic.synopsis, comic.cid], function (error, results, fields) {
      res.json('cool');
      if (error) throw error;
      connection.release();
    });
  });
});
router.post('/submitcomic', function(req, res, next) {
  var comic = req.body.comic;
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query("INSERT INTO comics (series, \
      title, coverArt, publisher, datePublished, writers, coverArtists, editors,\
    characters,synopsis) VALUES (?,?,?,?,?,?,?,?,?,?);",
      [comic.series, comic.title, comic.img, comic.publisher,comic.datepublished, comic.writer, comic.artist, comic.editor, comic.characters,
        comic.synopsis], function (error, results, fields) {
      res.json('cool');
      if (error) throw error;
      connection.release();
    });
  });
});
router.post('/rating', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query("INSERT INTO ratings (rate, comicid) VALUES (?,?);",
      [req.body.rating, req.body.comicId], function (error, results, fields) {
      if (error) throw error;
    });
    connection.query("select * from ratings where comicid=?;",
      [req.body.comicId], function (error, results, fields) {
        if (err) throw err;
      var ratings = results.slice();
      var total = 0;
      for (var i = 0; i < ratings.length; i++) {total += ratings[i].rate}
      var sum = (total/ratings.length)
      if (error) throw error;
      connection.query("update comics set rating=? where cid=?;",
        [sum,req.body.comicId], function (error, result, fields) {
        if (error) throw error;
        res.json("cool")
      });
    });
      connection.release();
  });
  });

router.post('/getrating', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query("select rating from comics where cid=?;",
      [req.body.comicId], function (error, results, fields) {
      res.json(results[0].rating);
      if (error) throw error;
      connection.release();
    });
  });
});
router.post('/comics', function(req, res, next) {
  var id = req.body.comicId
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM comics WHERE cid = ?;', [id], function (error, results, fields) {
      if(results.length !==0)
      {
        res.json(results[0]);
      }
      else{res.json(false)}
      connection.release();
      if (error) throw error;
    });
  });
});
module.exports = router;
