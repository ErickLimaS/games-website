import React from 'react'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper } from 'swiper/react'
import ArrowLeftSvg from "@/public/assets/svgs/arrow-left.svg"
import ArrowRightSvg from "@/public/assets/svgs/arrow-right.svg"
import 'swiper/css';
import 'swiper/css/pagination';

type swiperTypes = {
    children: React.ReactNode,
    title?: string,
    initialIndex?: number,
    changeIndexFunction?: (index: number) => void,
    loop?: boolean,
    slidesPerView?: number,
    breakpoints?: { bp480: number, bp760: number, bp1275: number },
    showNavigationBtns?: {
        customClassName: string
    },
    onlyLowerNavigation?: {
        showOnMobile?: boolean
    }
}

function SwiperCarousel({
    children,
    title,
    initialIndex,
    changeIndexFunction,
    loop,
    slidesPerView,
    breakpoints,
    showNavigationBtns,
    onlyLowerNavigation
}: swiperTypes
) {
    return (
        <React.Fragment>

            <div className='flex justify-between sm:w-full max-md:mx-2'>

                <h2 className='text-white mb-3'>{title}</h2>

                {(showNavigationBtns && !onlyLowerNavigation) && (
                    <nav className={`${onlyLowerNavigation ? "hidden" : "max-md:hidden"}  block space-x-6`}>
                        <button className={`${showNavigationBtns?.customClassName}-swiper-button-prev`} title='Previous'>
                            <ArrowLeftSvg className="fill-white/60 hover:fill-white/90" />
                        </button>
                        <button className={`${showNavigationBtns?.customClassName}-swiper-button-next`} title='Next'>
                            <ArrowRightSvg className="fill-white/60 hover:fill-white/90" />
                        </button>
                    </nav>
                )}

            </div>

            <Swiper
                onActiveIndexChange={(e) => changeIndexFunction ? changeIndexFunction(e.activeIndex) : undefined}
                modules={[Navigation, Pagination, A11y]}
                slidesPerView={slidesPerView || 3.4}
                spaceBetween={16}
                initialSlide={initialIndex || 0}
                loop={loop || false}
                centeredSlides={true}
                navigation={{
                    nextEl: `.${showNavigationBtns?.customClassName}-swiper-button-next`,
                    prevEl: `.${showNavigationBtns?.customClassName}-swiper-button-prev`
                }}
                breakpoints={{
                    480: {
                        slidesPerView: breakpoints ? breakpoints.bp480 : 4.4
                    },
                    740: {
                        slidesPerView: breakpoints ? breakpoints.bp760 : 5.4
                    },
                    1275: {
                        slidesPerView: breakpoints ? breakpoints.bp1275 : 6.4,
                        centeredSlides: false
                    }
                }}
            >
                {children}
            </Swiper>

            {(showNavigationBtns || onlyLowerNavigation) && (
                <nav className={`flex justify-between mx-auto max-w-72 ${onlyLowerNavigation ? (onlyLowerNavigation.showOnMobile ? "" : "max-md:hidden") : "md:hidden"} mt-4 space-x-6`}>
                    <button className={`${showNavigationBtns?.customClassName}-swiper-button-prev`} title='Previous'>
                        <ArrowLeftSvg className="fill-white/60 hover:fill-white/90" />
                    </button>
                    <button className={`${showNavigationBtns?.customClassName}-swiper-button-next`} title='Next'>
                        <ArrowRightSvg className="fill-white/60 hover:fill-white/90" />
                    </button>
                </nav>
            )}

        </React.Fragment>
    )
}

export default SwiperCarousel