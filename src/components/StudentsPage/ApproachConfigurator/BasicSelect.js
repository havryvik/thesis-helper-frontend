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
                    <p className="h6">1. Zvolte přístup k hodnocení bloku "Splnění zadání": </p>
                    <div className="form-check form-check p-3">
                        <select onChange={event => onFulfilmentChange(event.target)} className="form-control form-select form-select" title="fulfilmentEvaluation" name="fulfilmentEvaluation" id="fulfilmentEvaluation">
                            <option hidden disabled selected value="null"> -- select an option -- </option>
                            <option value="words">Slovně: "Splněno (s menšími / většími výhradami)", "Nesplněno"</option>
                            <option value="points">Body: 0 až 20</option>
                            <option value="percent">Procento: 0% až 100%</option>
                        </select>
                    </div>
                </div>
                <div className="p-3">
                    <p className="h6">2. Zvolte přístup k hodnocení základních bloků: </p>
                    <div className="form-check form-check p-3">
                        <select onChange={event => onBlocksChange(event.target)} className="form-control form-select form-select" name="basicBlocksEvaluation" id="basicBlocksEvaluation">
                            <option hidden disabled selected value="null"> -- select an option -- </option>
                            <option value="marks"  disabled={true}>Známka: A-F</option>
                            <option value="points"  disabled={true}>Body: 0 až 25 (nebo 20 za podmínky bodového hodnocení bloku "Splnění zadání")</option>
                            <option value="weight"  disabled={true}>Nastavitelné váhy, kde součet za všechny bloky nesmí překročit 100 (nebo 80 za podmínky bodového hodnocení bloku "Splnění zadání")</option>
                            <option value="percent"  disabled={true}>Procento: 0% až 100%</option>
                        </select>
                    </div>
                </div>
                <div className="p-3">
                    <p className="h6">3. Hodnocení kritérií v rámci zakladních bloků: </p>
                    <div className="form-check form-check p-3">
                        <select onChange={event => onCriterionChange(event.target)} className="form-control form-select form-select" name="criterionEvaluation" id="criterionEvaluation">
                            <option hidden disabled selected value="null"> -- select an option -- </option>
                            <option value="false" >Nehodnotí se</option>
                            <option value="true" >Procento: 0% až 100%</option>
                        </select>
                    </div>
                </div>
                <div className="p-3">
                    <p className="h6">4. Ovlivnění součtu bodů za 4 základní bloky koeficientem z průniku dvou bloků "Zadání" a "Splnění zadání":</p>
                    <div className="form-check form-check p-3">
                        <select className="form-control form-select form-select" name="coefficient" id="coefficient">
                            <option hidden disabled selected value="null"> -- select an option -- </option>
                            <option value="true"   disabled={true}>S aplikací koeficientu</option>
                            <option value="false"   disabled={true}>Bez aplikací koeficientu</option>
                        </select>
                    </div>
                </div>
                <div className="p-3">
                    <p className="h6">5. Splnění zadání se bude vypočítávat automaticky vzhledem ke splnění kritérií z
                        bloku "Odborná úroveň" a případně kritérií z dalších bloků, které budou předem označené vedoucím.</p>
                    <p>Tzn. body odečtené za nesplnění příslušných kritérií budou převedeny na procento od váhy bloků,
                        procento je pak odečteno z maxima 100 % za blok "Splnění zadání".</p>
                    <div className="form-check form-check p-3">
                        <select className="form-control form-select form-select" name="autoFulfilment" id="autoFulfilment">
                            <option hidden disabled selected value="null"> -- select an option -- </option>
                            <option value="true"   disabled={true}>S automatickým vypočítáním</option>
                            <option value="false"   disabled={true}>Bez automatického vypočítání</option>
                        </select>
                    </div>
                </div>
                <div className="container text-center p-3">
                    <button type="submit" className="btn btn-primary">
                        Pokračovat
                    </button>
                </div>
        </div>
    )
}

export default BasicSelect;