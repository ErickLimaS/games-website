import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import * as C from './styles'
// import SERVER from '../../../API/Server-api'

export default function MyFavoriteGames() {

    const [favoriteGames, setFavoriteGames] = useState([])

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const navigate = useNavigate()

    if (!userInfo) {
        Swal.fire({
            title: 'Are you Logged In?',
            text: 'It seems you have not been logedin on our website!',
            icon: 'question',
            confirmButtonText: "I'm Logging Right Now!",
            showConfirmButton: 'true',
            confirmButtonColor: '#5c16c5',
            backdrop: 'true',
            width: '90vh',
            allowOutsideClick: 'false',
            didClose: () => {
                navigate('/user/login')
            }
        })
    }

    useEffect(() => {

        document.title = 'Loading...';

        if (userInfo) {
            document.title = `${userInfo.name}'s Favorite Games | My Next Game`;
            const load1 = async () => {

                setFavoriteGames(userInfo.favoriteGames)
            }
            load1()
        }
    }, [])
    return (
        <C.Container>

            <div className='heading-text'>

                <h1>{userInfo.name}'s Favorite Games<span></span></h1>

                <h2>This is where every game you set as "Favorite" will be displayed.</h2>

                <p>Marking a game with "Favorite" will allow you to receive a notification every time your games change their rating or any info.</p>
            </div>

            <C.Games>
                {userInfo.favoriteGames.length > 0 ? (
                    <ul>
                        {userInfo.favoriteGames.map((item, key) => (
                            <li key={key} className='game'>
                                <Link to={`/game/${item.slug}`}><img src={`${item.cover}`} alt={`${item.name} Cover`} /></Link>
                                <div className='game-name'>
                                <Link to={`/game/${item.slug}`}><h3>{item.name}</h3></Link>
                                    <Link to={`/game/${item.slug}`}>Go to Page</Link>
                                </div>
                                <div className='game-rating'>
                                    <div style={Number(item.rating) >= 75 ? {
                                        border: '4px solid green'
                                    } : {}}>
                                        <p>{Number(item.rating).toFixed(1)}</p>
                                    </div>
                                    <p>{item.totalVotes} voted</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='alert-no-games'>
                        <h3>OMG &#128561;</h3>
                        <h4>You don't have a favorite game???</h4>
                        <h5>Search for a game and mark the one you like to be displayed here.</h5>
                    </div>
                )
                }
            </C.Games>

        </C.Container>
    )
}
