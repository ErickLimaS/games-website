import React from 'react'
import Styles from './GameGenreCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import ErrorImg from '../../public/img/logo/logo.png'
import GameRating from '../GameRating'

function GameGenreCard({ props }: { props: GameInfo | SimilarGames }) {

    const imageSrc: any = props.cover != undefined ? `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${props.cover.image_id}.jpg` : ErrorImg

    return (
        <li className={Styles.card_container}>
            <Link href={`/game/${props.slug}`}>

                <Image
                    loader={() => imageSrc}
                    src={imageSrc}
                    alt={props.name}
                    width={264} height={340}
                />

            </Link>
            <div className={Styles.item_info}>

                <Link href={`/game/${props.slug}`}>
                    <h5>{props.name}</h5>
                </Link>

                <div className={Styles.general_info}>

                    {props.rating && <GameRating props={props.rating} />}

                    <div className={Styles.game_companies}>

                        {props.involved_companies != undefined && (
                            <ul>
                                {props.involved_companies.slice(0, 1).map((item: { company: { slug: string, name: string } }) => (
                                    <li key={item.company.slug}>
                                        <Link href={`/companie/${item.company.slug}`}>
                                            {item.company.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <small>
                            {`${new Date(props.first_release_date * 1000).toLocaleString('default', { month: 'long' })} 
                        ${new Date(props.first_release_date * 1000).getFullYear()}`}
                        </small>

                    </div>

                </div>

                <div className={Styles.game_genres}>
                    {props.themes.slice(0, 5).map((item: { name: string, slug: string }) => (
                        <small key={item.slug}>
                            <Link href={`/genre/${item.slug}`}>{item.name}</Link>
                        </small>
                    ))}

                </div>

            </div>
        </li>
    )
}

export default GameGenreCard