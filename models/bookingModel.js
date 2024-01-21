const mongoose = require('mongoose')



const bookingShema = new mongoose.Schema({
    tour:{
        type:mongoose.Schema.ObjectId,
        ref:'Tour',
        required:[true,'Booking must be belong to a Tour']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'Booking must be belong to a Tour']
    },
    price:{
        type:Number,
        required:[true,'Booking must have a price.']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    paid:{
        type:Boolean,
        default:true
    }
})


bookingShema.pre(/^find/,function(next){
    this.populate({
        path:'tour',
        select:'name'
    })
    next()
})






const Booking = mongoose.model('Booking',bookingShema)







module.exports = Booking
