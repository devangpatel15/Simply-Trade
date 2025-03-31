const express = require('express')
const { getAllCategory, getCategory, createCategory, updateCategory, deleteCategory, softDeleteCategory, selectCategoryByBranch, getUserCategory, searchCategory, selectCategory } = require('../controllers/category')
const { categoryIdValidation, createCategoryValidation, updateCategoryValidation } = require('../middleware/category')
const { AuthUser } = require('../middleware/user')


const catRouter = express.Router()

catRouter.get("/allCategory",getAllCategory)
catRouter.get("/userCategory",AuthUser,getUserCategory)
catRouter.get("/searchCategory",searchCategory)
catRouter.get("/category/:id",categoryIdValidation,getCategory)
catRouter.get("/selectCategoryByBranch/:id",selectCategory)
catRouter.post("/createCategory",createCategoryValidation,createCategory)
catRouter.put("/updateCategory/:id",updateCategoryValidation,updateCategory)
catRouter.put("/deleteCategory/:id",categoryIdValidation,softDeleteCategory)

module.exports = catRouter