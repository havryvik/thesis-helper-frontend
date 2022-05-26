import React from "react";


//Component that consists of 4 collapsed sections that describes how the student`s thesis can be evaluated

const Approaches = () => {

    //adds or removes "collapse" classname of a section that is sent into function as an event target
    //allows to show of hide section info

    function showCollapse(event){
        const className = event.target.id;
        const tab = document.querySelector("."+className);
        if (tab.classList.contains('collapse')){
            tab.classList.remove('collapse');
        } else {tab.classList.add('collapse');}
    }

    function showCollapseBySectionId(event,id){
        const tab = document.querySelector("."+id);
        tab.classList.remove('collapse');
        tab.scrollIntoView();
    }


    return (
        <div className="myContainer p-3 container">
            <div id="accordion">
                <section className="card bg-dark">
                    <header className="card-header badge-dark" id="headingOne">
                        <h5 className="mb-0">
                            <button onClick={(event)=>{showCollapse(event)}} id="collapseOne" className="Section-button" >
                               Zadání
                            </button>
                        </h5>
                    </header>
                    <div className="collapseOne panel-collapse bg-light collapse"  >
                        <div className="card-body">
                            <div className="container">
                                <ul  className="list-inline">
                                    <li className="list-group-item"> <u>Jediná</u> možnost hodnocení: <strong>Slovní</strong> </li>
                                </ul>
                            </div>

                            <table className="table table-sm table-bordered bg-white ">
                                <thead className="text-center bg-grey">
                                <tr>
                                    <th scope="col" colSpan="2">Stupnice <span className="text-danger">*</span></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="bg-light text-center">
                                    <th scope="col" className="width-50"> Slovní hodnocení</th>
                                    <th scope="col" className="width-50">Odpovídající počet bodů <small>(dále <strong>AP</strong> = assignment points)</small></th>
                                </tr>
                                <tr><td>Mimořádně náročné</td><td>od +10 do +6</td></tr>
                                <tr><td>Náročné</td><td>od +5 do +1</td></tr>
                                <tr><td>Průměrně náročné</td><td>0</td></tr>
                                <tr><td>Lehké</td><td>od -1 do -5</td></tr>
                                <tr><td>Nedosatecne náročné</td><td> (F) </td></tr>
                                </tbody>
                            </table>
                            <div className="container pb-3">
                                <small><span className="text-danger ">*</span>Rozsah bodů dle stupnice se
                                používá při přístupech "Fixní rozdělení" a "Nastavitelné váhy"
                                    (<a onClick={(event)=>showCollapseBySectionId(event,'collapseThree')} href="/approach#basicBlocks">viz. Základní bloky</a>)
                                    pro spočítání výsledné
                                    známky (<a onClick={(event)=>showCollapseBySectionId(event,'collapseFour')} href="/approach#finalMark">viz. Výsledná známka</a>). Přičtení bodů není povinné, je na rozhodnutí vedoucího.</small>
                            </div>
                            <table className="table table-sm table-bordered  bg-white ">
                                <thead className="text-center bg-grey">
                                <tr>
                                    <th scope="col" colSpan="6">Možnost navýšení známky<small> (dále <strong>Incr</strong> = increment)</small> <span className="text-danger">*</span></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="bg-light text-center">
                                    <th scope="col" className="width-16"/>
                                    <th scope="col" className="width-16">Mimořádně náročné</th>
                                    <th scope="col" className="width-16">Náročné</th>
                                    <th scope="col" className="width-16">Průměrně náročné</th>
                                    <th scope="col" className="width-16">Lehké</th>
                                    <th scope="col" className="width-16">Nedosatecne náročné</th>
                                </tr>
                                <tr>
                                    <th scope="col" className="bg-light width-16">Splněno</th>
                                    <td>o 1 nebo 2 stupně výš</td><td>o 1 stupeň výš</td><td>nemění se</td><td>nemění se nebo o 1 stupeň níž</td><td>(F)</td>
                                </tr>
                                <tr>
                                    <th scope="col"  className="bg-light width-16">Splněno s menšími výhradami</th>
                                    <td>o 1 stupeň výš</td><td>nemění se nebo o 1 stupeň výš</td><td>o 1 stupeň níž</td><td>o 1 nebo 2 stupně níž</td><td>(F)</td>
                                </tr>
                                <tr>
                                    <th scope="col" className="bg-light width-16">Splněno s většími výhradami</th>
                                    <td>nemění se nebo o 1 stupeň níž</td><td>o 1 stupeň níž</td><td>o 1 nebo 2 stupně níž</td><td>o 1 nebo 2 stupně níž</td><td>(F)</td>
                                </tr>
                                <tr>
                                    <th scope="col" className="bg-light width-16">Nesplněno</th>
                                    <td>(F)</td><td>(F)</td><td>(F)</td><td>(F)</td><td>-</td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="container pb-3">
                                <small><span className="text-danger ">*</span>Navýšení výsledné známky (<a onClick={(event)=>showCollapseBySectionId(event,'collapseFour')} href="/approach#finalMark">viz. Výsledná známka</a>)
                                    je možné pouze po ohodnocení bloku "Zadání" a <a onClick={(event)=>showCollapseBySectionId(event,'collapseTwo')} href="/approach#fulfilment">"Splnění zadání"</a>. Průnik dvou
                                    hodnocení definuje možnost navýšení. Vedoucí vždy přikládá komentář s odůvodněním a
                                    má možnost známku ponechat beze změn.</small>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="card bg-dark">
                    <header className="card-header badge-dark" id="headingTwo">
                        <h5 className="mb-0">
                            <button onClick={(event)=>{showCollapse(event)}} id="collapseTwo" className="Section-button" >
                                Splnění zadání
                            </button>
                        </h5>
                    </header>
                    <div className="collapseTwo panel-collapse bg-light collapse" >
                        <div className="card-body">
                            <div className="container">
                                <ul  className="list-inline">
                                    <li className="list-group-item"> <u>Několik</u> možností hodnocení: <strong>Slovní, Body, Procento</strong> </li>
                                    <li className="list-group-item"> V tabulce s výsledným hodnocením se body a procento
                                        automaticky převádí do slovního hodnocení dle stupnice níže</li>
                                </ul>
                            </div>
                            <table className="table table-sm table-bordered bg-white ">
                                <thead className="text-center bg-grey">
                                <tr>
                                    <th scope="col" colSpan="3">Stupnice <span className="text-danger">*</span></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="bg-light text-center">
                                    <th scope="col" className="width-33"> Slovní hodnocení</th>
                                    <th scope="col" className="width-33">Bodové hodnocení </th>
                                    <th scope="col" className="width-33">Procento </th>
                                </tr>
                                <tr><td>Splněno</td><td>od 20 do 18 </td><td>100-90%</td></tr>
                                <tr><td>Splněno s menšími výhradami</td><td>od 17 do 14</td><td>89-70%</td></tr>
                                <tr><td>Splněno s většími výhradami</td><td>od 13 do 10</td><td>69-50%</td></tr>
                                <tr><td>Nesplněno</td><td>méně než 10</td><td>méně než 50%</td></tr>
                                </tbody>
                            </table>
                            <div className="container">
                                <small><span className="text-danger ">*<strong> ! IMPORTANT </strong></span>Výběr hodnocení v bodech nebo procentech
                                    vylučuje možnost volby jiného než stejného způsobu v části hodnocení
                                    <a onClick={(event)=>showCollapseBySectionId(event,'collapseThree')}
                                       href="/approach#basicBlocks"> Základních bloků </a>
                                    (tj. pokud je část "Splnění zadání" hodnocena bodově, pak jsou nutně základní bloky
                                    hodnoceny taky bodově).</small>
                            </div>
                            <div className="container p-3">
                                <ul  className="list-inline">
                                    <li className="list-group-item"><strong>Možnost automatického vypočítání:</strong> body odebrané za
                                        za kriteria spadající do průníku se převádějí na procento od definované váhy bloku, ten
                                        je pak odečten od 100% za splněnost zadání. Veduoci ale může zvolit pohodlný pro
                                        něho způsob zobrazení hodnocení bloku, do kterého pak bude převedeno vypočítané
                                        procento dle stupnice výše.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="card bg-dark" >
                    <header className="card-header badge-dark" id="headingThree">
                        <h5 className="mb-0">
                            <button onClick={(event)=>{showCollapse(event)}} id="collapseThree" className="Section-button" >
                                Základní bloky
                            </button>
                        </h5>
                    </header>
                    <div className="collapseThree panel-collapse bg-light collapse" >
                        <div className="card-body ">
                            <div className="card">
                                <div className="card-header text-center text-dark bg-grey"><strong>Slovníček pojmů</strong></div>
                                <div className="card-body">
                                    <table className="table text-justify">
                                        <tbody>
                                        <tr>
                                            <td className="width-15"><strong>Základní bloky</strong></td>
                                            <td>koncept definující sjednocené označení pro čtyři samostatné bloky:
                                                "Aktivita a samostatnost", "Odborná úroveň", "Formální a jazyková úroveň,
                                                rozsah práce", "Výběr zdrojů, korektnost citace"</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Váhy</strong></td>
                                            <td>pojem definující počet bodů vyhrazeny vedoucím pro každý
                                                ze zakladnych bloku. <br/> <small><span className="text-danger "><strong> ! IMPORTANT </strong></span></small>Součet bodů za všechny bloky nesmí ve finále překročit
                                                <strong> 100 (80)</strong> bodů v případech <strong>slovního (bodového)</strong> hodnocení bloku
                                                <a onClick={(event)=>showCollapseBySectionId(event,'collapseTwo')}
                                                   href="/approach#fulfilment">"Splnění zadání"</a>
                                                <br/> <small><span className="text-danger "><strong> ! IMPORTANT </strong></span></small>
                                                Váha za každý blok nesmí být menší než 10% a větší než 40% od součtu vah za všechny základní bloky
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="container p-3">
                                <ul  className="list-inline">
                                    <li className="list-group-item"> <u>Několik</u> možností hodnocení: <strong>Známka, Body (Fixní, Váhy), Procento</strong> </li>
                                    <li className="list-group-item"> V tabulce s výsledným hodnocením se body a procento
                                        automaticky převádí do známkového hodnocení dle stupnice níže</li>
                                </ul>
                            </div>
                            <table className="table table-sm table-bordered  bg-white ">
                                <thead className="text-center bg-grey">
                                <tr>
                                    <th scope="col" colSpan="4">Stupnice<span className="text-danger ">*</span> </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="bg-light text-center">
                                    <th scope="col" className="width-25">Známka</th>
                                    <th scope="col" className="width-25">Fixní bodové hodnocení</th>
                                    <th scope="col" className="width-25">Nástavitelné váhy</th>
                                    <th scope="col" className="width-25">Procento</th>
                                </tr>
                                <tr><td>A</td><td>od 20 do 18 </td><td rowSpan="6">Dle vzorce<span className="text-danger ">**</span>: <br/>
                                    od (max * upperPercent / 100) do (max * lowerPercent / 100)</td><td>100-90%</td></tr>
                                <tr><td>B</td><td>od 17 do 16</td><td>89-80%</td></tr>
                                <tr><td>C</td><td>od 15 do 14</td><td>79-70%</td></tr>
                                <tr><td>D</td><td>od 13 do 12</td><td>69-60%</td></tr>
                                <tr><td>E</td><td>od 11 do 10</td><td>59-50%</td></tr>
                                <tr><td>F</td><td>méně než 10</td><td>méně než 50%</td></tr>
                                </tbody>
                            </table>
                            <div className="container">
                                <small><span className="text-danger ">*<strong> ! IMPORTANT </strong></span>Výběr hodnocení
                                    v bodech (fixní a nastavitelné) nebo procentech
                                    vylučuje možnost volby jiného než stejného způsobu v části hodnocení
                                    <a onClick={(event)=>showCollapseBySectionId(event,'collapseTwo')}
                                       href="/approach#fulfilment"> Splnění zadání </a>
                                    (tj. pokud je část "Základní bloky" hodnocena bodově, pak je nutně splnění zadání
                                    hodnoceno taky bodově).<br/>
                                <span className="text-danger ">**</span>max - maximum bodů za příslušný blok,
                                    upperPercent - horní hranice sloupce Procento příslušného řádku stupnice,
                                    lowerPercent - dolní hranice sloupce Procento příslušného řádku stupnice</small>
                            </div>
                            <div className="container p-3">
                                <ul  className="list-inline">
                                    <li className="list-group-item"><strong>Možnost automatického vypočítání:</strong> vedoucí
                                        v procentech hodnotí dílčí kritéria. Splnenost bloku se pak dopočítává automaticky
                                        dle průměru. Veduoci ale může zvolit pohodlný pro něho způsob zobrazení hodnocení
                                        bloku, do kterého pak bude převedeno vypočítané procento dle stupnice výše.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="card bg-dark">
                    <header className="card-header badge-dark" id="headingFour">
                        <h5 className="mb-0">
                            <button onClick={(event)=>{showCollapse(event)}} id="collapseFour" className="Section-button" >
                                Výsledná známka
                            </button>
                        </h5>
                    </header>
                    <div className="collapseFour panel-collapse bg-light" >
                        <div className="card-body">
                            <table className="table table-sm table-bordered bg-white ">
                                <thead className="text-center bg-grey">
                                <tr>
                                    <th scope="col" colSpan="7">Možností kombinace způsobů hodnocení a vzorec pro výslednou známku</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="bg-light text-center">
                                    <th scope="col" className="width-15">   </th><th scope="col" colSpan="6">Základní bloky</th>
                                </tr>
                                <tr>
                                    <td className="bg-light">  </td><td>  </td><td><strong>Známka</strong></td>
                                    <td><strong>Fixní</strong></td><td><strong>Váhy</strong></td>
                                    <td><strong>Procento</strong></td><td><strong>Automaticky</strong></td>
                                </tr>
                                <tr>
                                    <th scope="row" rowSpan="4" className="bg-light">Splnění zadání</th>
                                    <td><strong>Slovní</strong></td><td>1.</td><td>2. nebo 3.</td>
                                    <td>2. nebo 3.</td><td>1.</td><td>1. nebo 3.</td>
                                </tr>
                                <tr>
                                    <td><strong>Body</strong></td><td>-</td><td>4.</td><td>4.</td><td>-</td><td>4.</td>
                                </tr>
                                <tr>
                                    <td><strong>Procento</strong></td><td>-</td><td>-</td><td>-</td><td>1.</td><td>1.</td>
                                </tr>
                                <tr>
                                    <td><strong>Automaticky</strong></td><td>-</td><td>-</td><td>-</td><td>-</td><td>Záleží na zvolené možnosti hodnocení<span className="text-danger ">*</span></td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="container">
                                <p><strong>1. dle zorce (Avg+Incr)</strong>, kde Avg - průměr hodnocení základních bloků
                                    a Incr - možnost navýšení známky.  </p>
                                <p><strong>2. dle vzorce (Sum+Incr)</strong>, kde Sum - součet dosažených studentem bodů
                                    za základní bloky a Incr - možnost navýšení známky. </p>
                                <p><strong>3. dle vzorce (Sum*K)</strong>, kde Sum - součet dosažených studentem bodů
                                    za základní bloky a K - koeficient umožňující navýšení známky, vypočítaný pomocí
                                    matematického vzorce s respektováním dosažených bodů za základní bloky a průniku
                                    Splnění zadání a Náročnosti zadání. Vedoucí vždy má možnost upravit výslednou známku
                                    přidáním komentáře s odůvodněním.</p>
                                <p><strong>4. dle vzorce (Sum+AP)</strong>, kde Sum - součet dosažených studentem bodů
                                    za základní bloky a AP - počet bodů za náročnost zadání dle stupnice (viz.
                                    <a onClick={(event)=>showCollapseBySectionId(event,'collapseOne')}
                                       href="/approach#assignment"> Základních bloků </a>)</p>
                                <p><span className="text-danger ">*</span>jedná se pouze o možnost oblehceni provedení
                                    hodnocení pomocí automatického vypočítání hodnocení některých bloků. Vzorec pro
                                    vypočítání výsledné známky je dán stejnou tabulkou (bez ohledu n aposledni sloupec a
                                    řádek) po zvolení vhodného pro vedoucího přístupu k hodnocení Splnění zadání a Základních bloků</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default Approaches;