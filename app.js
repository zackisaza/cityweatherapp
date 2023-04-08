
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', { foo: 'FOO' });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

