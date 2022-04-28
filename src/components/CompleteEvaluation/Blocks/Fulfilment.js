import React from "react";

const Fulfilment = props => {
    return (
        <div className="container bg-white rounded">
            <div className="modal-header "><h5>Splnění zadání</h5></div>
            <div className="modal-body">
                <form onSubmit={(event) =>
                {
                    event.preventDefault();
                    props.onSubmit(document.getElementById('fulfilment').value,
                        document.getElementById('fulfilmentComment').value)}
                }>
                    <div className="form-group">
                        <label className="fw-bold">Ohodnoťte splnění studentem zadání bakalářské práce studenta, kde dle stupnice</label>
                        <ul className="list-inline ">
                            <li className="list-group-item"><strong>Splněno nebo 100-90% nebo 20-18 bodů</strong> - </li>
                            <li className="list-group-item"><strong>Splněno s menšími výhradami nebo 89-70% nebo 17-14 bodů</strong> - </li>
                            <li className="list-group-item"><strong>Splněno s většími výhradami nebo 69-50% nebo 13-10 bodů</strong> - </li>
                            <li className="list-group-item"><strong>Nesplněno nebo {"<"}50% nebo {"<"}10 bodů </strong> - </li>
                        </ul>
                        {props.type==="words"&&(
                            <div className="form-check form-check p-3">
                                <select className="form-control form-select form-select" name="fulfilment" id="fulfilment">
                                    <option value="done">Splněno</option>
                                    <option value="fewerReservations">Splněno s menšími výhradami</option>
                                    <option value="moreReservations">Splněno s většími výhradami</option>
                                    <option value="notDone">Nesplněno</option>
                                </select>
                            </div>
                        )}
                        {props.type==="points"&&(
                            <div className="form-check form-check p-3">
                                <label htmlFor="fulfilment" className="fw-bold">Uveďte množství dosažených bodů studentem
                                    v rozsahu od 0 do 20.</label>
                                <input className="form-control" type="number" min="0" max="20" placeholder="..." id="fulfilment"/>
                            </div>
                        )}
                        {props.type==="percent"&&(
                            <div className="form-check form-check p-3">
                                <label htmlFor="fulfilment" className="fw-bold">Procentuálně ohodnoťte splnenost zadání studentem:</label>
                                <input className="form-control" type="number" min="0" max="100" placeholder="...zde napište pouze číslo v rozsahu 0-100" id="fulfilment"/>
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="fw-bold" htmlFor="fulfilmentComment">
                            Do textového pole uveďte komentář s odůvodněním zvoleného hodnocení:
                        </label>
                        <textarea className="form-control" id="fulfilmentComment" placeholder="..."/>
                    </div>
                    <div className="text-center pt-3">
                        <button type="submit" className="btn btn-primary ">Pokračovat</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Fulfilment;