import axios from "axios";

const createSell = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/createSell",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log(error, "createSell error");
  }
};
 const getOneSell = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/sell/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error, "data not found");
    }
  };

const updateSell = async (formData, id) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/api/updateSell/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    alert(response.data.message);
    return response
  } catch (error) {
    console.log(error, "updateSell error");
  }
};

const allSell = async (page = 1, limit = 5, search) => {
  try {
    const response = await axios.get("http://localhost:4000/api/allSell", {
      params: { page, limit, search }, // Pass page and limit as query parameters
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token for auth
      },
    });

    return response.data; // Return both the totalCount and items
  } catch (error) {
    console.error("Error fetching allSell:", error);
    return { totalCount: 0, items: [] }; // Return empty data on error
  }
};

const deleteSell = async (_id) => {
  try {
    await axios.put(
      `http://localhost:4000/api/deleteSell/${_id}`,
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

export { createSell,getOneSell, updateSell, allSell, deleteSell };
