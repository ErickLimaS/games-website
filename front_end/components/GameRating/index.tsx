import React from 'react'
import RatingContainer from './GameRatingStyles'

function GameRating({ props }: { props: number }) {

    return (
        <RatingContainer rating={props}>
            <p>{props?.toFixed(0) || '?'}</p>
        </RatingContainer>
    )
}

export default GameRating