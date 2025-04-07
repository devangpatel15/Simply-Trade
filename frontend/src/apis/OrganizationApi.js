import axios from "axios";

const createOrg = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/createOrg",
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

const updateOrg = async (formData, id) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/updateOrg/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    alert(response.data.message);
  } catch (error) {
    console.log(error, "createOrg error");
  }
};

const allUserOrg = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/allUserOrg", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        page: paginationModel.page + 1,  // Convert to 1-based page index for the backend
        pageSize: paginationModel.pageSize,
      },
    });
    return response;
  } catch (error) {
    console.log(error, "createOrg error");
  }
};

const deleteOrg = async (_id) => {
  try {
    await axios.put(
      `http://localhost:4000/api/deleteOrg/${_id}`,
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

export { createOrg, updateOrg, allUserOrg, deleteOrg };
