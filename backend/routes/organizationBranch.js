const express =require('express')
const {  findAllOrganizationBranch, deleteOrganizationBranch, updateOrganizationBranch, findOneOrganizationBranch, createOrganizationBranch, softDeleteOrganizationBranch} = require('../controllers/organizationBranch')
const { validateGetOneOrganizationBranchData, validateCreateOrganizationBranchData, validateUpdateOrganizationBranchData, validateDeleteOrganizationBranchData } = require('../middleware/organizationBranch')
const { AuthUser } = require('../middleware/user')
const organizationBranchRoute=express.Router()

organizationBranchRoute.get('/findAllOrganizationBranch',AuthUser,findAllOrganizationBranch)
organizationBranchRoute.get('/findOneOrganizationBranch/:id',AuthUser,validateGetOneOrganizationBranchData,findOneOrganizationBranch)
organizationBranchRoute.post('/createOrganizationBranch',AuthUser,validateCreateOrganizationBranchData,createOrganizationBranch)
organizationBranchRoute.put('/updateOrganizationBranch/:id',AuthUser,validateUpdateOrganizationBranchData,updateOrganizationBranch)
organizationBranchRoute.put('/deleteOrganizationBranch/:id',AuthUser,validateDeleteOrganizationBranchData,softDeleteOrganizationBranch)

module.exports =organizationBranchRoute
