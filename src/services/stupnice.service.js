import basicBlocksService from "./basicBlocks.service";
import assignment from "../components/StudentsPage/CompleteEvaluation/Blocks/Assignment";

const getSelectValueByPercent=(percent)=>{
    if(percent<=100&&percent>=90)
        return 1;
    if(percent<90&&percent>=80)
        return 2;
    if(percent<80&&percent>=70)
        return 3;
    if(percent<70&&percent>=60)
        return 4;
    if(percent<60&&percent>=50)
        return 5;
    return 6;
}

const getPointsForBlock = (percent, maxForBlock) => {
    return maxForBlock*percent/100;
}

const getIncr = (assignment, fulfilment) => {
    return fulfilment===undefined?ap(assignment):increment(assignment,fulfilment);
}

const ap = (assignment) => {
    if(assignment==="extremelyHard")
        return {token: "+", max: 10, min: 6};
    if(assignment==="hard")
        return {token: "+", max: 5, min: 1};
    if(assignment==="easy")
        return {token: "-", max: 5, min: 1};
    else return null;
}

const increment = (assignment, fulfilment) => {
    const fulfilmentTmp = convertFulfilmentPercentToWords(fulfilment);
    if (fulfilmentTmp!==undefined)
        fulfilment = fulfilmentTmp;
    if (fulfilment==="done"&&assignment==="extremelyHard")
        return {token: "+", step: 2};
    if (((assignment==="extremelyHard"||assignment==="hard")&&fulfilment==="fewerReservations")||(assignment==="hard"&&fulfilment==="done"))
        return {token: "+", step: 1};
    if ((assignment==="extremelyHard"&&fulfilment==="fewerReservations")||(assignment==="hard"&&fulfilment==="done"))
        return {token: "+", step: 1};
    if ((assignment==="easy"&&(fulfilment==="fewerReservations"||fulfilment==="moreReservations"))||(assignment==="medium"&&fulfilment==="moreReservations"))
        return {token: "-", step: 2};
    if ((fulfilment==="done"&&assignment==="medium")||((assignment==="insufficient"||fulfilment==="notDone")))
        return null;
    return {token: "-", step: 1};
}

const convertFulfilmentPercentToWords = (percent) => {
    if (percent>=90) return "done";
    if (percent>=70&&percent<90) return "fewerReservations";
    if (percent>=50&&percent<70) return "moreReservations";
    if (percent<50) return "notDone";
    return undefined;
}

const convertFulfilmentPercentToPoints = (percent)=>{
    return Math.round(20*percent/100);
}

const getAssignmentDescription = (value) => {
    switch (value){
        case "extremelyHard": return "Mimořádně náročné";
        case "hard": return "Náročné";
        case "medium": return "Průměrně náročné";
        case "easy": return "Lehké";
        default: return "Nedosatecne náročné";
    }
}

// const getFulfilmentDescription = (value, autoFulfilment) => {
//     if(autoFulfilment)
//         value = convertFulfilmentPercentToWords(value);
//     switch (value){
//         case "done": return "Splněno";
//         case "fewerReservations": return "Splněno s menšími výhradami";
//         case "moreReservations": return "Splněno s většími výhradami";
//         default: return "Nesplněno";
//     }
// }

const getFulfilmentDescription = (value) => {
    console.log("getFulfilmentDescription "+value)
    switch (value){
        case "done": return "Splněno";
        case "fewerReservations": return "Splněno s menšími výhradami";
        case "moreReservations": return "Splněno s většími výhradami";
        default: return "Nesplněno";
    }
}

const convertValueToMark = (value) => {
    switch (parseInt(value)){
        case 1: return "A";
        case 2: return "B";
        case 3: return "C";
        case 4: return "D";
        case 5: return "E";
        default: return "F";
    }
}

const getFinalFulfillment=(evalType, value)=>{
    if (evalType==="points"){
        return fulfilmentPointsToWords(parseInt(value));
    } else {
        console.log(value)
        return fulfilmentPercentToWords(parseInt(value));
    }
}

const fulfilmentPointsToWords = (points)=>{
    if (points<=20&&points>17) return "Splněno";
    if (points<=17&&points>13) return "Splněno s menšími výhradami";
    if (points<=13&&points>9) return "Splněno s většími výhradami";
    return "Nesplněno";
}

const fulfilmentPercentToWords = (percent)=>{
    if (percent<=100&&percent>89) return "Splněno";
    if (percent<=89&&percent>69) return "Splněno s menšími výhradami";
    if (percent<=69&&percent>49) return "Splněno s většími výhradami";
    return "Nesplněno";
}

const getFinalBlockMark = (blocksEvaluation, value, max) => {
    if (blocksEvaluation==="marks")
        return convertValueToMark(value);
    if (blocksEvaluation==="percent")
        return convertValueToMark(getSelectValueByPercent(value))
    else {
        return convertValueToMark(getSelectValueByPercent(Math.round(value*100/max)))
    }
}

const getFulfilmentMax = (fulfilmentEvaluation) => {
    if(fulfilmentEvaluation==="percent")
        return "100%";
    else return 20;
}

const getFinalMark = (finalMarkPattern, value) => {
    if(finalMarkPattern==="avgIncr")
        return value;
    else
        return getSelectValueByPercent(value);
}

const getMaxIncr = (assignment, fulfilment) => {
    switch(assignment){
        case "extremelyHard": {
            if (fulfilment==="done") return 8;
            if (fulfilment==="fewerReservations") return 4;
            if (fulfilment==="moreReservations") return 0;
            return null;
        }
        case "hard":{
            if (fulfilment==="done") return 6;
            if (fulfilment==="fewerReservations") return 2;
            if (fulfilment==="moreReservations") return (-2);
            return null;
        }
        case "medium":{
            if (fulfilment==="done") return 0;
            if (fulfilment==="fewerReservations") return (-2);
            if (fulfilment==="moreReservations") return (-6);
            return null;
        }
        case "easy":{
            if (fulfilment==="done") return (-2);
            if (fulfilment==="fewerReservations") return (-4);
            if (fulfilment==="moreReservations") return (-8);
            return null;
        }
        default: return null;
    }
}

const getCoefficient = (fulfilment, assignment, mark) => {
    console.log(fulfilment+assignment+mark)
    const incr = getMaxIncr(assignment, fulfilment);
    console.log("INCR "+incr)
    const max = (Math.trunc(mark/10))*10+9;
    console.log("MAX "+max)
    const min = (Math.trunc(mark/10))*10;
    console.log("MIN "+min)
    return (incr/max+incr/min)/2+1;
}

const getFulfilmentByEvalApproach = (blockValue, fulfilmentEvaluation, autoFulfilment) => {
    if (fulfilmentEvaluation === "words")
        return getFulfilmentDescription(blockValue, autoFulfilment);
    if (fulfilmentEvaluation === "points")
        return getFulfilmentDescription(fulfilmentPointsToWords(blockValue))
    if (fulfilmentEvaluation === "percent")
        return fulfilmentPercentToWords(blockValue);
}

const getFulfilmentResultForAutoFulfilment = (percent, fulfilmentEvaluation) => {
    if (fulfilmentEvaluation === "words")
        return convertFulfilmentPercentToWords(percent);
    if (fulfilmentEvaluation === "points")
        return convertFulfilmentPercentToPoints(percent)
    if (fulfilmentEvaluation === "percent")
        return percent;
}

const getIncrementDescription = (finalMarkPattern, increment) => {
    console.log(finalMarkPattern)
    if (increment<0)
        return (finalMarkPattern==="sumC"||finalMarkPattern==="sumIncr"||finalMarkPattern==="avgIncr")?`Ponížení výsledné známky o ${increment*(-1)} stupeň(-ně)`:`Ponížení faktického dosáženého hodnocení o ${increment*(-1)} bodů(y)`
    if (increment>0)
        return (finalMarkPattern==="sumC"||finalMarkPattern==="sumIncr"||finalMarkPattern==="avgIncr")?`Povýšení výsledné známky o ${increment} stupeň(-ně)`:`Povýšení faktického dosáženého hodnocení o ${increment} bodů(y)`
    else return `Beze změn`
}

const StupniceService ={
    getSelectValueByPercent,
    getPointsForBlock,
    getIncr,
    getAssignmentDescription,
    getFulfilmentDescription,
    convertValueToMark,
    getFinalFulfillment,
    getFinalBlockMark,
    getFulfilmentMax,
    getFinalMark,
    getFulfilmentByEvalApproach,
    getCoefficient,
    getIncrementDescription,
    getFulfilmentResultForAutoFulfilment
}

export default StupniceService;