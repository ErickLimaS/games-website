import CustomDocumentHead from '@/components/CustomDocumentHead'
import PageLoading from '@/components/PageLoading'
import React, { useEffect, useState } from 'react'
import Styles from './GameModePage.module.css'
import { fetchGameMode } from '@/api/IGDB'
import CarouselItem from '@/components/CarouselItem'
import GameGenreCard from '@/components/GameGenreCard'
import SvgNextArrow from '@/public/img/icons/NextArrow'

interface GameMode {

    gameMode: {
        name: string
    },
    greatestRatings: GameInfo[],
    latestReleases: GameInfo[],
    moreGames: GameInfo[]

}

export default function GameModePage({ gameModeSlug }: { gameModeSlug: string }) {

    const [loading, setLoading] = useState<boolean>(true)

    const [gameModeData, setGameModeData] = useState<GameMode>()

    const [bestRatingsIndex, setBestRatingsIndex] = useState<number>(0)
    const [latestReleasesIndex, setLatestReleasesIndex] = useState<number>(0)
    const [moreGamesIndex, setMoreGamesIndex] = useState<number>(0)

    // calculate range by index number times 4
    function sliceRange(index: number) {

        return [index * 4, index === 0 ? (1 * 4) : ((index + 1) * 4)]

    }

    async function fetchData() {
        setLoading(true)

        const res = await fetchGameMode(gameModeSlug);

        setGameModeData({
            gameMode: res[0].result[0],
            greatestRatings: res[1].result,
            latestReleases: res[2].result,
            moreGames: res[3].result,
        })

        setLoading(false)
    }

    useEffect(() => {

        fetchData()

    }, [gameModeSlug])

    if (loading === true) {
        return (
            <>
                <CustomDocumentHead title={gameModeData?.gameMode.name || `Carregando`} />
                <PageLoading />
            </>
        )
    }

    return (
        <>
            <CustomDocumentHead title={gameModeData?.gameMode.name || `Carregando`} />

            <div id={Styles.container} className={Styles.padding}>

                <h1>Jogos <span>{gameModeData?.gameMode.name}</span></h1>

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
                                disabled={bestRatingsIndex === gameModeData?.greatestRatings.length}
                                onClick={() => setBestRatingsIndex(curr => curr + 1)}
                                aria-label='Próximo'
                            >
                                <SvgNextArrow />
                            </button>
                        </div>

                    </div>

                    <ul className={Styles.list_container}>

                        {gameModeData?.greatestRatings.slice(sliceRange(bestRatingsIndex)[0], sliceRange(bestRatingsIndex)[1]).map((item: GameInfo) => (
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
                                disabled={latestReleasesIndex === gameModeData?.greatestRatings.length}
                                onClick={() => setLatestReleasesIndex(curr => curr + 1)}
                                aria-label='Próximo'
                            >
                                <SvgNextArrow />
                            </button>
                        </div>

                    </div>

                    <ul className={Styles.list_container}>

                        {gameModeData?.latestReleases.slice(sliceRange(latestReleasesIndex)[0], sliceRange(latestReleasesIndex)[1]).map((item: GameInfo) => (
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
                                disabled={moreGamesIndex === gameModeData?.greatestRatings.length}
                                onClick={() => setMoreGamesIndex(curr => curr + 1)}
                                aria-label='Próximo'
                            >
                                <SvgNextArrow />
                            </button>
                        </div>

                    </div>

                    <ul className={Styles.list_container}>

                        {gameModeData?.moreGames.slice(sliceRange(moreGamesIndex)[0], sliceRange(moreGamesIndex)[1]).map((item: GameInfo) => (
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
            gameModeSlug: query.slug
        }
    }
}