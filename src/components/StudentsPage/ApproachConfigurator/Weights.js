import React from "react";
const Weights = props => {

    function getMaxWeight() {
     //   const fulfilmentEvaluation = localStorage.getItem('fulfilmentEvaluation');
      //  if (fulfilmentEvaluation==='fulfilmentPoints') return 80;
        if (props.fulfilmentEvaluation==='points') return 80;
        else return 100;
    }

    const blocks = [
        { id: "activity", name: "Aktivita a samostatnost" },
        { id: "professionalLevel", name: "Odborná úroveň" },
        { id: "languageLevel", name: "Formální a jazyková úroveň, rozsah práce"},
        { id: "citation", name: "Výběr zdrojů, korektnost citace"},
    ]

    return (
        <div className="container p-3 ">
            <div className="text-center">
            <p className="h6">Rozdělte {getMaxWeight()} bodů mezi bloky hodnocení. Body přidělené jednomu bloku jsou maximem, které může
                student získat. Počet bodů přidělených jednomu bloku nesmí být nižší než 10 a vyšší než 40.</p>
            </div>
            <div className="tableContainer">
                <table className="table border" >
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Název bloku</th>
                    <th scope="col">Váha</th>
                </tr>
                </thead>
                <tbody>
                    {blocks.map((block, index) => (
                        <tr>
                            <th scope="row" > {index+1}
                            </th>
                            <td><label htmlFor={block.id}>{block.name}</label></td>
                            <td><input  id = {block.id} className="form-control" type="number"  min="10" max="40"/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className="container text-center p-3">
                <button type="submit" className="btn btn-primary">
                    Pokračovat
                </button>
            </div>
        </div>
    )
}
export default Weights