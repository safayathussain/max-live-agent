'use client'
import { persistor, store } from '@/redux/store'
import { ThemeProvider } from '@mui/material'
import { PrimeReactProvider } from 'primereact/api'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const Providers = ({ children }) => {
    return (
        <div>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <PrimeReactProvider>
                        {/* <ThemeProvider theme={theme}> */}
                        {children}
                        {/* </ThemeProvider> */}
                    </PrimeReactProvider>
                </PersistGate>
            </Provider>
        </div>
    )
}

export default Providers