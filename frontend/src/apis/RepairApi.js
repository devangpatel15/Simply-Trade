import axios from "axios";

const getAllRepair = async (page = 1, limit = 5, search) => {
    try {
      const response = await axios.get("http://localhost:4000/api/getAllRepair", {
        params: { page, limit, search  },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error, "data not found");
      return { totalCount: 0, items: [] };
    }
  };

  const getOneRepair = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/getRepair/${id}`,
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

  const createRepair = async (formData) => {
    try {
      const response =  await axios.post("http://localhost:4000/api/createRepair", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response, "Repair created successfully");
    } catch (error) {
      console.log(error, "Repair not create ");
    }
  };

  const updateRepair = async (formData, id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/updateRepair/${id}`,
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
      console.log(error, "Repair not update");
    }
  };

    const deleteRepair = async (id) => {
        try {
        await axios.put(
            `http://localhost:4000/api/deleteRepair/${id}`,
            {},
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );
        } catch (error) {
        console.log(error, "Repair not delete");
        }
    };

    export {
        getAllRepair,
        getOneRepair,
        createRepair,
        updateRepair,
        deleteRepair,
    };