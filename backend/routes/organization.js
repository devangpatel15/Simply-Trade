const express = require('express')
const { getAllOrganization, getOrganization, createOrganization, updateOrganization, deleteOrganization, getAllUserOrganization, softDeleteOrganization } = require('../controllers/organization')
const { createValidation, updateOrgValidation, deleteOrgValidation, getOrgValidation } = require('../middleware/organization')
const { AuthUser } = require('../middleware/user')

const orgRouter = express.Router()

orgRouter.get("/allOrg",AuthUser,getAllOrganization)
orgRouter.get("/allUserOrg",AuthUser,getAllUserOrganization)
orgRouter.get("/org/:id",AuthUser,getOrgValidation,getOrganization)
orgRouter.post("/createOrg",AuthUser,createValidation,createOrganization)
orgRouter.put("/updateOrg/:id",AuthUser,updateOrgValidation,updateOrganization)
orgRouter.put("/deleteOrg/:id",AuthUser,deleteOrgValidation,softDeleteOrganization)

module.exports = orgRouter