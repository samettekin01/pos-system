import { useState } from "react"
import { BsTrash } from "react-icons/bs/index.esm";
import { useSetTheme } from "../providers/themeProvider";
import "./orders.css"
//Orders History

export function listOrder() { //LocalStorage'ki listelerken boş olanları siliyor.
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
//Siparişler Component'i
export function Orders() {
    const getorders = Object.keys(localStorage); //localStorage'den key'leri alıyor
    const [history, setHistory] = useState();
    const [orderID, setOrderID] = useState();
    const { color } = useSetTheme();
    listOrder()
    const orderList = (id) => { //setGetOrder function'dan gelen parametreyi getiriyor.
        const list = JSON.parse(localStorage.getItem(id));
        return list;
    }
    const setGetOrder = (e) => { //orderList function'dan gelen listeyi useState hook'una set ediyor
        const list = orderList(e);
        setOrderID(e);
        setHistory(list);
    }

    const allDelete = () => { //tüm key'leri temizliyor.
        const orders = Object.keys(localStorage);
        for (let i = 0; i < orders.length; i++) {
            const name = localStorage.key(i);
            localStorage.removeItem(name);
            setHistory("");
        }
    }
    const orderDelete = () => {
        localStorage.removeItem(orderID);
        setHistory("");
        setOrderID("")
    }
    return (
        <div className="orders-container">
            <div className="orders" >
                {getorders ? getorders.map((order, i) =>
                    <div className="order-container" key={i} onClick={() => setGetOrder(order)} style={{ background: color.backgroundcolor, color: color.text }}>
                        <div >
                            <span>Order ID:<br />{order}</span>
                        </div>
                    </div>) : "No Order"}
            </div>
            <div className="order-history-container">
                <div className="order-id" style={{ background: color.backgroundcolor, color: color.text }}>All Orders Delete<button className="delete-order" onClick={allDelete}><BsTrash style={{ fontSize: "2rem" }} /></button></div>
                <div className="order-id" style={{ background: color.backgroundcolor, color: color.text }}>Orders Delete: {orderID} <button className="delete-order" onClick={orderDelete}><BsTrash style={{ fontSize: "2rem" }} /></button></div>
                <div className="orderh-content">
                    {history ? history.map((item, i) => (
                        <div className="orderh-order-container" key={i} style={{ background: color.backgroundcolor, color: color.text }}>
                            <div className="order-name">Product: {item.name}</div>
                            <div className="order-price">Price: {item.price} $</div>
                            <div className="order-grandtotal">Total: {item.total} $</div>
                        </div>
                    )) : "No Order"}
                </div>
            </div>
        </div>
    )
}