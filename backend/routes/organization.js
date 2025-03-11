const express = require('express')
const { getAllOrganization, getOrganization, createOrganization, updateOrganization, deleteOrganization } = require('../controllers/organization')
const { createValidation, updateOrgValidation, deleteOrgValidation, getOrgValidation } = require('../middleware/organization')

const orgRouter = express.Router()

orgRouter.get("/allOrg",getAllOrganization)
orgRouter.get("/org/:id",getOrgValidation,getOrganization)
orgRouter.post("/createOrg",createValidation,createOrganization)
orgRouter.put("/updateOrg/:id",updateOrgValidation,updateOrganization)
orgRouter.delete("/deleteOrg/:id",deleteOrgValidation,deleteOrganization)

module.exports = orgRouter