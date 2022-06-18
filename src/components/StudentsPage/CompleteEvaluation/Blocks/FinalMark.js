import React, {useEffect, useState} from "react";
import StupniceService from "../../../../services/stupnice.service";
import weights from "../../ApproachConfigurator/Weights";
const FinalMark = props => {

    const [mark, setFinalMark] = useState(undefined);
    const [prevMark, setPrevMark] = useState(undefined);
    const [increment, setIncrement] = useState(undefined);
    const [maxPerBlock, setMaxPerBlock] = useState(undefined);
    const [coefficient, setCoefficient] = useState(null);
    const [actualMark, setActualMark] = useState(undefined);
    const [actualIncrement, setActualIncrement] = useState(0);

    useEffect(()=>{
        if (props.blocksEvaluation==="marks"&&mark===undefined){
            const tmp = (parseInt(props.activityMark)+parseInt(props.professionalLevelMark)
                +parseInt(props.languageLevelMark)+parseInt(props.citationMark))/4;
            convertAndSetMark(Math.round(tmp));
        }
        if (props.blocksEvaluation==="percent"&&mark===undefined){
            let tmp = (parseInt(props.activityMark)+parseInt(props.professionalLevelMark)
                +parseInt(props.languageLevelMark)+parseInt(props.citationMark));
            if(props.fulfilmentEvaluation==="percent")
                tmp = (tmp+props.fulfilmentMark)/5
            else tmp = tmp/4;
            convertAndSetMark(Math.round(tmp));
        }

        if ((props.blocksEvaluation==="weight"|| props.blocksEvaluation==="points")&&mark===undefined){
            let tmp = (parseInt(props.activityMark)+parseInt(props.professionalLevelMark)
                +parseInt(props.languageLevelMark)+parseInt(props.citationMark));
            if(props.fulfilmentEvaluation==="points") {
                tmp = (tmp + parseInt(props.fulfilmentMark));
                setMaxPerBlock(20);
            }else{
                setMaxPerBlock(25);
            }
            convertAndSetMark(tmp)
            if(props.finalMarkPattern==="sumC"&&coefficient===null){
                const coef = StupniceService.getCoefficient(props.fulfilmentMark, props.assignmentMark, tmp);
                console.log(coef);
                setCoefficient(coef);
                convertAndSetMark(tmp*coef);
            }
        }
        if ((props.finalMarkPattern==="avgIncr"||props.finalMarkPattern==="sumIncr")&&increment===undefined){
            setIncrement(StupniceService.getIncr(props.assignmentMark, props.fulfilmentMark));
            console.log(increment);
        }
        if(props.finalMarkPattern==="sumAp"&&increment===undefined){
            setIncrement(StupniceService.getIncr(props.assignmentMark));
        }


    }, [props.blocksEvaluation, props.activityMark, props.professionalLevelMark, props.languageLevelMark, props.citationMark, mark, coefficient])


    function convertAndSetMark(tmpMark){
        setActualMark(tmpMark);
        tmpMark = StupniceService.getFinalMark(props.finalMarkPattern, tmpMark);
        setFinalMark(tmpMark);
        setPrevMark(tmpMark);
    }

    function increaseMark(value){
        setActualIncrement(value);
        setFinalMark(prevMark-value);
    }

    function increaseMarkWithAp(event){
        if(event.target.value === "") {
            setFinalMark(prevMark);
            setActualIncrement(0);
        }
        else {
            const tmp = increment.token==="+"?(actualMark+parseInt(event.target.value)):(actualMark-parseInt(event.target.value))
            setFinalMark(StupniceService.convertValueToMark(tmp));
        }
    }

    return (
        <div className="container bg-white rounded">
            <div className="modal-header row ">
                <div className="col-3"><h5>Výsledná známka - </h5></div>
                <div className="col-9 pt-2 pb-2"><span className="border rounded p-3 h4 text-danger finalMark">{StupniceService.convertValueToMark(mark)}</span></div>
            </div>
            <div className="modal-body">
                <table className="table-sm table-bordered border-light width-100 mb-4">
                    <thead>
                        <tr className="text-center">
                            <th colSpan="column">Blok</th>
                            <th colSpan="column">Váše hodnocení</th>
                            {(props.fulfilmentEvaluation!=="words"||props.blocksEvaluation!=="marks")
                                &&(<th colSpan="column">Maximum</th>)}
                            {(props.fulfilmentEvaluation!=="words"||props.blocksEvaluation!=="marks")
                                &&(<th colSpan="column">Příslušná známka v posudku</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1. Zadání</td>
                            <td className="text-center">{StupniceService.getAssignmentDescription(props.assignmentMark)}</td>
                            {(props.fulfilmentEvaluation!=="words"||props.blocksEvaluation!=="marks")&&(<td/>)}
                            {(props.fulfilmentEvaluation!=="words"||props.blocksEvaluation!=="marks")&&(<td/>)}
                        </tr>
                        <tr>
                            <td>2. Splnění zadání</td>
                            <td className="text-center">
                                {props.fulfilmentEvaluation==="words"
                                    &&(StupniceService.getFulfilmentDescription(props.fulfilmentMark, props.autoFulfilment))}
                                {props.fulfilmentEvaluation==="percent"&&(`${props.fulfilmentMark}%`)}
                                {props.fulfilmentEvaluation==="points"&&(props.fulfilmentMark)}
                            </td>
                            {(props.fulfilmentEvaluation!=="words")&&(<td>{StupniceService.getFulfilmentMax(props.fulfilmentEvaluation)}</td>)}
                            {(props.blocksEvaluation!=="marks"&&props.fulfilmentEvaluation!=="points")&&(<td/>)}
                            {props.fulfilmentEvaluation!=="words"
                                &&(<td>{StupniceService.getFinalFulfillment(props.fulfilmentEvaluation, props.fulfilmentMark)}</td>)}
                            {(props.blocksEvaluation!=="marks")&&(<td/>)}
                        </tr>
                        <tr>
                            <td>3. Aktivita a samostatnost</td>
                            <td className="text-center">
                                {props.blocksEvaluation==="marks"?(StupniceService.convertValueToMark(props.activityMark)):(props.activityMark)}</td>
                            {props.blocksEvaluation==="points"&&(<td>{maxPerBlock}</td>)}
                            {props.blocksEvaluation==="weight"&&(<td>{props.weights.activity}</td>)}
                            {props.fulfilmentEvaluation!=="words"&&(props.blocksEvaluation!=="points"&&props.blocksEvaluation!=="weight")&&(<td/>)}
                            {(props.blocksEvaluation!=="marks")&&(<td>{StupniceService.getFinalBlockMark(
                                props.blocksEvaluation,
                                props.activityMark,
                                props.weights===undefined?maxPerBlock:props.weights.activity)}</td>)}
                        </tr>
                        <tr>
                            <td>4. Odborná úroveň</td>
                            <td className="text-center">
                                {props.blocksEvaluation==="marks"?(StupniceService.convertValueToMark(props.professionalLevelMark)):(props.professionalLevelMark)}</td>
                            {props.blocksEvaluation==="points"&&(<td>{maxPerBlock}</td>)}
                            {props.blocksEvaluation==="weight"&&(<td>{props.weights.professionalLevel}</td>)}
                            {props.fulfilmentEvaluation!=="words"&&(props.blocksEvaluation!=="points"&&props.blocksEvaluation!=="weight")&&(<td/>)}
                            {(props.blocksEvaluation!=="marks")&&(<td>{StupniceService.getFinalBlockMark(
                                props.blocksEvaluation,
                                props.professionalLevelMark,
                                props.weights===undefined?maxPerBlock:props.weights.professionalLevel)}</td>)}
                        </tr>
                        <tr>
                            <td>5. Formální a jazyková úroveň, rozsah práce</td>
                            <td className="text-center">
                                {props.blocksEvaluation==="marks"?(StupniceService.convertValueToMark(props.languageLevelMark)):(props.languageLevelMark)}</td>
                            {props.blocksEvaluation==="points"&&(<td>{maxPerBlock}</td>)}
                            {props.blocksEvaluation==="weight"&&(<td>{props.weights.languageLevel}</td>)}
                            {props.fulfilmentEvaluation!=="words"&&(props.blocksEvaluation!=="points"&&props.blocksEvaluation!=="weight")&&(<td/>)}
                            {(props.blocksEvaluation!=="marks")&&(<td>{StupniceService.getFinalBlockMark(
                                props.blocksEvaluation,
                                props.languageLevelMark,
                                props.weights===undefined?maxPerBlock:props.weights.languageLevel)}</td>)}
                        </tr>
                        <tr>
                            <td>6. Výběr zdrojů, korektnost citace </td>
                            <td className="text-center">
                                {props.blocksEvaluation==="marks"?(StupniceService.convertValueToMark(props.citationMark)):(props.citationMark)}</td>
                            {props.blocksEvaluation==="points"&&(<td>{maxPerBlock}</td>)}
                            {props.blocksEvaluation==="weight"&&(<td>{props.weights.citation}</td>)}
                            {props.fulfilmentEvaluation!=="words"&&(props.blocksEvaluation!=="points"&&props.blocksEvaluation!=="weight")&&(<td/>)}
                            {(props.blocksEvaluation!=="marks")&&(<td>{StupniceService.getFinalBlockMark(
                                props.blocksEvaluation,
                                props.citationMark,
                                props.weights===undefined?maxPerBlock:props.weights.citation)}</td>)}
                        </tr>
                    </tbody>
                </table>
                {(props.finalMarkPattern==="avgIncr"||props.finalMarkPattern==="sumIncr")&&(
                    <div className="container">
                        <div className="container pt-3 h5">Možnost navýšení známky</div>
                        {increment===undefined?(
                                <div className="container">Na základě zvoleného Vámi hodnocení a dosažených studentem
                                    výsledků za bloky "Zadání" a "Splnění zadání" nemáte možnost použít increment pro navýšení známky.
                                </div>
                        ):(<div className="container">
                            Na základě zvoleného Vámi přístupu hodnocení a dosažených studentem výsledků za bloky "Zadání"
                            a "Splnění zadání" máte možnost použít následující increment pro úpravu známky:
                            <form className="pt-3 pb-3">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="0" name="customRadio"
                                           className="custom-control-input" onChange={()=>{increaseMark(0)}}/>
                                    <label className="custom-control-label" htmlFor="1">Ponechat beze změn</label>
                                </div>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="1" name="customRadio"
                                               className="custom-control-input" onChange={()=>{increaseMark(increment.token==="+"?1:(-1))}}/>
                                            <label className="custom-control-label" htmlFor="1">
                                                {(increment&&increment.token==="+")?(" Navýšení "):(" Ponížení ")} známky o 1 stupeň
                                            </label>
                                    </div>
                                {increment.step === 2&&(
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="2" name="customRadio"
                                               className="custom-control-input" onChange={()=>{increaseMark(increment.token==="+"?2:(-2))}}/>
                                        <label className="custom-control-label" htmlFor="2">
                                            {increment.token==="+"?(" Navýšení "):(" Ponížení ")} známky o 2 stupňů
                                        </label>
                                    </div>
                                )}
                            </form>
                        </div>)}
                    </div>
                )}
                {props.finalMarkPattern==="sumC"&&coefficient!==null&&(
                    <div className="container">
                        <div className="container">Na základě zvoleného Vámi hodnocení a dosažených studentem
                            výsledků za bloky "Zadání" a "Splnění zadání" byl použit koeficient <span><strong>{`${coefficient.toFixed(4)}`}</strong></span>, kterým byl
                            vynásoben součet bodů za základní bloky.
                        </div>
                        <form className="pt-3 pb-3">
                            <div className="custom-control custom-radio">
                                <input type="radio" id="1" name="customRadio"
                                       className="custom-control-input" onChange={()=>{increaseMark(-1)}}/>
                                <label className="custom-control-label" htmlFor="1">
                                    Ponížení známky o 1 stupeň
                                </label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" id="0" name="customRadio"
                                       className="custom-control-input" onChange={()=>{increaseMark(0)}}/>
                                <label className="custom-control-label" htmlFor="1">Ponechat beze změn</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" id="2" name="customRadio"
                                       className="custom-control-input" onChange={()=>{increaseMark(1)}}/>
                                <label className="custom-control-label" htmlFor="2">
                                    Navýšení známky o 1 stupeň
                                </label>
                            </div>
                        </form>
                    </div>
                )}
                {props.finalMarkPattern==="sumAp"&&(
                    <div className="container p-3">
                        <div className="container pt-3 h5">Možnost navýšení známky</div>
                        {increment===null?(
                            <div className="container">Na základě zvoleného Vámi hodnocení a dosažených studentem
                                výsledků za bloky "Zadání" a "Splnění zadání" nemáte možnost použít increment pro navýšení známky.
                            </div>
                        ):(<div className="container">
                            <label className="custom-control-label" htmlFor="1">
                                {(increment&&increment.token==="+")?(" Navýšení "):(" Ponížení ")}{`známky o maximalně ${increment.max} bodů(body). Minimálně lze přičíst ${increment.token}${increment.min}.`}
                            </label>
                            <input className="form-control" id="1" type="number" min = {increment.min} max={increment.max} placeholder="Uveďte číslo" onInput={event => increaseMarkWithAp(event)}/>
                        </div>)}
                    </div>
                )}
                <div className="form-check ">
                    <label className="fw-bold" htmlFor="finalMarkComment">
                        Do textového pole uveďte Váše finální vyjádření:
                    </label>
                    <textarea className="form-control commentCriterion" id="finalMarkComment" placeholder="..."/>
                </div>
                <div className="container text-center pt-3">
                    <button className="btn btn-primary" onClick={()=> {
                        const finalMarkValue = {
                            studentId: null,
                            finalMark: mark,
                            actualMark: Math.round(actualMark),
                            finalComment: document.getElementById("finalMarkComment").value,
                            increment: actualIncrement===undefined?0:actualIncrement,
                            coefficient: coefficient===null?null:coefficient.toFixed(4)
                        }
                        console.log(finalMarkValue)
                        console.log(coefficient)
                        props.saveEvaluation(finalMarkValue);
                    }}>Uložit hodnocení</button>
                </div>
            </div>
        </div>
    )
}

export default FinalMark;