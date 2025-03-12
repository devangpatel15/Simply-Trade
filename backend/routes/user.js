const express =require('express')
const {  findAllUser, deleteUser, updateUser, registerUser, loginUser, sendOtp, verifyOtp } = require('../controllers/user')
const { validateCreateData, validateDeleteUserData, validateGetOneUserData, validateUpdateUserData } = require('../middleware/user')
const route=express.Router()

route.get('/findUser',validateGetOneUserData,findAllUser)
route.post('/userSignUp',validateCreateData,registerUser)
route.post('/userLogIn',loginUser)
route.put('/updateUser',validateUpdateUserData,updateUser)
route.delete('/deleteUser',validateDeleteUserData,deleteUser)

route.post('/sendOtp',sendOtp)
route.post('/verifyOtp',verifyOtp)

module.exports =route
 