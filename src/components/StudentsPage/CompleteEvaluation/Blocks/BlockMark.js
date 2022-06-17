import React from "react";
const BlockMark = props =>{

    return(
        <div className="form-group row pt-3 pb-3">
            <label className="col-sm-4 col-form-label fw-bold" htmlFor="blockMark">Hodnocení za blok:</label>
            <div className="col-sm-2">
                {props.evalType==="marks"&&(
                    <select
                            className="d-inline-block form-control form-select"
                            name="finalMark" id="blockMark" disabled={props.criterionEvaluation}>
                            <option value="none" disabled="disabled">--select mark--</option>
                            <option value="1">A</option>
                            <option value="2">B</option>
                            <option value="3">C</option>
                            <option value="4">D</option>
                            <option value="5">E</option>
                            <option value="6">F</option>
                    </select>

                )}
                {props.evalType==="points"&&(
                    <div>
                        <input type="number"
                               min="0"
                               max={props.fulfilmentPoints?(20):(25)}
                               className={props.criterionEvaluation?("d-inline-block form-control-plaintext"):("d-inline-block form-control")}
                               id="blockMark"
                               placeholder="..."/>
                        <p>{`Maximum: ${props.fulfilmentPoints?(20):(25)}`}</p>
                    </div>
                )}
                {props.evalType==="weight"&&(
                    <div className="text-danger">
                        <input type="number"
                               min="0"
                               max={props.blockWeight}
                               step=".01"
                               className={props.criterionEvaluation?("d-inline-block form-control-plaintext"):("d-inline-block form-control")}
                               id="blockMark"
                               placeholder="..."/>
                        <p>{`Max: ${props.blockWeight}`}</p>
                    </div>
                    )}
                {props.evalType==="percent"&&(
                    <input type="number"
                           min="0"
                           max="100"
                           className={props.criterionEvaluation?("d-inline-block form-control-plaintext"):("d-inline-block form-control")}
                           id="blockMark"
                           placeholder="..."/>
                )}

            </div>
            {props.criterionEvaluation===true&&(
                <div className="col-sm-4  pt-1">
                    <button type="button" className="btn btn-sm btn-secondary " onClick={(event)=>{props.onClick()}}>Spočitat</button>
                </div>
            )}
        </div>
    )
}

export default BlockMark;