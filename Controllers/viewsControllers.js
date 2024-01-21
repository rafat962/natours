const Tour = require('../models/tourModel')
const User = require('../models/userModel')
const Booking = require('../models/bookingModel')


//------------------- Main page -------------------
exports.overview = async (req,res,next)=>{
    const Tours = await Tour.find()
    res.status(200).render('overview.pug',{
        Tours
    })
}

//------------------- onetour -------------------
exports.OneTour = async (req,res,next)=>{ 
    const tour = await Tour.findById(req.params.tourId).populate('reviews')
    for(review of tour.reviews){ 
    }
    res.status(200).render('Tour.pug',{
        tour
    })
}




//------------------- Login -------------------

exports.login = async (req,res,next) =>{
    res.status(200).render('login.pug')
}




//------------------- signup -------------------



exports.signup = async (req,res,next) =>{
    res.status(200).render('signup.pug')
}


//------------------- getme -------------------
exports.getme = async (req,res,next) =>{

    res.status(200).render('me.pug')
}
//------------------- get my tour -------------------


exports.getMytours = async (req,res,next)=>{
    //1/ find all bookings 
    const bookings = await Booking.find({user:req.user.id})

    //2/ find tours with returned id 

    const tourIDs = bookings.map(el => el.tour)
    const Tours = await Tour.find({_id: { $in:tourIDs}})

    res.status(200).render('overview.pug',{
        Tours
    })

} 

