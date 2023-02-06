import React from 'react'
import Styles from './GameGenreCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import GameRating from '../GameRating'
import DateHumanReadable from '../DateHumanReadable'

function GameGenreCard({ props }: { props: GameInfo | SimilarGames }) {

    let imageSrc: string = `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${props.cover.image_id}.jpg`

    return (
        <li className={Styles.card_container}>
            <Link href={`/game/${props.slug}`}>

                <Image
                    loader={() => imageSrc}
                    src={imageSrc}
                    alt={props.name}
                    width={264} height={340}
                    onError={() => {
                        imageSrc = 'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=264'
                    }}
                />

            </Link>
            <div className={Styles.item_info}>

                <Link href={`/game/${props.slug}`}>
                    <h5>{props.name}</h5>
                </Link>

                <div className={Styles.general_info}>

                    {props.rating && (<GameRating props={props.rating} />)}

                    <div className={Styles.details}>

                        {props.rating_count ? (
                            <p>Mais de <span>{props.rating_count}</span> avaliações</p>
                        ) : (
                            <p>Sem avaliações de usuários</p>
                        )}

                        {props.first_release_date && (
                            <small>
                                <DateHumanReadable date={props.first_release_date} />
                            </small>
                        )}

                        {props.involved_companies != undefined && (
                            <ul>
                                {props.involved_companies.slice(0, 1).map((item: { company: { slug: string, name: string } }) => (
                                    <li key={item.company.slug}>
                                        <Link href={`/company/${item.company.slug}`}>
                                            {item.company.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                    </div>

                </div>

                {props.themes && (
                    <div className={Styles.game_genres}>
                        {props.themes.slice(0, 5).map((item: { name: string, slug: string }) => (
                            <small key={item.slug}>
                                <Link href={`/genre/${item.slug}`}>{item.name}</Link>
                            </small>
                        ))}

                    </div>
                )}

            </div>
        </li>
    )
}

export default GameGenreCard