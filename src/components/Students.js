import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faIdCard, faPenToSquare, faSquarePlus, faEye } from '@fortawesome/free-regular-svg-icons'
import SupervisorService from "../services/supervisor.service";
import Modal from "./Modal";
import Profile from "./Profile";
import {Link, useNavigate} from "react-router-dom";

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


    return (
        <div className="myContainer p-3 container">
            <Profile/>
            <Modal onClose={()=>setShow(false)} show={show}/>
            <div className='container pb-3 pt-3'>
                <button className="btn btn-primary "onClick={()=>{setShow(true);}}>
                    <span className='px-3'>Přidat nového studenta</span><FontAwesomeIcon icon={faIdCard} />
                </button>
            </div>
            <table className="table bg-white ">
                <thead className="text-center bg-secondary text-white">
                <tr>
                    <th scope="col" width="5%" >#</th>
                    <th scope="col" width="10%">Student</th>
                    <th scope="col" width="10%">Email</th>
                    <th scope="col" width="15%">Zaměření</th>
                    <th scope="col" width="20%" >Téma</th>
                    <th scope="col" width="15%">Přístup</th>
                    <th scope="col" width="12%">Hodnocení</th>
                    <th scope="col" width="5%">-</th>
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
                        <Link className="text-dark text-decoration-none" to={`/students/configurator/${student.approachId}`}>
                            Upravit <FontAwesomeIcon icon={faPenToSquare}/>  </Link>
                        <Link className="text-dark text-decoration-none" to={`/summary/${student.approachId}`}>Ukazat <FontAwesomeIcon icon={faEye}/></Link>
                    </td>
                    <td>
                        <Link className="text-dark text-decoration-none" to={`/students/${student.id}/evaluation`}>
                            Ohodnotit<FontAwesomeIcon icon={faSquarePlus} className='btn' onClick={()=>removeStudent(student)}/></Link>
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