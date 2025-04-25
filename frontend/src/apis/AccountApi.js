import axios from "axios";
import { toast } from "react-toastify";

const createAccount = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/createAccount",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Account created successfully!");
  } catch (error) {
    toast.error("Account not created ");
    console.log(error, "createUser error");
  }
};
const updateAccount = async (formData, id) => {
  try {
    console.log(formData);
    const response = await axios.put(
      `http://localhost:4000/api/updateAccount/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Account updated successfully!");
    return response;
  } catch (error) {
    toast.error("Account not updated!");
    console.log(error, "updateUser error");
  }
};
const getAllAccounts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/allAccount",

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
      `http://localhost:4000/api/account/${id}`,
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
      `http://localhost:4000/api/deleteAccount/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Account deleted successfully!");
    return response;
  } catch (error) {
    toast.error("Account not deleted!");
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
