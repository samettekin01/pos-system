import { createContext, useContext, useState } from "react";

const KeyContext = createContext()

export const useGetKey = () => {
    return useContext(KeyContext);
}

export const KeyProvider = ({ children }) => {
    function generateUniqueKey(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters.charAt(randomIndex);
        };
        return result;
    };
    let uniqueKey = generateUniqueKey(10);
    const [key, setKey] = useState(uniqueKey);
    const handleKey = () => {
        generateUniqueKey(10);
        setKey(uniqueKey)
        const storage = Object.keys(localStorage).length;
        if (storage === 0) {
            localStorage.setItem(uniqueKey, JSON.stringify(null));
        } else {
            const status = JSON.parse(localStorage.getItem(key))
            if (status && uniqueKey !== key) {
                localStorage.setItem(uniqueKey, JSON.stringify(null));
            }else{
                uniqueKey = generateUniqueKey(10);
            }
        }
    };
    return (
        <KeyContext.Provider value={{ key, handleKey }}>
            {children}
        </KeyContext.Provider>
    )
}