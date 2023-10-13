import { getOrderId } from "../../../calculate/calculate"

import "./cg-product.css"

export function CgProduct({ set, control }) {
    
    const productList = () => {
        let id = getOrderId();
        if(id === 0){
            id += 1
        }
        
        const product = { id: set.idMeal, name: set.strMeal, price: Math.floor(parseInt(set.idMeal) / 1000), amount: 1, total: Math.floor(parseInt(set.idMeal) / 1000) };
        const getlist = JSON.parse(localStorage.getItem(`Order${id}`)) || [];
        sessionStorage.setItem("State", 1)
        const index = getlist.findIndex(item => item.id === set.idMeal);
        if (index !== -1) {
            getlist[index].amount += 1;
            const amount = getlist[index].amount;
            const price = getlist[index].price;
            getlist[index].total = amount * price;
        } else {
            getlist.push(product);
        }
        control(getlist);

        localStorage.setItem(`Order${id}`, JSON.stringify(getlist));
    }
    return (
        <button className="pro-btn" onClick={productList}>
            <div className="product-cont">
                <img className="pro-img-pic" src={set.strMealThumb} alt={set.idMeal} />
                <span className="product-name">{set.strMeal}</span>
                <span className="product-price">{Math.floor(parseInt(set.idMeal) / 1000)} $</span>
            </div>
        </button >
    )
}
