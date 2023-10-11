import "./buttons.css"

function Btn(props){
    return(
        <button className="btn-container">{props.children}</button>
    )
}

export default Btn;