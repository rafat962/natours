const Review = require('../models/reviewModel')
const ApiFactory = require('../utils/apiFactory')
const handle = require('../utils/handleAsync')
const Booking = require('../models/bookingModel')




//------------------------- CRUD operations -------------------------
//------------------- Get All Reviews -------------------

exports.getAllReviews = ApiFactory.getAll(Review)

//------------------- Get one Review -------------------

exports.getOneReview = ApiFactory.getOne(Review,'review')

//------------------- Create Review -------------------

exports.createNewReview = handle(async (req,res,next)=>{
    const users = req.user
    const booking = await Booking.findOne({user : users , tour:req.params.tourId})
    if(!booking){
        res.status(200).json({
            statue:'fail',
            message:"you can't make review for tour which you haven't reserve"
        })
    }
    const review = await Review.create({
        review : req.body.review,
        rating: req.body.rating,
        tour : req.params.tourId,
        user : users.id 
    })
    return {
        statu:'success',
        review
    }
})

//------------------- Delete Review -------------------

exports.deleteReview = ApiFactory.delete(Review)

//------------------- Update Review -------------------

exports.updateReview = ApiFactory.update(Review)
//----------------------------------------------------------------------------------------------------