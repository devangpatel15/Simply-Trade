import axios from "axios";

const createUser = async (formData) => {
  try {
    console.log(formData);
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
const updateUser = async (formData, id) => {
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
  } catch (error) {
    console.log(error, "updateUser error");
  }
};

export { createUser, updateUser };
