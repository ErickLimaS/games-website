import React from 'react'
import Styles from './SimilarGameCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import ErrorImg from '../../public/img/logo/logo.png'
import GameRating from '../GameRating'

function SimilarGameCard({ props }: { props: GameInfo | SimilarGames }) {

    const imageSrc: any = props.cover != undefined ? `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${props.cover.image_id}.jpg` : ErrorImg

    return (
        <li className={Styles.card_container}>
            <Link href={`/game/${props.slug}`}>

                <Image
                    loader={() => imageSrc}
                    src={imageSrc}
                    alt={props.name}
                    width={164} height={240}
                />

                {props.rating && (
                    <span id={Styles.rating}><GameRating props={props.rating} /></span>
                )}
            </Link>
        </li>
    )
}

export default SimilarGameCard