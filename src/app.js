const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views path location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'priya'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'priya'
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'priya'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'you must provide address!!!!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location }= {})=>{
        
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })  
    // res.send({
    //     address: req.query.address
    // })
})

app.get('/products', (req, res)=>{
    if (!req.query.search) {
       return res.send({
            error:'you must provide a search term!!!!'
        })
    } 
    res.send({
        products: []
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMessage : 'Help article not found',
        title: '404',
        name: 'praveen'
    })
})
app.get('*',(req, res) => {
    res.render('404',{
        errorMessage : 'page not found',
        title: '404',
        name: 'praveen'

    })
})

app.listen(3000, () => {
    console.log('Server Started!!!!')
})




// app.get('/help', (req, res) => {
    //     res.send([{
    //         name: 'Praveen',
    //         Age: 23,
    //         mobile: 8790996046
    // }])
    // })
    
    // app.get('/about', (req, res) => {
    //     res.send('<h2>About Page!!!!</h2>')
    // })