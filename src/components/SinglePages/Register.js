import React, {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import AuthService from "../../services/auth.service";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const studentForm = () => {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="thesisField">Napište zaměření Vaše práce: </label>
                    <input {...register("thesisField", {required: true})}
                           type="text" className={getInputClassName("thesisField")} id="thesisField"
                           placeholder="Návrh uživatelséko rozhrání.."/>
                    <div className="text-danger font-weight-light font-italic">
                        {errors.thesisField?.type === 'required' && "Toto pole je povinné"}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="thesisTheme">Téma práce dle potvrzeného zadání:</label>
                    <textarea {...register("thesisTheme", {required: true})}
                        className={getInputClassName("thesisTheme")}
                              id="thesisTheme" aria-label="With textarea" placeholder="..."/>
                    <div className="text-danger font-weight-light font-italic">
                        {errors.thesisTheme?.type === 'required' && "Toto pole je povinné"}</div>
                </div>
            </div>
        )
    }

    const [selectState, setSelectState] = useState({
        activeSelect: 'Student'
    });

    const navigate = useNavigate();

    function handleChange(event){
        setSelectState({...selectState, activeSelect: event.target.value});
    }
    function isStudent(){
        if(selectState.activeSelect === 'Student'){
            return studentForm();
        }
    }

    const {register, getFieldState, formState: {errors}, handleSubmit} = useForm();

    const onSubmit = async (data, e) => {
        JSON.stringify(data);
        data.role = document.getElementById('role').value;
        try {
            await AuthService.signup(data).then(
                () => {
                    navigate("/login");
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };


    function getInputClassName(fieldState){
        if (getFieldState(fieldState).invalid){
            return "form-control is-invalid";
        }else {
            return "form-control";
        }
    }

    return (
        <div className="myContainer">
            <div className="container shadow p-3 rounded bg-light registerContainer">
                <div className="container text-center">
                    <h4>Registrační formulář</h4>
                    <br/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="role">Zvolte příslušnou roli:</label>
                        <select id="role" className="form-control form-select" name="role" onChange={(event)=>
                        {handleChange(event)}} >
                            <option value="STUDENT">Student</option>
                            <option value="SUPERVISOR">Vedoucí</option>
                        </select>
                    </div>
                        <div className="form-group">
                            <label htmlFor="nameSurname">Vaše jméno a příjmení</label>
                            <input
                                {...register("nameSurname", {required: true})}
                                type="text"
                                className={getInputClassName("nameSurname")}
                                id="nameSurname" placeholder="Petr Novák" autoFocus/>
                            <div className="text-danger font-weight-light font-italic">
                                {errors.nameSurname?.type === 'required' && "Jméno a příjmení nemohou být prazdné!"}</div>
                        </div>
                    <div className="form-group">
                        <label htmlFor="email">Uveďte platný email:</label>
                        <input {...register("email", {
                                    required: true,
                                    pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
                        })}
                               type="text"
                               className={getInputClassName("email")}
                               id="email" placeholder="Emailová adresa" />
                        <div className="text-danger font-weight-light font-italic">
                            {errors.email && "Emailová adresa musí být ve formatu example@mail.com!"}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Uveďte heslo:</label>
                        <input {...register("password", {
                            required: true,
                           // minLength: 8
                        })}
                            type="password"
                               className={getInputClassName("password")} id="password" placeholder="Heslo" />
                        <div className="text-danger font-weight-light font-italic">
                            {errors.password && "Heslo nesmí být kratší než 8 znaku!"}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Potvrdíte uvedené heslo:</label>
                        <input {...register("confirmPassword", {
                            required: true,
                            validate: {
                                isTheSame: v => document.getElementById("password").value===v
                            }})}
                            type="password" className={getInputClassName("confirmPassword")} id="confirmPassword" placeholder="Potvrzení hesla" />
                        <div className="text-danger font-weight-light font-italic">
                            {errors.confirmPassword && "Hesla se neshodují!"}</div>
                    </div>

                    {isStudent()}
                    <div className="text-center pt-3">
                        <button type="submit" className="btn btn-primary ">Založit účet</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register;