import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Products from "../products/products";
import CategoryProducts from "../products/category-products/category-products";
import { Orders } from "../orders/orders";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Products />
            },
            {
                path:"/products",
                element: <CategoryProducts />
            },
            {
                path: "/orders",
                element: <Orders />
            }
        ]
    }
])

export default routes;