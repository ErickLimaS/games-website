import React from 'react'
import Styles from './CardStyles.module.css'
import Link from 'next/link'
import Image from 'next/image'
import DateHumanReadable from '../DateHumanReadable'

function CardMediumArtworkDescription({ props }: { props: GameInfo }) {

    let imageSrc: string = `https://images.igdb.com/igdb/image/upload/t_1080p/${props.artworks[0] && props.artworks[0].image_id}.jpg`

    return (
        <li id={Styles.card_container}>

            <Link
                href={`/game/${props.slug}`}
                aria-label={props.name}
            >
                <div className={Styles.img_container}>
                    <Image
                        loader={() => imageSrc}
                        src={imageSrc}
                        fill
                        alt={props.name}
                        onError={() => {
                            imageSrc = 'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=120'
                        }}
                    />
                </div>

                <div className={Styles.game_info}>

                    <h5>{props.name}</h5>

                    <div className={Styles.game_info_details}>
                        {props.genres.slice(0, 3).map((item => (
                            <Link href={`genre/${item.slug}`}>
                                {item.name.length > 14 ?
                                    (<small>{item.name.slice(0, 14)}...</small>) :
                                    (<small>{item.name}</small>)
                                }
                            </Link>
                        )))}
                        <small><DateHumanReadable date={props.first_release_date} /></small>
                    </div>

                    <p>{props.storyline || props.summary || "Sem Descrição Disponível."}</p>

                </div>

            </Link>

        </li>
    )
}

export default CardMediumArtworkDescription