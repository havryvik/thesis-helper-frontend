import React from "react";

const Assignment = props => {
    return (
        <div className="container bg-white rounded">
            <div className="modal-header "><h5>Zadání</h5></div>
            <div className="modal-body">
                <form onSubmit={(event) =>
                {
                    event.preventDefault();
                    props.onSubmit(document.getElementById('assignment').value,
                        document.getElementById('assignmentComment').value)}
                }>
                    <div className="form-group">
                        <label className="fw-bold" htmlFor="assignment">Ohodnoťte náročnost zadání bakalářské práce studenta, kde</label>
                        <ul className="list-inline ">
                            <li className="list-group-item"><strong>Mimořádně náročné</strong> - zadání, jehož splnění je nad rámec
                                školního programu, řešení problémů odpovídajících magisterskému nebo doktorskému rozsahu,
                                práce přijímané do soutěží nebo konferencí, práci rozpracované v rámci vědeckých skupin
                                fakulty za využití speciálních metod a dat, které vyžadují speciální přístup.</li>
                            <li className="list-group-item"><strong>Náročné</strong> - využití v řešení dříve nepoužívaných
                                a neznámých pro řešitele technologií, postupů, metodik, řešení komplexnější problematiky.
                                Nebo - rozšíření, modermizace existujících řešení, které vyžaduje větší nastudování kódu.
                                Řešení studenta pak zajistí zlepšení, zefektivnění za podmínky zachování stávající
                                funkcionality a zároveň přidání nové. Nebo - pro výzkumně zaměřené práce: provedení rozsáhlejší
                                a časově náročné analýzy (dotazníky, průzkumy cílových skupin), které následuje kvalitním
                                zhodnocením dat.</li>
                            <li className="list-group-item"><strong>Průměrně náročné</strong> - nevyžaduje další nastudování
                                materiálů. Student během řešení využívá znalosti získané během studia dle náplní předmětu
                                studijního programu. Jako příklad se může jednat o implementaci standardních web aplikací
                                s předcházejícími analýzou a návrhem.</li>
                            <li className="list-group-item"><strong>Lehké</strong> - zadání nevyžadující kompletní řešení,
                                které standardně se začíná rešerší pokračuje analýzou, návrhem a končí implementaci.
                                Některé části mohou být vynechané nebo výrazně oblehcene, což nebylo způsobené nadprůměrnou
                                složitosti zbývajících částí. Jako příklad se může jednat o implementaci kusu aplikace s
                                předem danou specifikaci.</li>
                            <li className="list-group-item"><strong>Nedosatecne náročné</strong> - požadavky na práci
                                spadající do zadání jsou nedostatečnými a i při jejich kompletní realizaci nejsou schopné
                                uspokojit požadavky stanovené oborem studia a prokázat nabyté studentem znalostí.</li>
                        </ul>
                        <div className="form-check form-check p-3">
                            <select className="form-control form-select form-select" name="assignment" id="assignment">
                                <option value="extremelyHard">Mimořádně náročné</option>
                                <option value="hard">Náročné</option>
                                <option value="medium">Průměrně náročné</option>
                                <option value="easy">Lehké</option>
                                <option value="insufficient">Nedosatecne náročné</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="fw-bold" htmlFor="assignmentComment">
                            Do textového pole uveďte komentář s odůvodněním zvoleného hodnocení:
                        </label>
                        <textarea className="form-control" id="assignmentComment" placeholder="..."/>
                    </div>
                    <div className="text-center pt-3">
                        <button type="submit" className="btn btn-primary ">Pokračovat</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Assignment;