import React, {useState} from "react";
import PercentInput from "./PercentInput";
import TextAreaComment from "./TextAreaComment";
import BlockMark from "./BlockMark";
import StupniceService from "../../../services/stupnice.service";

const BasicBlock = props => {

    function calculateFinalMark(){
        const criterionInputs = document.getElementsByClassName("criterionInput");
        const blockMark = document.getElementById("blockMark");
        const criterionPercents = [];
        for (const el of criterionInputs){
            (criterionPercents.push(parseInt(el.value)));
        }
        const sum = criterionPercents.reduce((a,b)=> a+b,0);
        const avg = (sum/criterionPercents.length) || 0;

        if(props.type==="marks")
            blockMark.value = StupniceService.getSelectValueByPercent(avg);
        if(props.type==="points"){
            blockMark.value = StupniceService.getPointsForBlock(avg, props.fulfilmentEvaluation?(20):(25));
        }
        if(props.type==="weights"){
            blockMark.value = StupniceService.getPointsForBlock(avg, props.blockWeight);
        }
        if(props.type==="percent"){
            blockMark.value = avg;
        }

    }

    function formPreProcess(event){
        event.preventDefault();

        const blockMark = document.getElementById("blockMark");
        const blockComment = document.getElementById("blockComment");

        const blockResult = {
            value: blockMark.value,
            blockNumber:props.description.id,
            comment: blockComment.value,
            criterionDtos: []
        }

        const criterionsEl = document.getElementsByClassName("criterion");
        if (criterionsEl!==undefined){
            for (const criterion of criterionsEl){
                const newCr = {
                    value: criterion.children[0].children[1].value,
                    number: criterion.id,
                    comment: criterion.children[1].children[1].value
                }
                blockResult.criterionDtos.push(newCr);
                criterion.children[0].children[1].value = "";
                criterion.children[1].children[1].value = "";
            }
        }

        const extraReqs = document.getElementsByClassName("extra");
        const requirements = [];
        if (extraReqs!==undefined){
            for (const extraReq of extraReqs){
                const req = {
                    id: extraReq.id,
                    value: extraReq.children[0].children[1].value,
                    comment: extraReq.children[1].children[1].value
                }
                requirements.push(req);
                extraReq.children[0].children[1].value = "";
                extraReq.children[1].children[1].value = "";
            }
        }

        blockMark.value = "";
        blockComment.value = "";
        props.onSubmit(blockResult, requirements);
    }

    return (
        <div className="container bg-white rounded">
            <div className="modal-header "><h5>{props.description.name}</h5></div>
            <div className="modal-body">
                <form onSubmit={(event) => {formPreProcess(event)}}>
                    <div className="container pb-2">
                        <label className="fw-bold ">
                            Ohodnoťte {!props.criterionEvaluation?(<span>celý blok. V svém hodnocení a komentáři zohledněte
                                každý z dílčích kritérií bloku.</span>):(<span>každé kritérium zvlášť. Hodnocení za celý
                                blok bude spočítáno automaticky dle průměru.</span>)}
                        </label>
                    </div>
                    <div className="form-group">
                        {props.description.defaultRequirements.map((requirement) => (
                            <div>
                                <label className="fw-bold">{requirement.id+". "+requirement.name} </label>
                                <ul className="list-inline ">
                                <li className="list-group-item"><strong>100% </strong>odpovídá - {requirement.max}</li>
                                <li className="list-group-item"><strong>{"<50"}% </strong>odpovídá - {requirement.min}</li>
                                </ul>
                                {props.criterionEvaluation===true&&(
                                    <div id={requirement.id} className="criterion">
                                    <PercentInput elementId={props.description.name+requirement.id} />
                                    <TextAreaComment elementId={props.description.name+requirement.id+"Comment"}/>
                                    </div>
                                    )}
                            </div>
                        ))}
                        {props.currentFrame==="professionalLevel"?(
                            <div>
                            {props.extraRequirements.map((requirement, index) => (
                                    <div>
                                        <label className="fw-bold">{index+props.description.defaultRequirements.length+". "+requirement.name} </label>
                                        {props.criterionEvaluation===true&&(
                                            <div id={requirement.id} className="extra">
                                                <PercentInput elementId={props.description.name+requirement.id} />
                                                <TextAreaComment elementId={props.description.name+requirement.id+"Comment"}/>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ):(<div/>)}
                    </div>

                    <BlockMark criterionEvaluation={props.criterionEvaluation}
                               evalType={props.type}
                               fulfilmentPoints={props.fulfilmentEvaluation === "points"}
                               blockWeight={props.blockWeight}
                               onClick={calculateFinalMark}
                    />

                    <div className="form-group">
                        <label className="fw-bold" htmlFor="blockComment">
                            Do textového pole uveďte finální komentář, ve kterém zohledněte další důležité detaily:
                        </label>
                        <textarea className="form-control" id="blockComment" placeholder="..."/>
                    </div>
                    <div className="text-center pt-3">
                        <button type="submit" className="btn btn-primary ">Pokračovat</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BasicBlock;