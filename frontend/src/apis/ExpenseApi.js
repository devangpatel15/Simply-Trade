import axios from "axios";

const getAllExpense = async (page = 1, limit = 5, search) => {
    try {
      const response = await axios.get("http://localhost:4000/api/allExpense", {
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

  const getOneExpense = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/expense/${id}`,
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

  const createExpense = async (formData) => {
    try {
      const response =  await axios.post("http://localhost:4000/api/createExpense", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response, "Expense created successfully");
    } catch (error) {
      console.log(error, "Expense not create ");
    }
  };

  const updateExpense = async (formData, id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/updateExpense/${id}`,
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
      console.log(error, "expense not update");
    }
  };

    const deleteExpense = async (id) => {
        try {
        await axios.put(
            `http://localhost:4000/api/deleteExpense/${id}`,
            {},
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );
        } catch (error) {
        console.log(error, "expense not delete");
        }
    };

    export {
        getAllExpense,
        getOneExpense,
        createExpense,
        updateExpense,
        deleteExpense,
    };