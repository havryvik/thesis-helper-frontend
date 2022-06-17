import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import EvaluationService from "../../../services/evaluation.service";
import StupniceService from "../../../services/stupnice.service";
import StudentService from "../../../services/student.service";
import BasicBlocksService from "../../../services/basicBlocks.service";
import ApproachService from "../../../services/approach.service";
const EvaluationOverview = () => {

    const {evaluationId} = useParams();
    const [evaluation, setEvaluation] = useState();
    const [approach, setApproach] = useState();
    const [currentBlock, setCurrentBlock] = useState(3);
    const [currentBlockDescription, setBlockDescription] = useState(BasicBlocksService.getBlockDescriptionByBlockNumber(3));
    const [weights, setWeights] = useState();

    useEffect(()=>{
        if(evaluation===undefined) {
            EvaluationService.getEvaluationOverview(evaluationId).then(
                 (response) => {
                     console.log(response.data);
                     response.data.blockDtos.sort(function(a, b){
                         if(a.blockNumber > b.blockNumber)
                             return 1;
                         if(a.blockNumber < b.blockNumber)
                             return -1;
                         return 0;
                     })
                     setEvaluation(response.data);
                     StudentService.getApproachByStudent(response.data.studentId).then(
                         (response)=>{
                             setApproach(response.data);
                             ApproachService.getWeights(response.data.id).then(
                                 (response)=>{setWeights(response.data)},
                                (error)=>{console.log(error)}
                             )
                         },
                         (error)=>{console.log(error)}
                     )

                 },
                 (error)=>{console.log(error)}
             )
        }
    })

    function getCorrectWeight(blockNumber){
        switch (blockNumber){
            case 3: return weights.activity;
            case 4: return weights.professionalLevel;
            case 5: return weights.languageLevel;
            default: return weights.citation;
        }
    }

    function getBlockValue(blockNumber, blockValue){
        switch (blockNumber) {
            case 1:
                return StupniceService.getAssignmentDescription(blockValue);
            case 2:
                return StupniceService.getFulfilmentByEvalApproach(blockValue, approach.fulfilmentEvaluation, approach.autoFulfilment);
            default:{
                if (weights.activity!==undefined){
                    return StupniceService.getFinalBlockMark(approach.basicBlocksEvaluation, blockValue, getCorrectWeight(blockNumber));
                }
                else return StupniceService.getFinalBlockMark(approach.basicBlocksEvaluation, blockValue, approach.fulfilmentEvaluation==="points"?(20):(25))
            }
        }
    }

    return (

            <div className="myContainer">

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
                                <th scope="col" className="width-60">Komentář</th>
                            </tr>
                            </thead>
                            <tbody>
                            {evaluation.blockDtos.map((block) => (
                                    <tr>
                                        <td className="text-center"><strong>{block.blockNumber}</strong></td>
                                        <td>{BasicBlocksService.getBlockName(block.blockNumber)}</td>
                                        <td className="text-center"><strong>{getBlockValue(block.blockNumber, block.value)}</strong></td>
                                        <td>{block.comment}</td>
                                        {block.criterionDtos.map((criterion, index)=>(
                                            <tr>
                                                <td className="text-center">{`${block.blockNumber}.${criterion.number}`}</td>
                                                <td>{currentBlockDescription.defaultRequirements[index].name}</td>
                                                <td className=" text-center">{`${criterion.value}%`}</td>
                                                <td>{block.comment}</td>
                                            </tr>
                                        ))}
                                        {block.blockNumber===4&&block.criterionDtos.map((requirement, index)=>(
                                            <tr>
                                                <td>{`${block.blockNumber}.${block.criterionDtos.length+index}`}</td>
                                                <td>{requirement.name}</td>
                                                <td>{`${requirement.value}%`}</td>
                                                <td>{block.comment}</td>
                                            </tr>
                                        ))}
                                    </tr>
                            ))}
                            </tbody>
                        </table>

                        <div className="modal-footer">
                            <div className="container row">
                                <h5 className="col-3">Finální komentář: </h5>
                                <div className="col-9" id="finalMarkComment">{evaluation.finalComment}</div>
                            </div>
                        </div>
                    </div>
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
                    </div>
                )}

        </div>
    )
}
export default EvaluationOverview;