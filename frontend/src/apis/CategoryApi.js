import axios from "axios";

const createCategory = async (formData) => {
  try {
    await axios.post("http://localhost:4000/api/createCategory", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error, "Create Category error");
  }
};

const getAllCategory = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/allCategory", {
      headers: { "Content-Type ": "application/json" },
    });
    return response;
  } catch (error) {
    console.log(error, "get Category error");
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
    return response;
  } catch (error) {
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
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export {
  createCategory,
  getAllCategory,
  getOneCategory,
  deleteCategory,
  updateCategory,
};
