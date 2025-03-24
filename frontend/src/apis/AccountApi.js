import axios from "axios";

const createAccount = async (formData) => {
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
const updateAccount = async (formData, id) => {
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
const getAllAccounts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/findAllUser",

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

const getOneAccount = async (id) => {
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

const deleteAccount = async (id) => {
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

export {
  createAccount,
  updateAccount,
  getAllAccounts,
  getOneAccount,
  deleteAccount,
};
