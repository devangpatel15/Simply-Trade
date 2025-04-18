import axios from "axios";

const createCapacity = async (formData) => {
  try {
    await axios.post("http://localhost:4000/api/createCapacity", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error, "Create Capacity error");
  }
};

const getAllCapacity = async (page = 1, limit = 5, search) => {
  try {
    const response = await axios.get("http://localhost:4000/api/allCapacity", {
      params: { page, limit , search },
      headers: {
        "Content-Type ": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error, "get Capacity error");
    return { totalCount: 0, items: [] };
  }
};

const updateCapacity = async (formData, id) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/updateCapacity/${id}`,
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
    console.log(error.message);
  }
};

const deleteCapacity = async (id) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/deleteCapacity/${id}`,
      {},
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

const getOneCapacity = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/capacity/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error, "GetOne Device error");
  }
};

export {
  createCapacity,
  getAllCapacity,
  updateCapacity,
  deleteCapacity,
  getOneCapacity,
};
