import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import Styles from './Layout.module.css'

function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />

            <main className={Styles.container}>
                {children}
            </main>

            <Footer />
        </>
    )
}

export default Layout