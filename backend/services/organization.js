const Organization = require("../models/organization");

exports.getAllOrganizationService = async (req) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

  const skip = (page - 1) * limit;

  const items = await Organization.find()
    .populate("userId")
    .skip(skip)
    .limit(limit);

  const totalCount = await Organization.countDocuments();

  return { totalCount, items };
};

exports.getAllUserOrganizationService = async (userId, req) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 1; // Default to 10 items per page

  const skip = (page - 1) * limit;

  const items = await Organization.find({ userId, isDeleted: false })
    .sort({ createdAt: -1 })
    .populate("userId")
    .skip(skip)
    .limit(limit)
    .lean();

  const totalCount = await Organization.countDocuments();

  return { totalCount, items };
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

exports.searchOrganizationService = async (orgText, userId) => {
  let findObject = { userId, isDeleted: false };

  if (orgText.trim() !== "") {
    findObject.$or = [
      { organizationName: { $regex: `^${orgText}`, $options: "i" } },
    ];
  }

  return await Organization.find(findObject).limit(5); // Increase limit if needed
};
