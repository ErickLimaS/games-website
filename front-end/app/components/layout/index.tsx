import React from 'react'
import Header from './header'
import Footer from './footer'

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <React.Fragment>

            <Header />

            {children}

            <Footer />

        </React.Fragment>
    )
}

export default Layout