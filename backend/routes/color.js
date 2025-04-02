const express =require('express')
const {  findAllColor, updateColor, findOneColor, createColor, softDeleteColor, selectColorByDevice, searchColor, selectColor} = require('../controllers/color')
const { validateGetOneColorData, validateCreateColorData, validateUpdateColorData, validateDeleteColorData } = require('../middleware/Color')
const { AuthUser } = require('../middleware/user')
const colorRoute=express.Router()

colorRoute.get('/findAllColor',AuthUser,findAllColor)
colorRoute.get('/searchColor',searchColor)
colorRoute.get('/findOneColor/:id',validateGetOneColorData,findOneColor)
colorRoute.get('/selectColorByDevice/:id',selectColor)
colorRoute.post('/createColor',validateCreateColorData,createColor)
colorRoute.put('/updateColor/:id',validateUpdateColorData,updateColor)
colorRoute.put('/deleteColor/:id',validateDeleteColorData,softDeleteColor)

module.exports = colorRoute
