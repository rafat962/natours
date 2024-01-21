const express = require('express')
const tourController = require('../Controllers/tourControllers')
const auth = require('../Controllers/AuthControllers')


const Routing = express.Router()

//----------------- addtional Routs -----------------
Routing.route('/top5').get(tourController.top5,tourController.getAllTours)
Routing.route('/stats').get(tourController.top5,tourController.stats)



//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//----------------- CRUD Routs -----------------
Routing.route('/').get(tourController.getAllTours).post(tourController.createNewTour)
Routing.use(auth.protect)
Routing.route('/:id').get(auth.protect,tourController.getOneTour).delete(tourController.deleteTour).patch(tourController.updateTour)








module.exports = Routing