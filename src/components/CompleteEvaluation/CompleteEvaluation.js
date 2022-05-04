import React, {useDeferredValue, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import StudentService from "../../services/student.service";
import Assignment from "./Blocks/Assignment";
import Fulfilment from "./Blocks/Fulfilment";
import ApproachService from "../../services/approach.service";
import BasicBlock from "./Blocks/BasicBlock";
import BasicBlocksService from "../../services/basicBlocks.service";
import SupervisorService from "../../services/supervisor.service";
import FinalMark from "./Blocks/FinalMark";
import EvaluationService from "../../services/evaluation.service";
const CompleteEvaluation = () => {

    const {studentIdParam} = useParams();
    const [currentFrame, setCurrentFrame]=useState("assignment");
    const [evaluationId, setEvaluationId] = useState(undefined);

    const [studentApproach, setStudentApproach] = useState();
    const [weights, setWeights] = useState(undefined);
    const [description, setDescription] = useState(BasicBlocksService.getBlockDescription("activity", null));
    const [requirements, setRequirements] = useState(undefined);

    const [assignment, setAssignment] = useState(undefined);
    const [fulfilment, setFulfilment] = useState(undefined);
    const [activity, setActivity] = useState(undefined);
    const [professionalLevel, setProfessionalLevel] = useState(undefined);
    const [languageLevel, setLanguageLevel] = useState(undefined);
    const [citation, setCitation] = useState(undefined);
    const [finalMark, setFinalMark] = useState(undefined);
    const [extraReq, setExtraReq] = useState(undefined);



    useEffect(()=>{
        StudentService.getApproachByStudent(studentIdParam).then(
            (response)=>{
                setStudentApproach(response.data);
            },
            (error)=>{console.log(error);}
        )
        SupervisorService.getExtraRequirementsByStudent(studentIdParam).then(
            (response)=>{
                console.log(response.data)
                setRequirements(response.data)},
            (error)=>{console.log(error);}
        )
        if(studentApproach!==undefined && studentApproach.basicBlocksEvaluation==="weight") {
            ApproachService.getWeights(studentApproach.id).then(
                (response)=>{setWeights(response.data)},
                (error)=>{console.log(error)}
            )
        }
        StudentService.getStudentEvaluation(studentIdParam).then(
            (response)=>{setEvaluationId(response.data.studentId)},
            (error)=>{console.log(error)}
        )
    },[])


    function getBlockWeight(){
        if (weights!==undefined || weights!==null){
            switch (currentFrame) {
                case "activity": return weights.activity;
                case "professionalLevel": return weights.professionalLevel;
                case "languageLevel": return weights.languageLevel;
                case "citation": return weights.citation;
                default: return null;
            }
        }
        return null;
    }

    function saveBlockResult(blockResult){
        switch (currentFrame) {
            case "activity": setActivity(blockResult); break;
            case "professionalLevel": setProfessionalLevel(blockResult); break;
            case "languageLevel": setLanguageLevel(blockResult); break;
            default: setCitation(blockResult); break;
        }
    }

    function calculateFulfilment(){
        const crArray = professionalLevel.criterions;
        let sum = 0;
        for (const criterion of crArray){
            if (criterion.id==="1"||criterion.id==="3"||parseInt(criterion.id)>=5)
                sum += parseInt(criterion.value);
        }
        const notObtained = 100*(crArray.length-2)-sum;
        return Math.round(100-(notObtained/crArray.length));
    }

    function saveEvaluation(){
        EvaluationService.updateEvaluation(evaluationId, finalMark).then(
            (response)=>{console.log(response.status)},
            (error)=>{console.log(error)}
        )
        const blocks = [assignment, fulfilment, activity, professionalLevel, languageLevel, citation];
        for (const block of blocks){
            EvaluationService.updateBlockEvaluation(evaluationId, block).then(
                (response)=>{console.log(response.status)},
                (error)=>{console.log(error)}
            )
        }
        EvaluationService.updateRequirements(evaluationId, extraReq).then(
            (response)=>{console.log(response.status)},
            (error)=>{console.log(error)}
        )
    }

    return(
        <div className="myContainer">
            <div className="container rounded p-3">
                {currentFrame==="assignment"&&(<Assignment onSubmit={(selectedItem, comment)=>{
                    const result = {
                        value: selectedItem,
                        number: 1,
                        comment: comment
                    }
                    setAssignment(result);
                    setCurrentFrame(studentApproach.autoFulfilment?"activity":"fulfilment")
                }} />)}
                {currentFrame==="fulfilment"&&(<Fulfilment type={studentApproach.fulfilmentEvaluation}
                    onSubmit={(selectedItem, comment)=>{
                    const result = {
                        value: selectedItem,
                        number: 2,
                        comment: comment
                    }
                    setFulfilment(result);
                    setCurrentFrame("activity")
                    }}
                />)}
                {currentFrame!=="assignment"&& currentFrame!=="fulfilment"&& currentFrame!=="finalMark"&&
                    (<BasicBlock
                        currentFrame = {currentFrame}
                        description = {description}
                        type={studentApproach.basicBlocksEvaluation}
                        criterionEvaluation={studentApproach.criterionEvaluation}
                        fulfilmentEvaluation={studentApproach.fulfilmentEvaluation}
                        blockWeight={getBlockWeight}
                        extraRequirements = {requirements}

                        onSubmit={(blockResult, extraReq)=>{
                           console.log(blockResult);
                           saveBlockResult(blockResult);
                           setDescription(BasicBlocksService.getBlockDescription(description.nextFrame));
                           setCurrentFrame(description.nextFrame);
                           if (extraReq.length!==0)
                               setExtraReq(extraReq);
                        }}
                    />)}
                {currentFrame==="finalMark"&&(
                    <FinalMark
                        finalMarkPattern={studentApproach.finalMarkPattern}
                        blocksEvaluation = {studentApproach.basicBlocksEvaluation}
                        autoFulfilment={studentApproach.autoFulfilment}
                        assignmentMark={assignment.value}
                        fulfilmentEvaluation={studentApproach.fulfilmentEvaluation}
                        fulfilmentMark={fulfilment?(fulfilment.value):(calculateFulfilment())}
                        activityMark={activity.blockMark.value}
                        professionalLevelMark={professionalLevel.blockMark.value}
                        languageLevelMark={languageLevel.blockMark.value}
                        citationMark={citation.blockMark.value}

                        saveEvaluation={(finalMarkValue)=>{
                            finalMarkValue.studentId = studentIdParam;
                            setFinalMark(finalMarkValue);
                            saveEvaluation();
                        }
                    }
                    />
                )}
            </div>
        </div>
    )
}

export default CompleteEvaluation;