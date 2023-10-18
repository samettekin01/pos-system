import { useContext } from "react";
import { Calculate } from "../calculate/calculate";
import { CreateApiContext } from "../providers/apiProvider";
import { useSetTheme } from "../providers/themeProvider";
import ProductCont from "./productContent/productContent";
import "./products.css";

const Products = () => {
    const d = useContext(CreateApiContext); //kategoriler provider'dan getiriyor
    const { color } = useSetTheme();
    return (
        <div className="products-cont">
            <div className="products-search-cont">
                <div className="product-cat" style={{ background: color.backgroundcolor, color: color.text }}> Categories </div>
                <div className="products-contents">
                    {d && d.map((d, i) => (//kategorileri map'liyor
                        <ProductCont key={i} set={d} />
                    ))}
                </div>
            </div>
            <Calculate />
        </div>
    )
}

export default Products;