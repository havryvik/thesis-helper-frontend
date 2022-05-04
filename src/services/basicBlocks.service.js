import SupervisorService from "./supervisor.service";

const getBlockDescription = (name) => {
    switch (name){
        case "activity": return getActivity();
        case "professionalLevel": return getProfessionalLevel();
        case "languageLevel": return getLanguageLevel();
        default: return getCitation();
    }
}

const getActivity = () => {
    return {
        blockNumber: 3,
        name: "Aktivita a samostatnost",
        defaultRequirements: [
            {id: 1, name: "Dodržení domluvených termínů", max: "", min: ""},
            {id: 2, name: "Přípravenost k setkáním", max: "", min: ""},
            {id: 3, name: "Iniciativnost", max: "", min: ""},
            {id: 4, name: "Samostatnost", max: "", min: ""},
            {id: 5, name: "Pěčlivost", max: "", min: ""}
        ],
        nextFrame: "professionalLevel"
    };
}

const getProfessionalLevel = () => {

    return {
        blockNumber: 4,
        name: "Odborná úroveň",
        defaultRequirements: [
            {id: 1, name: "Použitelnost, aplikovatelnost v praxi", max: "", min: ""},
            {id: 2, name: "Možnost dálšího rozvoje", max: "", min: ""},
            {id: 3, name: "Systematičnost analýzy", max: "", min: ""},
            {id: 4, name: "Replikovatelnost závěru", max: "", min: ""},
        ],
        nextFrame: "languageLevel",
    };
}

const getLanguageLevel = () => {
    return {
        blockNumber: 5,
        name: "Formální a jazyková úroveň, rozsah práce",
        defaultRequirements: [
            {id: 1, name: "Adekvatnost rozsáhu", max: "", min: ""},
            {id: 2, name: "Formatování", max: "", min: ""},
            {id: 3, name: "Gramatické chyby, punktuace, překlepy", max: "", min: ""},
            {id: 4, name: "Souvislost, konzistence textu", max: "", min: ""},
            {id: 5, name: "Čitelnost", max: "", min: ""},
            {id: 6, name: "Použití odborného jazyku", max: "", min: ""},
            {id: 7, name: "Reference v textu", max: "", min: ""},
        ],
        nextFrame: "citation"
    };
}

const getCitation = () => {
    return {
        blockNumber: 6,
        name: "Výběr zdrojů, korektnost citace",
        defaultRequirements: [
            {id: 1, name: "Dodržování konvenci", max: "", min: ""},
            {id: 2, name: "Dostatečnost citaci", max: "", min: ""},
            {id: 3, name: "Kvalita zdrojů", max: "", min: ""},
        ],
        nextFrame: "finalMark"
    };
}


const BasicBlocksService = {
    getBlockDescription,
};

export default BasicBlocksService;