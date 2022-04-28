import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/thesis_helper/requirements";

const user = AuthService.getCurrentUserFromLocalStorage();

const removeRequirement = (id) => {
    return axios.delete(API_URL+`/${id}`, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
};


const RequirementService = {
    removeRequirement,
};

export default RequirementService;