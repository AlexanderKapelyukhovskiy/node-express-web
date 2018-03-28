var express = require('express');

var app = express();

var port = process.env.PORT || 5000;
var navs = [
    { Link: '/Books', Text: 'Books' },
    { Link: '/Authors', Text: 'Authors' }
];

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

var bookRouter = require('./src/routes/bookRouter')(navs);
var adminRouter = require('./src/routes/adminRouter')(navs);

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);

app.get('/', function (req, res) {
    res.render('index', {navs: navs});
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});