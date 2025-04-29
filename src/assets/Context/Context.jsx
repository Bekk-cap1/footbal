import { createContext, useState } from "react";


const Context = createContext()
function Provider({ children }) {
    const [activeId, setActiveId] = useState(1)

    const [language, setLanguage] = useState('ru')
    return (
        <Context.Provider value={{ activeId, setActiveId, language, setLanguage }}>
            {children}
        </Context.Provider>
    )
}
export { Context, Provider }