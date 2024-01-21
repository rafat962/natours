const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    review: String,
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 4.5,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
    },
});

ReviewSchema.pre(/^find/,function(next){
    this.populate('user')
    next()
})


// post example
ReviewSchema.post('save',async function(doc,next){
    await doc.constructor.calcAverage(doc.tour)
    next()
})

ReviewSchema.post('remove',async function(doc,next){
    await doc.constructor.calcAverage(doc.tour)
    next()
})




ReviewSchema.statics.calcAverage = async function(tourId){
    const Tour = require('./tourModel')
    const state = await this.aggregate([
        {
            $match :  { tour: tourId }
        },
        {
            $group:{
                _id:'$tour',
                nrating:{$sum :1},
                avgrating:{$avg : '$rating'}
            }
        }
    ])
    if(state.length>0){
        await Tour.findByIdAndUpdate(tourId,{
            ratingsAverage : state[0].avgrating.toFixed(1),
            ratingsQuantity : state[0].nrating
        })
    } else{
        await Tour.findByIdAndUpdate(tourId,{
            ratingsAverage : 0,
            ratingsQuantity : 4.5
        })
    }
}





const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
