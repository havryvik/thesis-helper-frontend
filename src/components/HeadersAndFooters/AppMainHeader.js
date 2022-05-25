import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../services/auth.service";
const AppMainHeader = () => {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [activeNav, setActiveNav] = useState('model');

    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUserFromLocalStorage();

        if (user) {
            setCurrentUser(user);
        }

    }, []);

    const logOut = () => {
        localStorage.removeItem("user");
        setCurrentUser(undefined);
    };

    function toggleActiveStyles(navId){
        if(activeNav===navId){
            return "nav-item active";
        } else {
            return "nav-item";
        }
    }

    function getDisplay(){
            console.log(window.location.pathname)
            if(window.location.pathname==="/")
                return "none";
            return "flex";
    }

    return (
            <nav className="navbar sticky-top navbar-expand navbar-dark bg-dark" style={{display:getDisplay()}}>
                <div className="nav-head">
                <span className="navbar-brand" >
                    <img src = {process.env.PUBLIC_URL + "images/logo1.png"}
                         className="d-inline-block align-top Logo-img" alt="logo" />
                    Thesis helper
                </span>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse">
                        <span>+</span>
                    </button>
                </div>
                </div>
                <ul className="navbar-nav mr-auto">
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
                </ul>

                {currentUser ? (
                    <ul className="navbar-nav ms-auto px-3">
                        <li className="nav-item" >
                            <Link to={"/login"} className="nav-link" onClick={logOut}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul className="navbar-nav ms-auto px-3">
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
                    </ul>
                )}
            </nav>
    );
}
export default AppMainHeader;