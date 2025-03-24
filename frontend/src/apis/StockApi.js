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

export { createStock };
