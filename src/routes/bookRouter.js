var express = require('express');
var bookRouter = express.Router();
var controller = require('../controllers/bookController');
var bookService = require('../services/goodreadsService');

var router = function (navs) {
    var bookActions = controller(bookService, navs);

    bookRouter.use(bookActions.middleware);

    bookRouter.route('/').get(bookActions.getIndex);

    bookRouter.route('/:id').get(bookActions.getById);

    return bookRouter;
};

module.exports = router;