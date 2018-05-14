var express = require('express');
var router = express.Router();
var passport = require('passport')
var mysql = require('mysql');
var app = express();
var pool  = mysql.createPool({
  host     : 'us-cdbr-iron-east-04.cleardb.net',
  user     : 'bb353640536722',
  password : 'f408fb6c',
  database : 'heroku_f8d562e61e70440'
});

// Access the session as req.session
router.get('/comics', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query('select * from comics', function (error, results, fields) {
      return res.json(results)
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});
router.get('/profile',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("IN THE GET ROUTER.post");
    //res.send('YOURE LOGGED IN');
  });
// router.get('/home', function(req, res) {
//
//  //req.render('Home');
// //res.render('home', {title:'Home'});
// });

router.post('/login', function(req, res, next) {
  var user = req.body, missFields = '';
  var email=user.email,pass=user.pass;
  if(email.length == 0){
      missFields += "Missing email\n";}
  if(pass.length == 0){
      missFields += "Missing password\n";}
  if(missFields.length != 0){
    res.send(missFields);
  }
  else{
  var accountExists = true;
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM accounts WHERE email= ? and password= ?;', [email, pass],
    function (error, results, fields) {
      if (error) throw error;
      if (Object.keys(JSON.stringify(results)).length == 2){ //if the json object is returned by db is empty
        accountExists = false;
        res.send("Account does not exist, Please Sign up!");
      } else{
        if (error) throw error;
        console.log(results[0]);
        var user_id = results[0].id;
        req.login(user_id, function(err){
          res.send({redirect: '/profile'});
        })

      }
    connection.release();
    });
  });
  }
 });

 passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});
router.post('/signup', function(req, res, next) {
  var user = req.body, missFields = '';
  var email=user.email,pass=user.pass,
  first=user.firstname,last=user.lastname;

  if(first.length == 0){
    missFields += "Missing first name\n";}
  if(last.length == 0){
    missFields += "Missing last name\n";}
  if(email.length == 0){
      missFields += "Missing email\n";}
  if(pass.length == 0){
      missFields += "Missing password\n";}
  if(missFields.length != 0){
    res.send(missFields);
  }
  else{
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM accounts WHERE email= ?', [email],
    function (error, results, fields) {
      if (error) throw error;
      if (Object.keys(JSON.stringify(results)).length == 2){ //if the json object is returned by db is empty
        connection.query('INSERT INTO accounts (firstname,lastname, email, password) \
        VALUES (?,?,?,?)', [first, last, email, pass], function (error, results, fields) {
          if (error) throw error;
        });
        res.send("Account created!");
      }else{res.send("Account already exists!");}

    connection.release();
    });

  });
}
 });
module.exports = router;
