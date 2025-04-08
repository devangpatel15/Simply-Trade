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

const allUserOrg = async (page = 1, limit = 5, search = "") => {
  try {
    const response = await axios.get("http://localhost:4000/api/allUserOrg", {
      params: { page, limit, search }, // Pass page and limit as query parameters
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token for auth
      },
    });

    return response.data; // Return both the totalCount and items
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return { totalCount: 0, items: [] }; // Return empty data on error
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
