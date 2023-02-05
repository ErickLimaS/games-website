import CustomDocumentHead from '@/components/CustomDocumentHead'
import PageLoading from '@/components/PageLoading'
import React, { useEffect, useState } from 'react'
import Styles from './PlatformsPage.module.css'
import { fetchPlatform } from '@/api/IGDB'
import CarouselItem from '@/components/CarouselItem'
import GameGenreCard from '@/components/GameGenreCard'
import SvgNextArrow from '@/public/img/icons/NextArrow'
import Image from 'next/image'

interface PlatformPage {

    platform: Platform,
    greatestRatings: GameInfo[],
    exclusiveGames: GameInfo[],
    moreGames: GameInfo[]

}

export default function PlatformsPage({ platformId }: { platformId: string }) {

    const [loading, setLoading] = useState<boolean>(true)

    const [platformData, setPlatformData] = useState<PlatformPage>()

    const [seeMoreBtn, setSeeMoreBtn] = useState<boolean>(false)

    const [platformVersions, setPlatformVersions] = useState<number>(0)
    const [bestRatingsIndex, setBestRatingsIndex] = useState<number>(0)
    const [latestReleasesIndex, setLatestReleasesIndex] = useState<number>(0)
    const [moreGamesIndex, setMoreGamesIndex] = useState<number>(0)

    // calculate range by index number times 4
    function sliceRange(index: number, sortSection?: string) {

        if (sortSection == 'versions') {

            if (screen.width < 680) {

                return [index, index + 1]

            }

            return [index * 3, (index + 1) * 3]
        }

        return [index * 4, (index + 1) * 4]

    }

    async function fetchData() {
        setLoading(true)
        const res = await fetchPlatform(platformId);

        setPlatformData({
            platform: res[0].result[0],
            exclusiveGames: res[1].result,
            greatestRatings: res[2].result,
            moreGames: res[3].result
        })

        setLoading(false)
    }

    const logoSrc: string | null = `https://images.igdb.com/igdb/image/upload/t_logo_med/${platformData?.platform.platform_logo.image_id}.png`

    useEffect(() => {

        fetchData()

    }, [platformId])

    if (loading === true) {
        return (
            <>
                <PageLoading />
            </>
        )
    }

    return (
        <>
            <CustomDocumentHead title={platformData?.platform.name || `Carregando`} />

            <div id={Styles.container} className={Styles.padding}>

                <div id={Styles.page_heading_container}>

                    <Image
                        loader={() => logoSrc}
                        src={logoSrc}
                        alt={platformData!.platform.name}
                        width={180} height={180}
                    />

                    <div>
                        <h1><span>{platformData?.platform.name}</span></h1>

                        {platformData?.platform.summary && (
                            <p>{platformData?.platform.summary}</p>
                        )}

                    </div>

                </div>

                {platformData?.platform.versions && (
                    <section id={Styles.platforms_versions_container}>

                        <div className={Styles.heading_container}>

                            <h2>Versões Desse Console</h2>

                            {platformData?.platform.versions.length > 3 && (
                                <div className={Styles.buttons_container}>
                                    <button
                                        disabled={platformVersions === 0}
                                        onClick={() => setPlatformVersions(curr => curr - 1)}
                                        aria-label='Anterior'
                                    >
                                        <SvgNextArrow />
                                    </button>
                                    <button
                                        disabled={platformVersions === (platformData?.platform.versions.length - 1)}
                                        onClick={() => setPlatformVersions(curr => curr + 1)}
                                        aria-label='Próximo'
                                    >
                                        <SvgNextArrow />
                                    </button>
                                </div>
                            )}

                        </div>

                        <ul data-half-visibility={seeMoreBtn}>
                            {platformData?.platform.versions.slice(sliceRange(platformVersions, 'versions')[0], sliceRange(platformVersions, 'versions')[1]).map((item: PlatformVersion) => (
                                <li key={item.id} className={Styles.platform_version_card}>

                                    <h3>{item.name}</h3>

                                    <ul>
                                        <li><span>CPU</span> {item.cpu || 'Desconhecido'}</li>
                                        <li><span>Gráfico</span> {item.graphics || 'Desconhecido'}</li>
                                        <li><span>Memória</span> {item.memory || 'Desconhecido'}</li>
                                        <li><span>Armazenamento</span> {item.storage || 'Desconhecido'}</li>
                                        <li><span>S.O.</span>{item.os || 'Desconhecido'}</li>
                                        <li><span>Mídia</span> {item.media || 'Desconhecido'}</li>
                                        <li><span>Online</span> {item.online || 'Desconhecido'}</li>
                                        <li><span>Conectividade</span> {item.connectivity || 'Desconhecido'}</li>
                                    </ul>

                                </li>
                            ))}

                        </ul>

                        <button id={Styles.show_whole_list} onClick={() => setSeeMoreBtn(!seeMoreBtn)}>
                            {seeMoreBtn ? 'Esconder a Lista' : 'Ver Lista Completa'}
                        </button>

                        {platformData?.platform.versions.length > 1 && (
                            <div className={`${Styles.buttons_container} ${Styles.mobile_button_container}`}>
                                <button
                                    disabled={platformVersions === 0}
                                    onClick={() => setPlatformVersions(curr => curr - 1)}
                                    aria-label='Anterior'
                                >
                                    <SvgNextArrow />
                                </button>
                                <button
                                    disabled={platformVersions === (platformData?.platform.versions.length - 1)}
                                    onClick={() => setPlatformVersions(curr => curr + 1)}
                                    aria-label='Próximo'
                                >
                                    <SvgNextArrow />
                                </button>
                            </div>
                        )}

                    </section>
                )}

                <section className={Styles.section_content_container}>

                    <div className={Styles.heading_container}>

                        <h2>Exclusivos do {platformData!.platform.name}</h2>

                        <div className={Styles.buttons_container}>
                            <button
                                disabled={bestRatingsIndex === 0}
                                onClick={() => setBestRatingsIndex(curr => curr - 1)}
                                aria-label='Anterior'
                            >
                                <SvgNextArrow />
                            </button>
                            <button
                                disabled={bestRatingsIndex === platformData?.greatestRatings.length}
                                onClick={() => setBestRatingsIndex(curr => curr + 1)}
                                aria-label='Próximo'
                            >
                                <SvgNextArrow />
                            </button>
                        </div>

                    </div>

                    <ul className={Styles.list_container}>

                        {platformData?.exclusiveGames.slice(sliceRange(bestRatingsIndex)[0], sliceRange(bestRatingsIndex)[1]).map((item: GameInfo) => (
                            <CarouselItem key={item.id} props={item} />
                        ))}

                    </ul>

                </section>

                <section className={Styles.section_content_container}>

                    <div className={Styles.heading_container}>

                        <h2>Os Mais Bem Avaliados</h2>

                        <div className={Styles.buttons_container}>
                            <button
                                disabled={latestReleasesIndex === 0}
                                onClick={() => setLatestReleasesIndex(curr => curr - 1)}
                                aria-label='Anterior'
                            >
                                <SvgNextArrow />
                            </button>
                            <button
                                disabled={latestReleasesIndex === platformData?.greatestRatings.length}
                                onClick={() => setLatestReleasesIndex(curr => curr + 1)}
                                aria-label='Próximo'
                            >
                                <SvgNextArrow />
                            </button>
                        </div>

                    </div>

                    <ul className={Styles.list_container}>

                        {platformData?.greatestRatings.slice(sliceRange(latestReleasesIndex)[0], sliceRange(latestReleasesIndex)[1]).map((item: GameInfo) => (
                            <GameGenreCard key={item.id} props={item} />
                        ))}

                    </ul>

                </section>

                <section className={Styles.section_content_container}>

                    <div className={Styles.heading_container}>

                        <h2>Outros Jogos do {platformData?.platform.name}</h2>

                        <div className={Styles.buttons_container}>
                            <button
                                disabled={moreGamesIndex === 0}
                                onClick={() => setMoreGamesIndex(curr => curr - 1)}
                                aria-label='Anterior'
                            >
                                <SvgNextArrow />
                            </button>
                            <button
                                disabled={moreGamesIndex === platformData?.greatestRatings.length}
                                onClick={() => setMoreGamesIndex(curr => curr + 1)}
                                aria-label='Próximo'
                            >
                                <SvgNextArrow />
                            </button>
                        </div>

                    </div>

                    <ul className={Styles.list_container}>

                        {platformData?.moreGames.slice(sliceRange(moreGamesIndex)[0], sliceRange(moreGamesIndex)[1]).map((item: GameInfo) => (
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
            platformId: query.id
        }
    }
}