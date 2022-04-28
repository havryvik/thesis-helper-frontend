import React from "react";
const StudentForm = () => {
    return (
        <div>
        <div className="form-group">
            <label htmlFor="inputField">Napište zaměření Vaše práce: </label>
            <input type="text" className="form-control" id="inputField"
                   placeholder="Návrh uživatelséko rozhrání.."/>
        </div>
        <div className="form-group">
            <label htmlFor="inputText">Téma práce dle potvrzeného zadání:</label>
            <textarea className="form-control" id="inputText" aria-label="With textarea" placeholder="..."></textarea>
        </div>
        </div>
    )
}

export default StudentForm;