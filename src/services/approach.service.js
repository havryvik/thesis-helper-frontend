import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/thesis_helper/approach";

const user = AuthService.getCurrentUserFromLocalStorage();

const getWeights = (approachId) => {
    return axios.get(API_URL+`/${approachId}/weights`, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
};

const getExtraRequirements = (approachId) => {
    return axios.get(API_URL+`/${approachId}/extra-requirements`, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
};


const getApproach = (approachId) => {
    return axios.get(API_URL+`/${approachId}`, {headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
};

const addWeights = (approachId, weights) => {
    return axios.put(API_URL+`/${approachId}/weights`, weights,{headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
}

const updateApproach = (approachId, approachDto) => {
    return axios.put(API_URL+`/${approachId}`, approachDto,{headers:
            user?{"Authorization": `Bearer_${user.token}`}:{}});
}

const getFulfilmentDescription=(fulfilmentEvaluation)=>{
    let approach = {
        max: "",
        text: ""
    }
    switch (fulfilmentEvaluation){
        case "points":{
            approach.text = "Bodové hodnocení";
            approach.max = "20";
            break;
        }
        case "percent":{
            approach.text = "Procenta";
            approach.max = "100%";
            break;
        }
        default: {
            approach.text = "Slovní hodnocení. Možností: Splněno, Splněno s menšími výhradami, Splněno s většími výhradami, Nesplněno)"
            break;
        }
    }
    return approach;
}

const getBlocksDescription=(blocksEvaluation, criterionEvaluation)=>{
    let approach =  "";
    switch (blocksEvaluation){
        case "points":{
            approach = "Bodové hodnocení";
            break;
        }
        case "percent":{
            approach = "Procenta";
            break;
        }
        case "weight":{
            approach = "Nástavitelné váhy";
            break;
        }
        default: {
            approach = "Známka A-F";
            break;
        }
    }
    if(criterionEvaluation)
        approach+=". Vedoucí v procentech hodnotí dílčí kritéria. Splněnost bloku se pak dopočítává automaticky dle průměru."
    return approach;
}

const getFinalMark=(finalMark)=>{
    let approach = "";

    switch (finalMark){
        case "sumAp":{
            approach = "Sum+AP, kde Sum - součet dosažených studentem bodů za základní bloky a AP - počet bodů za náročnost zadání dle stupnice.";
            break;
        }
        case "sumC":{
            approach = "Sum*K, kde Sum - součet dosažených studentem bodů za základní bloky a K - koeficient umožňující navýšení známky, vypočítaný pomocí matematického vzorce s respektováním dosažených bodů za základní bloky a průniku Splnění zadání a Náročnosti zadání. Vedoucí vždy má možnost upravit výslednou známku přidáním komentáře s odůvodněním.";
            break;
        }
        case "sumIncr":{
            approach = "Sum+Incr, kde Sum - součet dosažených studentem bodů za základní bloky a Incr - možnost navýšení známky.";
            break;
        }
        default: {
            approach = "Avg+Incr, kde Avg - průměr hodnocení základních bloků a Incr - možnost navýšení známky.";
            break;
        }
    }
    return approach;
}

const approachService = {
    getWeights,
    addWeights,
    updateApproach,
    getApproach,
    getFulfilmentDescription,
    getBlocksDescription,
    getExtraRequirements,
    getFinalMark
};

export default approachService;