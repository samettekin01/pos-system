import { createContext, useContext, useState } from "react";
import { theme } from "../../theme/theme";

const ThemeContext = createContext()

export const useSetTheme = () => {
    return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
    const [color, setColor] = useState(theme.purple);

    const getColor = (e) => {
        setColor(e)
    }

    return(
        <ThemeContext.Provider value={{color, getColor}} >
            {children}
        </ThemeContext.Provider>
    )   
}