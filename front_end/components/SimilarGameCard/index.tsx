import React from 'react'
import Styles from './SimilarGameCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import GameRating from '../GameRating'

function SimilarGameCard({ props }: { props: GameInfo | SimilarGames }) {

    let imageSrc: string = `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${props.cover.image_id}.jpg`

    return (
        <li className={Styles.card_container}>
            <Link href={`/game/${props.slug}`}>

                <Image
                    loader={() => imageSrc}
                    src={imageSrc}
                    alt={props.name}
                    width={164} height={240}
                    onError={() => {
                        imageSrc = 'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=164'
                    }}
                />

                {props.rating && (
                    <span id={Styles.rating}><GameRating props={props.rating} /></span>
                )}
            </Link>
        </li>
    )
}

export default SimilarGameCard