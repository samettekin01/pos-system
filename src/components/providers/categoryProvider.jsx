import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const CategoryContext = createContext()

export function CategoryProvider({ children }) {

    const [data, setData] = useState();
    const location = useLocation(); //useLocation ile URL'in path'ini alıyoruz
    const searchParams = new URLSearchParams(location.search) //URLSearchParams class'ı ile URL gerekli parametreleri bölüyoruz.
    const urldata = searchParams.get('data')//URL 'deki URL parametresi içeriği alıyoruz.

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${urldata}`)//urldata'yı axios ile http isteği yolluyoruz.
            .then(r => setData(r.data.meals))
            .catch(e => console.log(e))
    }, [urldata])
    return (
        <CategoryContext.Provider value={ data }>
            {children}
        </CategoryContext.Provider>
    )
}

//Products Provider on TheMealDb API