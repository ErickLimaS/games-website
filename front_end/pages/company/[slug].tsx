import React, { useEffect, useLayoutEffect, useState } from 'react'
import { fetchCompany } from '../../api/IGDB'
import Styles from './CompanyPage.module.css'
import NextArrow from '../../public/img/icons/NextArrow'
import Image from 'next/image'
import ErrorImg from '../../public/img/logo/logo.png'
import CustomDocumentHead from '@/components/CustomDocumentHead'
import SimilarGameCard from '@/components/SimilarGameCard'
import DateHumanReadable from '@/components/DateHumanReadable'
import SearchResult from '@/components/SearchResult'
import CarouselItem from '@/components/CarouselItem'
import PageLoading from '@/components/PageLoading'

interface Games {


    highestRatings: GameInfo[],
    latestReleases: GameInfo[],
    moreGames: GameInfo[]


}

export default function CompanyPage({ companySlug }: { companySlug: string }) {

    // pagination index 
    const [latestGamesBtnIndex, setLatestGamesBtnIndex] = useState<number>(0)
    const [moreGamesBtnIndex, setMoreGamesBtnIndex] = useState<number>(0)

    const [loading, setLoading] = useState<boolean>(true)

    // content data
    const [company, setCompany] = useState<any>([])
    const [games, setGames] = useState<Games>()

    let companyLogoImgSrc: string | any

    // fetchs data to this page
    async function fetchData() {
        setLoading(true)

        const res = await fetchCompany(companySlug, {
            latestReleasePag: latestGamesBtnIndex
        })

        setCompany(res[0].result[0])
        setGames(
            {
                highestRatings: res[1] ? res[1].result : null,
                latestReleases: res[2] ? res[2].result : null,
                moreGames: res[2] ? res[2].result : null,
            }
        )


        companyLogoImgSrc = res[0].result[0].logo != undefined ? `https://images.igdb.com/igdb/image/upload/t_logo_med/${res[0].result[0].logo.image_id}.png` : ErrorImg

        setLoading(false)
    }

    useEffect(() => {

        fetchData()

    }, [companySlug, moreGamesBtnIndex, latestGamesBtnIndex])

    if (loading === true) {
        return (

            <>
                <CustomDocumentHead title={company.name || companySlug} />
                <PageLoading />
            </>

        )
    }

    return (

        <>
            <CustomDocumentHead title={company.name} />

            <div id={Styles.container} className={`${Styles.padding}`}>

                <section id={Styles.page_heading}>

                    <div id={Styles.img_container}>
                        {/* <Image
                            loader={() => companyLogoImgSrc}
                            src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${company.logo.image_id}.png`}
                            alt={company.name}
                            fill
                        ></Image> */}
                        <img
                            alt={company.name}
                            alt={company.name}
                            src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${company.logo.image_id}.png`} width={500} height={500}
                        />
                    </div>

                    <div>

                        <h1>{company.name}</h1>

                        {company.start_date && (
                            <p>Criada em <DateHumanReadable date={company.start_date} /></p>
                        )}

                    </div>

                </section>

                <div className={Styles.content_grid}>
                    <div className={Styles.content_container}>

                        {games!.latestReleases && (

                            <section id={Styles.latest_releases}>

                                <div className={Styles.section_heading_container}>

                                    <h2>Últimos lançamentos pela {company.name}</h2>

                                    <div className={Styles.buttons_container}>
                                        <button
                                            disabled={latestGamesBtnIndex === 0}
                                            onClick={() => setLatestGamesBtnIndex(curr => curr - 1)}
                                            aria-label='Anterior'
                                        >
                                            <NextArrow />
                                        </button>
                                        <button
                                            disabled={latestGamesBtnIndex === games!.latestReleases!.length}
                                            onClick={() => setLatestGamesBtnIndex(curr => curr + 1)}
                                            aria-label='Próximo'
                                        >
                                            <NextArrow />
                                        </button>
                                    </div>
                                </div>

                                <ul>
                                    {games!.latestReleases!.map((item: GameInfo) => (
                                        <CarouselItem key={item.id} props={item} />
                                    ))}
                                </ul>

                            </section>

                        )}

                        {games!.moreGames && (
                            <section id={Styles.more_games}>

                                <div className={Styles.section_heading_container}>

                                    <h2>Outros jogos</h2>

                                    <div className={Styles.buttons_container}>
                                        <button
                                            disabled={moreGamesBtnIndex === 0}
                                            onClick={() => setMoreGamesBtnIndex(curr => curr - 1)}
                                            aria-label='Anterior'
                                        >
                                            <NextArrow />
                                        </button>
                                        <button
                                            disabled={moreGamesBtnIndex === games!.moreGames!.length}
                                            onClick={() => setMoreGamesBtnIndex(curr => curr + 1)}
                                            aria-label='Próximo'
                                        >
                                            <NextArrow />
                                        </button>
                                    </div>
                                </div>

                                <ul>

                                    {games!.moreGames!.map((item: GameInfo) => (
                                        <CarouselItem key={item.id} props={item} />
                                    ))}

                                </ul>

                            </section>
                        )}

                    </div>

                    {games!.highestRatings && (
                        <aside id={Styles.aside_content}>

                            <h3>Mais bem avaliados</h3>

                            <ul>
                                {games!.highestRatings!.map((item: GameInfo) => (

                                    <SearchResult key={item.id} props={item} />

                                ))}
                            </ul>

                        </aside>
                    )}
                </div>

            </div>

        </>
    )
}

export async function getServerSideProps({ query }: any) {

    return {
        props: {
            companySlug: query.slug
        }
    }

}