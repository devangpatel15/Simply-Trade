import axios from "axios";
import { toast } from "react-toastify";

const createCategory = async (formData) => {
  try {
    await axios.post("http://localhost:4000/api/createCategory", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Category created successfully!");
  } catch (error) {
    toast.error("Category not created ");
    console.log(error, "Create Category error");
  }
};

const getAllCategory = async (page = 1, limit = 5, search) => {
  try {
    const response = await axios.get("http://localhost:4000/api/allCategory", {
      params: { page, limit, search  },
      headers: {
        "Content-Type ": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error, "get Category error");
    return { totalCount: 0, items: [] };
  }
};

const getOneCategory = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/category/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/deleteCategory/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Category deleted successfully!");
    return response;
  } catch (error) {
    toast.error("Category not deleted!");
    console.log(error.message);
  }
};
const updateCategory = async (formData, id) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/updateCategory/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Category updated successfully!");
    return response;
  } catch (error) {
    toast.error("Category not updated!");
    console.log(error.message);
  }
};

const getBranchCategory = async (branchId) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/selectCategoryByBranch/${branchId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error, "createOrg error");
  }
};

export {
  createCategory,
  getAllCategory,
  getOneCategory,
  deleteCategory,
  updateCategory,
  getBranchCategory,
};
