import axios from "axios";

// const url = "https://intiquerybackend.onrender.com";
const url = "http://localhost:5000";
export const addUserData = async (data) => {
  return await axios.post(`${url}/user/addUserData`, data);
};

export const getUserData = async (id) => {
  return await axios.post(`${url}/user/getUserData`, id);
};

export const addDeviceToken = async (data) => {
  return await axios.post(`${url}/user/addDeviceToken`, data);
};
