import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-stack-booker.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default API;
