const express =require('express')
const {  findAllUser, deleteUser, updateUser, registerUser, loginUser, sendOtp, verifyOtp, findUser, findOneUser } = require('../controllers/user')
const { validateCreateData, validateDeleteUserData, validateGetOneUserData, validateUpdateUserData, AuthUser } = require('../middleware/user')
const userRoute=express.Router()

userRoute.get('/findUser',AuthUser,findUser)
userRoute.get('/findAllUser',findAllUser)
userRoute.get('/findOneUser/:id',validateGetOneUserData,findOneUser)
userRoute.post('/userSignUp',validateCreateData,registerUser)
userRoute.post('/userLogIn',loginUser)
userRoute.put('/updateUser',validateUpdateUserData,updateUser)
userRoute.delete('/deleteUser',validateDeleteUserData,deleteUser)

userRoute.post('/sendOtp',sendOtp)
userRoute.post('/verifyOtp',verifyOtp)

module.exports =userRoute
 