import React, {useEffect, useState} from "react";
import BasicSelect from "./BasicSelect";
import Requirements from "./Requirements";
import Weights from "./Weights";
import {useNavigate, useParams} from "react-router-dom";
import ApproachService from "../../services/approach.service";
import EvaluationService from "../../services/evaluation.service";


const Configurator = () => {

    const navigate = useNavigate();
    const {approachId} = useParams();
    const [currentForm , setCurrentForm] = useState('basicSelect');
    const [approach, setApproach] = useState(undefined);
    const [weights, setWeights] = useState(undefined);
    const [requirements, setRequirements] = useState([]);

    function showCurrentForm(){
        if(currentForm==='basicSelect') return (<BasicSelect/>)
        else if (currentForm === 'requirements') return (<Requirements/>)
        else if (currentForm === 'weights') return (<Weights fulfilmentEvaluation={approach.fulfilmentEvaluation}/>)
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
        ApproachService.updateApproach(approachId, approach).then(
            (response)=>{
                console.log(response.status);
            },
            (error)=>{
                console.log(error);
            }
        )
        console.log(weights);
        //addWeights(approachId, weights) if not null
        if (weights!==undefined){
            ApproachService.addWeights(approachId,weights).then(
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
            EvaluationService.addRequirements(requirements,approachId).then(
                (response)=>{
                    console.log(response.status);
                },
                (error)=>{
                    console.log(error);
                }
            )
        }
        navigate(`/summary/${approachId}`);
    }

    function handleSubmitAfterSelect(event){
        //When DB will be connected send there a request to save an evaluation approach instead of saving to a local storage
        const approachDto  = {
            fulfilmentEvaluation: document.getElementById("fulfilmentEvaluation").value,
            basicBlocksEvaluation: document.getElementById("basicBlocksEvaluation").value,
            criterionEvaluation: document.getElementById("criterionEvaluation").value,
            coefficient: document.getElementById("coefficient").value,
            autoFulfilment: document.getElementById("autoFulfilment").value,
        };
        setApproach(approachDto);

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
        if(approach!==undefined){
        if (approach.basicBlocksEvaluation === "weight"){
            setCurrentForm('weights');
        } else {
            updateApproach()
        }}
    }, [requirements]);


    useEffect(() => {
        //console.log(requirements);
        if(approach!==undefined&&requirements!==undefined){
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
        <div className="myContainer pb-3 ">
            <div className="container bg-white p-3 rounded">
                <div className="card-header text-center">
                    {showButton()}
                    <h4>Konfigurátor modelu</h4>
                    <div className="container">Přizpůsobte si model hodnocení poskytnutím odpovědi na následující otázky.</div>
                </div>
                <form onSubmit={(event) => handleSubmit(event)} className={currentForm}>
                    {showCurrentForm()}
                </form>
            </div>
        </div>
    )
}

export default Configurator;