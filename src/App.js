import React, { useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Model from "./components/Model";
import Login from "./components/Login";
import Register from "./components/Register"
import Approaches from "./components/Approaches"
import Students from "./components/Students"
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import AuthService from "./services/auth.service";
import Footer from "./components/Footer";
import Configurator from "./components/Configurator/Configurator";
import Summary from "./components/Summary";
import CompleteEvaluation from "./components/CompleteEvaluation/CompleteEvaluation";


const App = () => {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [activeNav, setActiveNav] = useState('model');

    useEffect(() => {
        const user = AuthService.getCurrentUserFromLocalStorage();

        if (user) {
            setCurrentUser(user);
        }

    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    function toggleActiveStyles(navId){
        if(activeNav===navId){
            return "nav-item active";
        } else {
            return "nav-item";
        }
    }

    return (
        <div>
            <nav className="navbar sticky-top navbar-expand navbar-dark bg-dark ">
                <span className="navbar-brand" >
                    <img src = {process.env.PUBLIC_URL + "images/logo1.png"}
                         className="d-inline-block align-top" alt="logo" width="30px" height="30px"/>
                    Thesis helper
                </span>
                <div className="navbar-nav mr-auto">
                    <li className={toggleActiveStyles('approaches')} onClick={()=>setActiveNav('model')}>
                        <Link to={"/model"} className="nav-link" >
                            Model
                        </Link>
                    </li>
                    <li className={toggleActiveStyles('approaches')} onClick={()=>setActiveNav('approaches')}>
                        <Link to={"/approaches"} className="nav-link">
                            Přístupy
                        </Link>
                    </li>
                    {currentUser && currentUser.role==='SUPERVISOR' && (
                        <li className={toggleActiveStyles('students')} onClick={()=>setActiveNav('students')}>
                            <Link to={"/students"} className="nav-link">
                                Studenti
                            </Link>
                        </li>
                    )}
                    {currentUser && currentUser.role==='STUDENT' && (
                        <li className={toggleActiveStyles('evaluation')} onClick={()=>setActiveNav('evaluation')}>
                            <Link to={"/evaluation"} className="nav-link">
                                Hodnocení
                            </Link>
                        </li>
                    )}
                </div>

                {currentUser ? (
                    <div className="navbar-nav ms-auto px-3">
                        <li className="nav-item" >
                            <a href="/login" className="nav-link" onClick={logOut}>
                                Logout
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ms-auto px-3">
                        <li className={toggleActiveStyles('login')} onClick={()=>setActiveNav('login')}>
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className={toggleActiveStyles('register')} onClick={()=>setActiveNav('register')}>
                            <Link to={"/register"} className="nav-link">
                                Sign up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>

            <div className="background pt-3">
                <Routes>
                    <Route path="" element={<Model />} />
                    <Route path="/model" element={<Model />} />
                    <Route path="/approaches" element={<Approaches />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/students/configurator/:approachId" element={<Configurator  />} />
                    <Route path="/:studentId/evaluation" element={<CompleteEvaluation />} />
                    <Route path="/students/:studentIdParam/evaluation" element={<CompleteEvaluation />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/summary/:approachId" element={<Summary />} />
                </Routes>
            </div>
            <Footer/>
        </div>
    );
}

export default App;