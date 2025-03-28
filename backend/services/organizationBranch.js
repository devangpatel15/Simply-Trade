const OrganizationBranch = require("../models/organizationBranch");

exports.findAllOrganizationBranchServices = async () => {
  const data = await OrganizationBranch.find({ isDeleted: false })
    .populate("userId branchName organization")
    .lean();

  return data;
};
exports.findOneOrganizationBranchServices = async (id) => {
  const data = await OrganizationBranch.findById(id)
    .populate("userId branchName organization")
    .lean();

  return data;
};
exports.findUserOrganizationBranchServices = async (userId) => {
  const data = await OrganizationBranch.find({
    userId: userId,
    isDeleted: false,
  })
    .populate("userId branchName organization")
    .lean();
  return data;
};

exports.selectOrganizationBranchServices = async (orgId) => {
  const data = await OrganizationBranch.find({
    organization: orgId,
    isDeleted: false,
  })
    .populate("userId branchName")
    .lean();
  return data;
};

exports.createOrganizationBranchServices = async (branchData) => {
  const data = await OrganizationBranch.create(branchData);
  return data;
};

exports.updateOrganizationBranchServices = async (branchId, branchData) => {
  const data = await OrganizationBranch.findByIdAndUpdate(
    branchId,
    branchData,
    { new: true }
  ).lean();
  return data;
};

exports.softDeleteOrganizationBranchService = async (branchId) => {
  return await OrganizationBranch.findByIdAndUpdate(branchId, {
    isDeleted: true,
  });
};

exports.deleteOrganizationBranchServices = async (OrganizationBranchId) => {
  const data = await OrganizationBranch.findByIdAndDelete(
    OrganizationBranchId
  ).lean();
  return data;
};

exports.searchOrgBranchService = async (orgText) => {
  let findObject = { isDeleted: false };

  if (orgText.trim() !== "") {
    findObject.$or = [{ branchName: { $regex: `^${orgText}`, $options: "i" } }];
  }

  return await OrganizationBranch.find(findObject).limit(5); // Increase limit if needed
};
