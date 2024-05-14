"use client"
import SwiperCarousel from '@/app/components/layout/swiperCarousel'
import Link from 'next/link'
import React from 'react'
import { SwiperSlide } from 'swiper/react'

function SpecificGenreSection({ data, genreNumber }: { data: GameInfo[], genreNumber?: number }) {

    console.log(data[1].genres)

    return (
        <section className='bg-primary py-4'>

            <div className='container mx-auto px-2'>

                <h2 className='text-4xl font-bold text-white mb-4'>Horror Games</h2>

                <SwiperCarousel
                    slidesPerView={1.2}
                    showNavigationBtns
                    onlyLowerNavigation
                    breakpoints={{
                        bp480: 2.1,
                        bp760: 3,
                        bp1275: 3
                    }}
                >

                    {data.map((item, key) => (
                        <SwiperSlide key={key}>

                            <div className='space-y-1'>

                                <Link
                                    href={`/game/${item.slug}`}
                                    title={item.name}
                                    style={{ backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_720p/${item.cover?.image_id}.jpg)` }}
                                    className='flex aspect-[5/5] bg-cover bg-no-repeat bg-center rounded-md'
                                />

                                <div className='bg-white/10 text-white py-4 px-3 rounded-md space-y-4'>
                                    <h3 className='text-2xl md:text-3xl font-semibold line-clamp-1'>
                                        <Link href={`/game/${item.slug}`}>
                                            {item.name}
                                        </Link>
                                    </h3>

                                    <p className='line-clamp-4'>
                                        {item.summary}
                                    </p>

                                    <div className='py-2 space-x-1'>
                                        {item.genres.slice(0, 3).map((item, key) => (
                                            <Link
                                                href={`/genre/${item.slug}`}
                                                key={item.checksum}
                                                className='p-1 bg-primary/85 rounded-sm'
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>

                                </div>

                            </div>

                        </SwiperSlide>
                    ))}

                </SwiperCarousel>

            </div>

        </section >
    )
}

export default SpecificGenreSection