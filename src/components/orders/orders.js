import { useState } from "react"
import "./orders.css"

export function Orders() {
    const getorders = Object.keys(localStorage)
    const [history, setHistory] = useState()
    const [orderName, setOrderName] = useState()
    const setGetOrder = (e) => {
        const list = JSON.parse(localStorage.getItem(e))
        setOrderName(e)
        setHistory(list)
    }
    return (
        <div className="orders-container">
            <div className="orders">
                {getorders ? getorders.map((order, i) =>
                    <button className="order-container" key={i} onClick={() => setGetOrder(order)}>
                        <div>
                            <span>{order}</span>
                        </div>
                    </button>) : "No Order"}
            </div>
            <div className="order-history-container">
                <div className="orderh-header"></div>
                <div className="order-id">{orderName && `Order ID: ${orderName}`}</div>
                <div className="orderh-content">
                    {history ? history.map((item,i) => (
                        <div className="orderh-order-container" key={i}>
                            <div className="order-name">Product: {item.name}</div>
                            <div className="order-price">Price: {item.price}</div>
                            <div className="order-grandtotal">Total: {item.total}</div>
                        </div>
                    )) : "No Order"}
                </div>
                <div className="orderh-pay">Grand Total: Disabled</div>
            </div>
        </div>
    )
}