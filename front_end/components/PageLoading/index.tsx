import React from 'react'
import Styles from './PageLoading.module.css'
import Spinner1S200Px from '../../public/img/icons/Spinner1S200Px'

function PageLoading({ height }: { height?: number|string }) {
    return (
        <div id={Styles.container} role="alert" aria-busy="true" aria-label='Carregando Página'>

            <Spinner1S200Px height={height ? height : "initial"} />

        </div>
    )
}

export default PageLoading