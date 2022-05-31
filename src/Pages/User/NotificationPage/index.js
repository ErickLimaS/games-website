import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as C from './styles'

export default function NotificationPage() {

    document.title = "Notifications | My Next Game"

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo, gamesNotifications } = userLogin


    return (
        <C.Container>
            {gamesNotifications == null ?
                (

                    <div className='no-notifications'>
                        <h1>No Notifications Yet</h1>

                        <p>You will see a number next to your username next time you get a notification. :)</p>
                    </div>

                )
                :
                (
                    <>
                        <div className='heading'>
                            <h1>Your Favorite Games May Have Changed Their Rating!</h1>

                            <p>You will see a number next to your username next time you get a notification. :)</p>
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
