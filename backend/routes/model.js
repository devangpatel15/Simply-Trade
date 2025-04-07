const express = require("express");
const {
  findAllModel,
  deleteModel,
  updateModel,
  findOneModel,
  createModel,
  softDeleteModel,
  selectModelByCat,
  searchModel,
} = require("../controllers/model");
const {
  validateGetOneModelData,
  validateCreateModelData,
  validateUpdateModelData,
  validateDeleteModelData,
} = require("../middleware/model");
const { AuthUser } = require("../middleware/user");
const modelRoute = express.Router();

modelRoute.get("/findAllModel", AuthUser, findAllModel);
// modelRoute.get('/searchModel',searchModel)
modelRoute.get("/findOneModel/:id", validateGetOneModelData, findOneModel);
modelRoute.get(
  "/selectModelByCat/:id",
  validateGetOneModelData,
  selectModelByCat
);
modelRoute.post("/createModel", validateCreateModelData, createModel);
modelRoute.put("/updateModel/:id", validateUpdateModelData, updateModel);
modelRoute.put("/deleteModel/:id", validateDeleteModelData, softDeleteModel);

module.exports = modelRoute;
