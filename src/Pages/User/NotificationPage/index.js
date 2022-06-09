import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateFavoriteGames } from '../../../redux/actions/userActions'
import * as C from './styles'

export default function NotificationPage() {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo, gamesNotifications, error, loading } = userLogin

    let newGames
    // to be dispatch to server
    if (gamesNotifications) {
        newGames = gamesNotifications.map((item) => {
            return {
                id: `${item.id}`,
                name: `${item.name}`,
                slug: `${item.slug}`,
                cover: `${item.cover}`,
                rating: `${item.newRating}`,
                totalVotes: `${item.newRating_count}`
            }
        })
    }
    const dispatch = useDispatch()

    const handleEmptyNotifications = () => {

        dispatch(updateFavoriteGames(newGames, userInfo))
        localStorage.removeItem('gamesNotifications')
    }

    if (gamesNotifications) {
        document.title = `${gamesNotifications.length} Notifications | My Next Game`
    }
    else {
        document.title = `Notifications | My Next Game`
    }
    return (
        <C.Container item={gamesNotifications}>
            {gamesNotifications == null || gamesNotifications === undefined ?
                (

                    <div className='no-notifications'>
                        <h1>There's no Notifications</h1>

                        <p>You will see a number next to your username next time you get a notification. &#128516;</p>
                    </div>

                )
                :
                (
                    <>
                        <div className='heading'>
                            <h1>Your Favorite Games May Have Changed Their Rating!</h1>

                            <p>There is {gamesNotifications.length} update{gamesNotifications.length > 1 && 's'}.</p>

                            <button type='button' onClick={() => {
                                handleEmptyNotifications()
                            }}>
                                Clear Notifications
                            </button>
                            {loading && <p>loading...</p>}
                            {error && <p>{error}</p>}
                        </div>
                        <C.Notifications>

                            {gamesNotifications.map((item, key) => (
                                <C.Games key={key} item={item}>
                                    <Link to={`/game/${item.slug}`}>
                                        <img src={`${item.cover}`} alt={`${item.name}`}></img>
                                    </Link>
                                    <Link to={`/game/${item.slug}`}>
                                        <h3>{item.name}</h3>
                                    </Link>
                                    <div className='comparing-rating'>
                                        <div className='rating'>
                                            <h4>Previous Rating</h4>
                                            <div className='previous-rating'>
                                                <p>{Number(item.olderRating).toFixed(1)}</p>
                                            </div>
                                            <p><strong>{item.olderRating_count}</strong> votes</p>
                                        </div>
                                        <div className='rating'>
                                            <h4>New Rating</h4>
                                            <div className='new-rating'>
                                                <p>{Number(item.newRating).toFixed(1)}</p>
                                            </div>
                                            <p><strong>{item.newRating_count}</strong> votes</p>
                                        </div>
                                    </div>
                                    <Link to={`/game/${item.slug}`} className='button'>See Page</Link>
                                </C.Games>
                            ))}


                        </C.Notifications>
                    </>
                )
            }
        </C.Container>
    )
}
