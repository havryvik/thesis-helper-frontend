import React from "react";
import {Link, useNavigate} from "react-router-dom";
import logo1 from "./logo1.png";

//Main Welcome page that is displayed when web is opened

const WelcomePage = () => {

    const navigate = useNavigate();

    function goToModel(event){
        event.preventDefault();
        navigate("/model");
        window.location.reload();
    }

    return (
        <section className="App-header">
            <div className="logoSection">
                <img src={logo1} className="App-logo" alt="logo" />
                <p className="logoName">ThesisHelper</p>
            </div>
            <div className="welcomeText">
                <p>
                    Welcome to your Thesis Helper!
                </p>
                <p>Press the link below to continue with our website.</p>
                <div className="Button-container">
                    <Link
                        to={"/model"}
                        className="App-link"
                        onClick={event=>goToModel(event)}
                    >Go to evaluation model</Link>
                </div>
            </div>
        </section>
    );
}
export default WelcomePage;