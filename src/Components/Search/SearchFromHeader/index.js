import React from 'react'
import { Link } from 'react-router-dom'
import * as C from './styles'

export default function index(item) {

    return (
        <C.Container>

            <Link to={`/game/${item.item.slug}`}>
                <div className='img'>
                    {item.item.cover === undefined ? (<img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' alt='Não Disponível'></img>) : (<img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${item.item.cover.image_id}.jpg`} alt={item.item.name}></img>)}

                </div>
                <div className='game-details'>
                    {item.item.id && item.item.name && <h1><Link to={`/game/${item.item.slug}`}>{item.item.name}</Link></h1>}
                    {item.item.release_dates && <p>Released on: {item.item.release_dates[0].human}</p>}
                    <Link to={`game/${item.item.slug}`}>Go to Page</Link>
                </div>
            </Link>

        </C.Container>
    )
}
