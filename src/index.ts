import express from 'express';

const app = express();

app.set('view engine', 'ejs');

app.set('views', './public');

app.get('/', function(req, res) {
    res.render('index', { message: 'hello' });
});

app.listen(3333);