import { useContext } from "react";
import { Calculate, setOrder } from "../calculate/calculate";
import "./products.css"
import { CreateApiContext } from "../apiprovider/apiprover";
import ProductCont from "./product-cont/product-cont";
import { useSetTheme } from "../apiprovider/themeprovider";

const Products = () => {
    const d = useContext(CreateApiContext); //kategoriler provider'dan getiriyor
    const {color} = useSetTheme()
    setOrder() //yeni key ayarlıyor.
    return (
        <div className="products-cont">
            <div className="products-search-cont">
                <div className="product-cat" style={{background: color.backgroundcolor, color: color.text}}> Categories </div>
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