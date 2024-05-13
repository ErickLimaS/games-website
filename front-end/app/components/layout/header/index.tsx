import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoImg from "@/public/assets/imgs/logo/logo.png"
import MobileMenu from './MobileMenu'
import SearchForm from './SearchForm'

function Header() {
    return (
        <header className='bg-primary text-white'>

            <nav className='container mx-auto max-sm:px-8 px-2'>

                <div className='flex justify-between items-center pt-8 pb-4 sm:py-8'>

                    <div className='flex items-center md:space-x-4 xl:space-x-10'>
                        <div className='relative top-0'>
                            <Link href="/" className='block relative w-full h-[32px] lg:h-[38px] aspect-5/2'>
                                <Image src={LogoImg} alt='My Next Game Logo' fill />
                            </Link>
                        </div>

                        {/* ONLY ON DESKTOP */}
                        <ul className='max-md:hidden flex text-xs lg:text-sm font-medium md:space-x-2 xl:space-x-4'>
                            <li className='border-b-2 border-transparent hover:border-b-2 hover:border-white transition-colors'>
                                <Link href="/">Recent Release</Link>
                            </li>
                            <li className='border-b-2 border-transparent hover:border-b-2 hover:border-white transition-colors'>
                                <Link href="/">Most Anticipate</Link>
                            </li>
                            <li className='border-b-2 border-transparent hover:border-b-2 hover:border-white transition-colors'>
                                <Link href="/">Genres</Link>
                            </li>
                            <li className='border-b-2 border-transparent hover:border-b-2 hover:border-white transition-colors'>
                                <Link href="/">Platforms</Link>
                            </li>
                        </ul>
                    </div>

                    <div className='flex items-center sm:space-x-4 xl:space-x-10'>
                        {/* ONLY ON DESKTOP */}
                        <div className='max-sm:hidden'>
                            <SearchForm />
                        </div>

                        <div className='flex items-center gap-2'>

                            <Link href="/login">Login</Link>

                            {/* MOBILE MENU */}
                            <MobileMenu />

                        </div>
                    </div>

                </div>

                {/* SEARCH MOBILE */}
                <div className='sm:hidden flex justify-center pb-4'>
                    <SearchForm isMobile />
                </div>

            </nav>

        </header>
    )
}

export default Header