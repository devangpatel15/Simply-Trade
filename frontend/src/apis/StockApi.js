import axios from "axios";

const createStock = async (formData) => {
  try {
    await axios.post("http://localhost:4000/api/createStock", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error, "Create Stock error");
  }
};

const updateStock = async (formData, id) => {
  try {
    await axios.put(`http://localhost:4000/api/updateStock/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error, "Update Stock error");
  }
};

const getOneStock = async (id) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/stock/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error, "get Stock error");
  }
};

const getAllStocks = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/allStock", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error, "get All Stock error");
  }
};
const deleteStock = async (id) => {
  try {
    await axios.put(
      `http://localhost:4000/api/deleteStock/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log(error, "get All Stock error");
  }
};

export { createStock, updateStock, getOneStock, getAllStocks, deleteStock };
