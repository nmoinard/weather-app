const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '320ede76bda0f105e5b33f7794e7b431';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/weather', function (req, res) {
  res.redirect('/')
})

app.post('/weather', function (req, res) {
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&units=metric&APPID=${apiKey}`;
	request(url, function (err, response, body) {
		if(err) {
			res.render('weather', {weather: null, error: 'Error, please try again'});
		} else {
			let weather = JSON.parse(body)
			if (weather.main == undefined) {
				res.render('weather', {weather: null, error: 'Error, please try again'});
			} else {
				let weatherText = `${JSON.parse(body).weather[0].description}`;
				let temp = Math.round(`${JSON.parse(body).main.temp}`);
				let humidity = `${JSON.parse(body).main.humidity}`;
				let logo = `http://openweathermap.org/img/w/${JSON.parse(body).weather[0].icon}.png`;
				//console.log(logo);
				//console.log(weatherText);
				console.log(JSON.parse(body));
				res.render('weather', {city: city, temp: temp, logo: logo, humidity: humidity, weather: weatherText, error: null});
			}
		}
	});

})


app.listen(3000, function () {
  console.log('Your weather app is listening on port 3000!')
})