const Organization = require("../models/organization");

exports.getAllOrganizationService = async () => {
  return await Organization.find({ isDeleted: false })
    .populate("userId")
    .lean();
};

exports.getAllUserOrganizationService = async (userId) => {
  return await Organization.find({ userId, isDeleted: false })
    .sort({ createdAt: -1 })
    .populate("userId")
    .lean();
};

exports.getOrganizationService = async (orgId) => {
  return await Organization.findById(orgId).populate("userId").lean();
};
exports.findOrgService = async (newOrgName) => {
  return await Organization.find({ organizationName: newOrgName })
    .populate("userId")
    .lean();
};

exports.createOrganizationService = async (newOrg) => {
  return await Organization.create(newOrg);
};

exports.updateOrganizationService = async (orgId, org) => {
  return await Organization.findByIdAndUpdate(orgId, org, { new: true }).lean();
};

exports.softDeleteOrganizationService = async (orgId) => {
  return await Organization.findByIdAndUpdate(orgId, { isDeleted: true });
};

exports.deleteOrganizationService = async (orgId) => {
  return await Organization.findByIdAndDelete(orgId);
};

exports.searchOrganizationService = async (orgText) => {
  let findObject = { isDeleted: false };

  if (orgText.trim() !== "") {
    findObject.$or = [
      { organizationName: { $regex: `^${orgText}`, $options: "i" } },
    ];
  }

  return await Organization.find(findObject).limit(5); // Increase limit if needed
};
