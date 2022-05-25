import React from "react";

const Footer = () => {
    function getDisplay(){
        console.log(window.location.pathname)
        if(window.location.pathname==="/")
            return "none";
        return "inline";
    }
    return(
        <div className="Footer position-static" style={{display:getDisplay()}}>
            <footer className="footer font-small bg-dark stick">
                <div className="footer-copyright text-center text-light py-3">© 2022 Copyright: havryvik@fel.cvut.cz</div>
            </footer>
        </div>
    )
}
export default Footer;