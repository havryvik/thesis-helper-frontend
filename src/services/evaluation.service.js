import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/thesis_helper/evaluation";

const user = AuthService.getCurrentUserFromLocalStorage();

const addRequirements = (requirements, approachId) => {
    return axios.post(API_URL+`/${approachId}`, requirements, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
};

const updateEvaluation = (evaluationId, evaluationDto)=>{
     return axios.put(API_URL+`/${evaluationId}`, evaluationDto, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
}

const getBlockEvaluation = (evaluationId, blockNumber)=>{
    return axios.get(API_URL+`/${evaluationId}/block/${blockNumber}`, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
}

const updateRequirements = (evaluationId, requirementsDto) =>{
    return axios.put(API_URL+`/${evaluationId}/extra-requirements`, requirementsDto, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
}

const getEvaluation = (evaluationId) => {
    return axios.get(API_URL+`/${evaluationId}`, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
}

const updateBlockEvaluation = (evaluationId, blockNumber, evalPerBlockDto) =>{
    return axios.put(API_URL+`/${evaluationId}/block/${blockNumber}`, evalPerBlockDto, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
}

const evaluationService = {
    addRequirements,
    updateEvaluation,
    getBlockEvaluation,
    getEvaluation,
    updateBlockEvaluation,
    updateRequirements
};

export default evaluationService;