import React from 'react'
import { Link } from 'react-router-dom'
import ScoreRating from '../ScoreRating/ScoreRating'
import * as C from './styles'

export default function HighestRatingsLastMonth({ data }) {

  return (
    <C.Container data={data}>
      <>
        <div>
          <Link to={`/game/${data.slug}`}>
            {data.cover && (<img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${data.cover.image_id}.jpg`} alt={data.name + ` Cover Art`}></img>)}
            <div className='rating'>
              <ScoreRating data={data} />
            </div>
          </Link>
        </div>
        {/* <Link className='link' to={`/game/${data.game.slug}`}>
          {data.game.name}
        </Link> */}
      </>
    </C.Container >
  )
}