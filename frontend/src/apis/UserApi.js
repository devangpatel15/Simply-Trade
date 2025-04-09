import axios from "axios";

const createUser = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/userSignUp",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log(error, "createUser error");
  }
};
const updateUser = async (formData, id) => {
  try {
    console.log(formData);
    const response = await axios.put(
      `http://localhost:4000/api/updateUser/${id}`,
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
    console.log(error, "updateUser error");
  }
};
const getAllUsers = async (page = 1, limit = 5, search) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/findAllUser",

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
    console.log(error, "updateUser error");
    return { totalCount: 0, items: [] };
  }
};

const getOneUser = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/findOneUser/${id}`,
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

const deleteUser = async (id) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/deleteUser/${id}`,
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

export { createUser, updateUser, getAllUsers, getOneUser, deleteUser };
