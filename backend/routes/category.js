const express = require('express')
const { getAllCategory, getCategory, createCategory, updateCategory, deleteCategory, softDeleteCategory } = require('../controllers/category')
const { categoryIdValidation, createCategoryValidation, updateCategoryValidation } = require('../middleware/category')


const catRouter = express.Router()

catRouter.get("/allCategory",getAllCategory)
catRouter.get("/category/:id",categoryIdValidation,getCategory)
catRouter.post("/createCategory",createCategoryValidation,createCategory)
catRouter.put("/updateCategory/:id",updateCategoryValidation,updateCategory)
catRouter.put("/deleteCategory/:id",categoryIdValidation,softDeleteCategory)

module.exports = catRouter