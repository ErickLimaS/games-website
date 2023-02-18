import React from 'react'
import Styles from './AlertMessageStyle.module.css'
import * as SVG from '../../public/img/icons'

function AlertMessage(res: ServerResponse) {

    function handleNextEvent() {

        // redirects to home page
        if (res.success) {

            window.location.href = '/'

        }

        // closes message window
        divAlertMessage.remove()

    }

    const divAlertMessage = document.createElement("div");
    divAlertMessage.className = Styles.container
    divAlertMessage.role = 'alert'
    divAlertMessage.setAttribute('data-success', `${res.success}`)
    divAlertMessage.innerHTML = `
        <h1>
            ${res.success ? 'Sucesso' : `Erro ${res?.status ? res?.status : ''}`}
        </h1>

        <p>${res.message}</p>

        <button>
            ${res.success ? 'Ir para a Página Inicial' : 'Tentar Novamente'}
        </button>
    `
    divAlertMessage.getElementsByTagName(`button`)[0].addEventListener('click', handleNextEvent)

    return divAlertMessage
}

export default AlertMessage