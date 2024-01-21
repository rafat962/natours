const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'you should enter your name']
    },
    email:{
        type:String,
        require:[true,'you should enter your email'],
        unique:true,
        validate:{
            validator:validator.isEmail,
            message: 'Please enter a valid email address'
        }
    },
    role:{
        type:String,
        enum:['user','admin','guide','lead-guide'],
        default:'user'
    },
    active:{
        type:Boolean,
        default:true
    },
    photo:String,
    password:{
        type:String,
        require: [true, 'you should enter your password'],
        select:false,
        minlength:2
    },
    confirmPassword:{
        type:String,
        require:[true,'you should enter your Confirmpassword'],
        validate:{ 
            validator:function(v){
                return v === this.password
            },
            message:'Password and Confirm Password do not match'
        }
    },
    resetPasswordToken :String,
    resetPasswordExpires:Date
})

UserSchema.pre(/^find/,function(next){
    this.select('-password')
    this.select('-confirmPassword')

    next()
})


UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12)
    this.confirmPassword = undefined
    next()
})


UserSchema.methods.correctPasswordCompare = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};




const User = mongoose.model('User',UserSchema)


module.exports = User

