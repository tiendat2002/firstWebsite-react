import axios from "../axios";

const userService = {
    login: (email, password) => {
        return axios.post("/api/login", { email, password });
    },
    getUser: (idInput) => {
        return axios.get(`/api/get-all-users?id=${idInput}`);
    },
    addNewUser: (data) => {
        return axios.post("/api/create-new-user", data);
    },
    deleteUser: (id) => {
        return axios.delete("/api/delete-user", { data: { id } });
    },
};

export default userService;
