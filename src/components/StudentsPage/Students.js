import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import SupervisorService from "../../services/supervisor.service";
import Modal from "./Modal";
import Profile from "../Profile";
import {Link, useNavigate} from "react-router-dom";
import StudentService from "../../services/student.service";


//Private Component that contains supervisor Profile info and a table with students that he supervises

const Students = () => {
    const [students, setStudents] = useState([]);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        SupervisorService.getAllStudents().then(
            (response) => {
                setStudents(response.data);
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

    function removeStudent(studentToRemove){
        SupervisorService.removeStudent(studentToRemove.id).then(
            (response) => {
                console.log(response.status);
                setStudents(students.filter(student=>student!==studentToRemove));
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
        )
    }

    // function goToSummary(event,studentId){
    //     event.preventDefault();
    //     StudentService.getApproachByStudent(studentId).then(
    //         (response)=>{navigate(`${studentId}/summary/${response.data.id}`)},
    //         (error)=>{console.log(error)}
    //     )
    // }

    return (
        <div className="Students-container px-3 pt-4 pb-4 mt-3 mb-3 container rounded">
            <Profile/>
            <Modal onClose={()=>setShow(false)} show={show}/>
            <div className='container pb-3 pt-3 mx-0'>
                <button className="btn btn-primary Button-custom  Button-with-icon " onClick={()=>{setShow(true);}}>
                    <span className="px-2">Přidat nového studenta</span>
                    <svg  width="15px" height="15px" x="0px" y="0px"
                          viewBox="0 0 258.75 258.75" fill="white" >
                            <g>
                                <circle cx="129.375" cy="60" r="60"/>
                                <path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z"/>
                            </g>
                    </svg>
                </button>
            </div>
            <table className="table bg-white shadow ">
                <thead className="text-center bg-secondary text-white">
                <tr>
                    <th scope="col" className="width-5" >#</th>
                    <th scope="col" className="width-10">Student</th>
                    <th scope="col" className="width-10">Email</th>
                    <th scope="col" className="width-15">Zaměření</th>
                    <th scope="col" className="width-20" >Téma</th>
                    <th scope="col" className="width-15">Přístup</th>
                    <th scope="col" className="width-15">Hodnocení</th>
                    <th scope="col" className="width-5">-</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student) => (
                <tr className="text-center">
                    <td>{students.indexOf(student)+1}</td>
                    <td>{student.nameSurname}</td>
                    <td>{student.email}</td>
                    <td>{student.thesisField}</td>
                    <td>{student.thesisTheme}</td>
                    <td>
                        <div className="Button-with-icon">
                        <Link className="text-dark text-decoration-none Button-with-icon custom-link" to={`/students/${student.id}/configurator`}>
                            <svg width="15px" height="15px" x="0px" y="0px"
                                 viewBox="0 0 360.209 360.209" >
                                <g>
                                    <path d="M344.609,47.505l-31.6-31.6c-10-10-23.2-15.6-37.6-15.6c-14,0-27.6,5.6-37.6,15.6l-217.6,216.8c-7.6,7.2-12,17.6-12,28.8
                                        v80c0,0,0,0-0.4,0l-5.2,4.8c-3.2,3.2-3.6,8-0.4,11.2c1.6,1.6,3.6,2.4,6,2.4c2,0,4-0.8,5.6-2l5.2-4.8c0.4-0.4,0.8-0.8,0.8-1.2h79.2
                                        c10.8,0,20.8-4.4,28.4-12l217.2-218C365.409,101.905,365.409,67.905,344.609,47.505z M104.209,335.505c-1.6,0.4-3.6,0.8-5.2,0.8
                                        h-74.8v-74.8c0-2,0.4-3.6,0.8-5.2c0.4,0,0.8,0,1.2,0h38v28c0,6.8,5.2,12,12,12h28V335.505z M120.209,325.105v-32.8
                                        c0-6.8-5.2-12-12-12h-28v-28c0-6.8-5.2-12-12-12h-32.8l184.4-183.6l84,84L120.209,325.105z M333.409,111.105l-18.4,18.4l-84-84
                                        l18.4-18.4c7.2-7.2,16.4-10.8,26-10.8c10,0,19.2,4,26,10.8l31.6,31.6C347.809,73.105,347.809,96.705,333.409,111.105z"/>
                                </g>
                            </svg>
                            <span className="px-1">Upravit</span>
                        </Link>
                        <Link className="text-dark Button-with-icon px-1 custom-link" to={`${student.id}/summary/${student.approachId}`} >
                            <svg width="20px" height="20px" viewBox="0 0 24 24" >
                                <g  stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g  fill="#212121" fillRule="nonzero">
                                        <path d="M12,9.0046246 C14.209139,9.0046246 16,10.7954856 16,13.0046246 C16,15.2137636 14.209139,17.0046246 12,17.0046246 C9.790861,17.0046246 8,15.2137636 8,13.0046246 C8,10.7954856 9.790861,9.0046246 12,9.0046246 Z M12,10.5046246 C10.6192881,10.5046246 9.5,11.6239127 9.5,13.0046246 C9.5,14.3853365 10.6192881,15.5046246 12,15.5046246 C13.3807119,15.5046246 14.5,14.3853365 14.5,13.0046246 C14.5,11.6239127 13.3807119,10.5046246 12,10.5046246 Z M12,5.5 C16.613512,5.5 20.5960869,8.65000641 21.7011157,13.0643865 C21.8017,13.4662019 21.557504,13.8734775 21.1556885,13.9740618 C20.7538731,14.0746462 20.3465976,13.8304502 20.2460132,13.4286347 C19.3071259,9.67795854 15.9213644,7 12,7 C8.07693257,7 4.69009765,9.68026417 3.75285786,13.4331499 C3.65249525,13.8350208 3.24535455,14.0794416 2.84348365,13.979079 C2.44161275,13.8787164 2.19719198,13.4715757 2.29755459,13.0697048 C3.4006459,8.65271806 7.38448293,5.5 12,5.5 Z" />
                                    </g>
                                </g>
                            </svg>
                            <span className="px-1">Ukazat</span>
                        </Link>
                        </div>
                    </td>
                    <td >
                        <div className="Button-with-icon">
                        <Link className="text-dark Button-with-icon px-1 custom-link" to={`/students/${student.id}/evaluation`}>
                            <svg width="15px" height="15px" x="0px" y="0px"
                                 viewBox="0 0 512 512" fill="#212121">
                                    <g>
                                        <path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333
                                            c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333
                                            z"/>
                                        <path d="M383.996,234.667H277.333V128c0-11.782-9.551-21.333-21.333-21.333s-21.333,9.551-21.333,21.333v106.667H128.038
                                            c-11.782,0-21.333,9.551-21.333,21.333s9.551,21.333,21.333,21.333h106.628V384c0,11.782,9.551,21.333,21.333,21.333
                                            s21.333-9.551,21.333-21.333V277.333h106.662c11.782,0,21.333-9.551,21.333-21.333S395.778,234.667,383.996,234.667z"/>
                                    </g>
                            </svg>
                            <span className="px-1">Ohodnotit</span>
                        </Link>
                        <Link className="text-dark Button-with-icon px-1 custom-link" to={`/evaluation-overview/${student.evaluationId}`} >
                            <svg width="20px" height="20px" viewBox="0 0 24 24" >
                                <g  stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g  fill="#212121" fillRule="nonzero">
                                        <path d="M12,9.0046246 C14.209139,9.0046246 16,10.7954856 16,13.0046246 C16,15.2137636 14.209139,17.0046246 12,17.0046246 C9.790861,17.0046246 8,15.2137636 8,13.0046246 C8,10.7954856 9.790861,9.0046246 12,9.0046246 Z M12,10.5046246 C10.6192881,10.5046246 9.5,11.6239127 9.5,13.0046246 C9.5,14.3853365 10.6192881,15.5046246 12,15.5046246 C13.3807119,15.5046246 14.5,14.3853365 14.5,13.0046246 C14.5,11.6239127 13.3807119,10.5046246 12,10.5046246 Z M12,5.5 C16.613512,5.5 20.5960869,8.65000641 21.7011157,13.0643865 C21.8017,13.4662019 21.557504,13.8734775 21.1556885,13.9740618 C20.7538731,14.0746462 20.3465976,13.8304502 20.2460132,13.4286347 C19.3071259,9.67795854 15.9213644,7 12,7 C8.07693257,7 4.69009765,9.68026417 3.75285786,13.4331499 C3.65249525,13.8350208 3.24535455,14.0794416 2.84348365,13.979079 C2.44161275,13.8787164 2.19719198,13.4715757 2.29755459,13.0697048 C3.4006459,8.65271806 7.38448293,5.5 12,5.5 Z" />
                                    </g>
                                </g>
                            </svg>
                            <span className="px-1">Ukazat</span>
                        </Link>
                        </div>
                    </td>
                    <td><FontAwesomeIcon icon={faTrashCan} className='btn' onClick={()=>removeStudent(student)}/></td>
                </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
};

export default Students;