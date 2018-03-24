var express = require('express');

var app = express();

var port = process.env.PORT || 5000;
var bookRouter = express.Router();

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

var navs = {
    title: 'Hello from render!',
    navs: [
        { Link: '/Books', Text: 'Books' },
        { Link: '/Authors', Text: 'Authors' }   
    ]
};

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
        res.render('books', {navs: navs, books: books});
    });

bookRouter.route('/single')
    .get(function(req, res){
        res.send('Hello Single Book');
    });

app.use('/Books', bookRouter);



app.get('/', function (req, res) {
    res.render('index', navs);
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);

});