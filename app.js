
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');

var city = '';
var cityDescription = [];
var cityIcon = [];
var cityTemperature = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {

    });
});

app.post('/', (req, res) => {

    const query = req.body.city;
    const ApiKey = '07e52dc35328a5d703c21b26a872fed4';
    const units = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&APPID=' + ApiKey + '&units=' + units;

    https.get(url, function (response) {

        console.log(response.statusCode);

        response.on('data', function (data) {

            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const iconImg = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'

            cityTemperature.push(temperature);
            cityDescription.push(description);
            cityIcon.push(iconImg);




            if (response.statusCode === 200) {
                res.render('weather', {
                    city: query,
                    cityDescription: cityDescription[cityDescription.length - 1],
                    cityIcon: cityIcon[cityIcon.length - 1],
                    cityTemperature: cityTemperature[cityTemperature.length - 1]
                });

            }
            else {
                res.render('failure', {
                    city: query,
                    cityDescription: cityDescription[cityDescription.length - 1],
                    cityIcon: cityIcon[cityIcon.length - 1],
                    cityTemperature: cityTemperature[cityTemperature.length - 1]
                });
            }



        })
    });
});

app.post('/weather', function (req, res) {

    res.redirect('/');
});

app.post('/failure', function (req, res) {

    res.redirect('/');
});



app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});

