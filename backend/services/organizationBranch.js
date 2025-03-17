const OrganizationBranch = require("../models/organizationBranch");

exports.findAllOrganizationBranchServices = async () => {
  const data = await OrganizationBranch.find({ isDeleted: false })
    .populate("userId", "branchName")
    .lean();

  return data;
};
<<<<<<< HEAD
exports.findOneOrganizationBranchServices = async (OrganizationBranchId) => {
  const data = await OrganizationBranch.findById({
    OrganizationBranchId,
    isDeleted: false,
  })
=======
exports.findOneOrganizationBranchServices = async (id) => {
  const data = await OrganizationBranch.findById(id)
>>>>>>> 809b1f1a7027e4a9b1cb2902e0c78af5b09de4ff
    .populate("userId", "branchName")
    .lean();

  return data;
};
exports.findUserOrganizationBranchServices = async (userId) => {
  const data = await OrganizationBranch.find({
    userId: userId,
    isDeleted: false,
  })
    .populate("userId", "branchName")
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
