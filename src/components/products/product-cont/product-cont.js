import { NavLink } from "react-router-dom";
import "./product-cont.css"


function ProductCont({ set, setData }) {

    return (
        <NavLink to={`/products/?data=${set.strCategory}`} className="active">
            <button className="pro-btn" onClick={() => setData(set.strCategory)}>
                <div className="product-cont">
                    <img className="pro-img-pic" src={set.strCategoryThumb} key={set.idCategory} alt={set.strCategory} />
                    <span className="product-name">{set.strCategory}</span>
                    <span className="product-price">{set.strCategory ? "Category" : ""}</span>
                </div>
            </button>
        </NavLink>
    )
}

export default ProductCont;