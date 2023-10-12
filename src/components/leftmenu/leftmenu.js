import { NavLink } from "react-router-dom";
import Btn from "../buttons/buttons";
import "./leftmenu.css"

import { BsClipboard2Check, BsGear, BsShop } from "react-icons/bs/index.esm";

function LeftMenu() {
    return (
        <div className="leftmenu-container">
            <div className="left-menu-container">
                <NavLink to="/"><Btn><BsShop /> Home</Btn></NavLink>
                <NavLink to="/orders"><Btn><BsClipboard2Check /> Orders</Btn></NavLink>
                <div className="setting-btn"><Btn><BsGear /> Settings</Btn></div>
            </div>
        </div>
    )
}

export default LeftMenu;