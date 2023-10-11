import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Products from "../products/products";
import CategoryProducts from "../products/category-products/category-products";

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
            }
        ]
    }
])

export default routes;