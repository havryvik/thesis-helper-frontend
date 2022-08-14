import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import AppMainHeader from "./components/HeadersAndFooters/AppMainHeader";
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import Model from "./components/SinglePages/Model";
import Approaches from "./components/SinglePages/Approaches";
import Students from "./components/StudentsPage/Students";
import Configurator from "./components/StudentsPage/ApproachConfigurator/Configurator";
import CompleteEvaluation from "./components/StudentsPage/CompleteEvaluation/CompleteEvaluation";
import Login from "./components/LoginPage/Login";
import Register from "./components/SinglePages/Register";
import Summary from "./components/StudentsPage/Summary";
import WelcomePage from "./components/SinglePages/WelcomePage";
import Footer from "./components/HeadersAndFooters/Footer";
import EvaluationOverview from "./components/StudentsPage/EvaluationOverview/EvaluationOverview";
import MyThesis from "./components/MyThesis/MyThesis";

const App = () => {

        return (

            //Main div container that contains a Header component, a Footer component and a Router that redirects
            // and renders components based on a path variable in app url

            <div className="background">
                <AppMainHeader/>
                <Routes>
                    <Route path="/thesis-helper" element={<WelcomePage />} />
                    <Route path="/model" element={<Model />} />
                    <Route path="/approaches" element={<Approaches />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/my-thesis" element={<MyThesis/>}/>
                    <Route path="/students/:studentId/configurator" element={<Configurator  />} />
                    <Route path="/:studentId/evaluation" element={<CompleteEvaluation />} />
                    <Route path="/students/:studentIdParam/evaluation" element={<CompleteEvaluation />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/students/:studentId/summary/:approachId" element={<Summary />} />
                    <Route path="/my-thesis/:studentId/summary/:approachId" element={<Summary />} />
                    <Route path="/evaluation-overview/:evaluationId" element={<EvaluationOverview/>} />
                </Routes>
                <Footer/>
            </div>

    );
}

export default App;