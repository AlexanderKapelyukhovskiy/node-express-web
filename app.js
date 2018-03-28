var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;
var navs = [
    { Link: '/Books', Text: 'Books' },
    { Link: '/Authors', Text: 'Authors' }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret:'my_library_secret'}));

require('./src/config/passport.js')(app);

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

var bookRouter = require('./src/routes/bookRouter')(navs);
var adminRouter = require('./src/routes/adminRouter')(navs);
var authRouter = require('./src/routes/authRouter')(navs);

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {navs: navs});
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});