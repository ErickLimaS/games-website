import CustomDocumentHead from '@/components/CustomDocumentHead'
import DateHumanReadable from '@/components/DateHumanReadable'
import GameRating from '@/components/GameRating'
import SimilarGameCard from '@/components/SimilarGameCard'
import { RootState } from '@/store'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Styles from './BookmarksPage.module.css'
import * as SVG from '@/public/img/icons'

function Bookmarks() {

    const user: User = useSelector((state: RootState) => state.user)
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)

    const [gamesBookmarked, setGamesBookmarked] = useState<BookmarkedGame[]>([])
    const [recentsBookmarked, setRecentsBookmarked] = useState<BookmarkedGame[]>([])

    function filterRecentBookmarkedGames() {

        const dateSevenDaysAgo = (Date.now() - 7 * 24 * 60 * 60 * 1000)

        const filtered = user.bookmarks.filter(
            // (item) => item.dateAdded >= dateSevenDaysAgo
            (item) => item.releaseDate < dateSevenDaysAgo //test
        )

        console.log(dateSevenDaysAgo, filtered)

        if (filtered.length > 0) {

            return filtered

        }

        return []

    }

    function filterByBtnEvent(option: string) {

        switch (option) {
            case 'rating_decrescent':

            case 'rating_crescent':

            case 'name_decrescent':

            case 'name_crescent':

            default:

                return

        }

    }

    useEffect(() => {

        user.loading === true && setLoading(true)

        if (user.loading === false && !user.email) {

            router.push('/login?redirect=bookmarks')

            return
        }

        if (user.loading === false) {

            setGamesBookmarked(user.bookmarks)

            setRecentsBookmarked(filterRecentBookmarkedGames())

            setLoading(false)

            return
        }

    }, [router, user])

    return (
        <>
            <CustomDocumentHead title='Jogos Marcados' />

            <div className={Styles.container}>

                <div id={Styles.page_title}>
                    <SVG.BookmarksFill aria-label='Ícone de Marcação' />
                    <h1>Jogos Marcados</h1>
                </div>

                {recentsBookmarked.length > 0 && (
                    <>
                        <h2>Adicionados recentemente</h2>

                        <ul id={Styles.added_recently} className={`${Styles.flex_row}`}>

                            {recentsBookmarked.map((item) => (
                                <SimilarGameCard key={recentsBookmarked.indexOf(item)} props={item} />
                            ))}

                        </ul>
                    </>
                )}

                <div id={Styles.bookmarked_games}>

                    {/* <div id={Styles.sort_results} className={`${Styles.flex_row}`}>

                        <div className={`${Styles.flex_row}`}>
                            <button
                                onClick={() => filterByBtnEvent('rating_decrescent')}
                                data-active={(1 + 1) == 2 ? true : false}
                                // hidden={(1 + 1) == 2 ? true : false}
                                className={`${Styles.flex_row}`}
                            >
                                <SVG.SortNumericDown />
                                Rating
                            </button>

                            <button
                                onClick={() => filterByBtnEvent('rating_crescent')}
                                data-active={(1 + 1) == 2 ? true : false}
                                // hidden={(1 + 1) == 2 ? true : false}
                                className={`${Styles.flex_row}`}
                            >
                                <SVG.SortNumericDownAlt />
                                Rating
                            </button>
                        </div>

                        <div className={`${Styles.flex_row}`}>
                            <button
                                onClick={() => filterByBtnEvent('name_decrescent')}
                                data-active={(1 + 1) == 2 ? true : false}
                                // hidden={(1 + 1) == 2 ? true : false}
                                className={`${Styles.flex_row}`}
                            >
                                <SVG.SortAlphaDown />
                                Nome
                            </button>

                            <button
                                onClick={() => filterByBtnEvent('name_crescent')}
                                data-active={(1 + 1) == 2 ? true : false}
                                // hidden={(1 + 1) == 2 ? true : false}
                                className={`${Styles.flex_row}`}
                            >
                                <SVG.SortAlphaDownAlt />
                                Nome
                            </button>
                        </div>

                    </div> */}

                    {!loading && gamesBookmarked.length > 0 ? (

                        <ul>
                            {gamesBookmarked.map((item) => (
                                <li key={gamesBookmarked.indexOf(item)} className={`${Styles.list_item}`}>

                                    <Link href={`/game/${item.slug}`}>

                                        <div className={`${Styles.card_list_item_heading} ${Styles.flex_row}`}>
                                            <Image
                                                src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${item.cover.image_id}.jpg`}
                                                alt={item.name}
                                                width={76} height={100}
                                            />

                                            <div>
                                                <h2>{item.name}</h2>

                                                <GameRating props={item.rating} size={44} />
                                            </div>

                                        </div>

                                        <div className={`${Styles.card_item_more_info} ${Styles.flex_row}`}>
                                            <div>
                                                <h3>Lançado em</h3>
                                                <p><DateHumanReadable date={item.releaseDate} fullDate /></p>
                                            </div>

                                            <div>
                                                <h3>Adicionado em</h3>
                                                <p><DateHumanReadable date={item.releaseDate} fullDate /></p>
                                            </div>
                                        </div>

                                    </Link>
                                </li>
                            ))}
                        </ul>

                    ) : (loading ? (
                        <>
                            <div className={Styles.loading_list_item}></div>
                            <div className={Styles.loading_list_item}></div>
                            <div className={Styles.loading_list_item}></div>
                            <div className={Styles.loading_list_item}></div>
                        </>
                    ) : (
                        <p>Sem jogos marcados.</p>
                    ))}
                </div>

            </div>
        </>
    )

}

export default Bookmarks