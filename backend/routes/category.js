const express = require('express')
const { getAllCategory, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/category')
const { categoryIdValidation, createCategoryValidation, updateCategoryValidation } = require('../middleware/category')


const catRouter = express.Router()

catRouter.get("/allCat",getAllCategory)
catRouter.get("/cat/:id",categoryIdValidation,getCategory)
catRouter.post("/createCar",createCategoryValidation,createCategory)
catRouter.put("/updateCat/:id",updateCategoryValidation,updateCategory)
catRouter.delete("/deleteCat/:id",categoryIdValidation,deleteCategory)

module.exports = catRouter