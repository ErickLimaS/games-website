import React from 'react'
import ParagraphContainer from './GameRatingStyles'

function GameRating({ props }: { props: number }) {

    return (
        <ParagraphContainer rating={props}>
            {props.toFixed(0)}
        </ParagraphContainer>
    )
}

export default GameRating