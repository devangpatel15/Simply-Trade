import axios from "axios";

const createColor = async (formData) => {
  try {
    await axios.post("http://localhost:4000/api/createColor", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log(error, "Create Color error");
  }
};

export { createColor };
