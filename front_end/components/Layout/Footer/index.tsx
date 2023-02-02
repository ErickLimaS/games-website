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
            <li><a href='https://api-docs.igdb.com/#about' target='_blank' rel='noreferrer'>Twitch IGDB</a></li>
          </ul>
        </div>

        <div>
          <h5>Inspiração</h5>

          <ul>
            <li>
              <a href='https://www.behance.net/gallery/154892909/Steam-Website-UI-Redesign-Desktop-and-Mobile?tracking_source=search_projects_recommended%7Cgaming+website' target='_blank' rel='noreferrer'>
                Home Page By Chronic Studio
              </a>
            </li>
            <li>
              <a href='https://dribbble.com/shots/2355968-Steam-Redesign-Game-Store-Page#' target='_blank' rel='noreferrer'>
                Game Page By Matt Preston
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <small>Site criado apenas para treino.</small>

    </footer>
  )
}

export default Footer