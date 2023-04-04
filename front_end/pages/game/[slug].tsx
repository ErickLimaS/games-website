import React, { useEffect, useLayoutEffect, useState } from 'react'
import { fetchGameInfo } from '../../api/IGDB'
import Styles from './GamePage.module.css'
import { BackgroundImage } from '../../styles/DynamicBcgImg'
import * as SVG from '../../public/img/icons'
import Image from 'next/image'
import Link from 'next/link'
import CustomDocumentHead from '@/components/CustomDocumentHead'
import GameCoverCard from '@/components/GameCoverCard'
import DateHumanReadable from '@/components/DateHumanReadable'
import GameRating from '@/components/GameRating'
import store, { RootState } from '@/store'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { addToBookmark } from '@/api/server'
import AgeRating from '@/components/AgeRating'

export default function GamePage({ game }: { game: GameInfo }) {

    const navigate = useRouter()

    const user: User = useSelector(state => (state as RootState).user)

    const [gameBookmarked, setGameBookmarked] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    // gets a random number on array range of artworks, to show a random img when page is loaded
    const [backgroundImgIndex, setBackgroundImgIndex] = useState<number>(0)

    // index for the img and video
    const [imgSliderIndex, setImgSliderIndex] = useState<number>(0)
    const [videoSliderIndex, setVideoSliderIndex] = useState<number>(0)

    // index for the Screenshots and Videos tabs 
    const [tabIndex, setTabIndex] = useState<number>(0)

    const gameCoverImgSrc: string = `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover ? game.cover.image_id : undefined}.jpg`

    // returns the img source with the new array index when next and previous button is clicked
    function screenshotSrc(index: number) {

        return `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${game.screenshots[index].image_id}.jpg`

    }

    // manage background img, if available 
    function setBackgroundToPage() {

        if (game.artworks) {
            return game.artworks[backgroundImgIndex]
        }

        else if (game.screenshots) {
            return game.screenshots[0]
        }

        return { image_id: undefined, height: undefined }

    }

    async function addToBookmarksBtnHandler() {

        if (!store.getState().user.email) {

            navigate.push(`/login?redirect=game/${navigate.query.slug}`)

            return

        }

        setLoading(true)

        const reqBody = {
            // true = adds game, false = removes
            bookmarkThisGame: gameBookmarked ? false : true,
            game: {
                name: game.name,
                slug: game.slug,
                cover: {
                    image_id: game.cover ? game.cover.image_id : undefined,
                },
                rating: game.rating,
                releaseDate: game.first_release_date
            }
        }

        const res: ServerResponse = await store.dispatch(addToBookmark(reqBody))

        if (res.success) {
            setGameBookmarked(!gameBookmarked)
        }

        setLoading(false)

        return

    }

    const touchStartEvent = (event: React.TouchEvent<HTMLDivElement>) => {
        touchstartX = event.touches[0].clientX
    }

    const touchEndEvent = (event: React.TouchEvent<HTMLDivElement>) => {
        touchendX = event.changedTouches[0].clientX
        handleGesture()
    }

    function prevImage() {
        setImgSliderIndex(curr => curr == 0 ? (game.screenshots.length - 1) : curr - 1)
    }

    function nextImage() {
        setImgSliderIndex(curr => curr == (game.screenshots.length - 1) ? 0 : curr + 1)
    }

    // handle drag on mobile scrolling 
    let touchstartX = 0;
    let touchendX = 0;

    function handleGesture() {
        if (touchendX < touchstartX) {
            nextImage();
        }
        if (touchendX > touchstartX) {
            prevImage();
        }
    }

    // resets img and video index; sets a background to this page  
    useLayoutEffect(() => {

        setTabIndex(0)
        setImgSliderIndex(0)
        setVideoSliderIndex(0)

        if (game.artworks) {
            setBackgroundImgIndex(Math.floor(Math.random() * game.artworks.length))
        }

    }, [game.artworks, game.id])

    // sets btn as clicked when game is already bookmarked
    useEffect(() => {

        setGameBookmarked(user?.bookmarks?.find(
            (item: BookmarkedGame) => item.slug === game.slug) ? true : false
        )

    }, [game.slug, user])

    return (
        <>

            <CustomDocumentHead title={game.name} />

            <BackgroundImage {...setBackgroundToPage()} />

            <div className={Styles.container}>

                <section id={Styles.game_presentation} className={Styles.position_relative}>

                    <div id={Styles.game_name_cover} className={Styles.flex_row}>
                        <Image loader={() => gameCoverImgSrc} src={gameCoverImgSrc} alt={`${game.name} Cover`}
                            width={140} height={180}
                        />

                        <div className={`${Styles.background_fade}`}>

                            <div className={`${Styles.flex_row} ${Styles.name_button_container}`}>

                                <h1>{game.name}</h1>

                                <button id={Styles.add_game_to_bookmarks}
                                    onClick={() => addToBookmarksBtnHandler()}
                                    disabled={loading || user?.loading}
                                    data-bookmarked={gameBookmarked}
                                >
                                    {gameBookmarked ? (
                                        <SVG.StarFill
                                            aria-label='Remover dos Marcados' />
                                    ) : (
                                        <SVG.Star
                                            aria-label='Adicionar aos Marcados' />
                                    )}
                                </button>

                            </div>

                            <div id={Styles.game_heading_info} className={Styles.flex_row}>

                                <GameRating props={game.rating} size={36} />

                                {game.involved_companies && (
                                    <>
                                        <p id={Styles.company_name}>
                                            <Link
                                                href={`/company/${game.involved_companies.find((item: InvolvedCompanies) =>
                                                    item.developer == true)?.company.slug || game.involved_companies[0].company.slug}`}
                                            >
                                                {game.involved_companies.find((item: InvolvedCompanies) =>
                                                    item.developer == true)?.company.name || game.involved_companies[0].company.name}
                                            </Link>
                                        </p>
                                        <span></span>
                                    </>
                                )}
                                {game.age_ratings?.find((item: AgeRating) => item.category === 1) && (
                                    <>
                                        <p>
                                            {AgeRating(game.age_ratings.find(
                                                (item: AgeRating) => item.category === 1)
                                            )}
                                        </p>
                                        <span></span>
                                    </>
                                )}
                                {game.first_release_date && (
                                    <p>
                                        <span>Lançamento em </span><DateHumanReadable date={game.first_release_date} />
                                    </p>
                                )}

                            </div>


                            {game.price?.steam && (

                                <ul id={Styles.price_list} className={Styles.flex_row}>
                                    <li>
                                        <a
                                            href={`https://store.steampowered.com/app/${game.steamId}`}
                                            aria-label={`Ver o jogo ${game.name} na Steam`}
                                            target='_blank'
                                            rel='noreferrer'
                                        >
                                            <SVG.Steam aria-label='Logo da Steam' /> {game.price.steam.final_formatted} <span>na Steam</span>
                                        </a>
                                    </li>
                                </ul>

                            )}

                            {game.platforms && (
                                <ul id={Styles.platforms_list} className={Styles.flex_row}>
                                    {game.platforms.map((item: Platforms) => (
                                        <li key={item.slug}>
                                            <Link href={`/platforms/${item.id}`}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {game.themes && (
                                <ul id={Styles.genre_list} className={Styles.flex_row}>
                                    {game.themes.map((item: Themes) => (
                                        <li key={item.slug}>
                                            <Link href={`/genre/${item.slug}`}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {game.hltb && (

                                <ul id={Styles.how_long_list} >

                                    <li>
                                        <div>
                                            <span>Campanha</span>
                                            <div>
                                                {game.hltb.main}
                                                <span> Horas</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <span>Campanha + Extras</span>
                                            <div>
                                                {game.hltb.mainExtra}
                                                <span> Horas</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <span>100%</span>
                                            <div>
                                                {game.hltb.completionist}
                                                <span> Horas</span>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            )}
                        </div>
                    </div>

                </section>

                <div id={Styles.game_details}
                    className={`${Styles.position_relative} ${Styles.position_margin_bottom} ${Styles.padding} ${Styles.background_fade}`}
                >

                    <div className={Styles.game_details_wrapper}>
                        <section id={Styles.game_info}>

                            {(game.summary || game.storyline) && (
                                <div>

                                    <h2>Sobre</h2>

                                    {game.summary && (
                                        <p id={Styles.summary}>{game.summary}</p>
                                    )}
                                    {game.storyline && (
                                        <p id={Styles.storyline}>{game.storyline}</p>
                                    )}

                                </div>
                            )}

                            {game.game_modes && (
                                <div id={Styles.game_modes}>

                                    <h2>Modos de Jogo</h2>

                                    <ul className={Styles.flex_row}>
                                        {game.game_modes.map((item: GameModes) => (
                                            <li key={item.slug}>
                                                <Link href={`/game-mode/${item.slug}`}>
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            )}

                            {(game.expansions || game.dlcs) && (
                                <div id={Styles.game_dlcs}>

                                    <h2>DLCs Lançadas</h2>

                                    <ul>
                                        {game.expansions?.map((item: ExpansionsAndDlcs) => (
                                            <li key={item.slug}>
                                                <Link href={`/expansions/${item.slug}`}>
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                        {game.dlcs?.map((item: ExpansionsAndDlcs) => (
                                            <li key={item.slug}>
                                                <Link href={`/expansions/${item.slug}`}>
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            )}

                        </section>

                        <section id={Styles.game_photos_videos}>

                            <div
                                className={Styles.tab_button_container}
                                role='tablist'
                                aria-label='Tabela de Screenshots e Vídeos.'
                            >
                                {game.screenshots && (
                                    <button
                                        role='tab'
                                        id={Styles.screenshots_tab}
                                        onClick={() => setTabIndex(0)}
                                        aria-selected={tabIndex === 0} aria-controls={Styles.img_container}
                                    >
                                        Screenshots
                                    </button>
                                )}

                                {game.videos && (
                                    <button
                                        role='tab'
                                        onClick={() => setTabIndex(1)}
                                        id={Styles.videos_tab}
                                        aria-selected={tabIndex === 1} aria-controls={Styles.videos_container}
                                    >
                                        Vídeos
                                    </button>
                                )}
                            </div>

                            {game.screenshots && (
                                <>
                                    <div id={Styles.img_container}
                                        role='tabpanel'
                                        aria-labelledby={Styles.screenshots_tab}
                                        hidden={tabIndex !== 0}
                                        onTouchStart={(event) => touchStartEvent(event)}
                                        onTouchEnd={(event) => touchEndEvent(event)}
                                    >
                                        <Image
                                            loader={() => screenshotSrc(imgSliderIndex)}
                                            src={screenshotSrc(imgSliderIndex)}
                                            alt={`${game.name} Game Screenshot`}
                                            fill
                                        ></Image>

                                        <div className={Styles.select_img_buttons_container}>

                                            <button
                                                disabled={imgSliderIndex == 0}
                                                onClick={() => prevImage()}
                                                aria-label='Mostrar Foto Anterior'
                                            >
                                                <SVG.NextArrow />
                                            </button>

                                            <button
                                                disabled={imgSliderIndex == (game.screenshots.length - 1)}
                                                onClick={() => nextImage()}
                                                aria-label='Mostrar Próxima Foto'
                                            >
                                                <SVG.NextArrow />
                                            </button>

                                        </div>

                                        <div id={Styles.img_array_length_dots} className={Styles.flex_row}>

                                            {game.screenshots.map((item: ArtworksAndScreenshots, key: number) => (
                                                <span key={item.image_id}
                                                    data-active={imgSliderIndex == key}
                                                    onClick={() => setImgSliderIndex(key)}
                                                >
                                                </span>
                                            ))}

                                        </div>
                                    </div>
                                </>
                            )}

                            {game.videos && (
                                <>

                                    <div id={Styles.videos_container}
                                        role='tabpanel'
                                        aria-labelledby={Styles.videos_tab}
                                        hidden={tabIndex !== 1}
                                    >

                                        <iframe
                                            allowFullScreen
                                            src={`https://www.youtube.com/embed/${game.videos[videoSliderIndex].video_id}`}>
                                        </iframe>


                                        <div className={Styles.select_video_buttons_container}>

                                            <button
                                                disabled={videoSliderIndex == 0}
                                                onClick={() => setVideoSliderIndex(curr => curr - 1)}
                                                aria-label='Mostrar Vídeo Anterior'
                                            >
                                                <SVG.NextArrow />
                                            </button>

                                            <div id={Styles.videos_array_length_dots} className={Styles.flex_row}>

                                                {game.videos.map((item: Videos, key: number) => (
                                                    <span key={item.video_id}
                                                        data-active={videoSliderIndex == key}
                                                        onClick={() => setVideoSliderIndex(key)}
                                                    >
                                                    </span>
                                                ))}

                                            </div>
                                            <button
                                                disabled={videoSliderIndex == (game.videos.length - 1)}
                                                onClick={() => setVideoSliderIndex(curr => curr + 1)}
                                                aria-label='Mostrar Próxima Vídeo'
                                            >
                                                <SVG.NextArrow />
                                            </button>

                                        </div>

                                    </div>
                                </>
                            )}

                        </section>
                    </div>
                </div>

                {game.similar_games && (
                    <section id={Styles.similar_games}>
                        <div className={Styles.similar_games_wrapper}>
                            <h2>Jogos Semelhantes</h2>
                            <ul className={Styles.flex_row}>
                                {game.similar_games.map((item: SimilarGames) => (
                                    <GameCoverCard key={item.id} props={item} />
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
            </div >
        </>
    )
}

export async function getServerSideProps({ query }: any) {

    const res = await fetchGameInfo(query.slug)

    return {
        props: {
            game: res
        }
    }

}