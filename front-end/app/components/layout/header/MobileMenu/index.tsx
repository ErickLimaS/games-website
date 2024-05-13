"use client"
import React, { useState } from 'react'
import MenuSvg from "@/public/assets/svgs/list.svg"
import { AnimatePresence, motion } from 'framer-motion'
import BackdropOverlay from '@/app/components/layout/backdropOverlay'
import Link from 'next/link'

function MobileMenu() {

    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

    return (
        <React.Fragment>
            <button
                className='md:hidden'
                onClick={() => setMenuIsOpen(!menuIsOpen)}
            >
                <MenuSvg aria-label="Menu" />
            </button>

            <AnimatePresence>
                {menuIsOpen && (
                    <BackdropOverlay onClick={() => setMenuIsOpen(!menuIsOpen)}>
                        <motion.ul
                            onClick={(e) => e.stopPropagation()}
                            className='absolute right-0 top-0 h-full bg-primary w-3/4 sm:w-2/4 divide-y-2 divide-white'
                            initial={{
                                x: 100,
                            }}
                            animate={{
                                x: 0,
                            }}
                            exit={{
                                x: 100
                            }}
                        >
                            <li>
                                <Link href="/" className='block p-4'>
                                    Recent Release
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className='block p-4'>
                                    Most Anticipate
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className='block p-4'>
                                    Genres
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className='block p-4'>
                                    Platforms
                                </Link>
                            </li>
                        </motion.ul>
                    </BackdropOverlay>
                )}
            </AnimatePresence>

        </React.Fragment>
    )
}

export default MobileMenu