import React, { useId, useEffect, useState } from 'react'
import * as C from './CarouselItemStyle'
import Link from 'next/link'

function CarouselItem({ props }: { props: GameInfo }) {

    return (
        <C.CarouselItem {...props.artworks}>

            <Link href={`/game/${props.slug}`} aria-label={props.name}>
                <span>{props.name}</span>
            </Link>

        </C.CarouselItem>
    )
}

export default CarouselItem