const express = require('express')
const morgan = require('morgan')
const tourRouting = require('./Routers/tourRoutes')
const userRouting = require('./Routers/userRoutes')
const reviewRouting = require('./Routers/reviewRoutes')
const viewRouting = require('./Routers/viewRoutes')
const bookingRouting = require('./Routers/BookingRoutes')
const app = express()
const path = require('path')
const compression = require('compression')



const cors = require('cors')
const cookieParser = require('cookie-parser') 
//--------------------------- configrations --------------------------- 
app.use(cookieParser());
app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))
app.use(cors())
app.use("morgan",(req,res,next)=>{
    next()
})

app.use(compression())


//--------------------------- Routers ---------------------------
app.use('/api/v1/tours',tourRouting)
app.use('/api/v1/users',userRouting)
app.use('/api/v1/reviews',reviewRouting)
app.use('/',viewRouting)
app.use('/v1',bookingRouting)

app.use('*',(req,res,next)=>{
    res.status(400).json({ 
        status:'faill',
        message:'INVALID URL'
    })
})








module.exports = app





