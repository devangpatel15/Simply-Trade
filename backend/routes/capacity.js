const express = require('express')
const { getAllCapacity, getCapacity, createCapacity, updateCapacity, deleteCapacity, softDeleteCapacity, selectCapacityByDevice, searchCapacity, selectCapacity } = require('../controllers/capacity')
const { createCapacityValidation, capacityIdValidation, updateCapacityValidation } = require('../middleware/capacity')

const capRouter = express.Router()

capRouter.get("/allCapacity",getAllCapacity)
capRouter.get("/capacity/:id",capacityIdValidation,getCapacity)
capRouter.get("/selectCapacity/:id",capacityIdValidation,selectCapacity)
capRouter.post("/createCapacity",createCapacityValidation,createCapacity)
capRouter.put("/updateCapacity/:id",updateCapacityValidation,updateCapacity)
capRouter.put("/deleteCapacity/:id",capacityIdValidation,softDeleteCapacity)

module.exports = capRouter