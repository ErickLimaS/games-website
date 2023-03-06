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

    const [sortedType, setSortedType] = useState<string | null>(null)

    const [gamesBookmarked, setGamesBookmarked] = useState<BookmarkedGame[]>([])
    const [recentsBookmarked, setRecentsBookmarked] = useState<BookmarkedGame[]>([])

    // sets recents added to bookmarks games to array, then shows on page
    function filterRecentBookmarkedGames() {

        const dateSevenDaysAgo = (Date.now() - 7 * 24 * 60 * 60 * 1000)

        const filtered = user.bookmarks.filter(
            (item) => item.dateAdded >= dateSevenDaysAgo
        )

        if (filtered.length > 0) {

            return filtered

        }

        return []

    }

    // sort games by rating and name
    function sortByBtnEvent(option: string) {

        setSortedType(option)

        setLoading(true)

        const ratingSorted = gamesBookmarked.sort((a, b) => a.rating - b.rating)
        const nameSorted = gamesBookmarked.sort((a, b) => a.name.localeCompare(b.name))

        switch (option) {
            case 'rating_decrescent':

                setGamesBookmarked(ratingSorted.reverse())

                break

            case 'rating_crescent':

                setGamesBookmarked(ratingSorted)

                break

            case 'name_decrescent':

                setGamesBookmarked(nameSorted)

                break

            case 'name_crescent':

                setGamesBookmarked(nameSorted.reverse())

                break

            default:

                setSortedType('')

                return

        }

        setLoading(false)

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

                    {!loading && gamesBookmarked.length > 0 ? (
                        <>
                            <div id={Styles.sort_results} className={`${Styles.flex_row}`}>

                                <div className={`${Styles.flex_row}`}>
                                    <button
                                        onClick={() => sortByBtnEvent('rating_decrescent')}
                                        data-active={sortedType === 'rating_decrescent' ? true : false}
                                        className={`${Styles.flex_row}`}
                                    >
                                        <SVG.SortNumericDownAlt />
                                        Nota
                                    </button>

                                    <button
                                        onClick={() => sortByBtnEvent('rating_crescent')}
                                        data-active={sortedType === 'rating_crescent' ? true : false}
                                        className={`${Styles.flex_row}`}
                                    >
                                        <SVG.SortNumericDown />
                                        Nota
                                    </button>
                                </div>

                                <div className={`${Styles.flex_row}`}>
                                    <button
                                        onClick={() => sortByBtnEvent('name_decrescent')}
                                        data-active={sortedType === 'name_decrescent' ? true : false}
                                        className={`${Styles.flex_row}`}
                                    >
                                        <SVG.SortAlphaDown />
                                        Nome
                                    </button>

                                    <button
                                        onClick={() => sortByBtnEvent('name_crescent')}
                                        data-active={sortedType === 'name_crescent' ? true : false}
                                        className={`${Styles.flex_row}`}
                                    >
                                        <SVG.SortAlphaDownAlt />
                                        Nome
                                    </button>
                                </div>

                            </div>

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
                                                    <p><DateHumanReadable date={item.dateAdded} fullDate /></p>
                                                </div>
                                            </div>

                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (loading ? (
                        <>
                            <div className={Styles.loading_grid} >
                                <div className={Styles.loading_list_item}></div>
                                <div className={Styles.loading_list_item}></div>
                                <div className={Styles.loading_list_item}></div>
                                <div className={Styles.loading_list_item}></div>
                                <div className={Styles.loading_list_item}></div>
                                <div className={Styles.loading_list_item}></div>
                            </div>
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