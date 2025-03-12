const express = require('express')
const { getAllStock, getStock, createStock, updateStock, deleteStock } = require('../controllers/stock')
const { getStockValidation, createValidation, updateStockValidation, deleteStockValidation } = require('../middleware/stock')

const stockRouter = express.Router()

stockRouter.get("/allOrg",getAllStock)
stockRouter.get("/org/:id",getStockValidation,getStock)
stockRouter.post("/createOrg",createValidation,createStock)
stockRouter.put("/updateOrg/:id",updateStockValidation,updateStock)
stockRouter.delete("/deleteOrg/:id",deleteStockValidation,deleteStock)

module.exports = stockRouter