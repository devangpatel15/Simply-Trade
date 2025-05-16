import axios from "axios";

const getAllStocks = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/AllStockDetails",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error, "get All Stock error");
  }
};

export { getAllStocks };
