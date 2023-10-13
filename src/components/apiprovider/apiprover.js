import axios from "axios";
import { createContext, useEffect, useState } from "react"

export const CreateApiContext = createContext();

export function ApiProvider({  children }) {
    const [product, setProduct] = useState();
    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
            .then(r => setProduct(r.data.categories))
            .catch(e => { console.log("Hata: " + e) })
    }, [])
    return (
        <CreateApiContext.Provider value={product}>
            {children}
        </CreateApiContext.Provider>
    )
}

//Categori Provider on TheMealDb API
