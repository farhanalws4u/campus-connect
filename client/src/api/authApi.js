import axios from "axios";

// const url = "https://intiquerybackend.onrender.com";
const url = "http://localhost:5000";
export const registerUser = async (userData) => {
  return await axios.post(`${url}/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${url}/auth/login`, userData);
};

export const googleLogin = async (userData) => {
  return await axios.post(`${url}/auth/googleLogin`, userData);
};
