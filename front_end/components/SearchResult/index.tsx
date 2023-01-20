import React from 'react'
import Styles from './SearchResult.module.css'
import Image from 'next/image'
import Link from 'next/link'
import ErrorImg from '../../public/img/logo/logo.png'

function SearchResult({ props }: { props: GameInfo }) {

    const imageSrc: any = props.cover != undefined ? `https://images.igdb.com/igdb/image/upload/t_cover_small/${props.cover.image_id}.jpg` : ErrorImg

    return (
        <li className={Styles.result_item_container}>
            <Link href={`/game/${props.slug}`}>

                <Image
                    loader={() => imageSrc}
                    src={imageSrc}
                    alt={props.name}
                    width={60} height={80}
                />

                <div className={Styles.item_info}>

                    <h5>{props.name}</h5>

                    <small>
                        {`${new Date(props.first_release_date * 1000).toLocaleString('default', { month: 'long' })} 
                        ${new Date(props.first_release_date * 1000).getFullYear()}`}
                    </small>

                </div>
            </Link>
        </li>
    )
}

export default SearchResult