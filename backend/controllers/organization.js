const { getAllOrganizationService, getOrganizationService, createOrganizationService, updateOrganizationService, deleteOrganizationService } = require("../services/organization");

exports.getAllOrganization = async (req, res) => {
    try {
      
        const org = await getAllOrganizationService();
        res.json(org);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getOrganization= async (req, res) => {
    try {
        const orgId = req.params.id;
        const org = await getOrganizationService(orgId);
        res.json(org);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createOrganization = async (req, res) => {
    try {
        const newOrg = req.body;
        const createdOrg = await createOrganizationService(newOrg);
        
        res.status(201).json(createdOrg); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateOrganization = async (req, res) => {
    try {
        const orgId = req.params.id;
        const org = req.body
       const updatedOrg =  await updateOrganizationService(orgId, org);
        res.json(updatedOrg);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

    
}

exports.deleteOrganization = async (req, res) => {
    try {
         const orgId = req.params.id;
        const org = await deleteOrganizationService(orgId);
        res.send("organization deleted successfully");
    } catch (err) {     
        res.status(500).json({ error: err.message });
    }   
}
