/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { fetchCompany } from '../../api/IGDB'
import Styles from './CompanyPage.module.css'
import NextArrow from '../../public/img/icons/NextArrow'
import Image from 'next/image'
import CustomDocumentHead from '@/components/CustomDocumentHead'
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

    // calculate range by index number times 8
    function sliceRange(index: number) {

        return [index * 8, index === 0 ? (1 * 8) : ((index + 1) * 8)]

    }

    // fetchs data to this page
    async function fetchData() {
        setLoading(true)

        const res = await fetchCompany(companySlug, { latestReleasePag: latestGamesBtnIndex })

        setCompany(res[0].result[0])
        console.log(res[0].result[0])
        setGames(
            {
                highestRatings: res[1] ? res[1].result : null,
                latestReleases: res[2] ? res[2].result : null,
                moreGames: res[3] ? res[3].result : null,
            }
        )

        setLoading(false)
    }

    let companyLogoImgSrc: string = `https://images.igdb.com/igdb/image/upload/t_720p/${company.logo?.image_id}.png`

    useEffect(() => {

        fetchData()

    }, [companySlug])

    if (loading === true) {
        return (

            <>
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
                        <Image
                            loader={() => companyLogoImgSrc}
                            src={companyLogoImgSrc}
                            alt={company.name}
                            fill
                            onError={() => {
                                companyLogoImgSrc = 'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=60'
                            }}
                        ></Image>
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
                                            disabled={latestGamesBtnIndex  == (Math.ceil(games!.latestReleases!.length / 8) - 1)}
                                            onClick={() => setLatestGamesBtnIndex(curr => curr + 1)}
                                            aria-label='Próximo'
                                        >
                                            <NextArrow />
                                        </button>
                                    </div>
                                </div>

                                <ul>
                                    {games!.latestReleases!.slice(sliceRange(latestGamesBtnIndex)[0], sliceRange(latestGamesBtnIndex)[1]).map((item: GameInfo) => (
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
                                            disabled={moreGamesBtnIndex == (Math.ceil(games!.moreGames!.length / 8) - 1)}
                                            onClick={() => setMoreGamesBtnIndex(curr => curr + 1)}
                                            aria-label='Próximo'
                                        >
                                            <NextArrow />
                                        </button>
                                    </div>
                                </div>

                                <ul>

                                    {games!.moreGames!.slice(sliceRange(moreGamesBtnIndex)[0], sliceRange(moreGamesBtnIndex)[1]).map((item: GameInfo) => (
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