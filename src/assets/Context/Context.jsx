import { createContext, useState } from "react";


const Context = createContext()
function Provider({ children }) {
    const [activeId, setActiveId] = useState(1)
    const [activeIdParticipants, setActiveIdParticipants] = useState(3)

    const [language, setLanguage] = useState('ru')
    return (
        <Context.Provider value={{ activeId, setActiveId, language, setLanguage, activeIdParticipants, setActiveIdParticipants }}>
            {children}
        </Context.Provider>
    )
}
export { Context, Provider }