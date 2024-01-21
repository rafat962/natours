const express = require('express')
const auth = require('../Controllers/AuthControllers')
const booking = require('../Controllers/bookingController')




const Routing = express.Router()




//----------------- Auth Routs -----------------

Routing.route('/create-checkout-session/:id').get(auth.protect,booking.payment)
//----------------- CRUD Routs -----------------

Routing.route('/book').get(booking.getAllBookings)
Routing.route('/book/:id').get(booking.getOneBooking).delete(booking.deleteBooking).patch(booking.updateBooking)

Routing.route('/user/:id/book').get(booking.getUserBookings)
Routing.route('/tour/:id/tour').get(booking.getTourBookings)




module.exports = Routing
