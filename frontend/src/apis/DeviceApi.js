import axios from "axios";
import { Await } from "react-router-dom";

const createDevice = async (formData) => {
  try {
    await axios.post("http://localhost:4000/api/createDevice", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error, "Create Device error");
  }
};

const getAllDevice = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/findAllDevice",
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    console.log(error, "Get Device error");
  }
};

const getOneDevice = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/findOneDevice/${id}`,
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

const updateDevice = async (formData, id) => {
  try {
    await axios.put(`http://localhost:4000/api/updateDevice/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error, "Create Device error");
  }
};

const deleteDevice = async (_id) => {
  try {
    await axios.put(
      `http://localhost:4000/api/deleteDevice/${_id}`,
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

export { createDevice, getAllDevice, getOneDevice, updateDevice, deleteDevice };
