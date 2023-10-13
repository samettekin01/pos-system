import { useState } from "react"
import "./orders.css"
import { BsTrash } from "react-icons/bs/index.esm";

export function listOrder() {
    const list = Object.keys(localStorage)
    for (let i = 0; i < list.length; i++) {
        const key = localStorage.key(i)
        const state = JSON.parse(localStorage.getItem(key))
        if (state === null) {
            localStorage.removeItem(key)
            continue
        }
    }
}

export function Orders() {
    const getorders = Object.keys(localStorage)
    const [history, setHistory] = useState()
    const [orderName, setOrderName] = useState()
    listOrder()
    const orderList = (id) => {
        const list = JSON.parse(localStorage.getItem(id))
        return list;
    }
    const setGetOrder = (e) => {
        const list = orderList(e)
        setOrderName(e)
        setHistory(list)
    }
    
    // const deleteOrder = () => {
    //     const list = orderList()
    //     localStorage.removeItem(orderName)
    //     setHistory(list)
    //     setOrderName("")
        
    // }

    const allDelete = () => {
        const orders = Object.keys(localStorage)
        for(let i = 0; i < orders.length ; i++){
            const name = localStorage.key(i)
            localStorage.removeItem(name);
        }
        setOrderName("")
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
                <div className="order-id">All Delete<button className="delete-order" onClick={allDelete}><BsTrash style={{ fontSize: "2rem" }} /></button></div>
                {/* <div className="order-id">Order ID: {orderName && orderName}<button className="delete-order" onClick={deleteOrder}><BsTrash style={{ fontSize: "2rem" }} /></button></div> */}
                <div className="order-id">Order ID: Disabled<button className="delete-order"><BsTrash style={{ fontSize: "2rem" }} /></button></div>
                <div className="orderh-content">
                    {history ? history.map((item, i) => (
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