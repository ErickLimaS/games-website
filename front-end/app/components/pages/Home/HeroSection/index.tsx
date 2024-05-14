"use client"
import SwiperCarousel from '@/app/components/layout/swiperCarousel';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { wrap } from 'popmotion';
import React, { useState } from 'react'
import { SwiperSlide } from 'swiper/react';

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
}

function HeroSection({ data }: { data: GameInfo[] }) {

    const [[page, direction], setPage] = useState([0, 0])

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    }

    const imageIndex = wrap(0, data.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection])
    }

    return (
        <section>

            <AnimatePresence custom={direction} mode='sync'>

                <ul id="carousel" className='overflow-hidden'>
                    <motion.li
                        key={page}
                        style={{ backgroundImage: `linear-gradient(transparent, var(--primary) 90%), url(//images.igdb.com/igdb/image/upload/t_1080p/${data[imageIndex].artworks[0].image_id}.jpg)` }}
                        className={`bg-cover bg-no-repeat bg-center h-screen `}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                    >

                        <div className='bg-black/40 absolute left-0 right-0 top-0 bottom-0' />

                        <div className='container relative top-1/3 mx-auto px-2'>

                            <div>

                                <h1 className='text-5xl text-white font-bold mb-8'>
                                    {data[imageIndex].name}
                                </h1>

                                <Link
                                    className='px-8 py-3 bg-black/40 text-white font-semibold border-2 border-white/75 rounded-md'
                                    href={`/game/${data[imageIndex].id}`}
                                >
                                    See More
                                </Link>

                            </div>

                        </div>
                    </motion.li>
                </ul>
            </AnimatePresence>

            {/* SECOND CAROUSEL */}
            <div className='container md:px-2 sm:mx-auto absolute z-10 bottom-[calc(6vh)] left-1/2 transform -translate-x-1/2'>

                <SwiperCarousel
                    title='Featured & Recommended'
                    changeIndexFunction={(index: number) => setPage([index, index])}
                    slidesPerView={1.25}
                    showNavigationBtns
                    breakpoints={{
                        bp480: 2.05,
                        bp760: 3.2,
                        bp1275: 4.2
                    }}
                >
                    {data.map((item, key: number) => (
                        <SwiperSlide key={key}>

                            <div
                                title={item.name}
                                style={{ backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_720p/${item.artworks[0]?.image_id}.jpg)` }}
                                className='flex aspect-6/4 bg-cover bg-no-repeat bg-center rounded-[4px]'
                            />

                        </SwiperSlide>))}
                </SwiperCarousel>

            </div>

        </section >
    )
}

export default HeroSection