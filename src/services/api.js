import axios from "axios";

const api = axios.create({
    // baseURL: "http://13.233.238.85:8080/v1",
    baseURL: "http://localhost:8080/v1",
    //Also update websocket link
});

export default api;
