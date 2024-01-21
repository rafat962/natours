const express = require('express')
const userController = require('../Controllers/userControllers')
const auth = require('../Controllers/AuthControllers')


const Routing = express.Router()


//----------------- Auth Routs -----------------
Routing.route('/login').post(auth.login)
Routing.route('/signup').post(auth.signUp)
Routing.route('/resetPassword').post(auth.resetPassword)
Routing.route('/resetPassword2/:token').patch(auth.resetPassword2)
Routing.route('/UpdatePassword').patch(auth.protect,auth.updatePassword)
Routing.route('/uploadImage').patch(auth.protect,userController.uploadimage)




//----------------- CRUD Routs -----------------
Routing.route('/me').get(auth.protect,userController.getme)
Routing.route('/').get(userController.getAllUsers).post(userController.createNewUser)
Routing.use(auth.protect)
Routing.route('/:id').get(userController.getOneUser).delete(userController.deleteUser).patch(userController.updateUser)

module.exports = Routing 
