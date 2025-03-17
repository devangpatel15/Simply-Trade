const express =require('express')
const {  findAllDevice, deleteDevice, updateDevice, findOneDevice, createDevice, softDeleteDevice} = require('../controllers/device')
const { validateGetOneDeviceData, validateCreateDeviceData, validateUpdateDeviceData, validateDeleteDeviceData } = require('../middleware/Device')
const deviceRoute=express.Router()

deviceRoute.get('/findAllDevice',findAllDevice)
deviceRoute.get('/findOneDevice/:id',validateGetOneDeviceData,findOneDevice)
deviceRoute.post('/createDevice',validateCreateDeviceData,createDevice)
deviceRoute.put('/updateDevice/:id',validateUpdateDeviceData,updateDevice)
deviceRoute.put('/deleteDevice/:id',validateDeleteDeviceData,softDeleteDevice)

module.exports =deviceRoute
