import React from "react";

const PercentInput = props =>{
    return(
        <div className="form-check row input-group pb-3">
            <label htmlFor={props.elementId} className="fw-bold col-8">Procentuálně ohodnoťte splnění studentem daného kritéria:</label>
            <input className="form-control criterionInput col-4" type="number" min="0" max="100" placeholder="...0-100" id={props.elementId}/>
        </div>
    )
}
export default PercentInput