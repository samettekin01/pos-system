import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const CategoryContext = createContext()

export function CategoryProvider({ children }) {

    const [data, setData] = useState();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const urldata = searchParams.get('data')

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${urldata}`)
            .then(r => setData(r.data.meals))
            .catch(e => console.log(e))
    }, [urldata])
    return (
        <CategoryContext.Provider value={ data }>
            {children}
        </CategoryContext.Provider>
    )
}