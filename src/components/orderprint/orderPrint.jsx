import { forwardRef } from "react";
import "./orderprint.css"

const OrderPrint = forwardRef((props, ref) => {
    const { data, total } = props;
    const printRef = JSON.parse(localStorage.getItem(`Order${data}`)) || [];
    return (
        <div className="orderprint-container" ref={ref}>
            <table className="orderprint-table">
                <thead>
                    <tr className="order-head">
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {printRef ? printRef.map((data, i) => (
                        <tr key={i} className="order-body">
                            <td>{data.name}</td>
                            <td>{data.amount}</td>
                            <td>{data.price} $</td>
                            <td>{data.total} $</td>
                        </tr>
                    )) : "No Order"}
                </tbody>
                <tfoot>
                    <tr className="po-total">
                        <td colSpan="3">Grand Total(Tax: %8): </td>
                        <td>{Math.round(((total) * 0.08 + (total)) * 100) / 100} $</td>
                    </tr>
                </tfoot>
            </table>
        </div >
    )
});

export default OrderPrint;