import axios from "axios";

const createOrgBranch = async (formData) => {
  try {
    console.log(formData);
    const response = await axios.post(
      "http://localhost:4000/api/createOrganizationBranch",
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

const getAllUserOrgBranch = async (page = 1, limit = 5, search = "") => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/findAllUserOrganizationBranch",
      {
        params: { page, limit, search  },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error, "createOrg error");
    return { totalCount: 0, items: [] }
  }
};
const updateOrgBranch = async (formData, id) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/updateOrganizationBranch/${id}`,
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

const deleteOrgBranch = async (_id) => {
  try {
    await axios.put(
      `http://localhost:4000/api/deleteOrganizationBranch/${_id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const getOrgBranch = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/selectOrganizationBranch/${id}`,
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
  createOrgBranch,
  getAllUserOrgBranch,
  updateOrgBranch,
  deleteOrgBranch,
  getOrgBranch,
};
