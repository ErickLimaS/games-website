import React, { useLayoutEffect, useState } from 'react'
import { fetchGameInfo } from '../../api/IGDB'
import Styles from './GamePage.module.css'
import { BackgroundImage } from '../../styles/DynamicBcgImg'
import * as SVG from '../../public/img/icons'
import Image from 'next/image'
import ErrorImg from '../../public/img/logo/logo.png'
import Link from 'next/link'
import CustomDocumentHead from '@/components/CustomDocumentHead'
import SimilarGameCard from '@/components/SimilarGameCard'
import DateHumanReadable from '@/components/DateHumanReadable'
import GameRating from '@/components/GameRating'
import store, { RootState } from '@/store'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export default function GamePage({ game }: { game: GameInfo }) {

    const navigate = useRouter()

    const user: User = useSelector(state => (state as RootState).user)

    // gets a random number on array range of artworks, to show a random img when page is loaded
    const [backgroundImgIndex, setBackgroundImgIndex] = useState<number>(0)

    // gets the index to show the img and video to chosed ID
    const [imgSliderIndex, setImgSliderIndex] = useState<number>(0)
    const [videoSliderIndex, setVideoSliderIndex] = useState<number>(0)

    // index for the Screenshots and Videos section tab
    const [tabIndex, setTabIndex] = useState<number>(0)

    const gameCoverImgSrc: string | any = game.cover != undefined ? `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover.image_id}.jpg` : ErrorImg

    // returns the img source with the new array index when next and previous button is clicked
    function screenshotSrc(index: number) {

        return `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${game.screenshots[index].image_id}.jpg`

    }

    // returns the rating accordingly to this game ESRB
    function rating(item: AgeRating | any) {
        switch (item.rating) {
            case 6:
                return 'RP'
            case 7:
                return 'EC'
            case 8:
                return 'E'
            case 9:
                return 'E10'
            case 10:
                return 'T'
            case 11:
                return 'M'
            case 12:
                return 'AO'
            default:
                return 'não disponível'
        }

    }

    function setBackgroundToPage() {

        if (game.artworks) {
            return game.artworks[backgroundImgIndex]
        }

        else if (game.screenshots) {
            return game.screenshots[0]
        }

        return { image_id: undefined }

    }

    function addToBookmarks() {

        if (!store.getState().user.email) {

            navigate.push(`/login?redirect=game/${navigate.query.slug}`)

            return

        }

        // set game on db

    }

    useLayoutEffect(() => {

        setImgSliderIndex(0)
        setVideoSliderIndex(0)

        if (game.artworks) {
            setBackgroundImgIndex(Math.floor(Math.random() * game.artworks.length))
        }

    }, [game.artworks, game.id])

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
                                    onClick={() => addToBookmarks()}
                                    disabled={user?.loading}
                                    data-bookmarked={user?.bookmarks?.find((item: BookmarkedGame) => item.slug === game.slug) ? true : false}
                                >
                                    {user?.bookmarks?.find((item: BookmarkedGame) => item.slug === game.slug) ? (
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
                                        <p>
                                            <Link href={`/company/${game.involved_companies[0].company.slug}`}>
                                                {game.involved_companies[0].company.name}
                                            </Link>
                                        </p>
                                        <span></span>
                                    </>
                                )}
                                {game.age_ratings.find((item: AgeRating) => item.category === 1) && (
                                    <>
                                        <p>
                                            ESRB{' '}
                                            <b>
                                                {rating(game.age_ratings.find((item: AgeRating) => item.category === 1))}
                                            </b>
                                        </p>
                                        <span></span>
                                    </>
                                )}
                                {game.first_release_date && (
                                    <p>
                                        Lançamento em <DateHumanReadable date={game.first_release_date} />
                                    </p>
                                )}
                            </div>

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

                        </div>
                    </div>

                </section>

                <div id={Styles.game_details}
                    className={`${Styles.position_relative} ${Styles.position_margin_bottom} ${Styles.padding} ${Styles.background_fade}`}
                >

                    <div className={Styles.game_details_wrapper}>
                        <section id={Styles.game_info}>

                            <div>

                                <h2>Sobre</h2>

                                {game.summary && (
                                    <p>{game.summary}</p>
                                )}
                                {game.storyline && (
                                    <p>{game.storyline}</p>
                                )}

                            </div>

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
                                <button
                                    role='tab'
                                    id={Styles.screenshots_tab}
                                    onClick={() => setTabIndex(0)}
                                    aria-selected={tabIndex === 0} aria-controls={Styles.img_container}
                                >
                                    Screenshots
                                </button>
                                <button
                                    role='tab'
                                    onClick={() => setTabIndex(1)}
                                    id={Styles.videos_tab}
                                    aria-selected={tabIndex === 1} aria-controls={Styles.videos_container}
                                >
                                    Vídeos
                                </button>
                            </div>

                            {game.screenshots && (
                                <>
                                    <div id={Styles.img_container}
                                        role='tabpanel'
                                        aria-labelledby={Styles.screenshots_tab}
                                        hidden={tabIndex !== 0}
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
                                                onClick={() => setImgSliderIndex(curr => curr - 1)}
                                                aria-label='Mostrar Foto Anterior'
                                            >
                                                <SVG.NextArrow />
                                            </button>

                                            <button
                                                disabled={imgSliderIndex == (game.screenshots.length - 1)}
                                                onClick={() => setImgSliderIndex(curr => curr + 1)}
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
                                    <SimilarGameCard key={item.id} props={item} />
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