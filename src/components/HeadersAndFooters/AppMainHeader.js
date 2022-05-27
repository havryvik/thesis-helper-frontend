import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AuthService from "../../services/auth.service";
import logo1 from"./logo1.png";
const AppMainHeader = () => {

    //hook for keeping a currently logged user, state of active navbar item, state ov navbar list to be properly
    // displayed on small devices
    const [currentUser, setCurrentUser] = useState(undefined);
    const [activeNav, setActiveNav] = useState('model');
    const [hide, setHide] = useState(false);

    //side effect that allows to update a currently logged user and view its state
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

    //set active navbar item
    function toggleActiveStyles(navId){
        if(activeNav===navId){
            return "nav-item active";
        } else {
            return "nav-item";
        }
    }

    //correctly display navbar depending on url path
    function getDisplay(){
            if(window.location.pathname==="/thesis-helper")
                return "none";
            return "flex";
    }

    //show navbar items on small devices
    function showMenu(){
        const uls = document.querySelectorAll(".navbar-nav");
            for (const ul of uls) {
                ul.style.display = "flex";
            }
            setHide(true);
    }

    //hide navbar items on small devices
    function hideMenu(){
        const uls = document.querySelectorAll(".navbar-nav");
        for (const ul of uls) {
            ul.style.display = "none";
        }
        setHide(false);
    }

    return (
            <nav className="navbar sticky-top navbar-expand navbar-dark bg-dark" style={{display:getDisplay()}}>
                <div className="nav-head">
                <span className="navbar-brand" >
                    <img src = {logo1}
                         className="d-inline-block align-top Logo-img" alt="logo" />
                    Thesis helper
                </span>
                <div className="navbar-header">
                    <button type="button" onClick={()=>hide?hideMenu():showMenu()} >
                        <svg width="20px" height="20px" x="0px" y="0px"
                             viewBox="0 0 384.97 384.97" fill="#e3e6f3">
                            <g>
                                <g id="Menu">
                                    <path d="M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03
			                        C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z"/>
                                    <path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03
			                        S379.58,180.455,372.939,180.455z"/>
                                    <path d="M372.939,300.758H12.03c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909
			                        c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z"/>
                                </g>
                            </g>
                        </svg>
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