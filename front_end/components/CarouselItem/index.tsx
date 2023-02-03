import React, { useId, useEffect, useState } from 'react'
import * as C from './CarouselItemStyle'
import Link from 'next/link'
import Image from 'next/image'

function CarouselItem({ props }: { props: GameInfo }) {

    const imageSrc: string = `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${props.cover.image_id}.jpg`

    return (
        <C.CarouselItem {...props.artworks}>

            <Link href={`/game/${props.slug}`} aria-label={props.name}>
                <span>
                    <div className='carousel_item_container'>
                        <Image
                            loader={() => imageSrc}
                            src={imageSrc}
                            height={120} width={90}
                            alt={props.name} />

                        <h5>{props.name}</h5>
                    </div>

                </span>
            </Link>

        </C.CarouselItem>
    )
}

export default CarouselItem