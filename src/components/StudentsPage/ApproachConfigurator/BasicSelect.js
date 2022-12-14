import React from "react";

const BasicSelect = () => {

    function onFulfilmentChange(target){
        setValid(target);
        const node = document.getElementById("basicBlocksEvaluation");
        node.firstChild.selected = true;
        switch (target.value){
            case "points": {setDisabled(node, 1);setDisabled(node, 4); setEnabled(node,2); setEnabled(node,3);break;}
            case "percent": {setDisabled(node, 1);setDisabled(node, 2);setDisabled(node, 3); setEnabled(node,4);break;}
            default: setAllEnabled(node);
        }
    }

    function onBlocksChange(target){
        setValid(target);
        const node = document.getElementById("coefficient");
        if(target.value==="points"||target.value==="weight"){
            const node1 = document.getElementById("fulfilmentEvaluation");
            if (node1.value==="words"){
                setAllEnabled(node);
            }
            if (node1.value === "points"){
                setSelected(node,2);
                setDisabled(node, 1);
            }
        }
        else {
            setSelected(node,2);
            setDisabled(node, 1);
        }
    }

    function onCriterionChange(target){
        setValid(target);
        const node = document.getElementById("autoFulfilment");
        if(target.value==="false"){
            setSelected(node,2);
        }else{
            setAllEnabled(node);
        }
    }

    function setDisabled(node, index){
        node.childNodes.item(index).disabled = "true";
    }

    function setEnabled(node, index){
        node.childNodes.item(index).disabled = false;
    }

    function setSelected(node, index){
        node.childNodes.item(index).selected = true;
    }

    function setAllEnabled(node){
        for (const item of node.childNodes){
            item.disabled=false;
        }
    }

    function setValid(target){
        if(target.classList.contains("is-invalid"))
            target.classList.remove("is-invalid");
    }

    return (
        <div>
                <div className="p-3">
                    <p className="h6">1. Zvolte p????stup k hodnocen?? bloku "Spln??n?? zad??n??": </p>
                    <div className="form-check form-check p-3">
                        <select onChange={event => onFulfilmentChange(event.target)} className="form-control form-select form-select" title="fulfilmentEvaluation" name="fulfilmentEvaluation" id="fulfilmentEvaluation">
                            <option hidden disabled selected value="null"> -- select an option -- </option>
                            <option value="words">Slovn??: "Spln??no (s men????mi / v??t????mi v??hradami)", "Nespln??no"</option>
                            <option value="points">Body: 0 a?? 20</option>
                            <option value="percent">Procenta: 0% a?? 100%</option>
                        </select>
                    </div>
                </div>
                <div className="p-3">
                    <p className="h6">2. Zvolte p????stup k hodnocen?? z??kladn??ch blok??: </p>
                    <div className="form-check form-check p-3">
                        <select onChange={event => onBlocksChange(event.target)} className="form-control form-select form-select" name="basicBlocksEvaluation" id="basicBlocksEvaluation">
                            <option hidden disabled selected value="null"> -- select an option -- </option>
                            <option value="marks"  disabled={true}>Zn??mka: A-F</option>
                            <option value="points"  disabled={true}>Body: 0 a?? 25 (nebo 20)</option>
                            <option value="weight"  disabled={true}>Nastaviteln?? v??hy</option>
                            <option value="percent"  disabled={true}>Procenta: 0% a?? 100%</option>
                        </select>
                    </div>
                </div>
                <div className="p-3">
                    <p className="h6">3. Hodnocen?? krit??ri?? v r??mci zakladn??ch blok??: </p>
                    <div className="form-check form-check p-3">
                        <select onChange={event => onCriterionChange(event.target)} className="form-control form-select form-select" name="criterionEvaluation" id="criterionEvaluation">
                            <option hidden disabled selected value="null"> -- select an option -- </option>
                            <option value="false" >Nehodnot?? se</option>
                            <option value="true" >Procenta: 0% a?? 100%</option>
                        </select>
                    </div>
                </div>
                <div className="p-3">
                    <p className="h6">4. Aplikace koeficientu:</p>
                    <div className="form-check form-check p-3">
                        <select className="form-control form-select form-select" name="coefficient" id="coefficient">
                            <option hidden disabled selected value="null"> -- select an option -- </option>
                            <option value="true"   disabled={true}>S aplikac?? koeficientu</option>
                            <option value="false"   disabled={true}>Bez aplikac?? koeficientu</option>
                        </select>
                    </div>
                </div>
                <div className="p-3">
                    <p className="h6">5. Automatick?? vypo????t??n?? bloku "Spln??n?? zad??n??":</p>
                    <div className="form-check form-check p-3">
                        <select className="form-control form-select form-select" name="autoFulfilment" id="autoFulfilment">
                            <option hidden disabled selected value="null"> -- select an option -- </option>
                            <option value="true"   disabled={true}>S automatick??m vypo????t??n??m</option>
                            <option value="false"   disabled={true}>Bez automatick??ho vypo????t??n??</option>
                        </select>
                    </div>
                </div>
                <div className="container text-center p-3">
                    <button type="submit" className="btn btn-primary">
                        Pokra??ovat
                    </button>
                </div>
        </div>
    )
}

export default BasicSelect;