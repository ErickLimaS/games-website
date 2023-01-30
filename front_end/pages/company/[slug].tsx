import React, { useEffect, useState } from 'react'
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

interface PageTypes {

    company: Company,
    games: {
        highestRatings: GameInfo[] | null,
        latestReleases: GameInfo[] | null
        moreGames: GameInfo[] | null
    }

}

export default function CompanyPage({ company, games }: PageTypes) {

    console.log(company, games)

    const companyLogoImgSrc: string | any = company.logo != undefined ? `https://images.igdb.com/igdb/image/upload/t_logo_med/${company.logo.image_id}.png` : ErrorImg

    const [latestGamesBtnIndex, setLatestGamesBtnIndex] = useState<number>(0)
    const [moreGamesBtnIndex, setMoreGamesBtnIndex] = useState<number>(0)

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

                        {games.latestReleases && (

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
                                            disabled={latestGamesBtnIndex === games.latestReleases!.length}
                                            onClick={() => setLatestGamesBtnIndex(curr => curr + 1)}
                                            aria-label='Próximo'
                                        >
                                            <NextArrow />
                                        </button>
                                    </div>
                                </div>

                                <ul>
                                    {games.latestReleases!.map((item: GameInfo) => (
                                        <CarouselItem key={item.id} props={item} />
                                    ))}
                                </ul>

                            </section>

                        )}

                        {games.moreGames && (
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
                                            disabled={moreGamesBtnIndex === games.moreGames!.length}
                                            onClick={() => setMoreGamesBtnIndex(curr => curr + 1)}
                                            aria-label='Próximo'
                                        >
                                            <NextArrow />
                                        </button>
                                    </div>
                                </div>

                                <ul>

                                    {games.moreGames!.map((item: GameInfo) => (
                                        <CarouselItem key={item.id} props={item} />
                                    ))}

                                </ul>

                            </section>
                        )}

                    </div>

                    {games.highestRatings && (
                        <aside id={Styles.aside_content}>

                            <h3>Mais bem avaliados</h3>

                            <ul>
                                {games.highestRatings!.map((item: GameInfo) => (

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

    const res = await fetchCompany(query.slug)

    return {
        props: {
            company: res[0].result[0],
            games: {
                highestRatings: res[1] ? res[1].result : null,
                latestReleases: res[1] ? res[1].result : null,
                moreGames: res[1] ? res[1].result : null,
            }
        }
    }

}