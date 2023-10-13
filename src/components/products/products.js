import { useContext, useState } from "react";
import { Calculate, setOrder } from "../calculate/calculate";
import "./products.css"
import { CreateApiContext } from "../apiprovider/apiprover";
import ProductCont from "./product-cont/product-cont";
import { CategoryProvider } from "../apiprovider/categoryprovider";

const Products = () => {
    const d = useContext(CreateApiContext);
    const [productData, setProductData] = useState("No Data");
    setOrder()
    return (
        <div className="products-cont">
            <div className="products-search-cont">
                <div className="product-cat"> Categories </div>
                <div className="products-contents">
                    {d && d.map((d, i) => (
                        <ProductCont key={i} set={d} setData={setProductData} />
                    ))}
                </div>
            </div>
            <Calculate />
            <CategoryProvider val={productData} />
        </div>
    )
}

export default Products;