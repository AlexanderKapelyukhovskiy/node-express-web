var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  }, function(username, password, done){

    var url = 'mongodb://localhost';

    mongodb.connect(url, function (err, database) {
        if (err) {
            console.log(err);
            throw err;
        }
        var libraryAppDB = database.db('libraryApp');
        var collections = libraryAppDB.collection('users');
        collections.findOne({ username: username }, function (err, user) {
          if(user && user.password === password) {
            done(null, user); 
          } else {
            done(null, false);
          }
        });
    });

    var user = {username: username, password: password};
    
  }));
};