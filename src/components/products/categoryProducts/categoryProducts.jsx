import { useContext, useState } from "react";
import { Calculate } from "../../calculate/calculate";
import { CategoryContext } from "../../providers/categoryProvider";
import { CgProduct } from "./cgProduct/cgProduct";
import { useSetTheme } from "../../providers/themeProvider";

function CategoryProducts() {
    const data = useContext(CategoryContext);//Seçili ürünleri provider'dan alıyor
    const [control, setControl] = useState()
    const { color } = useSetTheme()
    return (
        <div className="products-cont">
            <div className="products-search-cont">
                <div className="product-cat" style={{ backgroundColor: color.backgroundcolor, color: color.text }}>Products</div>
                <div className="products-contents">
                    {data ? data.map((d, i) => (//map'lenip listeleniyor.
                        <CgProduct key={i} set={d} control={setControl} />//component'ten gelen control prop'unu setControl useState hook'a set ediyor.
                    )) : "No Product Data"}
                </div>
            </div>
            <Calculate control={control} />{/*CgProduct component'inden gelen state'i control'prop'una set ediyor*/}
        </div>
    )
}

export default CategoryProducts;