import React from "react";
import {Link, useNavigate} from "react-router-dom";
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
                <img src={process.env.PUBLIC_URL + "images/logo1.png"} className="App-logo" alt="logo" />
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