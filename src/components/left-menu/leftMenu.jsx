import { NavLink } from "react-router-dom";
import Btn from "../buttons/buttons";
import "./left-menu.css"

import { BsClipboard2Check, BsGear, BsShop } from "react-icons/bs/index.esm";
import { Menu } from "@headlessui/react";
import { useSetTheme } from "../providers/themeProvider";
import { theme } from "../../theme/theme";

function LeftMenu() {
    const { color, getColor } =  useSetTheme()

    const setTheme = (e) => {
        getColor(theme[e.target.value])
    }
    return (
        <div className="leftmenu-container" style={{background: color.backgroundcolor}}>
            <div className="left-menu-container">
                <NavLink to="/"><Btn><BsShop className="lf-icons" /> <span> Home</span></Btn></NavLink>
                <NavLink to="/orders"><Btn><BsClipboard2Check className="lf-icons"  /> <span> Orders</span></Btn></NavLink>
                <div className="setting-btn">
                    {/* <Btn><BsGear /> Theme </Btn> */}
                    <Menu>
                        <Menu.Button className="btn-container" style={{background: color.btncolor, color: color.color}}><BsGear className="lf-icons" /><span> Theme</span></Menu.Button>
                        <Menu.Items className="menu-items">
                            <div className="leftmenu-themecolor" style={{background: color.backgroundcolor}}>
                                <Menu.Button onClick={setTheme} className="themecolor" value="blue" style={{background: color.btncolor, color: color.color}}>Blue</Menu.Button>
                                <Menu.Button onClick={setTheme} className="themecolor" value="purple" style={{background: color.btncolor, color: color.color}}>Purple</Menu.Button>
                                <Menu.Button onClick={setTheme} className="themecolor" value="brown" style={{background: color.btncolor, color: color.color}}>Brown</Menu.Button>
                            </div>
                        </Menu.Items>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default LeftMenu;