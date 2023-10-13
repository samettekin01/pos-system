import "./buttons.css"
 //LeftMenu button
function Btn(props){
    return(
        <button className="btn-container">{props.children}</button>
    )
}

export default Btn;