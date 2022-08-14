import axios from "axios";

const API_URL = "http://localhost:8080/thesis_helper";

const signup = (data) => {
    return axios
        .post(API_URL + "/register", data)
        .then((response) => {
            console.log(response);
        });
};

const login = (data) => {
    return axios
        .post(API_URL + "/auth", data)
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const getCurrentUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const getCurrentUser = () => {
    const user = getCurrentUserFromLocalStorage();
    return axios.get(API_URL+'/user', {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}})
}

const updateProfile = (accountDto) => {
    const user = getCurrentUserFromLocalStorage();
    return axios.put(API_URL+'/account', accountDto, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}})
}


const authService = {
    signup,
    login,
    getCurrentUserFromLocalStorage,
    getCurrentUser,
    updateProfile
};

export default authService;