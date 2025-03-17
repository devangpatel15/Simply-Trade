const express =require('express')
const {  findAllColor, deleteColor, updateColor, findOneColor, createColor, softDeleteColor} = require('../controllers/color')
const { validateGetOneColorData, validateCreateColorData, validateUpdateColorData, validateDeleteColorData } = require('../middleware/Color')
const colorRoute=express.Router()

colorRoute.get('/findAllColor',findAllColor)
colorRoute.get('/findOneColor/:id',validateGetOneColorData,findOneColor)
colorRoute.post('/createColor',validateCreateColorData,createColor)
colorRoute.put('/updateColor/:id',validateUpdateColorData,updateColor)
colorRoute.put('/deleteColor/:id',validateDeleteColorData,softDeleteColor)

module.exports =colorRoute
