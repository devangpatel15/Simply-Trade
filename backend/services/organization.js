const Organization = require("../models/organization");

exports.getAllOrganizationService = async () => {
  return await Organization.find().lean();
};

exports.getOrganizationService = async (orgId) => {
  return await Organization.findById(orgId).lean();
};

exports.createOrganizationService = async (newOrg) => {
  return await Organization.create(newOrg)
};

exports.updateOrganizationService = async (orgId, org) => {
  return await Organization.findByIdAndUpdate(orgId, org,{new:true}).lean();
};

exports.deleteOrganizationService = async (orgId) => {
  return await Organization.findByIdAndDelete(orgId);
};
