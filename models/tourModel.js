const mongoose = require('mongoose')
const Review = require('./reviewModel')

const tourSchema = new mongoose.Schema({
    startLocation:{
        description:String,
        type:{type:String,default:'Point'},
        coordinates:[Number],
        address:String
    },
    ratingsAverage:{
        min:0,
        max:5,
        type:Number
    },
    ratingsQuantity:Number,
    images:[String],
    startDates:[Date],
    name:{
        type:String,
        unique:true,
        require:[true,'you Should enter the name of tour']
    },
    duration:Number,
    maxGroupSize:Number,
    difficulty:{
        type:String,
        enum:['difficult','medium','easy']
    },
    guides:[{
        type:mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    price:Number,
    summary:String,
    description:String,
    imageCover:String,
    locations:[{
        description: String,
        type: {type:String,default:'Point'},
        coordinates: [],
        day: Number
    }],
    NumofSearching:Number
})
tourSchema.set('toJSON', { getters: true });
tourSchema.set('toObject', { getters: true });

// pre find example 

tourSchema.pre(/^find/,function(next){
    this.populate('guides')
    next()
})



// ************* POST example *************
// tourSchema.post(/^find/,function(doc){
//     doc.NumofSearching+=1
//     doc.save()
//     console.log(doc.NumofSearching)
// })

// virtual example 
// tourSchema.virtual('zzzz').get(function(){
//     console.log(this.ratingsAverage)
//     return this.ratingsAverage
// })



// tourSchema.pre(/^find/, function (next) {
//     this.populate('reviews');
//     next();
// });
tourSchema.virtual('reviews', {
    ref: 'Review', // The model to use for the relationship
    localField: '_id', // The field in the current model
    foreignField: 'tour', // The field in the referenced model
});




const Tour = mongoose.model('Tour',tourSchema)
module.exports = Tour