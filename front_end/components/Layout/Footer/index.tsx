import React from 'react'
import Styles from './Footer.module.css'

function Footer() {

  return (
    <footer id={Styles.container}>

      <nav id={Styles.navigation}>

        <div>
          <h5>GitHub</h5>

          <ul>
            <li><a href='https://github.com/ErickLimaS/games-website' target='_blank' rel='noreferrer'>Projeto</a></li>
            <li><a href='https://github.com/ErickLimaS' target='_blank' rel='noreferrer'>Meu Perfil</a></li>
          </ul>
        </div>

        <div>
          <h5>API</h5>

          <ul>
            <li><a href='https://api-docs.igdb.com/#about' target='_blank' rel='noreferrer'>Twitch IGBD</a></li>
          </ul>
        </div>
      </nav>

      <small>Site criado apenas para treino.</small>

    </footer>
  )
}

export default Footer