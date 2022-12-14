import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import ApproachService from "../../services/approach.service";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RequirementService from "../../services/requirement.service";
import AuthService from "../../services/auth.service";
const Summary = () => {

    const [currentUser, setCurrentUser] = useState(undefined)
    const {studentId, approachId} = useParams();
    const [studentApproach, setStudentApproach] = useState(undefined);
    const [columnsAmount, setColumnsAmount] = useState(undefined);
    const [approachFulfilment, setApproachFulfilment] = useState(undefined);
    const [approachBasicBlocks, setBasicBlocksFulfilment] = useState(undefined);
    const [weights, setWeights] = useState(undefined);
    const [requirements, setRequirements] = useState(undefined);
    const [finalMark, setFinalMark] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentUser(AuthService.getCurrentUserFromLocalStorage());
        ApproachService.getApproach(approachId)
            .then(response => {
                const approach = response.data;
                setStudentApproach(approach);
                if (approach.basicBlocksEvaluation !== "marks") {
                    setColumnsAmount(3);
                    console.log(3);
                } else setColumnsAmount(2);

                setApproachFulfilment(ApproachService.getFulfilmentDescription(approach.fulfilmentEvaluation));
                setBasicBlocksFulfilment(ApproachService.getBlocksDescription(approach.basicBlocksEvaluation, approach.criterionEvaluation));
                if(approach.basicBlocksEvaluation==="weight"||approach.basicBlocksEvaluation==="points"){
                    ApproachService.getWeights(approachId).then(
                        response=>{setWeights(response.data);});
                }
                ApproachService.getExtraRequirements(approachId).then(
                    response=>{
                        if(response.data!=null)
                            setRequirements(response.data);
                    });
                setFinalMark(ApproachService.getFinalMark(approach.finalMarkPattern));
            })
            .catch(error=>{
                console.log(error.response);
                if (error.response && error.response.status === 403) {
                    localStorage.clear();
                    navigate("/login");
                    window.location.reload();
                }
            });
    }, [approachId, navigate]);

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
        <div className="myContainer pb-5 pt-3">
            <div className="container bg-white mg-3 pt-3 rounded">
            <div className="container text-center h5 rounded bg-light pt-3 pb-3">Shrnut??</div>
            <table className="table table-sm table-bordered bg-white ">
                <thead className="text-center bg-grey">
                <tr>
                    <th scope="col" colSpan={columnsAmount}>Zvolen?? p????stup hodnocen??</th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-light text-center">
                    <th scope="col">Blok</th>
                    <th scope="col">Zp??sob hodnocen??</th>
                    {studentApproach&&
                        (studentApproach.fulfilmentEvaluation==="percent"||
                            studentApproach.basicBlocksEvaluation==="weight"||
                            studentApproach.basicBlocksEvaluation==="points")&&(
                        <th scope="col">Maximum</th>
                    )}
                </tr>
                <tr><td><strong>1. Zad??n??</strong></td>
                    <td>Slovn?? hodnocen??. Mo??nost??: Mimo????dn?? n??ro??n??, N??ro??n??, Pr??m??rn?? n??ro??n??, Lehk??, Nedostate??n?? n??ro??n??</td>
                    {columnsAmount===3&&(<td/>)}
                </tr>
                <tr><td><strong>2. Spln??n?? zad??n??</strong></td><td>{approachFulfilment.text}</td>
                    {approachFulfilment.max!==""&&(<td>{approachFulfilment.max}</td>)}
                    {approachFulfilment.max===""&&columnsAmount===3&&(<td/>)}
                </tr>
                <tr><td><strong>3. Aktivita a samostatnost</strong><br/>3.1. Dodr??en?? domluven??ch term??n??<br/>
                        3.2. P????pravenost k setk??n??m<br/>
                        3.3. Iniciativa<br/>
                        3.4. Samostatnost<br/>
                        3.5. P????livost</td>
                    <td>{approachBasicBlocks}</td>
                    {columnsAmount===3&&(
                        ((studentApproach.basicBlocksEvaluation==="percent")&&(<td>100%</td>))||
                        (weights?(<td>{weights.activity}</td>):(
                                    <td>{studentApproach.fulfilmentEvaluation==="points"?20:25}</td>))

                    )}
                </tr>
                <tr><td><strong>4. Odborn?? ??rove??</strong><br/>4.1. Pou??itelnost, aplikovatelnost v praxi<br/>
                    4.2. Mo??nost d??l????ho rozvoje<br/>
                    4.3. Systemati??nost anal??zy<br/>
                    4.4. Replikovatelnost z??v??ru<br/>
                    {requirements&&(
                        requirements.map((requirement)=>(
                            <span>4.{requirements.indexOf(requirement)+5} {requirement.name}
                                <FontAwesomeIcon icon={faTrashCan} className='btn' onClick={()=>removeRequirement(requirement)}/>
                                <br/></span>
                        ))
                    )}
                    </td>
                    <td>{approachBasicBlocks}</td>
                    {columnsAmount===3&&(
                        ((studentApproach.basicBlocksEvaluation==="percent")&&(<td>100%</td>))||
                        (weights?(<td>{weights.professionalLevel}</td>):(
                            <td>{studentApproach.fulfilmentEvaluation==="points"?20:25}</td>))
                    )}
                </tr>
                <tr><td><strong>5. Form??ln?? a jazykov?? ??rove??, rozsah pr??ce</strong><br/>	5.1. Adekvatnost rozsahu<br/>
                    5.2. Formatov??n??<br/>
                    5.3. Gramatick?? chyby, interpunkce, p??eklepy<br/>
                    5.4. Souvislost, konzistence textu<br/>
                    5.5. ??itelnost<br/>
                    5.6. Pou??it?? odborn??ho jazyku<br/>
                    5.7. Reference v textu</td>
                    <td>{approachBasicBlocks}</td>
                    {columnsAmount===3&&(
                        ((studentApproach.basicBlocksEvaluation==="percent")&&(<td>100%</td>))||
                        (weights?(<td>{weights.languageLevel}</td>):(
                            <td>{studentApproach.fulfilmentEvaluation==="points"?20:25}</td>))
                    )}
                </tr>
                <tr><td><strong>6. V??b??r zdroj??, korektnost citace</strong><br/>	6.1. Dodr??ov??n?? konvenci<br/>
                    6.2. Dostate??nost citaci<br/>
                    6.3. Kvalita zdroj??</td>
                    <td>{approachBasicBlocks}</td>
                    {columnsAmount===3&&(
                        ((studentApproach.basicBlocksEvaluation==="percent")&&(<td>100%</td>))||
                        (weights?(<td>{weights.citation}</td>):(
                            <td>{studentApproach.fulfilmentEvaluation==="points"?20:25}</td>))
                    )}
                </tr>
                </tbody>
            </table>
            <div className="container p-3">
                <ul  className="list-inline">
                    <li className="list-group-item"><strong>V??sledn?? zn??mka - </strong> {finalMark}</li>
                </ul>
            </div>
                {currentUser.role==="SUPERVISOR"&&(
                    <div className="container text-center pb-3">
                        <div className="d-inline-block mx-2">
                            <Link to={`/students/${studentId}/configurator`}>
                                <span className="btn btn-secondary btnSummary" >Nakonfigurovat znovu</span>
                            </Link>
                        </div>
                        <div className="d-inline-block mx-2">
                            <Link to="/students">
                                <span className="btn btn-primary btnSummary">Zp??t k prohl????en?? student??</span>
                            </Link>
                        </div>
                    </div>
                )}
                {currentUser.role==="STUDENT"&&(
                    <div className="container text-center pb-3">
                        <Link class to="/my-thesis">
                            <span className="btn btn-primary btnSummary">Zp??t do profilu</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
        )
    )
}
export default Summary;