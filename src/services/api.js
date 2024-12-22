import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:8080/v1",
     baseURL: "https://picmybus.com/api/v1"
    //Also update websocket link
});

export default api;
