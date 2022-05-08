import React from 'react'
import { Link } from 'react-router-dom'
import * as C from './styles'

export default function index(item) {

    console.log(item.item.cover_small_url)
    return (
        <C.Container>

            <Link to={`/game/${item.item.id}`}>
                <div className='img'>
                    <img src={item.item.cover_big_url} alt={item.item.name}></img>
                </div>
                <div className='game-details'>
                    <h1><Link to={`/game/${item.item.id}`}>{item.item.name}</Link></h1>
                    {/* <hr/>
                <h2>Released on US: {item.release_date}</h2> */}
                </div>
            </Link>

        </C.Container>
    )
}
