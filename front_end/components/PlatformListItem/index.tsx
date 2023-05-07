import Image from 'next/image'
import React, { useState } from 'react'
import Styles from "./PlatformListItem.module.css"
import Link from 'next/link'
import DateHumanReadable from '../DateHumanReadable'

function PlatformListItem({ props }: { props: Platform }) {

    const [imgSrc, setImageSrc] = useState(`https://images.igdb.com/igdb/image/upload/t_logo_med/${props.platform_logo?.image_id}.png`)

    return (

        <div className={Styles.container}>
            <Link href={`/platform/${props.id}`}>
                <div className={Styles.img_container}>
                    <Image
                        src={imgSrc}
                        alt={props.name}
                        fill
                        onError={() => {
                            setImageSrc('https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=60')
                        }}
                    />
                </div>

                <div>

                    <h5>{props.name}</h5>

                    {((props as any).versions[0] as any)?.platform_version_release_dates ? (
                        <p>Lançado em <DateHumanReadable date={((props as any).versions[0] as any)?.platform_version_release_dates[0]?.date} /></p>
                    ) : (
                        <p>Sem Informação do Lançamento</p>
                    )}

                    {props.generation ? (
                        <p>{props.generation} Geração</p>
                    ) : (
                        <p>Sem Informação da Geração</p>
                    )}

                </div>
            </Link>
        </div>
    )
}

export default PlatformListItem