import { useState } from "react";
import { useSetTheme } from "../../../providers/themeProvider";
import { useGetKey } from "../../../providers/keyProvider";

import "./cgProduct.css"

//Product Component
export function CgProduct({ set, control }) {
    const { key } = useGetKey();
    const productList = () => {
        const product = { id: set.idMeal, name: set.strMeal, price: Math.floor(parseInt(set.idMeal) / 1000), amount: 1, total: Math.floor(parseInt(set.idMeal) / 1000) };
        const getlist = JSON.parse(localStorage.getItem(key)) || []; //seçili listeyi getiriyor
        sessionStorage.setItem("State", 1)
        const index = getlist.findIndex(item => item.id === set.idMeal); //seçili ürün listede olup olmadığı kontrol ediyor
        if (index !== -1) {//eğer varsa amount'a ekliyor.
            getlist[index].amount += 1;
            const amount = getlist[index].amount;
            const price = getlist[index].price;
            getlist[index].total = amount * price;
        } else {
            getlist.push(product);//eğer yoksa yeni ekliyor.
        }
        control(getlist);//içerik değiiştikte render etmesi için CategoryProducts component'inin useState'ini set ediyor
        localStorage.setItem(key, JSON.stringify(getlist));//düzenlenen son halini seçili key'e ekliyor
    }
    
    const { color } = useSetTheme()
    const [mouse, setMouse] = useState(false)
    const mouseOver = () => {
        setMouse(true)
    }
    const mouseOut = () => {
        setMouse(false)
    }
    const style = {
        backgroundColor: mouse ? color.btncolor : "white",
        color: mouse ? color.color : "black"
    }

    return (
        <button className="pro-btn" onClick={productList} onMouseOver={mouseOver} onMouseOut={mouseOut} style={style}>
            <div className="product-cont">
                <img className="pro-img-pic" src={set.strMealThumb} alt={set.idMeal} />
                <span className="product-name">{set.strMeal}</span>
                <span className="product-price">{Math.floor(parseInt(set.idMeal) / 1000)} $</span>
            </div>
        </button >
    )
}
