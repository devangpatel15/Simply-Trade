const express = require('express')
const { getAllCapacity, getCapacity, createCapacity, updateCapacity, deleteCapacity, softDeleteCapacity, selectCapacityByDevice } = require('../controllers/capacity')
const { createCapacityValidation, capacityIdValidation, updateCapacityValidation } = require('../middleware/capacity')

const capRouter = express.Router()

capRouter.get("/allCapacity",getAllCapacity)
capRouter.get("/capacity/:id",capacityIdValidation,getCapacity)
capRouter.get("/selectCapacityByDevice/:id",capacityIdValidation,selectCapacityByDevice)
capRouter.post("/createCapacity",createCapacityValidation,createCapacity)
capRouter.put("/updateCapacity/:id",updateCapacityValidation,updateCapacity)
capRouter.put("/deleteCapacity/:id",capacityIdValidation,softDeleteCapacity)

module.exports = capRouter