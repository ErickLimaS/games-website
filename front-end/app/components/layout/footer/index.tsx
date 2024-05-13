import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <footer className='bg-primary w-full text-white'>

            <nav className='container mx-auto py-8 px-2'>
                <div className='flex max-sm:space-y-8 sm:space-x-8 max-sm:flex-col lg:justify-end'>
                    <div>

                        <h6 className='text-white/75 text-lg'>
                            Inspiration
                        </h6>

                        <ul className='mt-4 space-y-2'>

                            <li className='border-b-2 border-transparent hover:border-b-2 hover:border-white transition-colors'>
                                <Link href={"https://www.behance.net/gallery/154892909/Steam-Website-UI-Redesign-Desktop-and-Mobile?tracking_source=search_projects_recommended%7Cgaming+website"} target='_blank' rel='noreferrer'>
                                    Home Page By Chronic Studio
                                </Link>
                            </li>
                            <li className='border-b-2 border-transparent hover:border-b-2 hover:border-white transition-colors'>
                                <Link href={"https://dribbble.com/shots/2355968-Steam-Redesign-Game-Store-Page#"} target='_blank' rel='noreferrer'>
                                    Game Page By Matt Preston
                                </Link>
                            </li>
                            <li className='border-b-2 border-transparent hover:border-b-2 hover:border-white transition-colors'>
                                <Link href={"https://www.shutterstock.com/pt/image-vector/user-interface-template-web-elements-ux-1298537821"} target='_blank' rel='noreferrer'>
                                    Sign Up Page By Kosmidma
                                </Link>
                            </li>

                        </ul>

                    </div>

                    <div>

                        <h6 className='text-white/75 text-lg'>
                            About
                        </h6>

                        <ul className='mt-4 space-y-2'>

                            <li className='border-b-2 border-transparent hover:border-b-2 hover:border-white transition-colors'>
                                <Link href={"https://github.com/ErickLimaS/games-website"} target='_blank' rel='noreferrer'>
                                    This Project
                                </Link>
                            </li>
                            <li className='border-b-2 border-transparent hover:border-b-2 hover:border-white transition-colors'>
                                <Link href={"https://api-docs.igdb.com/#about"} target='_blank' rel='noreferrer'>
                                    IGDB API
                                </Link>
                            </li>
                            <li className='border-b-2 border-transparent hover:border-b-2 hover:border-white transition-colors'>
                                <Link href={"https://github.com/ckatzorke/howlongtobeat"} target='_blank' rel='noreferrer'>
                                    HowLongToBeat API
                                </Link>
                            </li>

                        </ul>

                    </div>
                </div>

                <div className='mx-auto w-fit mt-4'>
                    <ul>
                        <li>
                            <Link href={"#"} className='hover:text-white/75 transition-colors'>
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

            </nav>

        </footer>
    )
}

export default Footer