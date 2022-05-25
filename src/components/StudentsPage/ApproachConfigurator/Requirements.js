import React, {useState} from "react";
const Requirements = () => {
    const [extraRequirements, setExtraRequirements] = useState([]);

    function removeRequirement(event, element){
        setExtraRequirements(extraRequirements.filter(item => item !== element));
    }

    function addNewRequirement(event){
        const inputElement = document.getElementById('newRequirement');
        if (inputElement.value !== "") {
            setExtraRequirements(extraRequirements.concat(inputElement.value));
            inputElement.value="";
        }
    }

    function showInputRequirements(){
        if (extraRequirements.length !== 0){
            return(
                <div className="container p-3">
                    <p className="h6">Přidaná Vámi kritéria:</p>
                    <p>Již přidána kritéria můžete odstranit přes přehled přístupů nebo hodnocení v tabulce se studenty, zde přidávejte pouze nová kritéria.</p>
                    <ul className="list-group">
                        {extraRequirements.map((element, index)=>(
                            <li className="list-group-item" key={index}>
                                <div className="d-inline requirement">{element}</div>
                                <div className="d-inline">
                                    <button onClick={(event)=>removeRequirement(event, element)} type="button"  className="btn btn-outline-dark rounded-circle font-weight-bold deleteBtn ">X</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    return (
        <div>
                <div className="p-3">
                    <p className="h5">Chcete-li přidat specifická kritéria vzhledem ke zaměření prací do bloku "Odborná
                        úroveň", jeden za druhým uveďte je do textového pole níže.</p>
                    {showInputRequirements()}
                    <div className="mb-3">
                        <input className="form-control" type="text" name="inlineRadioOptions" id="newRequirement"/>
                    </div>
                    <div className="d-inline">
                        <button onClick={(event)=> {addNewRequirement(event)}}
                                type="button" className="btn btn-info rounded-circle font-weight-bolder" >+</button>
                    </div>
                </div>
                <div className="container text-center p-3">
                    <button type="submit" className="btn btn-primary">Pokračovat</button>
                </div>
        </div>
    )

}
export default Requirements;