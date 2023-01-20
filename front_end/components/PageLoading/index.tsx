import React from 'react'
import Styles from './PageLoading.module.css'
import Spinner1S200Px from '../../public/img/icons/Spinner1S200Px'

function PageLoading() {
    return (
        <div id={Styles.container} role="alert" aria-busy="true" aria-label='Carregando Página'>

            <Spinner1S200Px />

        </div>
    )
}

export default PageLoading