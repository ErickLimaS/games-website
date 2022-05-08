import React from 'react'
import * as C from './styles'

export default function Footer() {
  return (
    <C.Container>
      <div className='about'>
        <div>
          <nav>
            <ul>
              <li><a href='https://erick-lima.netlify.app/' target='_blank' rel='noreferrer'>
                Meu Portfólio
              </a></li>
              <li><a href='https://github.com/ErickLimaS' target='_blank' rel='noreferrer'>
                Github
              </a></li>
              <li><a href='https://api-docs.igdb.com/' target='_blank' rel='noreferrer'>
                API Usada
              </a></li>
            </ul>
          </nav>
        </div>
        <div className='disclaimer'>
          <h5>Site usando a IGDB API, operada pela Twitch.</h5>
        </div>
      </div>
      <div>
        <small>Site para o Portfólio de <a href='https://erick-lima.netlify.app/' target='_blank' rel='noreferrer'>Erick Lima</a>.</small>
      </div>
    </C.Container>
  )
}
