const {
  getAllCategoryService,
  getCategoryService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
  softDeleteCategoryService,
  selectCategoryByBranchService,
} = require("../services/category");

exports.getAllCategory = async (req, res) => {
  try {
    const cat = await getAllCategoryService();
    if (!cat) {
      return res.status(404).json({ message: "No category found" });
    }
    return res.status(200).json({
      message: "category retrieved successfully",
      data: cat,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    const cat = await getCategoryService(catId);
    if (!cat) {
      return res.status(404).json({ message: "No category found" });
    }
    return res.status(200).json({
      message: "category retrieved successfully",
      data: cat,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.selectCategoryByBranch= async (req, res) => {
  try {
    const branchId = req.params.id;
    const cat = await selectCategoryByBranchService(branchId);
    if (!cat) {
      return res.status(404).json({ message: "No category found" });
    }
    return res.status(200).json({
      message: "category retrieved successfully",
      data: cat,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCat = req.body;
    const createdCat = await createCategoryService(newCat);
    return res
      .status(200)
      .json({ message: "Category added", data: createdCat });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    const cat = req.body;
    const updatedOrg = await updateCategoryService(catId, cat);
    if (!updatedOrg) {
      return res.status(404).json({ message: "category not found" });
    }
    return res
      .status(200)
      .json({ message: "category updated", data: updatedOrg });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.softDeleteCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    const cat = await softDeleteCategoryService(catId);
    if (!cat) {
      return res.status(404).json({ message: "category not found" });
    }

    return res
      .status(200)
      .json({ message: "category soft deleted", data: cat });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    const cat = await deleteCategoryService(catId);
    if (!cat) {
      return res.status(404).json({ message: "category not found" });
    }

    return res.status(200).json({ message: "category deleted", data: cat });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
