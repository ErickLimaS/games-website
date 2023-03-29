import CustomDocumentHead from '../../components/CustomDocumentHead'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Styles from './LaunchsStyles.module.css'
import PageLoading from '@/components/PageLoading'
import { fetchLatestReleases } from '@/api/IGDB'
import { ReleasesContainerBcgImg } from '@/styles/DynamicBcgImg'
import * as SVG from "../../public/img/icons"
import CarouselItem from '@/components/CarouselItem'
import DateHumanReadable from '@/components/DateHumanReadable'
import GameListItem from '@/components/GameListItem'
import CardMediumArtworkDescription from '@/components/CardMediumArtworkDescription'

function RecentLaunchs() {

    const [loading, setLoading] = useState<boolean>(true)

    const [releasingThisMonth, setReleasingThisMonth] = useState<GameInfo[]>([])
    const [launched, setLaunched] = useState<GameInfo[]>([])
    const [notLaunch, setNotLaunch] = useState<GameInfo[]>([])
    const [bestRatings, setBestRatings] = useState<GameInfo[]>([])

    const [gameOnHero, setGameOnHero] = useState<GameInfo>()

    function bcgImgSelector() {

        if (gameOnHero!.artworks) {

            return gameOnHero!.artworks[0]

        }
        else if (gameOnHero!.screenshots) {

            return gameOnHero!.screenshots[0]

        }

        return { image_id: undefined, height: undefined }

    }

    function selectGameOnHero(data: GameInfo[], random?: boolean) {

        const arrayIndex = random ? Math.floor(Math.random() * data.length) : 0

        setGameOnHero(data[arrayIndex])

    }

    async function fetchData() {

        const data = await fetchLatestReleases()

        setReleasingThisMonth(data[0].result)
        setNotLaunch(data[1].result)
        setLaunched(data[2].result)
        setBestRatings(data[3].result)

        selectGameOnHero(data[0].result, true) // false = not random

        setLoading(false)
    }

    useEffect(() => {

        fetchData()

    }, [])

    if (loading) {
        return (
            <>
                <PageLoading />
            </>
        )
    }

    return (

        <>
            <CustomDocumentHead title="Lançamentos" />

            <ReleasesContainerBcgImg {...bcgImgSelector()} id={Styles.container}>

                <div id={Styles.content}>

                    <section id={Styles.hero}>

                        <h1>Lançamentos</h1>

                        <div id={Styles.hero_game_info}>
                            <h2>{gameOnHero!.name}</h2>

                            <p>{gameOnHero?.storyline || gameOnHero?.summary}</p>

                            {gameOnHero?.genres && (
                                <ul>
                                    {gameOnHero?.genres.map((item) => (

                                        <li key={item.slug}>
                                            <Link href={`/genre/${item.slug}`}>
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <Link
                                href={`/game/${gameOnHero!.slug}`}
                                id={Styles.game_page_link}
                            >
                                <SVG.PlusSolid height={24} /> Saber Mais
                            </Link>
                        </div>

                        <ul id={Styles.list_games_launch}>

                            {releasingThisMonth!.slice(0, 4).map((item: GameInfo) => (
                                <span key={item.id} className={Styles.card}>
                                    <CarouselItem props={item} />

                                    <h3>{item.name}</h3>

                                    <small><DateHumanReadable date={item.first_release_date} fullDate/></small>

                                </span>
                            ))}

                        </ul>

                    </section>

                    <div className={Styles.container_launchs_best_ratings}>

                        <section className={Styles.launchs_container}>

                            <div>
                                <h2>Ainda Esse Mês</h2>

                                <ul>

                                    {notLaunch.slice(0, 3).map((item) => (

                                        <CardMediumArtworkDescription props={item} />

                                    ))}

                                </ul>
                            </div>

                            <div>
                                <h2>Lançados Até Agora</h2>

                                <ul>

                                    {launched.slice(0, 5).map((item) => (

                                        <CardMediumArtworkDescription props={item} />

                                    ))}

                                </ul>
                            </div>


                        </section>

                        <section className={Styles.best_ratings_container}>

                            <h2>
                                Mais Bem Avaliados de
                                {" "}
                                {new Date().toLocaleString("default", { month: "long" }).slice(0, 1).toUpperCase()}
                                {new Date().toLocaleString("default", { month: "long" }).slice(1)}
                            </h2>

                            <p style={{ fontSize: "14px", textAlign: "center" }}>API QUEBRADA</p>

                            <ul>
                                {bestRatings.slice(0, 8).map((item) => (
                                    <GameListItem props={item} />
                                ))}
                            </ul>

                        </section>

                    </div>

                </div>

            </ReleasesContainerBcgImg>

        </>
    )

}

export default RecentLaunchs