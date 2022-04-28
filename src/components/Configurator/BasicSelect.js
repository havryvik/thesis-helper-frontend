import React from "react";
import Configurator from "./Configurator";
import configurator from "./Configurator";
import {Link} from "react-router-dom";

const BasicSelect = () => {



    return (
        <div>
                <div className="p-3">
                    <p className="h6">1. Zvolte přístup k hodnocení bloku "Splnění zadání": </p>
                    <div className="form-check form-check p-3">
                        <select className="form-control form-select form-select" title="fulfilmentEvaluation" name="fulfilmentEvaluation" id="fulfilmentEvaluation">
                            <option value="words">Slovně: "Splněno (s menšími / většími výhradami)", "Nesplněno"</option>
                            <option value="points">Body: 0 až 20</option>
                            <option value="percent">Procento: 0% až 100%</option>
                        </select>
                    </div>
                </div>
                <div className="p-3">
                    <p className="h6">2. Zvolte přístup k hodnocení základních bloků: </p>
                    <div className="form-check form-check p-3">
                        <select className="form-control form-select form-select" name="basicBlocksEvaluation" id="basicBlocksEvaluation">
                            <option value="marks">Známka: A-F</option>
                            <option value="points">Body: 0 až 25 (nebo 20 za podmínky bodového hodnocení bloku "Splnění zadání")</option>
                            <option value="weight">Nastavitelné váhy, kde součet za všechny bloky nesmí překročit 100 (nebo 80 za podmínky bodového hodnocení bloku "Splnění zadání")</option>
                            <option value="percent">Procento: 0% až 100%</option>
                        </select>
                    </div>
                </div>
                <div className="p-3">
                    <p className="h6">3. Hodnocení kritérií v rámci zakladních bloků: </p>
                    <div className="form-check form-check p-3">
                        <select className="form-control form-select form-select" name="criterionEvaluation" id="criterionEvaluation">
                            <option value="true">Nehodnotí se</option>
                            <option value="false">Procento: 0% až 100%</option>
                        </select>
                    </div>
                </div>
                <div className="p-3">
                    <p className="h6">4. Ovlivnění součtu bodů za 4 základní bloky koeficientem z průniku dvou bloků "Zadání" a "Splnění zadání":</p>
                    <div className="form-check form-check p-3">
                        <select className="form-control form-select form-select" name="coefficient" id="coefficient">
                            <option value="true">S aplikací koeficientu</option>
                            <option value="false">Bez aplikací koeficientu</option>
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
                            <option value="true">S automatickým vypočítáním</option>
                            <option value="false">Bez automatického vypočítání</option>
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