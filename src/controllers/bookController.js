var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var url = 'mongodb://localhost';

function bookController(bookService, navs) {
  function getIndex(req, res) {
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
  }

  function getById(req, res) {
    var id = new ObjectId(req.params.id);

    mongodb.connect(url, function (err, database) {
      if (err) {
        console.log(err);
        throw err;
      }
      var libraryAppDB = database.db('libraryApp');
      var collections = libraryAppDB.collection('books');
      collections.findOne({ _id: id }, function (err, book) {
        bookService.getBookById(book.bookId).then(function(details){
          book.details = details;
          res.render('bookView', { navs: navs, book: book });
        });
        
      });
    });
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return { getIndex: getIndex, getById: getById, middleware: middleware };
}

module.exports = bookController;