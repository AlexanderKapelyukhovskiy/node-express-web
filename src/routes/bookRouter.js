var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var router = function (navs) {
    bookRouter.use(function (req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    });
    bookRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://alkapa:alkapamongodb@cluster0-shard-00-00-xxzqp.mongodb.net:27017,cluster0-shard-00-01-xxzqp.mongodb.net:27017,cluster0-shard-00-02-xxzqp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
            mongodb.connect(url, function (err, database) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                var libraryAppDB = database.db('libraryApp');
                var collections = libraryAppDB.collection('books');
                collections.find({}).toArray(function (err, results) {
                    res.render('bookListView', { navs: navs, books: results });
                });
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost';

            mongodb.connect(url, function (err, database) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                var libraryAppDB = database.db('libraryApp');
                var collections = libraryAppDB.collection('books');
                collections.findOne({ _id: id }, function (err, results) {
                    res.render('bookView', { navs: navs, book: results });
                });
            });


        });

    return bookRouter;
};

module.exports = router;