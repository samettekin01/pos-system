import { NavLink } from "react-router-dom";
import { useSetTheme } from "../../providers/themeProvider";
import { useState } from "react";
import "./product-content.css"
//Category Component
function ProductCont({ set }) {
    const { color } = useSetTheme()
    const [mouse, setMouse] = useState(false)
    const mouseOver = () => {
        setMouse(true)
    }
    const mouseOut = () =>{
        setMouse(false)
    }
    const style = {
        backgroundColor: mouse ? color.btncolor : "white",
        color: mouse ? color.color : "black"
    }
    return (
        <NavLink to={`/products/?data=${set.strCategory}`} className="active" >{/*useLocation hook da kullanabilmek için data parametresine set.strCategory veriyoruz.*/}
            <button className="pro-btn" onMouseOver={mouseOver} onMouseOut={mouseOut} style={style}>
                <div className="product-cont" >
                    <img className="pro-img-pic" src={set.strCategoryThumb} key={set.idCategory} alt={set.strCategory} />
                    <span className="product-name">{set.strCategory}</span>
                    <span className="product-price">{set.strCategory ? "Category" : ""}</span>
                </div>
            </button>
        </NavLink>
    )
}

export default ProductCont; 