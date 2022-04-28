import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import {useForm} from "react-hook-form";

const Login = () => {

    const {register, getFieldState, formState: {errors}, handleSubmit} = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data, e) => {
        JSON.stringify(data);
        try {
            await AuthService.login(data).then(
                () => {
                    if(AuthService.getCurrentUserFromLocalStorage().role==='SUPERVISOR')
                        navigate("/students");
                    else navigate("/evaluation");
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
            <div className="container shadow p-3 rounded bg-light loginContainer">
                <div className="container text-center">
                    <h4>Log in</h4>
                    <br/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Uveďte email:</label>
                        <input
                            {...register("email", {required: true,})}
                            className={getInputClassName("email")}
                            id="email"
                            type="text"
                            placeholder="Emailová adresa"
                        />
                        <div className="text-danger font-weight-light font-italic">
                            {errors.email && "Toto pole je povinné"}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Uveďte heslo:</label>
                        <input {...register("password", {required: true})}
                               type="password"
                               className={getInputClassName("password")}
                               id="password"
                               placeholder="Heslo"
                        />
                        <div className="text-danger font-weight-light font-italic">
                            {errors.password && "Toto pole je povinné"}
                        </div>
                    </div>
                    <div className="text-center pt-3">
                        <button type="submit" className="btn btn-primary ">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;