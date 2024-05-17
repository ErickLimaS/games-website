"use client"
import SwiperCarousel from '@/app/components/layout/swiperCarousel'
import Link from 'next/link'
import React, { useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import ArrowRightSvg from "@/public/assets/svgs/arrow-right.svg"
import { AnimatePresence, motion } from 'framer-motion'

function PopularPlatformGamesSection({ data }: { data: GameInfo[] }) {

    const [currIndex, setCurrIndex] = useState<number>((data.length / 2) - 1 || 4)

    return (
        <section
            className='relative bg-cover bg-no-repeat bg-center h-[90vh] text-center'
            style={{
                backgroundImage: `linear-gradient( var(--primary) 5%, rgba(0,0,0,.4), var(--primary) 90%), url(//images.igdb.com/igdb/image/upload/t_720p/${data[currIndex].artworks[0].image_id}.jpg)`
            }}
        >

            <h2 className='container w-fit mx-auto pt-12 text-4xl font-bold text-white'>
                Popular Nintendo Games
            </h2>

            <div className='relative top-1/3'>
                <div className='container w-fit mx-auto space-y-3'>

                    <AnimatePresence>
                        <motion.h3
                            className='max-lg:absolute max-lg:-top-1/2 max-lg:left-1/2 max-lg:transform max-lg:-translate-x-1/2 max-lg:w-[90%] mx-auto text-2xl sm:text-3xl md:text-5xl font-extrabold line-clamp-2 text-center text-white'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 1.5 } }}
                        >
                            {data[currIndex].name}
                        </motion.h3>

                        <div className='w-fit mx-auto space-x-4'>
                            {data[currIndex].themes.slice(0, 3).map((item, key) => (
                                <small key={key} className='text-white md:text-xl font-bold'>
                                    {item.name.toUpperCase()}
                                </small>
                            ))}
                        </div>

                    </AnimatePresence>
                    
                </div>

                <AnimatePresence>
                    <motion.div
                        className='mt-6'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 1.5 } }}
                    >

                        <SwiperCarousel
                            initialIndex={currIndex}
                            changeIndexFunction={setCurrIndex}
                            slidesPerView={1.25}
                            isAlwaysCentered
                            breakpoints={{
                                bp480: 2.05,
                                bp760: 3.2,
                                bp1275: 4.2
                            }}
                            showNavigationBtns={{
                                customClassName: "popular-platform"
                            }}
                            onlyLowerNavigation={{
                                showOnMobile: true
                            }}
                        >

                            {data.map((item, key) => (
                                <SwiperSlide key={key}>

                                    <div
                                        title={item.name}
                                        style={{
                                            backgroundImage: currIndex == key ?
                                                `linear-gradient(rgba(0 ,0 ,0 , 0.35) 100%, rgba(0 ,0 ,0 , 0.35) 100%), url(//images.igdb.com/igdb/image/upload/t_720p/${item.artworks[0]?.image_id}.jpg)`
                                                :
                                                `linear-gradient(transparent 100%, transparent 100%), url(//images.igdb.com/igdb/image/upload/t_720p/${item.artworks[0]?.image_id}.jpg)`
                                        }}
                                        className={`relative flex aspect-[5/3] bg-cover bg-no-repeat bg-center border-2 ${currIndex == key ? "border-secondary" : "border-transparent scale-90"} rounded-md transition-all`}
                                    >

                                        <div>

                                            <Link href={`/game/${item.slug}`}
                                                className={`absolute bottom-1 right-1 ${currIndex == key ? "flex" : "hidden"} items-center gap-2 text-sm font-medium text-secondary transition-all`}
                                            >
                                                See Details <ArrowRightSvg width={16} height={16} />
                                            </Link>

                                        </div>

                                    </div>

                                </SwiperSlide>
                            ))}

                        </SwiperCarousel>

                    </motion.div>
                </AnimatePresence>

            </div>

        </section>
    )
}

export default PopularPlatformGamesSection