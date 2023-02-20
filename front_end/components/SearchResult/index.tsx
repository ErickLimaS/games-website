import React, { useState } from 'react'
import Styles from './SearchResult.module.css'
import Image from 'next/image'
import Link from 'next/link'
import GameRating from '../GameRating'
import DateHumanReadable from '../DateHumanReadable'

function SearchResult({ props }: { props: GameInfo }) {

    const [imageSrc, setImageSrc] = useState<string>(`https://images.igdb.com/igdb/image/upload/t_cover_small/${props.cover ? props.cover.image_id : 'undefined'}.jpg`)

    return (
        <li className={Styles.result_item_container}>
            <Link href={`/game/${props.slug}`}>

                <Image
                    loader={() => imageSrc}
                    src={imageSrc}
                    alt={props.name}
                    width={60} height={80}
                    onError={() => {
                        setImageSrc('https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=60')
                    }}
                />

                <div className={Styles.item_info}>

                    <h5>{props.name}</h5>

                    {props.rating && (
                        <GameRating props={props.rating} />
                    )}


                    <small>
                        {props.first_release_date ? (
                            <DateHumanReadable date={props.first_release_date} />
                        ) :
                            (
                                'Sem Data Informada'
                            )}
                    </small>

                </div>
            </Link>
        </li>
    )
}

export default SearchResult