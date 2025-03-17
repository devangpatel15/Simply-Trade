const express =require('express')
const {  findAllOrganizationBranch, deleteOrganizationBranch, updateOrganizationBranch, findOneOrganizationBranch, createOrganizationBranch, findUserOrganizationBranch} = require('../controllers/OrganizationBranch')
const { validateGetOneOrganizationBranchData, validateCreateOrganizationBranchData, validateUpdateOrganizationBranchData, validateDeleteOrganizationBranchData } = require('../middleware/OrganizationBranch')
const { AuthUser } = require('../middleware/user')
const organizationBranchRoute=express.Router()

organizationBranchRoute.get('/findAllOrganizationBranch',AuthUser,findAllOrganizationBranch)
organizationBranchRoute.get('/findAllUserOrganizationBranch',AuthUser,findUserOrganizationBranch)
organizationBranchRoute.get('/findOneOrganizationBranch/:id',AuthUser,validateGetOneOrganizationBranchData,findOneOrganizationBranch)
organizationBranchRoute.post('/createOrganizationBranch',AuthUser,validateCreateOrganizationBranchData,createOrganizationBranch)
organizationBranchRoute.put('/updateOrganizationBranch/:id',AuthUser,validateUpdateOrganizationBranchData,updateOrganizationBranch)
organizationBranchRoute.delete('/deleteOrganizationBranch/:id',AuthUser,validateDeleteOrganizationBranchData,deleteOrganizationBranch)

module.exports =organizationBranchRoute
