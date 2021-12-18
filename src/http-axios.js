import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default axios.create({
  baseURL: "http://127.0.0.1:8080/",
  headers: {
    "Content-type": "application/json",
  }
});