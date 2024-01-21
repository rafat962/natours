const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel')
const stripe = require('stripe')('sk_test_51OafveHJfeXTZvCZTIQ6uugWhvbbxzXdk9OegT2O4VGZ2xp3TyRfLb7VucS60qLCh5lSWebxsE8BBIsyQTYZsmvo00QvJISpid');
const ApiFactory = require('../utils/apiFactory')

//------------------- payment -------------------


exports.payment = async (req, res) => {
    try{
        const tour = await Tour.findById(req.params.id)
        const bookings = await Booking.find({tour:req.params.id})
        if(bookings.length>=tour.maxGroupSize){
            return next(new Error('comletder😞'))
        }
        const session = await stripe.checkout.sessions.create({
            line_items: [{ 
                price_data: {
                currency: 'usd',
                unit_amount: tour.price,
                product_data: {
                    name: tour.name,
                    description: tour.description, 
                    images: [`img/tours/${tour.imageCover}`],
                },
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.id}&user=${req.user.id}&price=${tour.price}`,
            cancel_url: `${req.protocol}://${req.get('host')}/`,
        });
        res.redirect(303, session.url);
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
}




//------------------- create new book -------------------


exports.createBookingCheckout = async (req,res,next) =>{
    const {tour,user,price} = req.query;
    if(!tour && !user && !price)return next()
    await Booking.create({tour,user,price})

    res.redirect(`${req.protocol}://${req.get('host')}`)
    next()
}



//------------------------- CRUD operations -------------------------
//------------------- Get All Bookings -------------------

exports.getAllBookings = ApiFactory.getAll(Booking) 

//------------------- Get one Booking -------------------


exports.getOneBooking = ApiFactory.getOne(Booking,'Booking')

//------------------- Create Booking -------------------

exports.createNewBooking = ApiFactory.createNew(Booking)

//------------------- Delete Booking -------------------

exports.deleteBooking = ApiFactory.delete(Booking)

//------------------- Update Booking -------------------

exports.updateBooking = ApiFactory.update(Booking)
//----------------------------------------------------------------------------------------------------



//------------------- Get Booking based on user -------------------


exports.getUserBookings = async (req,res,next)=>{
    try{
        const userID = req.params.id
        const booking = await Booking.find({user:userID})
        res.status(200).json({
            status:'success',
            result:booking.length,
            booking
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
}

//------------------- Get Tour based on user -------------------


exports.getTourBookings = async (req,res,next)=>{
    try{
        const tourID = req.params.id
        const booking = await Booking.find({tour:tourID})
        res.status(200).json({
            status:'success',
            result:booking.length,
            booking
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
}


