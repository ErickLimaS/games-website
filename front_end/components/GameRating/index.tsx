import React from 'react'
import RatingContainer from './GameRatingStyles'

function GameRating({ props, size }: { props: number, size?: number }) {
    
    return (
        <RatingContainer rating={props} size={size || null} aria-label="Nota do Jogo">
            <p>{props?.toFixed(0) || '?'}</p>
        </RatingContainer>
    )
}

export default GameRating