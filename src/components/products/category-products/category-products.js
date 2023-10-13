import { useContext, useState } from "react";
import { Calculate, getOrderId } from "../../calculate/calculate";
import "./category-products.css"
import { CategoryContext } from "../../apiprovider/categoryprovider";
import { CgProduct } from "./cg-product/cg-product";

function CategoryProducts() {
    const data = useContext(CategoryContext);
    const [control, setControl] = useState()
    getOrderId();
    return (
        <div className="products-cont">
            <div className="products-search-cont">
                <div className="product-cat">Products</div>
                <div className="products-contents">
                    {data ? data.map((d, i) => (
                        <CgProduct key={i} set={d} control={setControl} />
                    )) : "No Product Data"}
                </div>
            </div>
            <Calculate control={control} />
        </div>
    )
}

export default CategoryProducts;