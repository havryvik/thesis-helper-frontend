import React from "react";

const TextAreaInput = props => {
   return (
       <div className="form-check pb-3">
           <label className="fw-bold" htmlFor={props.elementId}>
               Do textového pole uveďte komentář s odůvodněním zvoleného hodnocení:
           </label>
           <textarea className="form-control commentCriterion" id={props.elementId} placeholder="..."/>
       </div>
   )
}

export default TextAreaInput;