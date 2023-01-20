import React, { useId, useEffect, useState } from 'react'
import * as C from './CarouselItemStyle'
import Link from 'next/link'
import Image from 'next/image'
import ErrorImage from '../../public/img/logo/logo.png'

function CarouselItem({ props }: { props: GameInfo }) {

    // const id = useId()

    // const [positionState, setPositionState] = useState<any>(null)

    // function focus() {
    //     const element = document.getElementById(`${id}`)
    //     const position = element!.getBoundingClientRect();
    //     // setPositionState(position)

    //     var viewHeight = Math.max(element!.clientHeight, window.innerHeight);
    //     ;

    //     if (!(position.bottom < 0 || position.top - viewHeight >= 0)) {

    //         console.log(`${position.top - viewHeight} && ${position.bottom} `)
    //         console.log('foi' + id)

    //     }
    // }

    // useEffect(() => {
    //     focus()
    // }, [])

    return (
        <C.CarouselItem {...props.artworks}>

            <Link href={`/game/${props.slug}`} aria-label={props.name}>
                <span>{props.name}</span>
            </Link>

        </C.CarouselItem>
    )
}

export default CarouselItem