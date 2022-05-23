import React, {useState} from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import Model from "./components/Model";
import Approaches from "./components/Approaches";
import Students from "./components/Students";
import Configurator from "./components/Configurator/Configurator";
import CompleteEvaluation from "./components/CompleteEvaluation/CompleteEvaluation";
import Login from "./components/Login";
import Register from "./components/Register";
import Summary from "./components/Summary";
import App from "./App";

const WelcomePage = () => {

    const [click, setClick]=useState(false);

    return(
        click?(<App/>):(<div className="App">
            <header className="App-header">
                <div className="logoSection">
                    <img src={process.env.PUBLIC_URL + "images/logo1.png"} className="App-logo" alt="logo" />
                    <div className="wrapper">
                        <p className="logoName">ThesisHelper</p>
                    </div>
                </div>
                <div className="welcomeText">
                    <p>
                        Welcome to your Thesis Helper!
                    </p>
                    <p>Press the button below to continue with our website.</p>
                    <button
                        className="App-link"
                        rel="noopener noreferrer"
                        onClick={event => setClick(true)}
                    >
                        Go to evaluation model
                    </button>
                </div>
            </header>
        </div>)

    );
}

export default WelcomePage;