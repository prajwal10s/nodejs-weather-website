const path = require('path')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const express = require('express')

const port = process.env.PORT || 3000

const hbs = require('hbs')


console.log(__dirname)
// console.log(__filename)
console.log(path.join(__dirname, '../public'))

//define path for express config
const publicdirectoryPath = path.join(__dirname, '../public')

const app = express()


//setup handlebar engine and views path
app.set('view engine','hbs')

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)
app.set('views', viewsPath)


//setup static directory to serve
app.use(express.static(publicdirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yadavendra Sakharkar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Yadavendra Sakharkar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'If you are not able to find the correct location please provide more information in the address section separated by comma eg. state',
        name: 'Yadavendra Sakharkar'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address ){
        return res.send({
            error: 'You must provide an address'
        })
    }
    else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData, 
                    location,
                    address: req.query.address
                })
            })
        })
    }
})



app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yadavendra Sakharkar',
        errorMessage : 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yadavendra Sakharkar',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log('Server is up on port 3000')
})

