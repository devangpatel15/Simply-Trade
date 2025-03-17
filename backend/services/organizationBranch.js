const OrganizationBranch = require("../models/organizationBranch");

exports.findAllOrganizationBranchServices = async () => {
<<<<<<< HEAD
  const data = await OrganizationBranch.find({ isDeleted: false }).populate("userId" , 'branchName').lean();
=======
  const data = await OrganizationBranch.find()
    .populate("userId", "branchName")
    .lean();
>>>>>>> 80703f7217b1e53e9e4cd30159e8f0520f445e3e

  return data;
};
exports.findOneOrganizationBranchServices = async (OrganizationBranchId) => {
<<<<<<< HEAD
  const data = await OrganizationBranch.findById({OrganizationBranchId , isDeleted: false})
    .populate("userId"  , 'branchName')
=======
  const data = await OrganizationBranch.findById(OrganizationBranchId)
    .populate("userId", "branchName")
>>>>>>> 80703f7217b1e53e9e4cd30159e8f0520f445e3e
    .lean();

  return data;
};
exports.findUserOrganizationBranchServices = async (userId) => {
  const data = await OrganizationBranch.find().populate().lean();
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
