var express = require('express');

var mongodb = require('mongodb').MongoClient;
var debug = require('debug')('app:aithRouter');
var passport = require('passport');

var authRouter = express.Router();
function router(nav) {
  authRouter.route('/signUp')
    .post(function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      var url = 'mongodb://localhost';
      var dbName = 'libraryApp';

      mongodb.connect(url, function (err, database) {
        if (err) {
            console.log(err);
            throw err;
        }
        var libraryAppDB = database.db(dbName);

        var collection = libraryAppDB.collection('users');
        var user = {username: username, password: password};

        collection.insertOne(user, function (err, results) {
          req.login(results.ops[0], function(){
            res.redirect('/auth/profile');
          });
        });
      });

      //res.send(req.body);
    });
  authRouter.route('/signIn')
    .get(function(req, res){
      res.render('signinView', {navs: nav, title: 'Sign In'});
    })
    .post(passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/'
      }));
  authRouter.route('/profile')
    .get(function(req, res) {
      res.send(req.user);
    });
  
  return authRouter;
}

module.exports = router;