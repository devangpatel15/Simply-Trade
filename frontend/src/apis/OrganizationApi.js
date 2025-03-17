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

export { createOrg, updateOrg };
