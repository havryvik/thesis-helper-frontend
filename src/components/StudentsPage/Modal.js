import React, {useState} from "react";
import SupervisorService from "../../services/supervisor.service";
const Modal = props => {

    const [email, setEmail] = useState("");

    function addStudent(){
        const inputEmail = document.getElementById("addStudent");
        const div = document.querySelector(".exceptionModal");
        if (email===""){
            inputEmail.classList.add("is-invalid");
            div.style.display = "block";
        } else {
            div.style.display = "none";
            if (inputEmail.classList.contains("is-invalid"))
                inputEmail.classList.remove("is-invalid")
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

    }

    return (
    <div className={props.show?"myModal ":"modal fade"} >
        <div className="modal-dialog modal-dialog-centered" role="document">

        <section className="modal-content" >
                <header className="modal-header">
                    <label htmlFor="addStudent" className="h5">Uveďte školní email studenta:</label>
                </header>
                <div className="modal-body">
                    <input className="form-control" type="text" placeholder="Student@fel.cvut.cz" id="addStudent"
                           onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="exceptionModal px-3">
                    Email cannot be empty!
                </div>
                <footer className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={props.onClose} >Zavřit</button>
                    <button type="button" className="btn btn-success" onClick={addStudent} >Přidat</button>
                </footer>
            </section>
        </div>
    </div>
    )
}

export default Modal;