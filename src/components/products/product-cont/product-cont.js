import { NavLink } from "react-router-dom";
import "./product-cont.css"

//Category Component
function ProductCont({ set }) {

    return (
        <NavLink to={`/products/?data=${set.strCategory}`} className="active">{/*useLocation hook da kullanabilmek için data parametresine set.strCategory veriyoruz.*/}
            <button className="pro-btn">
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