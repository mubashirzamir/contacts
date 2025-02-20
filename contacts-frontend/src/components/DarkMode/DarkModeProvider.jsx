import {createContext, useContext, useState} from 'react'
import {ConfigProvider, theme} from 'antd'

const DarkModeContext = createContext({
    darkMode: true,
    setDarkMode: () => {
    },
})

const DarkModeProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(true)

    return <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
        <ConfigProvider theme={{
            algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}>
            <div className="flex flex-col min-h-screen">
                {children}
            </div>
        </ConfigProvider>
    </DarkModeContext.Provider>
}

export const useDarkMode = () => useContext(DarkModeContext)

export default DarkModeProvider
