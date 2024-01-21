const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const { promisify } = require('util')
const Email = require('../utils/eamil')
const multer = require('multer')

const sign = async (user)=>{
    const token = await jwt.sign({id:user.id},'rafat',{expiresIn:'2h'})
    return token
}




//------------------- Protect -------------------

exports.protect = async (req,res,next)=>{
    try{
        let token; 
        if(req.headers.authorization){
            token = req.headers.authorization.split(' ')[1]
        } else if (req.headers.cookie){
            token = req.headers.cookie.slice(4)
        }
        if(!token){
            return next(new Error('there is not token'))
        }
        // ------ Check if token valied
        const verify = jwt.verify(token,'rafat')
        if(!verify){
            return next(new Error('INVALID token'))
        }
        // ------ Check if user valied
        const decoded =  await promisify(jwt.verify)(token, 'rafat')
        const user = await User.findById(decoded.id)
        if(!user){
            return next(new Error('INVALID user'))
        }
        req.user = user 
        next()
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        })
    }
}

//------------------- Login -------------------
exports.login = async (req,res,next)=>{
    try{
        const {email,password} = req.body
        // ------ Check if user exsist
        const user = await User.findOne({email:email}).select('password')
        if(!user){
            return next(new Error('there is no user with this name'))
        }
        // ------ Check if Password Correct
        const passwordCheck = await  user.correctPasswordCompare(password,user.password)
        if(!passwordCheck){
            return next(new Error('Invalid Password'))
        } 
        // ------ return Token
        res.locals.user = user
        const token = await sign(user)
        res.cookie('jwt',token);
        res.status(200).json({
            status:'success',
            token
        })
    }catch(err){
        res.status(404).json({
            status:"login failed",
            message:err.message
        })
    }
}

//------------------- signUp -------------------



const multerStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/img/users')
    },
    filename:(req,file,cb)=>{
        const ext = file.mimetype.split('/')[1]
        cb(null,`user-${req.user.id}-${Date.now()}.${ext}`)
    }
})

const multerFilter = (req,file,cb) =>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new Error('you cant upload this ext'),false)
    }
}

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
})


exports.signUp = async (req,res,next)=>{
    try{
        if(!req.body.password){
            return next(new Error('you should provide password'))
        }
        if(!req.body.confirmPassword){
            return next(new Error('you should provide confirmPassword'))
        }
        const user = await User.create(req.body)
        if(req.file){
            upload.single('photo')(req,res,async function(err){
                if(err){
                    throw new Error(err.message)
                }
                user.photo = req.file.filename
                await user.save()
            })
        }
        if(user){
            const token = await sign(user)
            Email.sendmailWelcom({
                email:user.email,
                username:user.name
                })
            res.status(200).json({
                status:'success',
                token
            })
        }
    }catch(err){
        res.status(404).json({
            status:"SignUp failed",
            message:err.message
        })
    }
}

//------------------- resetPassword -------------------

exports.resetPassword = async (req,res,next) =>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user) return next(new Error('there is no user'))

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken
        user.resetPasswordExpires = Date.now() + 3600000
        await user.save()
        Email.sendmailreset({
            token:resetToken,
            email:user.email
        }) 
        res.status(200).json({
            state:'success',
            message:'Reset token generated and sent to user',
            data:      user.resetPasswordToken
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        })
    }
}

exports.resetPassword2 = async(req,res,next) =>{
    try{
        const token = req.params.token
        if(!token) return next(new Error('you should enter your token'))
        const user = await User.findOne({resetPasswordToken : token}).select('password')
        if(!user) return next(new Error('invalied password'))
        if(user.resetPasswordToken>=Date.now()) return next(new Error('expired'))
        user.password = req.body.password,
        user.confirmPassword = req.body.confirmPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save()
        res.status(200).json({
            state:'success',
            user
        })
    
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        })
    }
}

//------------------- UpdatePassword -------------------

exports.updatePassword = async (req,res,next)=>{
    try{
        const user2 = req.user
        const user = await User.findById(user2.id).select('password')
        // ------ Check if Password Correct
        const passwordCheck = await  user.correctPasswordCompare(req.body.pastPassword,user.password)
        if(!passwordCheck){
            return next(new Error('Invalid Password'))
        }
        user.password = req.body.password
        user.confirmPassword = req.body.confirmPassword
        await user.save()
        const token = await sign(user)
        res.status(200).json({
            state:'success',
            token
        })
    
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        })
    }
}


//------------------- isLoggedin -------------------

exports.islogedIn = async (req,res,next) =>{
    try{
        const token = req.headers.cookie.slice(4)
        if(token){
             // ------ Check if token valied
        const verify = jwt.verify(token,'rafat')
        if(!verify){
            return next(new Error('INVALID token'))
        }
        // ------ Check if user valied
        const decoded =  await promisify(jwt.verify)(token, 'rafat')
        const user = await User.findById(decoded.id)
        res.locals.user = user
        req.user = user
        next()
        }
    }catch(err){
        next()
    }
}




