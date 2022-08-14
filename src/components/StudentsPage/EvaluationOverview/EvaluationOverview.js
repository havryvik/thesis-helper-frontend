import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import EvaluationService from "../../../services/evaluation.service";
import StupniceService from "../../../services/stupnice.service";
import StudentService from "../../../services/student.service";
import BasicBlocksService from "../../../services/basicBlocks.service";
import ApproachService from "../../../services/approach.service";
import AuthService from "../../../services/auth.service";
const EvaluationOverview = () => {
    const [currentUser, setCurrentUser] = useState(undefined)

    const {evaluationId} = useParams();
    const [evaluation, setEvaluation] = useState();
    const [approach, setApproach] = useState();
    const [requirements, setRequirements] = useState(undefined);
    const [weights, setWeights] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        setCurrentUser(AuthService.getCurrentUserFromLocalStorage());

        if(evaluation===undefined) {
            EvaluationService.getEvaluationOverview(evaluationId)
                .then(response => {
                     console.log(response.data);
                     response.data.blockDtos.sort(function(a, b){
                         if(a.blockNumber > b.blockNumber)
                             return 1;
                         if(a.blockNumber < b.blockNumber)
                             return -1;
                         return 0;
                     })
                     for(const block of response.data.blockDtos){
                         sortArray(block.criterionDtos);
                     }
                     setEvaluation(response.data);
                     return StudentService.getApproachByStudent(response.data.studentId);
                 })
                .then(response=>{
                    setApproach(response.data);
                    ApproachService.getExtraRequirements(response.data.id)
                        .then(response=>{
                            if(response.data!=null)
                                setRequirements(response.data);
                        });
                    return ApproachService.getWeights(response.data.id);
                })
                .then(response=>{
                    setWeights(response.data);
                })
                .catch(error=>{
                    console.log(error.response);
                    if (error.response && error.response.status === 403) {
                            localStorage.clear();
                            navigate("/login");
                            window.location.reload();
                        }
                });
        }
    }, [evaluation, evaluationId])

    function getCorrectWeight(blockNumber){
        if(weights!==undefined) {
            switch (blockNumber) {
                case 3:
                    return weights.activity;
                case 4:
                    return weights.professionalLevel;
                case 5:
                    return weights.languageLevel;
                case 6:
                    return weights.citation;
                default:
                    return;
            }
        }
    }

    function getBlockValue(blockNumber, blockValue){
        switch (blockNumber) {
            case 1:
                return StupniceService.getAssignmentDescription(blockValue);
            case 2:
                return StupniceService.getFulfilmentByEvalApproach(blockValue, approach.fulfilmentEvaluation, approach.autoFulfilment);
            default:{
                if (weights!==undefined&&weights.activity!==undefined){
                    return StupniceService.getFinalBlockMark(approach.basicBlocksEvaluation, blockValue, getCorrectWeight(blockNumber));
                }
                else {
                    return StupniceService.getFinalBlockMark(approach.basicBlocksEvaluation, blockValue, approach.fulfilmentEvaluation==="points"?(20):(25))
                }
            }
        }
    }

    function sortArray(array){
        array.sort(function(a, b){
            if(a.number > b.number)
                return 1;
            if(a.number < b.number)
                return -1;
            return 0;
        })
    }

    function getFulfilmentMax(){
        return `(${approach.fullfilmentEvaluation==="percent"?"":20})`;
    }

    function getBasicBlockMax(blockNumber){
        let max = "";
        if (approach.basicBlocksEvaluation==="weight")
            max = `(${getCorrectWeight(blockNumber)})`;
        if (approach.basicBlocksEvaluation==="points")
            max = `(${approach.fullfilmentEvaluation==="points"?20:25})`;
        return max;
    }

    return (

            <div className="myContainer pb-3">
                {evaluation&&approach&&(
                    <div className="container bg-white rounded mt-5 p-3">
                    <div >
                        <div className="modal-header row mx-3">
                            <div className="col-3"><h5>Výsledná známka - </h5></div>
                            <div className="col-9 pt-2 pb-2"><span className="border rounded p-3 h4 text-danger finalMark">{StupniceService.convertValueToMark(evaluation.finalMark)}</span></div>
                        </div>

                        <table className="table table-bordered mt-3 ">
                            <thead className="text-center">
                            <tr>
                                <th scope="col" className="width-5" >#</th>
                                <th scope="col" className="width-20">Název</th>
                                <th scope="col" className="width-15">Výsledek</th>
                                {(approach.basicBlocksEvaluation==="points"||approach.basicBlocksEvaluation==="weight")&&
                                    (<th scope="col" className="width-20">Dosážené body (Max)</th>)}
                                {(approach.basicBlocksEvaluation==="percent")&&
                                    (<th scope="col" className="width-20">Dosážená procenta</th>)}
                                <th scope="col" className="width-60">Komentář</th>
                            </tr>
                            </thead>
                        </table>

                            {evaluation.blockDtos.map((block) => (
                                <table className="table table-bordered mt-3">
                                    <tbody>
                                    <tr id = {block.blockNumber}>
                                        <td className="text-center width-5"><strong>{block.blockNumber}</strong></td>
                                        <td className="width-20"><strong>{BasicBlocksService.getBlockName(block.blockNumber)}</strong></td>
                                        <td className="text-center width-15"><strong>{getBlockValue(block.blockNumber, block.value)}</strong></td>
                                        {block.blockNumber===1&&(
                                            (approach.basicBlockEvaluation!=="marks"&&(<td className="width-20"/>))
                                        )}
                                        {block.blockNumber===2&&(
                                            (approach.fulfilmentEvaluation!=="words"&&(<td className="text-center width-20">{`${block.value} ${getFulfilmentMax()}`}</td>))||
                                            (approach.basicBlocksEvaluation!=="marks"&&(<td className="width-20"/>))
                                        )}
                                        {block.blockNumber!==1&&block.blockNumber!==2&&(
                                            (approach.basicBlocksEvaluation!=="marks"?(<td className="text-center width-20">{`${block.value} ${getBasicBlockMax(block.blockNumber)}`}</td>):
                                                (approach.fulfilmentEvaluation!=="words")&&(<td className="width-15"/>))
                                        )}
                                        <td className="text-center width-60">{block.comment}</td>
                                    </tr>
                                    {block.criterionDtos.map((criterion)=>(
                                        <tr>
                                            <td>{block.blockNumber}.{criterion.number}</td>
                                            <td>{BasicBlocksService.getBlockDescriptionByBlockNumber(block.blockNumber, criterion.number-1).name}</td>
                                            {(approach.basicBlocksEvaluation==="points"||approach.basicBlocksEvaluation==="weight"||approach.basicBlocksEvaluation==="percent")&&
                                                (<td/>)}
                                            <td>{criterion.value}%</td>
                                            <td>{criterion.comment}</td>
                                        </tr>
                                    ))}
                                    {block.blockNumber===4&&requirements!==undefined&&requirements.map((requirement, index)=>(
                                        <tr>
                                            <td>{`${block.blockNumber}.${block.criterionDtos.length+index+1}`}</td>
                                            <td>{requirement.name}</td>
                                            {(approach.basicBlocksEvaluation==="points"||approach.basicBlocksEvaluation==="weight"||approach.basicBlocksEvaluation==="percent")&&
                                                (<td/>)}
                                            <td>{`${requirement.value}%`}</td>
                                            <td>{block.comment}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                            ))}

                        <div className="container pt-3 pb-3">
                            <ul className="list-inline">
                                {approach.finalMarkPattern==="sumC"&&(
                                    <li className="row">
                                        <div className="col-5"><strong>Použitý koeficient:</strong></div>
                                        <div className="col-7">{evaluation.coefficient}</div>
                                    </li>
                                )}
                                <li className="row">
                                    <div className="col-5"><strong>Faktické hodnocení:</strong></div>
                                    <div className="col-7">{approach.basicBlocksEvaluation==="marks"?StupniceService.convertValueToMark(evaluation.actualMark):evaluation.actualMark}</div>
                                </li>
                                {approach.basicBlocksEvaluation!=="marks"&&(
                                    <li className="row">
                                        <div className="col-5"><strong>Příslušná známka:</strong></div>
                                        <div className="col-7">{StupniceService.getAppropriateMark(approach.basicBlocksEvaluation, evaluation.actualMark)}</div>
                                    </li>
                                )}
                                <li className="row">
                                    <div className="col-5"><strong>Korekce vedoucím:</strong></div>
                                    <div className="col-7">{StupniceService.getIncrementDescription(approach.finalMarkPattern, evaluation.increment)}</div>
                                </li>
                            </ul>
                        </div>

                        <div className="modal-footer">
                            <div className="container row">
                                <h5 className="col-3">Finální komentář: </h5>
                                <div className="col-9" id="finalMarkComment">{evaluation.finalComment}</div>
                            </div>
                        </div>
                    </div>
                        {currentUser.role==="SUPERVISOR"&&(
                            <div className="container text-center pb-3 pt-5">
                            <div className="d-inline-block mx-2">
                                <Link to={`/students/${evaluation.studentId}/evaluation`}>
                                    <span className="btn btn-secondary btnSummary" >Ohodnotit znovu</span>
                                </Link>
                            </div>
                            <div className="d-inline-block mx-2">
                                <Link to="/students">
                                    <span className="btn btn-primary btnSummary">Zpět k prohlížení studentů</span>
                                </Link>
                            </div>
                        </div>
                        )}

                        {currentUser.role==="STUDENT"&&(
                            <div className="container text-center pb-3">
                                <Link class to="/my-thesis">
                                    <span className="btn btn-primary btnSummary">Zpět do profilu</span>
                                </Link>
                            </div>
                        )}
                    </div>
                )}

        </div>
    )
}
export default EvaluationOverview;