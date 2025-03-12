const {
  getAllOrganizationService,
  getOrganizationService,
  createOrganizationService,
  updateOrganizationService,
  deleteOrganizationService,
  getAllUserOrganizationService,
  softDeleteOrganizationService,
} = require("../services/organization");

exports.getAllOrganization = async (req, res) => {
  try {
    const org = await getAllOrganizationService();
    if (!org) {
      return res.status(404).json({ message: "No Organization found" });
    }

    return res.status(200).json({
      message: "Organization retrieved successfully",
      data: org,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.getAllUserOrganization = async (req, res) => {
  try {
    const userId = req.user.id;
    const org = await getAllUserOrganizationService(userId);
    if (!org) {
      return res.status(404).json({ message: "No Organization found" });
    }

    return res.status(200).json({
      message: "Organization retrieved successfully",
      data: org,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.getOrganization = async (req, res) => {
  try {
    const orgId = req.params.id;
    const org = await getOrganizationService(orgId);
    if (!org) {
      return res.status(404).json({ message: "No Organization found" });
    }

    return res.status(200).json({
      message: "Organization retrieved successfully",
      data: org,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.createOrganization = async (req, res) => {
  try {
    const newOrg = req.body;
    const userId = req.user.id;
    const createdOrg = await createOrganizationService({ ...newOrg, userId });

    return res
      .status(200)
      .json({ message: "Organization created", data: createdOrg });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    const orgId = req.params.id;
    const org = req.body;
    const updatedOrg = await updateOrganizationService(orgId, org);
    if (!updatedOrg) {
      return res.status(404).json({ message: "Organization not found" });
    }

    return res
      .status(200)
      .json({ message: "Organization updated", data: updatedOrg });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.softDeleteOrganization = async (req, res) => {
  try {
    const orgId = req.params.id;
    const org = await softDeleteOrganizationService(orgId);
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    return res
      .status(200)
      .json({ message: "Organization soft deleted", data: org });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    const orgId = req.params.id;
    const org = await deleteOrganizationService(orgId);
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }
    return res.status(200).json({ message: "Organization deleted", data: org });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
