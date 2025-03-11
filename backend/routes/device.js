const express =require('express')
const {  findAllDevice, deleteDevice, updateDevice, findOneDevice, createDevice} = require('../controllers/device')
const { validateGetOneDeviceData, validateCreateDeviceData, validateUpdateDeviceData, validateDeleteDeviceData } = require('../middleware/Device')
const deviceRoute=express.Router()

deviceRoute.get('/findAllDevice',findAllDevice)
deviceRoute.get('/findOneDevice/:id',validateGetOneDeviceData,findOneDevice)
deviceRoute.post('/createDevice',validateCreateDeviceData,createDevice)
deviceRoute.put('/updateDevice/:id',validateUpdateDeviceData,updateDevice)
deviceRoute.delete('/deleteDevice/:id',validateDeleteDeviceData,deleteDevice)

module.exports =deviceRoute
