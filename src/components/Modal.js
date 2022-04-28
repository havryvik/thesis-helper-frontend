import React, {useState} from "react";
import SupervisorService from "../services/supervisor.service";
const Modal = props => {

    const [email, setEmail] = useState("");

    function addStudent(){
        SupervisorService.addNewStudent(email).then(
            (response) => {
               console.log(response.status);
               props.onClose();
                window.location.reload();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    return (
    <div className={props.show?"myModal ":"modal fade"} >
        <div className="modal-dialog modal-dialog-centered" role="document">

        <div className="modal-content" >
                <div className="modal-header">
                    <label htmlFor="addStudent"><h5>Uveďte školní email studenta:</h5></label>
                </div>
                <div className="modal-body">
                    <input className="form-control" type="text" placeholder="Student@fel.cvut.cz" id="addStudent"
                           onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={props.onClose} >Zavřit</button>
                    <button type="button" className="btn btn-primary" onClick={addStudent} >Přidat</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Modal;