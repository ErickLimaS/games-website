import CustomDocumentHead from '@/components/CustomDocumentHead'
import PageLoading from '@/components/PageLoading'
import React, { useEffect, useState } from 'react'
import Styles from './GenrePage.module.css'
import { fetchGamesByGenre } from '@/api/IGDB'
import CarouselItem from '@/components/CarouselItem'
import GameGenreCard from '@/components/GameGenreCard'
import SvgNextArrow from '@/public/img/icons/NextArrow'

interface Genre {

    genre: {
        name: string
    },
    greatestRatings: GameInfo[],
    latestReleases: GameInfo[],
    moreGames: GameInfo[]

}

export default function GenrePage({ genreSlug }: { genreSlug: string }) {

    const [loading, setLoading] = useState<boolean>(true)

    const [genreData, setGenreData] = useState<Genre>()

    const [bestRatingsIndex, setBestRatingsIndex] = useState<number>(0)
    const [latestReleasesIndex, setLatestReleasesIndex] = useState<number>(0)
    const [moreGamesIndex, setMoreGamesIndex] = useState<number>(0)

    // calculate range by index number times 4
    function sliceRange(index: number) {

        return [index * 4, index === 0 ? (1 * 4) : ((index + 1) * 4)]

    }

    async function fetchData() {
        setLoading(true)
        const res = await fetchGamesByGenre(genreSlug);

        setGenreData({
            genre: res[0].result[0],
            greatestRatings: res[1].result,
            latestReleases: res[2].result,
            moreGames: res[3].result,
        })

        setLoading(false)
    }

    useEffect(() => {

        fetchData()

    }, [genreSlug])

    if (loading === true) {
        return (
            <>
                <CustomDocumentHead title={genreData?.genre.name || `Carregando`} />
                <PageLoading />
            </>
        )
    }

    return (
        <>
            <CustomDocumentHead title={genreData?.genre.name || `Carregando`} />

            <div id={Styles.container} className={Styles.padding}>

                <h1>Gênero <span>{genreData?.genre.name}</span></h1>

                <section className={Styles.section_content_container}>

                    <div className={Styles.heading_container}>

                        <h2>Mais Bem Avaliados</h2>

                        <div className={Styles.buttons_container}>
                            <button
                                disabled={bestRatingsIndex === 0}
                                onClick={() => setBestRatingsIndex(curr => curr - 1)}
                                aria-label='Anterior'
                            >
                                <SvgNextArrow />
                            </button>
                            <button
                                disabled={bestRatingsIndex === genreData?.greatestRatings.length}
                                onClick={() => setBestRatingsIndex(curr => curr + 1)}
                                aria-label='Próximo'
                            >
                                <SvgNextArrow />
                            </button>
                        </div>

                    </div>

                    <ul className={Styles.list_container}>

                        {genreData?.greatestRatings.slice(sliceRange(bestRatingsIndex)[0], sliceRange(bestRatingsIndex)[1]).map((item: GameInfo) => (
                            <GameGenreCard key={item.id} props={item} />
                        ))}

                    </ul>

                </section>

                <section className={Styles.section_content_container}>

                    <div className={Styles.heading_container}>

                        <h2>Últimos Lançamentos</h2>

                        <div className={Styles.buttons_container}>
                            <button
                                disabled={latestReleasesIndex === 0}
                                onClick={() => setLatestReleasesIndex(curr => curr - 1)}
                                aria-label='Anterior'
                            >
                                <SvgNextArrow />
                            </button>
                            <button
                                disabled={latestReleasesIndex === genreData?.greatestRatings.length}
                                onClick={() => setLatestReleasesIndex(curr => curr + 1)}
                                aria-label='Próximo'
                            >
                                <SvgNextArrow />
                            </button>
                        </div>

                    </div>

                    <ul className={Styles.list_container}>

                        {genreData?.latestReleases.slice(sliceRange(latestReleasesIndex)[0], sliceRange(latestReleasesIndex)[1]).map((item: GameInfo) => (
                            <GameGenreCard key={item.id} props={item} />
                        ))}

                    </ul>

                </section>

                <section className={Styles.section_content_container}>

                    <div className={Styles.heading_container}>

                        <h2>Mais Desse Gênero</h2>

                        <div className={Styles.buttons_container}>
                            <button
                                disabled={moreGamesIndex === 0}
                                onClick={() => setMoreGamesIndex(curr => curr - 1)}
                                aria-label='Anterior'
                            >
                                <SvgNextArrow />
                            </button>
                            <button
                                disabled={moreGamesIndex === genreData?.greatestRatings.length}
                                onClick={() => setMoreGamesIndex(curr => curr + 1)}
                                aria-label='Próximo'
                            >
                                <SvgNextArrow />
                            </button>
                        </div>

                    </div>

                    <ul className={Styles.list_container}>

                        {genreData?.moreGames.slice(sliceRange(moreGamesIndex)[0], sliceRange(moreGamesIndex)[1]).map((item: GameInfo) => (
                            <GameGenreCard key={item.id} props={item} />
                        ))}

                    </ul>

                </section>

            </div>

        </>
    )
}

export async function getServerSideProps({ query }: any) {

    return {
        props: {
            genreSlug: query.slug
        }
    }
}