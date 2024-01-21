const express = require('express')
const viewControllers = require('../Controllers/viewsControllers')
const auth = require('../Controllers/AuthControllers')
const multer  = require('multer')
const booking = require('../Controllers/bookingController')

const Routing = express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, '/img/users')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })




//------------------- Login -------------------
Routing.route('/login').get(viewControllers.login)
Routing.route('/signup').get(viewControllers.signup)





//------------------- main and others ------------------- 
Routing.route('/').get(booking.createBookingCheckout,auth.islogedIn,viewControllers.overview)
Routing.route('/me').get(auth.islogedIn,viewControllers.getme)
Routing.route('/myTours').get(auth.islogedIn,viewControllers.getMytours)
Routing.route('/:tourId').get(auth.islogedIn,viewControllers.OneTour)


module.exports = Routing

