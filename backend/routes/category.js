const express = require('express')
const { getAllCategory, getCategory, createCategory, updateCategory, deleteCategory, softDeleteCategory, selectCategoryByBranch } = require('../controllers/category')
const { categoryIdValidation, createCategoryValidation, updateCategoryValidation } = require('../middleware/category')


const catRouter = express.Router()

catRouter.get("/allCategory",getAllCategory)
catRouter.get("/category/:id",categoryIdValidation,getCategory)
catRouter.get("/selectCategoryByBranch/:id",categoryIdValidation,selectCategoryByBranch)
catRouter.post("/createCategory",createCategoryValidation,createCategory)
catRouter.put("/updateCategory/:id",updateCategoryValidation,updateCategory)
catRouter.put("/deleteCategory/:id",categoryIdValidation,softDeleteCategory)

module.exports = catRouter