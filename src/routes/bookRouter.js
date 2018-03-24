var express = require('express');

var router  = function(navs) {
    var bookRouter = express.Router();

    var books = [
    {
        title: 'War and Peace',
        ganre: 'Historial Fiction',
        author: 'Lev Nikolaevich Tolstoy',
        read: false
    },
    {
        title: 'Les Miserables',
        ganre: 'Historial Fiction',
        author: 'Vitor Hugo',
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
    }
    ];

    bookRouter.route('/')
    .get(function(req, res){
        res.render('bookListView', {navs: navs, books: books});
    });

    bookRouter.route('/:id')
    .get(function(req, res){
        var id = req.params.id;
        res.render('bookView', {navs: navs, book: books[id]});
    });

    return bookRouter;
};

module.exports = router;