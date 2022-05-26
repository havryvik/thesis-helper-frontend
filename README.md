# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


# Popis projektu

V rámci tohoto projektu jsem se zabývala vývojem aplikace, která by měla posloužit pro vedoucí bakalářských 
prací a studenty ve finální fázi studia. Hlavním cílem bylo na základě zpětné vazby od vyučujících FEL SIT
navrhnout rozpad aktuálně používaného modelu posudku na další dílčí důležitá kritéria a prozkoumat možnosti 
přístupu k ohodnocení prací. Úvahy definované v průběhu výzkumu i staly základem aplikace. Musím naznačit, že 
kvůli rozsáhlosti funkcionality aplikace, velkému počtu alternativních cest ohodnocení práce a spojení projektu 
s moji bakalářskou práci odevyzdani které se plánuje v podzimním termínu tato aplikace není kompletně dokončenou
ale je dostačující pro daný semestrální projekt. Přesný seznam implementovaných use-casu je vyjmenován níže. 
Projekt kromě frontendove části obsahuje taky Java backend vyvinutý na základě frameworku Sring Boot (odkaz na gitlab - 
https://gitlab.fel.cvut.cz/havryvik/thesis-helper). Všechna 
data (informace o uživatelích, detaily přístupů, hodnocení) se ukládají do databází PostgresSQL.

Uživatelské role: Supervisor, Student (implementované pouze částečně)

Pro přihlášení použijte následující údaje: login "pavel", heslo "pavel". Nebo vytvořte nový uživatelský profil.

# Use-Cases:

1. Registrace

2. Přihlášení

3. Úprava informace profilu

4. Zobrazení seznamu studentů, u kterých je vyučujícím

5. Přidání nového studenta pomocí emailu

6. Zobrazení modelu

7. Zobrazení seznamu přístupů k ohodnocení dílčích částí posudku

8. Defaultně vytvářet prvotní přístup ohodnocení práce odpovídající aktuálně používanému přístupu z posudku

9. Možnost specifikovat přístup (nakonfigurovat) hodnocení závěrečné práci pro konkrétního studenta

10. Prohlížení zvoleného přístupu hodncoeni

11. Změnit již nakonfiguroavny přístup

12. Provést hodnocení práce na základě zvoleného přístupu (castnecne implementováno, zatím se neukládá do db)