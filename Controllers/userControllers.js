const User = require('../models/userModel')
const ApiFactory = require('../utils/apiFactory')
const multer = require('multer')

//------------------------- CRUD operations -------------------------
//------------------- Get All User -------------------

exports.getAllUsers = ApiFactory.getAll(User)

//------------------- Get one User -------------------

exports.getOneUser = ApiFactory.getOne(User)

//------------------- Create User -------------------

exports.createNewUser = ApiFactory.createNew(User)

//------------------- Delete User -------------------

exports.deleteUser = ApiFactory.delete(User)

//------------------- Update User -------------------

exports.updateUser = ApiFactory.update(User)
//----------------------------------------------------------------------------------------------------

//------------------- Get Me -------------------
exports.getme = async (req,res,next) =>{
    try{
        const me = req.user
        res.status(200).json({
            status:'success',
            data:me
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        })
    }
}

//------------------- upload images -------------------


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


exports.uploadimage = async(req,res,next)=>{
    try{
        
        upload.single('photo')(req,res,async function(err){
            if(err){
                throw new Error(err.message)
            }
            req.user.photo = req.file.filename
            await req.user.save()
        })
        res.status(200).json({
            status:'success'
        })
    } catch(err){
        res.status(400).json({
            error:'upload image error',
            message:err.message
        })
    }
}






