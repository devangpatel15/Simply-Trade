import axios from "axios";

const createCustomer = async (formData) => {
  try {
    await axios.post("http://localhost:4000/api/createCustomer", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error, "Create Customer error");
  }
};
const updateCustomer = async (formData, id) => {
  try {
    await axios.put(
      `http://localhost:4000/api/updateCustomer/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log(error, "Update Customer error");
  }
};

const getOneCustomer = async (id) => {
  try {
    if (!id) {
      return;
    }
    const response = await axios.get(
      `http://localhost:4000/api/customer/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error, "get Customer error");
  }
};

const getAllCustomer = async (page = 1, limit = 5, search) => {
  try {
    const response = await axios.get("http://localhost:4000/api/allCustomer", {
      params: { page, limit, search },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error, "get All Customer error");
    return { totalCount: 0, items: [] };
  }
};
const deleteCustomer = async (id) => {
  try {
    await axios.put(
      `http://localhost:4000/api/deleteCustomer/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log(error, "get All Customer error");
  }
};

export {
  createCustomer,
  updateCustomer,
  getOneCustomer,
  getAllCustomer,
  deleteCustomer,
};
