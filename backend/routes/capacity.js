const express = require('express')
const { getAllCapacity, getCapacity, createCapacity, updateCapacity, deleteCapacity, softDeleteCapacity } = require('../controllers/capacity')
const { createCapacityValidation, capacityIdValidation, updateCapacityValidation } = require('../middleware/capacity')

const capRouter = express.Router()

capRouter.get("/allCapacity",getAllCapacity)
capRouter.get("/capacity/:id",capacityIdValidation,getCapacity)
capRouter.post("/createCapacity",createCapacityValidation,createCapacity)
capRouter.put("/updateCapacity/:id",updateCapacityValidation,updateCapacity)
capRouter.put("/deleteCapacity/:id",capacityIdValidation,softDeleteCapacity)

module.exports = capRouter