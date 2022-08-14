import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import StudentService from "../../../services/student.service";
import Assignment from "./Blocks/Assignment";
import Fulfilment from "./Blocks/Fulfilment";
import ApproachService from "../../../services/approach.service";
import BasicBlock from "./Blocks/BasicBlock";
import BasicBlocksService from "../../../services/basicBlocks.service";
import SupervisorService from "../../../services/supervisor.service";
import FinalMark from "./Blocks/FinalMark";
import EvaluationService from "../../../services/evaluation.service";
import StupniceService from "../../../services/stupnice.service";
const CompleteEvaluation = () => {

    const {studentIdParam} = useParams();
    const [currentFrame, setCurrentFrame]=useState("assignment");
    const [evaluationId, setEvaluationId] = useState(undefined);

    const [studentApproach, setStudentApproach] = useState();
    const [weights, setWeights] = useState(undefined);
    const [description, setDescription] = useState(BasicBlocksService.getBlockDescription("activity"));
    const [requirements, setRequirements] = useState(undefined);

    const [assignment, setAssignment] = useState(undefined);
    const [fulfilment, setFulfilment] = useState(undefined);
    const [activity, setActivity] = useState(undefined);
    const [professionalLevel, setProfessionalLevel] = useState(undefined);
    const [languageLevel, setLanguageLevel] = useState(undefined);
    const [citation, setCitation] = useState(undefined);
    const [extraReq, setExtraReq] = useState(undefined);

    const navigate = useNavigate();

    useEffect(()=>{
        StudentService.getApproachByStudent(studentIdParam).then(
            (response)=>{
                setStudentApproach(response.data);
                if(response.data.basicBlocksEvaluation==="weight") {
                    ApproachService.getWeights(response.data.id).then(
                        (response)=>{setWeights(response.data)},
                        (error)=>{console.log(error)}
                    )
                }
            },
            (error)=>{console.log(error);}
        )
        SupervisorService.getExtraRequirementsByStudent(studentIdParam).then(
            (response)=>{
                console.log(response.data)
                setRequirements(response.data)},
            (error)=>{console.log(error);}
        )
        StudentService.getStudentEvaluation(studentIdParam).then(
            (response)=>{setEvaluationId(response.data.evaluationId)},
            (error)=>{console.log(error)}
        )
    },[studentIdParam])


    function getBlockWeight(){
        console.log(weights);
        if (weights!==undefined){
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
        console.log(activity);
        switch (currentFrame) {
            case "activity": setActivity(blockResult); break;
            case "professionalLevel": setProfessionalLevel(blockResult); break;
            case "languageLevel": setLanguageLevel(blockResult); break;
            default: setCitation(blockResult); break;
        }
    }

    function calculateFulfilment(){
        console.log("calculateFulfilment")
        const crArray = professionalLevel.criterionDtos;
        let sum = 0;
        console.log(crArray);
        for (const criterion of crArray){
            if (criterion.number==="1"||criterion.number==="3"){
                sum += parseInt(criterion.value);
                console.log("SUM AFTER ID "+criterion.id+" IS: "+sum)
            }
        }
        if (requirements!==undefined){
            for (const req of requirements){
                sum+=parseInt(req.value);
                console.log("SUM AFTER REQ "+req.value+" IS: "+sum)
            }
        }
        const length = requirements===undefined?2:2+requirements.length;
        console.log("LENGTH "+length);
        const notObtained = 100*(length)-sum;
        console.log("notObtained "+notObtained);
        const percent = Math.round(100-(notObtained/(length+2)));
        console.log("percent "+percent);
        const result = {
            value: StupniceService.getFulfilmentResultForAutoFulfilment(percent, studentApproach.fulfilmentEvaluation),
            blockNumber: 2,
            comment: null
        }
        console.log("result.value "+result.value);

        setFulfilment(result);
        return result.value;
    }

    function saveEvaluation(finalMarkValue){
        console.log(finalMarkValue);
        EvaluationService.updateEvaluation(evaluationId, finalMarkValue).then(
            (response)=>{console.log(response.status)},
            (error)=>{console.log(error)}
        )
        const blocks = [assignment, fulfilment, activity, professionalLevel, languageLevel, citation];
        for (const block of blocks){
            console.log(block)
            EvaluationService.updateBlockEvaluation(evaluationId, block).then(
                (response)=>{console.log(response.status)},
                (error)=>{console.log(error)}
            )
        }
        if (extraReq!==undefined) {
            console.log(extraReq)
            EvaluationService.updateRequirements(evaluationId, extraReq).then(
                (response) => {
                    console.log(response.status)
                },
                (error) => {
                    console.log(error)
                }
            )
        }
        navigate(`/evaluation-overview/${evaluationId}`);
        window.location.reload();
    }

    return(
        <div className="myContainer">
            <div className="container rounded p-3">
                {currentFrame==="assignment"&&(<Assignment onSubmit={(selectedItem, comment)=>{
                    const result = {
                        value: selectedItem,
                        blockNumber: 1,
                        comment: comment
                    }
                    setAssignment(result);
                    setCurrentFrame(studentApproach.autoFulfilment?"activity":"fulfilment")
                    window.scrollTo(0, 0)
                }} />)}
                {currentFrame==="fulfilment"&&(<Fulfilment type={studentApproach.fulfilmentEvaluation}
                    onSubmit={(selectedItem, comment)=>{
                    const result = {
                        value: selectedItem,
                        blockNumber: 2,
                        comment: comment
                    }
                    setFulfilment(result);
                    setCurrentFrame("activity")
                        window.scrollTo(0, 0)
                    }}
                />)}
                {currentFrame!=="assignment"&& currentFrame!=="fulfilment"&& currentFrame!=="finalMark"&&
                    (<BasicBlock
                        currentFrame = {currentFrame}
                        description = {description}
                        type={studentApproach.basicBlocksEvaluation}
                        criterionEvaluation={studentApproach.criterionEvaluation}
                        fulfilmentEvaluation={studentApproach.fulfilmentEvaluation}
                        blockWeight={getBlockWeight()}
                        extraRequirements = {requirements}

                        onSubmit={(blockResult, extraReq)=>{
                           console.log(blockResult);
                           saveBlockResult(blockResult);
                           setDescription(BasicBlocksService.getBlockDescription(description.nextFrame));
                           setCurrentFrame(description.nextFrame);
                           if (extraReq.length!==0)
                               setExtraReq(extraReq);
                            window.scrollTo(0, 0)
                        }}
                    />)}
                {currentFrame==="finalMark"&&(
                    <FinalMark
                        finalMarkPattern={studentApproach.finalMarkPattern}
                        blocksEvaluation = {studentApproach.basicBlocksEvaluation}
                        autoFulfilment={studentApproach.autoFulfilment}
                        assignmentMark={assignment.value}
                        fulfilmentEvaluation={studentApproach.fulfilmentEvaluation}
                        fulfilmentMark={fulfilment!==undefined?(fulfilment.value):(calculateFulfilment())}
                        activityMark={activity.value}
                        professionalLevelMark={professionalLevel.value}
                        languageLevelMark={languageLevel.value}
                        citationMark={citation.value}
                        weights={weights}

                        saveEvaluation={(finalMarkValue)=>{
                            finalMarkValue.studentId = studentIdParam;
                            saveEvaluation(finalMarkValue);
                        }
                    }
                    />
                )}
            </div>
        </div>
    )
}

export default CompleteEvaluation;