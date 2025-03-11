const {
    findOneOrganizationBranchServices,
    findAllOrganizationBranchServices,
    createOrganizationBranchServices,
    updateOrganizationBranchServices,
    deleteOrganizationBranchServices,
    findUserOrganizationBranchServices,
  } = require("../services/OrganizationBranch");
  
  exports.findAllOrganizationBranch = async (req, res) => {
    try {
      const OrganizationBranchData = await findAllOrganizationBranchServices();
  
      if (!OrganizationBranchData) {
        return res.status(404).json({ message: "No Organization Branch found" });
      }
  
      return res.status(200).json({
        message: "Organization Branch retrieved successfully",
        data: 
          OrganizationBranchData,
        
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  };

  exports.findOneOrganizationBranch = async (req, res) => {
    try {
      const OrganizationBranchId = req.params.id;
      const OrganizationBranchData = await findOneOrganizationBranchServices(OrganizationBranchId);
  
      if (!OrganizationBranchData) {
        return res.status(404).json({ message: "No Organization Branch found" });
      }
  
      return res.status(200).json({
        message: "Organization Branch retrieved successfully",
        data: 
          OrganizationBranchData,
        
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  };
  
  exports.findUserOrganizationBranch = async (req, res) => {
    try {
      const userId =req?.user?.id;
      const OrganizationBranchData = await findUserOrganizationBranchServices(userId);
  
      if (!OrganizationBranchData) {
        return res.status(404).json({ message: "No OrganizationBranch found" });
      }
  
      return res.status(200).json({
        message: "OrganizationBranch retrieved successfully",
        data: 
          OrganizationBranchData,
        
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  };
  
  exports.createOrganizationBranch = async (req, res) => {
    try {
  
      const data = req.body; 
      const OrganizationBranchData = await createOrganizationBranchServices(data);
      return res.status(200).json({ message: "OrganizationBranch created", data: OrganizationBranchData });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  };
  
  exports.updateOrganizationBranch = async (req, res) => {
    try {
      const OrganizationBranchId = req.params.id;
  
      const data = req.body;
      const OrganizationBranchData = await updateOrganizationBranchServices(OrganizationBranchId, data);
      if (!OrganizationBranchData) {
        return res.status(404).json({ message: "OrganizationBranch not found" });
      }
  
      return res.status(200).json({ message: "OrganizationBranch updated", data: OrganizationBranchData });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  };
  
  exports.deleteOrganizationBranch = async (req, res) => {
    try {
      const OrganizationBranchId = req.params.id;
      const OrganizationBranchData = await deleteOrganizationBranchServices(OrganizationBranchId);
      if (!OrganizationBranchData) {
        return res.status(404).json({ message: "OrganizationBranch not found" });
      }
      return res.status(200).json({ message: "OrganizationBranch deleted", data: OrganizationBranchData });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  };
  