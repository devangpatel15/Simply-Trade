const express =require('express')
const {  findAllDevice, deleteDevice, updateDevice, findOneDevice, createDevice, softDeleteDevice, selectDeviceByModel, searchDevice} = require('../controllers/device')
const { validateGetOneDeviceData, validateCreateDeviceData, validateUpdateDeviceData, validateDeleteDeviceData } = require('../middleware/Device')
const { AuthUser } = require('../middleware/user')
const deviceRoute=express.Router()

deviceRoute.get('/findAllDevice',AuthUser,findAllDevice)
// deviceRoute.get('/searchDevice',searchDevice)
deviceRoute.get('/findOneDevice/:id',validateGetOneDeviceData,findOneDevice)
deviceRoute.get('/selectDeviceByModel/:id',validateGetOneDeviceData,selectDeviceByModel)
deviceRoute.post('/createDevice',validateCreateDeviceData,createDevice)
deviceRoute.put('/updateDevice/:id',validateUpdateDeviceData,updateDevice)
deviceRoute.put('/deleteDevice/:id',validateDeleteDeviceData,softDeleteDevice)

module.exports =deviceRoute
