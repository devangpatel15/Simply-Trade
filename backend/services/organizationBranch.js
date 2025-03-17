const OrganizationBranch = require("../models/organizationBranch");

exports.findAllOrganizationBranchServices = async () => {
<<<<<<< HEAD
  const data = await OrganizationBranch.find()
    .populate("userId", "branchName")
    .lean();
=======
  const data = await OrganizationBranch.find({ isDeleted: false }).populate("userId" , 'branchName').lean();
>>>>>>> a192a0a8caf503a5a0db189c02dff8db81e39c9f

  return data;
};
exports.findOneOrganizationBranchServices = async (OrganizationBranchId) => {
<<<<<<< HEAD
  const data = await OrganizationBranch.findById(OrganizationBranchId)
    .populate("userId", "branchName")
=======
  const data = await OrganizationBranch.findById({OrganizationBranchId , isDeleted: false})
    .populate("userId"  , 'branchName')
>>>>>>> a192a0a8caf503a5a0db189c02dff8db81e39c9f
    .lean();

  return data;
};
exports.findUserOrganizationBranchServices = async (userId) => {
  const data = await OrganizationBranch.find({userId : userId , isDeleted : false }).populate("userId"  , 'branchName').lean();
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
