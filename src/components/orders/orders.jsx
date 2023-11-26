import { useRef, useState } from "react"
import { BsPrinter, BsTrash } from "react-icons/bs/index.esm";
import { useSetTheme } from "../providers/themeProvider";
import "./orders.css"
import OrderPrint from "../order-print/orderPrint";
import { useReactToPrint } from "react-to-print";
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
    const [history, setHistory] = useState([]);
    const [orderID, setOrderID] = useState();
    const { color } = useSetTheme();
    const total = history.reduce((total, value) => total + value.total, 0)
    const printRef = useRef();
    const print = useReactToPrint({
        content: () => printRef.current,
    });
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
    const orderDelete = () => {
        localStorage.removeItem(orderID);
        setHistory([]);
        setOrderID("")
    }
    const payClick = () => {//localStorage da yeni key oluşturuyor.
        const list = JSON.parse(localStorage.getItem(orderID)) || [];
        if (list.length > 0) {
            print();
        } else {
            alert("No Product");
        };
    };
    return (
        <div className="orders-container">
            <div style={{ display: "none" }}>
                <OrderPrint data={orderID} ref={printRef} total={total} />
            </div>
            <div className="orders" >
                {getorders ? getorders.map((order, i) =>
                    <div className="order-container" key={i} onClick={() => setGetOrder(order)} style={{ background: color.backgroundcolor, color: color.text }}>
                        <div >
                            <span>Order ID:<br />{order}</span>
                        </div>
                    </div>) : "No Order"}
            </div>
            <div className="order-history-container">
                <div className="order-id" >Orders ID: {orderID}</div>
                <div className="orderh-content">
                    {history ? history.map((item, i) => (
                        <div className="orderh-order-container" key={i} style={{ background: color.backgroundcolor, color: color.text }}>
                            <div className="orderh-product-content">
                                <div className="order-name">{item.name}</div>
                                <div className="order-price">{item.price} $</div>
                            </div>
                            <div className="orderh-amount-content">
                                <div className="order-grandtotal">Total: <b>{item.total} $</b></div>
                                <div className="orderh-amount">Amount: <b>{item.amount}</b></div>
                            </div>
                        </div>
                    )) : "No Order"}
                </div>
                <div>

                </div>
                <div className="calc-tpb-cont">
                    <div className="calculate-subtotal calc-total">Subtotal:<span>{Math.round(total * 100) / 100}$</span></div>
                    <div className="calculate-tax calc-total">Tax %8: <span>{Math.round((total - (total * 0.8)) * 100) / 100} $</span></div>
                    <div className="calculate-grandtotal calc-total">Grand Total: <span>{Math.round((total * 1.08) * 100) / 100} $</span></div>
                    <div className="calculate-btns">
                        <button className="calculate-btn" onClick={payClick} style={{ background: color.backgroundcolor, color: color.text }}>Pay-<BsPrinter /></button>
                        <button className="calculate-btn" onClick={orderDelete} style={{ background: color.backgroundcolor, color: color.text }} ><BsTrash style={{ background: color.backgroundcolor, color: color.text }} />Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}