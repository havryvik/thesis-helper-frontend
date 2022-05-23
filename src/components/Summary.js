import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import ApproachService from "../services/approach.service";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RequirementService from "../services/requirement.service";
import app from "../App";
const Summary = () => {

    const {studentId, approachId} = useParams();
    const [studentApproach, setStudentApproach] = useState(undefined);
    const [columnsAmount, setColumnsAmount] = useState(undefined);
    const [approachFulfilment, setApproachFulfilment] = useState(undefined);
    const [approachBasicBlocks, setBasicBlocksFulfilment] = useState(undefined);
    const [weights, setWeights] = useState(undefined);
    const [requirements, setRequirements] = useState(undefined);
    const [finalMark, setFinalMark] = useState(undefined);

    useEffect(() => {
        ApproachService.getApproach(approachId).then(
            (response) => {
                const approach = response.data;
                setStudentApproach(approach);
                if(approach.basicBlocksEvaluation!=="marks")
                    setColumnsAmount(3);
                else setColumnsAmount(2);
               // console.log(columnsAmount);
                setApproachFulfilment(ApproachService.getFulfilmentDescription(approach.fulfilmentEvaluation));
               // console.log(ApproachService.getFulfilmentDescription(approach.fulfilmentEvaluation));
                setBasicBlocksFulfilment(ApproachService.getBlocksDescription(approach.basicBlocksEvaluation, approach.criterionEvaluation));
            },
            (error) => {
                console.log("Private page", error);
                // Invalid token
                // if (error.response && error.response.status === 403) {
                //     AuthService.logout();
                //     navigate("/login");
                //     window.location.reload();
                // }
            }
        );


    }, []);

    useEffect(()=>{
        console.log(studentApproach);
        if(studentApproach!==undefined){
        if(studentApproach.basicBlocksEvaluation==="weight"||studentApproach.basicBlocksEvaluation==="points"){
            ApproachService.getWeights(approachId).then(
                (response)=>{
                    setWeights(response.data);
                    console.log(response.data)
                },
                (error) => {console.log(error)}
            );
        }
        ApproachService.getExtraRequirements(approachId).then(
            (response)=>{
                if(response.data!=null)
                    setRequirements(response.data);
            },
            (error)=>{console.log(error)}
            );
        setFinalMark(ApproachService.getFinalMark(studentApproach.finalMarkPattern));
        }
    },[studentApproach]);

    function removeRequirement(requirement){
        RequirementService.removeRequirement(requirement.id).then(
            (response)=>{
                console.log(response.status);
                setRequirements(requirements.filter(item => item !== requirement));
            },
            (error)=>{console.log(error);}
        )
    }

    return (
        (studentApproach)&&(approachBasicBlocks)&&(approachFulfilment)&&(
        <div className="myContainer pb-5">
            <div className="container bg-white mg-3 pt-3 rounded">
            <div className="container text-center h5 rounded bg-light pt-3 pb-3">Shrnutí</div>
            <table className="table table-sm table-bordered bg-white ">
                <thead className="text-center bg-grey">
                <tr>
                    <th scope="col" colSpan={columnsAmount}>Zvolený přístup hodnocení</th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-light text-center">
                    <th scope="col">Blok</th>
                    <th scope="col">Způsob hodnocení</th>
                    {studentApproach&&studentApproach.fulfilmentEvaluation==="points"&&(
                        <th scope="col">Maximální počet bodů</th>
                    )}
                    {studentApproach&&studentApproach.fulfilmentEvaluation==="percent"&&(
                        <th scope="col">Maximum</th>
                    )}
                </tr>
                <tr><td><strong>1. Zadání</strong></td>
                    <td>Slovní hodnocení. Možností: Mimořádně náročné, Náročné, Průměrně náročné, Lehké, Nedosatecne náročné</td>
                    {columnsAmount===3&&(<td/>)}
                </tr>
                <tr><td><strong>2. Splnění zadání</strong></td><td>{approachFulfilment.text}</td>
                    {approachFulfilment.max!==""&&(<td>{approachFulfilment.max}</td>)}
                </tr>
                <tr><td><strong>3. Aktivita a samostatnost</strong><br/>	3.1. Dodržení domluvených termínů<br/>
                        3.2. Přípravenost k setkáním<br/>
                        3.3. Iniciativnost<br/>
                        3.4. Samostatnost<br/>
                        3.5. Pěčlivost</td>
                    <td>{approachBasicBlocks}</td>
                    {columnsAmount===3&&(
                        weights?(<td>{weights.activity}</td>):(<td>{approachFulfilment.max}</td>)
                    )}
                </tr>
                <tr><td><strong>4. Odborná úroveň</strong><br/>4.1. Použitelnost, aplikovatelnost v praxi<br/>
                    4.2. Možnost dálšího rozvoje<br/>
                    4.3. Systematičnost analýzy<br/>
                    4.4. Replikovatelnost závěru<br/>
                    4.5. Volitelná<br/>
                    {requirements&&(
                        requirements.map((requirement)=>(
                            <span>4.{requirements.indexOf(requirement)+6} {requirement.name}
                                <FontAwesomeIcon icon={faTrashCan} className='btn' onClick={()=>removeRequirement(requirement)}/>
                                <br/></span>
                        ))
                    )}
                    </td>
                    <td>{approachBasicBlocks}</td>
                    {columnsAmount===3&&(
                        weights?(<td>{weights.professionalLevel}</td>):(<td>{approachFulfilment.max}</td>)
                    )}
                </tr>
                <tr><td><strong>5. Formální a jazyková úroveň, rozsah práce</strong><br/>	5.1. Adekvatnost rozsáhu<br/>
                    5.2. Formatování<br/>
                    5.3. Gramatické chyby, punktuace, překlepy<br/>
                    5.4. Souvislost, konzistence textu<br/>
                    5.5. Čitelnost<br/>
                    5.6. Použití odborného jazyku<br/>
                    5.7. Reference v textu</td>
                    <td>{approachBasicBlocks}</td>
                    {columnsAmount===3&&(
                        weights?(<td>{weights.languageLevel}</td>):(<td>{approachFulfilment.max}</td>)
                    )}
                </tr>
                <tr><td><strong>6. Výběr zdrojů, korektnost citace</strong><br/>	6.1. Dodržování konvenci<br/>
                    6.2. Dostatečnost citaci<br/>
                    6.3. Kvalita zdrojů</td>
                    <td>{approachBasicBlocks}</td>
                    {columnsAmount===3&&(
                        weights?(<td>{weights.citation}</td>):(<td>{approachFulfilment.max}</td>)
                    )}
                </tr>
                </tbody>
            </table>
            <div className="container p-3">
                <ul  className="list-inline">
                    <li className="list-group-item"><strong>Výsledná známka - </strong> {finalMark}</li>
                </ul>
            </div>
                <div className="container text-center pb-3">
                    <div className="d-inline-block mx-2">
                        <Link to={`/students/${studentId}/configurator`}>
                            <button className="btn btn-secondary btnSummary" >Nakonfigurovat znovu</button>
                        </Link>
                    </div>
                    <div className="d-inline-block mx-2">
                        <Link to="/students">
                            <button className="btn btn-primary btnSummary">Zpět k prohlížení studentů</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        )
    )
}
export default Summary;