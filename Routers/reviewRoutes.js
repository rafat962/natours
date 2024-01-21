const express = require('express')
const reviewControler = require('../Controllers/reviewControllers')
const Auth = require('../Controllers/AuthControllers')


const Routing = express.Router()



Routing.route('/').get(reviewControler.getAllReviews)
Routing.route('/:id').get(reviewControler.getOneReview).delete(reviewControler.deleteReview)
Routing.route('/:tourId/reviews').patch(Auth.protect,reviewControler.updateReview).post(Auth.protect,reviewControler.createNewReview)


module.exports = Routing  



