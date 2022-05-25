import React, {useEffect, useState} from "react";
import StupniceService from "../../../../services/stupnice.service";
const FinalMark = props => {

    const [mark, setFinalMark] = useState(undefined);
    const [prevMark, setPrevMark] = useState(undefined);
    const [increment, setIncrement] = useState(undefined);


    useEffect(()=>{
        if (props.blocksEvaluation==="marks"&&mark===undefined){
            const tmp = (parseInt(props.activityMark)+parseInt(props.professionalLevelMark)
                +parseInt(props.languageLevelMark)+parseInt(props.citationMark))/4;
            setFinalMark(Math.round(tmp));
            setPrevMark(Math.round(tmp));
        }
        if (props.blocksEvaluation==="percent"&&mark===undefined){
            let tmp = (parseInt(props.activityMark)+parseInt(props.professionalLevelMark)
                +parseInt(props.languageLevelMark)+parseInt(props.citationMark));
            if(props.fulfilmentEvaluation==="percent")
                tmp = (tmp+props.fulfilmentMark)/5
            else tmp = tmp/4;
            setFinalMark(Math.round(tmp));
            setPrevMark(Math.round(tmp));
        }
        if (props.finalMarkPattern==="avgIncr"){
            setIncrement(StupniceService.getIncr(props.assignmentMark, props.fulfilmentMark));
        }
    }, [props.blocksEvaluation, props.activityMark, props.professionalLevelMark, props.languageLevelMark, props.citationMark, mark])


    function increaseMark(event){
        if(event.target.id==="1"){
            setFinalMark(increment.token==="+"?(prevMark-1):(prevMark+1));
        }
        if(event.target.id==="2"){
            setFinalMark(increment.token==="+"?(prevMark-2):(prevMark+2));
        }
    }

    return (
        <div className="container bg-white rounded">
            <div className="modal-header row ">
                <div className="col-3"><h5>Výsledná známka - </h5></div>
                <div className="col-9 pt-2 pb-2"><span className="border rounded p-3 h4 text-danger finalMark">{StupniceService.convertValueToMark(mark)}</span></div>
            </div>
            <div className="modal-body">
                <table className="table-sm table-bordered border-light">
                    <tr>
                        <td>1. Zadání</td>
                        <td className="text-center">{StupniceService.getAssignmentDescription(props.assignmentMark)}</td>
                    </tr>
                    <tr>
                        <td>2. Splnění zadání</td>
                        <td className="text-center">
                            {props.fulfilmentEvaluation==="words"&&(StupniceService.getFulfilmentDescription(props.fulfilmentMark, props.autoFulfilment))}
                            {props.fulfilmentEvaluation==="percent"&&(" %")}</td>
                    </tr>
                    <tr>
                        <td>3. Aktivita a samostatnost</td>
                        <td className="text-center">
                            {props.blocksEvaluation==="marks"?(StupniceService.convertValueToMark(props.activityMark)):(props.activityMark)}</td>
                    </tr>
                    <tr>
                        <td>4. Odborná úroveň</td>
                        <td className="text-center">
                            {props.blocksEvaluation==="marks"?(StupniceService.convertValueToMark(props.professionalLevelMark)):(props.professionalLevelMark)}</td>
                    </tr>
                    <tr>
                        <td>5. Formální a jazyková úroveň, rozsah práce</td>
                        <td className="text-center">
                            {props.blocksEvaluation==="marks"?(StupniceService.convertValueToMark(props.languageLevelMark)):(props.languageLevelMark)}</td>
                    </tr>
                    <tr>
                        <td>6. Výběr zdrojů, korektnost citace </td>
                        <td className="text-center">
                            {props.blocksEvaluation==="marks"?(StupniceService.convertValueToMark(props.citationMark)):(props.citationMark)}</td>
                    </tr>
                </table>
                {props.finalMarkPattern==="avgIncr"&&(
                    <div className="container">
                        <div className="container pt-3 h5">Možnost navýšení známky</div>
                        {increment===null?(
                                <div className="container">Na základě zvoleného Vámi hodnocení a dosažených studentem
                                    výsledků za bloky "Zadání" a "Splnění zadání" nemáte možnost použít increment pro navýšení známky.
                                </div>
                        ):(<div className="container">
                            Na základě zvoleného Vámi přístupu hodnocení a dosažených studentem výsledků za bloky "Zadání"
                            a "Splnění zadání" máte možnost použít následující increment pro navýšení známky:
                            <form className="pt-3 pb-3">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="0" name="customRadio"
                                           className="custom-control-input" onChange={()=>{setFinalMark(prevMark)}}/>
                                    <label className="custom-control-label" htmlFor="1">Ponechat beze změn</label>
                                </div>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" id="1" name="customRadio"
                                               className="custom-control-input" onChange={(event)=>{increaseMark(event)}}/>
                                            <label className="custom-control-label" htmlFor="1">
                                                {(increment&&increment.token==="+")?(" Navýšení "):(" Ponížení ")} známky o 1 stupeň
                                            </label>
                                    </div>
                                    {increment&&increment.step===2&&(
                                        <div className="custom-control custom-radio">
                                            <input type="radio" id="2" name="customRadio"
                                                   className="custom-control-input" onChange={(event)=>{increaseMark(event)}}/>
                                            <label className="custom-control-label" htmlFor="2">
                                                  {increment.token==="+"?(" Navýšení "):(" Ponížení ")} známky o 2 stupňů
                                            </label>
                                        </div>
                                    )}
                            </form>
                        </div>)}
                    </div>
                )}
                {props.finalMarkPattern==="sumIncr"&&(
                    <div className="container"></div>
                )}
                {props.finalMarkPattern==="sumC"&&(
                    <div className="container"></div>
                )}
                {props.finalMarkPattern==="sumAp"&&(
                    <div className="container"></div>
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
                            finalComment: document.getElementById("finalMarkComment").value
                        }
                        props.saveEvaluation(finalMarkValue);
                    }}>Uložit hodnocení</button>
                </div>
            </div>
        </div>
    )
}

export default FinalMark;