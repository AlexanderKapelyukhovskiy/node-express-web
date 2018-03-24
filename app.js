var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
//app.use(express.static('src/views'));
app.set('views', './src/views');
//app.set('view engine', 'jade');
// var handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({extname: '.hbs'}));
// app.set('view engine', '.hbs');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {title: 'Hello from render!', list: ['a', 'b', 'c']});
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);

});