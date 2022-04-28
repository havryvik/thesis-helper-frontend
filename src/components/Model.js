import React from "react";

const Model = () => {
    return (
        <div className="container shadow pt-3 mb-5 bg-light rounded">
            <div className="card border-0">
                <div className="card-header text-center bg-light">
                    <h5 className="card-title " >Model hodnocení závěrečných prácí</h5>
                </div>
                <table className="table">
                    <thead>
                    <tr className="text-center">
                        <th scope="col" style={{width: '20%'}}>Blok</th>
                        <th scope="col" style={{width: '30%'}}>Kritéria</th>
                        <th scope="col">Popis</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1. Zadání</th>
                        <td> </td>
                        <td className="text-justify">Vyhodnocení obtížností zadání, kde "Mimořádně náročné" znamená jít nad rámec školního programu,
                            řešit problém odpovídající magisterskému nebo doktorskému rozsahu, práce přijímané do soutěží nebo
                            konferencí. Zatímco "Nedostatečně náročné" znamená stanovení omezených požadavků na práci, které i
                            při jejich kompletní realizaci nejsou schopné uspokojit požadavky stanovené oborem studia a prokázat
                            nabyté studentem znalostí.</td>
                    </tr>
                    <tr>
                        <th scope="row">2. Splnění zadání</th>
                        <td> </td>
                        <td className="text-justify">Vyhodnocení, zda předložená závěrečná práce splňuje předem definované a potvrzené zadání. Uvádí se
                            body zadání, které nebyly zcela splněny, nebo zda je práce oproti zadání rozšířena. Nebylo-li
                            zadání zcela splněno, uvádí se závažnost, dopady a případně i příčiny jednotlivých nedostatků.
                            Definuje se popisným slovem: "Splněno (s většími / menšími výhradami)", "Nesplněno".</td>
                    </tr>
                    <tr>
                        <th scope="row">3. Aktivita a samostatnost</th>
                        <td >3.1. Dodržení domluvených termínů <br/>3.2. Přípravenost k setkáním <br/>3.3. Iniciativnost
                            <br/>3.4. Samostatnost <br/>3.5. Pěčlivost</td>
                        <td className="text-justify">Posuzuje se, zda byl student během řešení aktivní, zda dodržoval
                            dohodnuté termíny, jestli své řešení průběžně konzultoval a zda byl na konzultace dostatečně
                            připraven. Jedná se o vyhodnocení schopnosti studenta samostatné tvůrčí práce vzhledem k
                            uvedeným kritériím. </td>
                    </tr>
                    <tr>
                        <th scope="row">4. Odborná úroveň</th>
                        <td >4.1. Použitelnost, aplikovatelnost v praxi <br/>4.2. Možnost dálšího rozvoje<br/>4.3. Systematičnost analýzy
                            <br/>4.4. Replikovatelnost závěru<br/>4.5. Volitelná</td>
                        <td className="text-justify">Úroveň odbornosti závěrečné práce, využití znalostí získaných
                            studiem a z odborné literatury, využití podkladů a dat získaných z praxe. Jelikož odborná
                            úroveň je těsně spojena se změřením zvoleného tématu práce, tento blok obsahuje ktiterium
                            "Volitelné". V případě potřeby vedoucí nahrazuje volitelný kritérium za další kritéria
                            vzhledem ke zaměření práce studenta. Tento bod není povinný, ale doporučený pro zvýšení
                            obeznámenosti studenta v průběhu plnění práce. </td>
                    </tr>
                    <tr>
                        <th scope="row">5. Formální a jazyková úroveň, rozsah práce</th>
                        <td >5.1. Adekvatnost rozsáhu<br/>5.2. Formatování<br/>5.3. Gramatické chyby, punktuace, překlepy
                            <br/>5.4. Souvislost, konzistence textu<br/>5.5. Čitelnost<br/>5.6. Použití odborného jazyku<br/>
                            5.7. Reference v textu</td>
                        <td className="text-justify"> Správnost používání formálních zápisů obsažených v práci.
                            Typografická a jazyková stránka. Vyhodnocení rozsahu práce vzhledem k obecným požadavkům na
                            bakalářské práce a specifikům zaměření práce. Souvislost textů a logická návaznost kapitol.
                            Propojení textu použitím správného referencování. </td>
                    </tr>
                    <tr>
                        <th scope="row">6. Výběr zdrojů, korektnost citace</th>
                        <td >6.1. Dodržování konvenci<br/>6.2. Dostatečnost citaci<br/>6.3. Kvalita zdrojů</td>
                        <td className="text-justify">Kvalita získánych a použitých studijních materiálů k řešení
                            závěrečné práce. Charakterizace výbranych pramenů. Ověření toho, zda jsou všechny převzaté
                            prvky řádně odlišeny od vlastních výsledků a úvah, zda nedošlo k porušení citační etiky a
                            zda jsou bibliografické citace úplné a v souladu s citačními zvyklostmi a norma</td>
                    </tr>
                    </tbody>
                </table>
                <br/>
                <div className="card-footer text-muted text-center">
                    Model je vytvořen na základě zpětné vazby od vyučujících. Přesný popis jednotlivých kritérií a
                    způsob jejich ohodnocení najdete přímo ve formuláři pro hodnocení prací po definici vhodného
                    přístupu hodnocení.
                </div>
            </div>
        </div>
    )
}
export default Model;