import { BsTrash } from "react-icons/bs/index.esm";
import "./calculate.css"
import { useEffect, useState } from "react";

export function totalValue() {
    const getlist = JSON.parse(localStorage.getItem("Order1")) || []
    const t = getlist.map(item => item.total)
    const alltotal = t.reduce((firstval, secondval) => {
        return firstval + secondval;
    })
    return alltotal;
}

export function getOrders() {
    const localKey = Object.keys(localStorage)
    const localMap = localKey.map(item => item)
    return localMap;
}

export function setOrder() {
    
    const Id = getOrders().length
    const orderId = Id + 1
    localStorage.setItem(`Order${orderId}`, JSON.stringify(""))
}

export function Calculate({ control }) {
    const getlist = JSON.parse(localStorage.getItem("Order1")) || []
    const [remove, setRemove] = useState(true)
    const [totalVal, setTotalVal] = useState(0)

    getlist.length < 1 && localStorage.removeItem("Order1")
    function productPls(d) {
        const index = getlist.findIndex(item => item.id === d.id)
        setTotalVal(totalValue());
        if (index !== -1) {
            getlist[index].amount += 1;
            const amount = getlist[index].amount;
            const price = getlist[index].price;
            getlist[index].total = amount * price;
            setRemove(prevRemove => !prevRemove);
        } else {
            console.log("No Data")
        }
        localStorage.setItem("Order1", JSON.stringify(getlist))
    }
    function productSub(d) {
        const index = getlist.findIndex(item => item.id === d.id)
        if (index !== -1) {
            if (!getlist[index].amount < 1) {
                getlist[index].amount -= 1;
                const amount = getlist[index].amount;
                const price = getlist[index].price;
                getlist[index].total = amount * price;
                setTotalVal(totalValue());
            } else {
                getlist.splice(index, 1)
            }
        } else {
            console.log("No Data")
        }
        localStorage.setItem("Order1", JSON.stringify(getlist))
        remove ? setRemove(false) : setRemove(true)
    }

    const calculateremove = () => {
        setTotalVal(0)
        localStorage.removeItem("Order1")
        remove ? setRemove(false) : setRemove(true)
    }


    useEffect(() => {
        getlist.length > 0 && setTotalVal(totalValue())
    }, [control, remove, getlist.length])

    return (
        <div className="calculate-container">
            <div className="calculate-header-btns">
                <div className="receipt-id">{localStorage.key(0)}</div>
                <BsTrash className="bstrash" onClick={calculateremove} />
            </div>
            <div className="calculate-content">
                {getlist ? getlist.map((d, i) =>
                    <div className="calc-order-content" key={i}>
                        <div className="order-cont">
                            <div className="order-name">{d.name}</div>
                            <div className="order-piece">{d.price} TL</div>
                        </div>
                        <div className="order-piece-btns">
                            <div className="order-pls-btn"><button onClick={() => productPls(d)} className="order-btn">+</button></div>
                            <div className="order-input">{d.amount}</div>
                            <div className="order-sub"><button onClick={() => productSub(d)} className="order-btn">-</button></div>
                            <div className="order-total">Total: <br />{d.total} $</div>
                        </div>
                    </div>
                ) : "No Product"}
            </div>
            <div className="calc-tpb-cont">
                <div className="calculate-subtotal calc-total">Subtotal: <span>{Math.round((totalVal) * 100) / 100} $</span></div>
                <div className="calculate-tax calc-total">Tax %8: <span>{Math.round((totalVal * 0.08) * 100) / 100} $</span></div>
                <div className="calculate-grandtotal calc-total">Grand Total: <span>{Math.round((totalVal * 0.08 + totalVal) * 100) / 100} $</span></div>
                <div className="calculate-btns"><button className="calculate-btn"> Pay</button><button className="calculate-btn" >Apply</button></div>
            </div>
        </div>
    )
}
