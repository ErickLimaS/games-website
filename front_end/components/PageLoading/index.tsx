import React, { useEffect } from 'react'
import Styles from './PageLoading.module.css'
import Spinner1S200Px from '../../public/img/icons/Spinner1S200Px'

function PageLoading({ height }: { height?: number | string }) {

    useEffect(() => {
        setTimeout(warningLoadingTime, 4000)
    }, ([]))

    // shows user a message about the slow loading time
    function warningLoadingTime() {
        document.getElementById(Styles.container)!.insertAdjacentHTML('beforeend',
            `<div id=${Styles.warning_phrase}>
                <p>Due to the back end using the free tier on render.com, it takes some time to load. <span>From 30s up to 2min</span>. It needs some pacience...</p>
                <p>Pelo fato de estar usando o plano gratis da render.com para o back end, ele leva um tempo para carregar. <span>Pode levar de 30s até 2min</span>. Precisa ter paciência...</p>
            </div >`)

    }

    return (
        <div id={Styles.container} role="alert" aria-busy="true" aria-label='Carregando Página'>

            <Spinner1S200Px height={height ? height : "initial"} />


        </div>
    )
}

export default PageLoading