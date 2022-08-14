import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/thesis_helper/students";

const user = AuthService.getCurrentUserFromLocalStorage();

const getApproachByStudent = (studentId) => {
    return axios.get(API_URL+`/${studentId}/approach`,  {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
};

const getRequirements = (studentId) => {
    return axios.get(API_URL+`/${studentId}/requirements`, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
};

const getStudentEvaluation = (studentId) => {
    return axios.get(API_URL+`/${studentId}/evaluation`, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
};

const getSupervisor = (studentId) => {
    return axios.get(`http://localhost:8080/thesis_helper/supervisor/${studentId}`, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
}

const StudentService = {
    getApproachByStudent,
    getRequirements,
    getStudentEvaluation,
    getSupervisor
};

export default StudentService;