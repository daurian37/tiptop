// login.js
const axios = require("axios");

const login = async (value) => {
  try {
    const response = await axios.post("http://localhost:8000/login", value);
    localStorage.setItem("token", response.data.token);
    return { success: true, token: response.data.token };
  } catch (err) {
    throw err.response.data;
  }
};

module.exports = { login };
