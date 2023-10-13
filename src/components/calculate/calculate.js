import { BsTrash } from "react-icons/bs/index.esm";
import "./calculate.css"
import { useEffect, useState } from "react";

export function setOrder() {//localStorage de yeni key ayarlıyor.//orderdan ürün silince bug'lı çalışıyor. Hâlâ inceliyorum.
    const localKey = Object.keys(localStorage)
    let orderId = localKey.length;
    const getlist = JSON.parse(localStorage.getItem(`Order${orderId}`)) || []
    if (localKey.length === 0) { //eğer key yoksa yeni key ekliyor
        localStorage.setItem(`Order${orderId + 1}`, JSON.stringify(null))
    }
    if (!getlist.length <= 0) { 
        localStorage.setItem(`Order${orderId + 1}`, JSON.stringify(null))
    }
}


export function getOrderId(){//localStorage da oluşturulan key'e diğer component'lere dağıtıyor.
    const localKey = Object.keys(localStorage)
    const key = localKey.length
    return key;
}

export function totalValue() {//obje içindeki total'leri topluyor.
    const id = getOrderId()
    const getlist = JSON.parse(localStorage.getItem(`Order${id}`)) || []
    if (getlist.length !== 0) {
        const t = getlist.map(item => item.total)
        const alltotal = t.reduce((firstval, secondval) => {
            return firstval + secondval;
        })
        return alltotal;
    }
}

export function Calculate({ control }) {
    const [id, setId] = useState(1)
    const [remove, setRemove] = useState(true)
    const [totalVal, setTotalVal] = useState(0)
    const [durum, setDurum] = useState(0)

    const getlist = JSON.parse(localStorage.getItem(`Order${id}`)) || []
    
    getlist.length < 1 && localStorage.removeItem(`Order${id}`)
    function productPls(d) {//seçili objenin amount arttırıp total'ini yeniden hesaplıyor
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
        localStorage.setItem(`Order${id}`, JSON.stringify(getlist))
    }
    function productSub(d) {//seçili objenin amount eksiltip total'ini yeniden hesaplıyor. eğer 0 "sıfır"'dan küçükse siliyor. hiç değer yoksa tamamen siliyor.
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
        getlist.length === 0 && sessionStorage.setItem("State", JSON.stringify(0))
        localStorage.setItem(`Order${id}`, JSON.stringify(getlist))
        setRemove(prevRemove => !prevRemove);
    }

    const applyClick = () => {//localStorage da yeni key oluşturuyor.
        setDurum(0) //render için
        sessionStorage.setItem("State", JSON.stringify(0)) //eğer 0 "sıfır" ise ürünleri gizliyor. 1 ise gösteriyor
    }
    const payClick = () => {//localStorage da yeni key oluşturuyor.
        setDurum(0)//render için
        sessionStorage.setItem("State", JSON.stringify(0)) //eğer 0 "sıfır" ise ürünleri gizliyor. 1 ise gösteriyor
    }
    if (durum === "0") { //eğer state 0 "sıfır"'sa yeni key oluşturuyor
        setOrder()
    }

    const calculateremove = () => {//seçili key'i localStorage da silmek için
        setTotalVal(0)
        localStorage.removeItem(`Order${id}`)
        setRemove(prevRemove => !prevRemove);
        sessionStorage.setItem("State", JSON.stringify(0))
    }


    useEffect(() => {
        getlist.length > 0 && setTotalVal(totalValue())
        setId(getOrderId())
        setDurum(sessionStorage.getItem("State"))
    }, [control, remove, getlist.length, durum])

    return (
        <div className="calculate-container">
            <div className="calculate-header-btns">
                <div className="receipt-id">{durum === "1" && getOrderId() !== 0 ? `Order ${getOrderId()}` : ""}</div>
                <BsTrash className="bstrash" onClick={calculateremove} />
            </div>
            <div className="calculate-content">
                {durum === "1" ?
                    getlist ? getlist.map((d, i) =>
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
                    ) : "No Product" : ""
                }
            </div>
            <div className="calc-tpb-cont">
                <div className="calculate-subtotal calc-total">Subtotal:<span> {durum === "1" ? Math.round((totalVal) * 100) / 100 : 0} $</span></div>
                <div className="calculate-tax calc-total">Tax %8: <span>{durum === "1" ? Math.round((totalVal * 0.08) * 100) / 100 : 0} $</span></div>
                <div className="calculate-grandtotal calc-total">Grand Total: <span>{durum === "1" ? Math.round((totalVal * 0.08 + totalVal) * 100) / 100 : 0} $</span></div>
                <div className="calculate-btns"><button className="calculate-btn" onClick={payClick}> Pay</button><button className="calculate-btn" onClick={() => applyClick()}>Apply</button></div>
            </div>
        </div>
    )
}
