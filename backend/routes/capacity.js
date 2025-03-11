const express = require('express')
const { getAllCapacity, getCapacity, createCapacity, updateCapacity, deleteCapacity } = require('../controllers/capacity')
const { createCapacityValidation, capacityIdValidation, updateCapacityValidation } = require('../middleware/capacity')

const capRouter = express.Router()

capRouter.get("/allCap",getAllCapacity)
capRouter.get("/cap/:id",capacityIdValidation,getCapacity)
capRouter.post("/createCap",createCapacityValidation,createCapacity)
capRouter.put("/updateCap/:id",updateCapacityValidation,updateCapacity)
capRouter.delete("/deleteCap/:id",capacityIdValidation,deleteCapacity)

module.exports = capRouter