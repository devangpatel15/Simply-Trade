import axios from "axios";

const createModel = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/createModel",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log(error, "createOrg error");
  }
};

const updateModel = async (formData, id) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/updateModel/${id}`,
      formData,
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

export { createModel, updateModel, getBranchCategory };
