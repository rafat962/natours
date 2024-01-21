const fs = require('fs')
const mongoose = require('mongoose')
const Tour = require('./models/tourModel')
const User = require('./models/userModel')
const Review = require('./models/reviewModel')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });



mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successfully'));






const file = fs.readFileSync('./dev-data/data/reviews.json', 'utf-8')


const tours = JSON.parse(file)


const importData = async(req,res,next)=>{
    try{
        await Review.create(tours,{validateBeforeSave:false})
        console.log('upload-sucess')
    } catch(err){
        console.log('upload-no-sucess')
        console.log(err.message)
    }
    process.exit();
}

const deleteData = async ()=>{
    try{
        await Review.deleteMany()
        console.log('delete-ucess')
    }catch(err){
        console.log('delete-no-sucess')
        console.log(err)
    }
    process.exit();
}


importData()






