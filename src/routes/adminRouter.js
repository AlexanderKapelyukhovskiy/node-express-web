var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
  {
    title: 'War and Peace',
    ganre: 'Historial Fiction',
    author: 'Lev Nikolaevich Tolstoy',
    bookId: 656,
    read: false
  },
  {
    title: 'Les Miserables',
    ganre: 'Historial Fiction',
    author: 'Vitor Hugo',
    bookId: 24280,
    read: false
  },
  {
    title: 'The Time Machine',
    ganre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'A Journey into the Center of the Earth',
    ganre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  },
  {
    title: 'The Dark World',
    ganre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
  }];

var router = function (navs) {

  adminRouter.route('/addBooks')
    .get(function (req, res) {
      var url = 'mongodb://localhost:27017/libraryApp';
      //var url = 'mongodb://alkapa:alkapamongodb@cluster0-shard-00-00-xxzqp.mongodb.net:27017,cluster0-shard-00-01-xxzqp.mongodb.net:27017,cluster0-shard-00-02-xxzqp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
      //mongodb://alkapa:alkapamongodb@cluster0-shard-00-00-xxzqp.mongodb.net:27017,cluster0-shard-00-01-xxzqp.:27017,cluster0-shard-00-02-xxzqp.mongodb.net:27017/admin?ssl=true&replicaSet=Mycluster0-shard-0&authSource=admin
      mongodb.connect(url, function (err, database) {
        if(err) {
          console.log(err);
          throw err;
        }
        var libraryAppDB = database.db('libraryApp');
        var collections = libraryAppDB.collection('books');
        collections.insertMany(books, function (err, results) {
          res.send(results);
          database.close();
        });
      });
    });

  return adminRouter;
};

module.exports = router;