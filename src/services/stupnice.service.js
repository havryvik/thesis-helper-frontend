import basicBlocksService from "./basicBlocks.service";

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
    console.log(percent);
    console.log(maxForBlock);
    return maxForBlock*percent/100;
}

const getIncr = (assignment, fulfilment) => {
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

const getAssignmentDescription = (value) => {
    switch (value){
        case "extremelyHard": return "Mimořádně náročné";
        case "hard": return "Náročné";
        case "medium": return "Průměrně náročné";
        case "easy": return "Lehké";
        default: return "Nedosatecne náročné";
    }
}

const getFulfilmentDescription = (value, autoFulfilment) => {
    if(autoFulfilment)
        value = convertFulfilmentPercentToWords(value);
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

const StupniceService ={
    getSelectValueByPercent,
    getPointsForBlock,
    getIncr,
    getAssignmentDescription,
    getFulfilmentDescription,
    convertValueToMark
}

export default StupniceService;