import React, {useEffect, useState} from "react";
import BasicSelect from "./BasicSelect";
import Requirements from "./Requirements";
import Weights from "./Weights";
import {useNavigate, useParams} from "react-router-dom";
import ApproachService from "../../../services/approach.service";
import EvaluationService from "../../../services/evaluation.service";
import StudentService from "../../../services/student.service";


const Configurator = () => {

    const navigate = useNavigate();
    const {studentId} = useParams();
    const [currentForm , setCurrentForm] = useState('basicSelect');
    const [approach, setApproach] = useState(undefined);
    const [approachDto, setApproachDto] = useState(undefined);
    const [weights, setWeights] = useState(undefined);
    const [requirements, setRequirements] = useState([]);

    function showCurrentForm(){
        console.log(currentForm);
        if(currentForm==='basicSelect') return (<BasicSelect/>)
        if (currentForm === 'requirements') return (<Requirements/>)
        if (currentForm === 'weights') return (<Weights fulfilmentEvaluation={approach.fulfilmentEvaluation}/>)
    }

    function handleSubmit(event){
        event.preventDefault();
        // eslint-disable-next-line default-case
        switch (currentForm){
            case 'basicSelect': {handleSubmitAfterSelect(event);break}
            case 'requirements': {handleSubmitAfterRequirements(event);break}
            case 'weights': {handleSubmitAfterWeights(event);break}
        }
    }

    function updateApproach(){
        //updateApproach(approachId, approachDto)
        console.log(approach);
        ApproachService.updateApproach(approach.id, approachDto).then(
            (response)=>{
                console.log(response.status);
                //addWeights(approachId, weights) if not null
                if (weights!==undefined){
                    ApproachService.addWeights(approach.id,weights).then(
                        (response)=>{
                            console.log(response.status);
                        },
                        (error)=>{
                            console.log(error);
                        }
                    )
                }
                console.log(requirements);
                //addRequirements(approachId, requirements) if not null
                if (requirements.length!==0){
                    EvaluationService.addRequirements(requirements,approach.id).then(
                        (response)=>{
                            console.log(response.status);
                        },
                        (error)=>{
                            console.log(error);
                        }
                    )
                }
            },
            (error)=>{
                console.log(error);
            }
        )
        console.log(weights);

        navigate(`/students/${studentId}/summary/${approach.id}`)
        window.location.reload();
    }

    function handleSubmitAfterSelect(event){
        //When DB will be connected send there a request to save an evaluation approach instead of saving to a local storage

        let validation = true;
        const selects = document.querySelectorAll("select");
        for (const select of selects){
            if ((select.id==="fulfilmentEvaluation")||(select.id==="basicBlocksEvaluation")||(select.id==="criterionEvaluation")){
                if(select.value==="null"){
                select.classList.add("is-invalid");
                validation = false;}
            }
        }
        if (!validation) return;

        const approachDto  = {
            fulfilmentEvaluation: document.getElementById("fulfilmentEvaluation").value,
            basicBlocksEvaluation: document.getElementById("basicBlocksEvaluation").value,
            criterionEvaluation: document.getElementById("criterionEvaluation").value,
            coefficient: document.getElementById("coefficient").value,
            autoFulfilment: document.getElementById("autoFulfilment").value,
        };
        setApproachDto(approachDto);

        let weight = null;
        if(approachDto.basicBlocksEvaluation==="points"){
            weight = approachDto.fulfilmentEvaluation==="points"?20:25;
        }
        const weightsDto  = {
            activity: weight,
            professionalLevel: weight,
            languageLevel: weight,
            citation: weight,
            maxPoints: weight
        };
        setWeights(weightsDto);

        setCurrentForm('requirements');
    }

    useEffect(() => {
        //console.log(requirements);
        if(approach===undefined){
            StudentService.getApproachByStudent(studentId).then(
                (response)=>{setApproach(response.data)},
                (error)=>{console.log(error)}
            )
        }
        if(approachDto!==undefined && currentForm==="requirements"){
        if (approachDto.basicBlocksEvaluation === "weight"){
            setCurrentForm('weights');
        } else {
            updateApproach()
        }}
    }, [requirements]);


    useEffect(() => {
        //console.log(requirements);
        if(approachDto!==undefined&&requirements!==undefined&&currentForm==="weights"){
            updateApproach();
        }
    }, [weights]);

    function handleSubmitAfterRequirements(event){
        //When DB will be connected send there a request to save an evaluation approach instead of saving to a local storage

        const inputs = document.querySelectorAll(".requirement");
        const requirementTmp = [];
        for(const input of inputs){
           requirementTmp.push({ name: input.innerHTML});
        }
        console.log(requirementTmp);
        setRequirements(requirements.concat(requirementTmp));
    }

    function handleSubmitAfterWeights(event){

        // const inputs = document.querySelectorAll(".form-control");
        // const blocks = [];
        // for(const input of inputs){
        //     blocks.push("id: "+input.id.toString()+" weight: "+input.value.toString());
        // }
        // localStorage.setItem("weights", blocks.toString());

        const weightsDto  = {
            activity: document.getElementById("activity").value,
            professionalLevel: document.getElementById("professionalLevel").value,
            languageLevel: document.getElementById("languageLevel").value,
            citation: document.getElementById("citation").value,
            maxPoints: approach.fulfilmentEvaluation==='points'?80:100
        };
        setWeights(weightsDto);
    }

    function handleBack(){
        if (currentForm==='requirements') setCurrentForm('basicSelect')
        else setCurrentForm('requirements')
    }


    function showButton(){
        if (currentForm==='requirements' || currentForm==='weights'){
            return (
                <div className="text-left">
                    <button onClick={handleBack}
                            type="button" className="btn btn-dark rounded " >Zpět</button>
                </div>
            )
        }
    }

    return (
        <div className="pb-3 pt-3 myContainer">
            <div className="container bg-white p-3 rounded">
                <div className="card-header text-center">
                    {showButton()}
                    <h4>Konfigurátor modelu</h4>
                    <div className="container">Přizpůsobte si model hodnocení poskytnutím odpovědi na následující otázky.</div>
                    <span className="small"><span className="text-danger ">*<strong> ! IMPORTANT </strong></span>Vždy začínejte první otázkou (i při úpravě), formulář se pak přizpůsobí na základě odpovědí na předchozí otázku.</span>
                </div>
                <form onSubmit={(event) => handleSubmit(event)} className={currentForm}>
                    {showCurrentForm()}
                </form>
            </div>
        </div>
    )
}

export default Configurator;