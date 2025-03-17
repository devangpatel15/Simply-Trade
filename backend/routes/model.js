const express =require('express')
const {  findAllModel, deleteModel, updateModel, findOneModel, createModel, softDeleteModel} = require('../controllers/model')
const { validateGetOneModelData, validateCreateModelData, validateUpdateModelData, validateDeleteModelData } = require('../middleware/model')
const modelRoute=express.Router()

modelRoute.get('/findAllModel',findAllModel)
modelRoute.get('/findOneModel/:id',validateGetOneModelData,findOneModel)
modelRoute.post('/createModel',validateCreateModelData,createModel)
modelRoute.put('/updateModel/:id',validateUpdateModelData,updateModel)
modelRoute.put('/deleteModel/:id',validateDeleteModelData,softDeleteModel)

module.exports =modelRoute
