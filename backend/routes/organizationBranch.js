const express =require('express')
const {  findAllOrganizationBranch, deleteOrganizationBranch, updateOrganizationBranch, findOneOrganizationBranch, createOrganizationBranch} = require('../controllers/OrganizationBranch')
const { validateGetOneOrganizationBranchData, validateCreateOrganizationBranchData, validateUpdateOrganizationBranchData, validateDeleteOrganizationBranchData } = require('../middleware/OrganizationBranch')
const organizationBranchRoute=express.Router()

organizationBranchRoute.get('/findAllOrganizationBranch',findAllOrganizationBranch)
organizationBranchRoute.get('/findOneOrganizationBranch/:id',validateGetOneOrganizationBranchData,findOneOrganizationBranch)
organizationBranchRoute.post('/createOrganizationBranch',validateCreateOrganizationBranchData,createOrganizationBranch)
organizationBranchRoute.put('/updateOrganizationBranch/:id',validateUpdateOrganizationBranchData,updateOrganizationBranch)
organizationBranchRoute.delete('/deleteOrganizationBranch/:id',validateDeleteOrganizationBranchData,deleteOrganizationBranch)

module.exports =organizationBranchRoute
