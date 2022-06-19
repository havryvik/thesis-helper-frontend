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
            {id: 1, name: "Dodržení domluvených termínů",
                max: "student respektoval stanovený na začátku prací harmonogram projektu.Vždy se zúčastnil domluvených " +
                    "setkání, konzultací, případně poskytnul odůvodnění o neúčasti, které bylo vyučujícím potvrzeno. " +
                    "Včas a ve vysoké kvalitě odevzdával průběžné výsledky."},
            {id: 2, name: "Přípravenost k setkáním", max: "student se na jednání dostavil vždy s předem připraveným " +
                    "materiálem k diskusi, včas splnil úkoly projednané s vedoucím práce nebo po provedení detailní rešerše " +
                    "zdůvodnil nemožnost jejich realizace."},
            {id: 3, name: "Iniciativnost", max: "student ve své práci nápadně projevoval touhu nabídnout vlastní možnosti" +
                    " řešení problému, projevil se jako aktivní, podnikavý student. Jinými slovy, mohl si snadno stanovit cíle " +
                    "sám a organizovat se tak, aby jich dosáhl."},
            {id: 4, name: "Samostatnost", max: "student se z velké části spoléhal pouze na vlastní síly, sám navrhoval i " +
                    "realizoval řešení. Vedoucí hrál vedlejší roli, řádil a řídil bez přímého zásahu do díla."},
            {id: 5, name: "Pěčlivost", max: "student se projevil pilným a pracovitým způsobem. Pečlivě pracoval na projektu " +
                    "a dovedl prácí k logickému závěru. Nezanechal žádné nedokončené záležitosti."}
        ],
        nextFrame: "professionalLevel"
    };
}

const getProfessionalLevel = () => {

    return {
        blockNumber: 4,
        name: "Odborná úroveň",
        defaultRequirements: [
            {id: 1, name: "Použitelnost, aplikovatelnost v praxi", max: "Podrobný výklad a ověření výsledků. Výsledky " +
                    "práce mohou být sdílené vnějšímu světu. Práce je připravena k pouzitia poslouží jako užitečný nástroj " +
                    "pro řešení zkoumané problematilky."},
            {id: 2, name: "Možnost dálšího rozvoje", max: "závěry jsou založeny na dosažených výsledcích jasným způsobem " +
                    "a jsou extrapolovány na širší kontext. Práce tvoří kvalitní základ pro návaznou diplomovou práci po " +
                    "provedení další analýzy."},
            {id: 3, name: "Systematičnost analýzy", max: "práce obsahuje jasně definované metody a techniky řešení zkoumané " +
                    "problematiky, další vývoj a analýza jsou těmito datami podložená. Popsané výsledky a průběh anakyzy " +
                    "jsou konzistentní a logický se na sebe navazují."},
            {id: 4, name: "Replikovatelnost závěru", max: "popsané závěry jsou doložené náležitým popisům průběžných výsledky a " +
                    "úvah, které k tímto závěrům vedly. Po provedení popsaných kroků lze práci zopakovat s dosážením stejných výsledků."},
        ],
        nextFrame: "languageLevel",
    };
}

const getLanguageLevel = () => {
    return {
        blockNumber: 5,
        name: "Formální a jazyková úroveň, rozsah práce",
        defaultRequirements: [
            {id: 1, name: "Adekvatnost rozsáhu", max: "rozsah vypracovaného textu je dostacujich pro pochopení náležitosti " +
                    "prací a průběhu její plnění. Dle studijních predpidu u bakalářských prací dostačujícím rozsahem se považuje 20-40 normostran."},
            {id: 2, name: "Formatování", max: "práce je logicky rozdělena do správné ocilovanych kapitol a podkapitol, " +
                    "správné členění textu do odstavců, práce obsahuje seznam literatury, práce respektuje doporučované " +
                    "rozměry okrajů, odstupu, velikosti písma. Vítané je použití univerzální univerzitní šablony."},
            {id: 3, name: "Gramatické chyby, punktuace, překlepy", max: "práce neobsahuje žádné gramatické a punktuacni chyby, ani překlepy."},
            {id: 4, name: "Souvislost, konzistence textu", max: "kapitoly, závěry se na sebe logicky navazují. Text je " +
                    "souvislý, každý odstavec, věta a fráze přispívají ke smysu celé práce."},
            {id: 5, name: "Čitelnost", max: "během čtení práce, myšlenky autora jsou lehce pochopitelné. " +
                    "Text je napsán srozumitelně a stulistycky \"příjemně\"."},
            {id: 6, name: "Použití odborného jazyku", max: "student lehce a správně operuje slovy a výrazy spojené s oborem " +
                    "a tématem, kterým se v rámci práce věnuje."},
            {id: 7, name: "Reference v textu", max: "text se charakterizuje souvztažnosti. Autor průběžně odkazuje čtenáře" +
                    " k různým částem textu a používá při tom odkazování a lablování."},
        ],
        nextFrame: "citation"
    };
}

const getCitation = () => {
    return {
        blockNumber: 6,
        name: "Výběr zdrojů, korektnost citace",
        defaultRequirements: [
            {id: 1, name: "Dodržování konvenci", max: "uvedené zdroje vyhovují citačním normám povoleným studijními předpisy."},
            {id: 2, name: "Dostatečnost citaci", max: "práce je dostatečně ocitována v závislosti na svém typu. Průměr použítých " +
                    "citací pro rozsah bakalářských prací je zhruba 20+ citací."},
            {id: 3, name: "Kvalita zdrojů", max: "využití odborných vědeckých článků obsahem odpovidajich zkoumané problematice. " +
                    "Použití nové kvalitní literatury, student se vyhnul použití zastaralých pro daný problém informací."},
        ],
        nextFrame: "finalMark"
    };
}

const getBlockName = (blockNumber) => {
    switch (blockNumber){
        case 1: return "Zadání";
        case 2: return "Splnění zadání";
        case 3: return "Aktivita a samostatnost";
        case 4: return "Odborná úroveň";
        case 5: return "Formální a jazyková úroveň, rozsah práce";
        default: return "Výběr zdrojů, korektnost citace";
    }
}

const getBlockDescriptionByBlockNumber = (blockNumber, criterionNumber) => {
    switch (blockNumber){
        case 3: return getActivity().defaultRequirements[criterionNumber];
        case 4: return getProfessionalLevel().defaultRequirements[criterionNumber];
        case 5: return getLanguageLevel().defaultRequirements[criterionNumber];
        default: return getCitation().defaultRequirements[criterionNumber];
    }
}

const BasicBlocksService = {
    getBlockDescription,
    getBlockName,
    getBlockDescriptionByBlockNumber
};

export default BasicBlocksService;