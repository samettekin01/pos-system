import { useSetTheme } from "../apiprovider/themeprovider";
import "./buttons.css"
 //LeftMenu button
function Btn(props){
    const {color} = useSetTheme()
    return(
        <button className="btn-container" style={{background: color.btncolor, color: color.color}}>{props.children}</button>
    )
}

export default Btn;