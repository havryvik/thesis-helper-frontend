import React from "react";

const PercentInput = props =>{
    return(
        <div className="form-check">
            <label htmlFor={props.elementId} className="fw-bold">Procentuálně ohodnoťte splnění studentem daného kritéria:</label>
            <input className="form-control criterionInput" type="number" min="0" max="100" placeholder="...zde napište pouze číslo v rozsahu 0-100" id={props.elementId}/>
        </div>
    )
}
export default PercentInput