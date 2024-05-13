import { motion } from 'framer-motion'
import React, { MouseEventHandler } from 'react'

function BackdropOverlay({ children, onClick }: { children: React.ReactNode, onClick?: MouseEventHandler<HTMLDivElement> }) {
    return (
        <motion.div
            onClick={onClick}
            className='fixed top-0 bottom-0 left-0 right-0 bg-black/65'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >

            {children}

        </motion.div>
    )
}

export default BackdropOverlay