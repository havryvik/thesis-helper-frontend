import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/thesis_helper/students";

const user = AuthService.getCurrentUserFromLocalStorage();

const getAllStudents = () => {
    return axios.get(API_URL, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
};

const addNewStudent = (email) => {
    return axios.put(API_URL, email.toString(),{headers:
            user?{"Authorization": `Bearer_${user.token}`, "Content-type":"text/plain"}:{}});
}

const removeStudent = (id) => {
    return axios.put(API_URL+`/${id}`,{},{headers:
            user?{"Authorization": `Bearer_${user.token}`, "Content-type":"text/plain"}:{}});
}


const getExtraRequirementsByStudent = (studentId) => {
    console.log(studentId);
    return axios.get(API_URL+`/${studentId}/extra-requirements`, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
};

const supervisorService = {
    getAllStudents,
    addNewStudent,
    removeStudent,
    getExtraRequirementsByStudent
};

export default supervisorService;