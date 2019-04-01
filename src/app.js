const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname);
// console.log(__filename);

// define express paths for config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../templates/views');
const partialpath = path.join(__dirname, '../templates/partials');
const app = express();
const port = process.env.PORT || 3000;

// set up handle bar engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialpath);

// set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        tiltle: 'weather app',
        name: 'chirag girdhar'
    });
});
// app.get('',(req, res) => {  // since we are using index.html from express static method
//     res.send('hello express');
// });

// app.get('/help',(req, res) => {
//     res.send('Help Page');
// });

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page hbs render',
        name: 'chirag girdhar'
    });
});

// app.get('/about',(req, res) => {
//     res.send('<h1>About Page</h1>');
// });

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'chirag girdhar'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        });
    }

    geocode(req.query.address, (error, { longitute, latitute, location } = {}) => {

        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitute, longitute, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        title: '404',
        name: 'chirag girdhar',
        errorMessage: 'Help article Not found'
    });
})

app.get('*', (req, res) => {
    res.render('404Page', {
        title: '404',
        name: 'chirag girdhar',
        errorMessage: 'Page Not found'
    });
});

app.listen(port, () => {
    console.log('server is up at 3000 port');
});