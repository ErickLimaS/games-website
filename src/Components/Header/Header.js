import React, { useState } from 'react'
import * as C from './styles'
import { ReactComponent as SearchSvg } from '../../img/svg/search.svg'
import { ReactComponent as ListSvg } from '../../img/svg/list.svg'

export default function Header() {

  const [mobileClickSearch, setMobileCLickSearch] = useState(false)
  const [mobileClickMenu, setMobileCLickMenu] = useState(false)

  return (
    <C.Container>

      <div className='mobile-menu-dropdown'>
        <button type='button' className={mobileClickMenu === true ? 'active' : ''} onClick={() => { setMobileCLickMenu(!mobileClickMenu) }}>
          <ListSvg />
        </button>
        <div className={mobileClickMenu === true ? 'dropdown-active' : 'dropdown-not-active'}>
          <nav>
            <h2>
              <a href='#'>Platform</a>
            </h2>
            <div className='desktop-ul-hover'>
              <ul>
                <a href='#'>
                  <li>
                    <i></i>Playstation
                  </li>
                </a>
                <hr />
                <a href='#'>
                  <li>
                    <i></i>Xbox
                  </li>
                </a>
                <hr />
                <a href='#'>
                  <li>
                    <i></i>Nintendo
                  </li>
                </a>
                <hr />
                <a href='#'>
                  <li>
                    <i></i>PC
                  </li>
                </a>
                <hr />
                <a href='#'>
                  <li>
                    <i></i>Others
                  </li>
                </a>
              </ul>
            </div>
          </nav>
          <nav>
            <h2><a href='#'>Games</a></h2>
            <div className='desktop-ul-hover'>
              <ul>
                <a href='#'>
                  <li>
                    <i></i>New Releases
                  </li>
                </a>
                <hr />
                <a href='#'>
                  <li>
                    <i></i>Released This Year
                  </li>
                </a>
                <hr />
                <a href='#'>
                  <li>
                    <i></i>Most Populars
                  </li>
                </a>
                <hr />
                <a href='#'>
                  <li>
                    <i></i>Games Rating
                  </li>
                </a>
              </ul>
            </div>
          </nav>
          <nav>
            <h2><a href='#'>Genres</a></h2>
            <div className='desktop-ul-hover'>
              <ul>
                <a href='#'>
                  <li>
                    <i></i>Action
                  </li>
                </a>
                <hr />
                <a href='#'>
                  <li>
                    <i></i>Shooter
                  </li>
                </a>
                <hr />
                <a href='#'>
                  <li>
                    <i></i>Sports
                  </li>
                </a>
                <hr />
                <a href='#'>
                  <li>
                    <i></i>Racing
                  </li>
                </a>
                <hr />
                <a href='#'>
                  <li>
                    <i></i>More...
                  </li>
                </a>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className='header-company-name'>
        <a href='#'>
          <h1>My Next Game</h1>
        </a>
      </div>

      <div className='nav-and-hover-list'>
        <nav>
          <h2>
            <a href='#'>Platform</a>
          </h2>
          <div className='desktop-ul-hover'>
            <ul>
              <a href='#'>
                <li>
                  <i></i>Playstation
                </li>
              </a>
              <hr />
              <a href='#'>
                <li>
                  <i></i>Xbox
                </li>
              </a>
              <hr />
              <a href='#'>
                <li>
                  <i></i>Nintendo
                </li>
              </a>
              <hr />
              <a href='#'>
                <li>
                  <i></i>PC
                </li>
              </a>
              <hr />
              <a href='#'>
                <li>
                  <i></i>Others
                </li>
              </a>
            </ul>
          </div>
        </nav>
        <nav>
          <h2><a href='#'>Games</a></h2>
          <div className='desktop-ul-hover'>
            <ul>
              <a href='#'>
                <li>
                  <i></i>New Releases
                </li>
              </a>
              <hr />
              <a href='#'>
                <li>
                  <i></i>Released This Year
                </li>
              </a>
              <hr />
              <a href='#'>
                <li>
                  <i></i>Most Populars
                </li>
              </a>
              <hr />
              <a href='#'>
                <li>
                  <i></i>Games Rating
                </li>
              </a>
            </ul>
          </div>
        </nav>
        <nav>
          <h2><a href='#'>Genres</a></h2>
          <div className='desktop-ul-hover'>
            <ul>
              <a href='#'>
                <li>
                  <i></i>Action
                </li>
              </a>
              <hr />
              <a href='#'>
                <li>
                  <i></i>Shooter
                </li>
              </a>
              <hr />
              <a href='#'>
                <li>
                  <i></i>Sports
                </li>
              </a>
              <hr />
              <a href='#'>
                <li>
                  <i></i>Racing
                </li>
              </a>
              <hr />
              <a href='#'>
                <li>
                  <i></i>More...
                </li>
              </a>
            </ul>
          </div>
        </nav>
      </div>
      <div className='mobile-search'>

        <button id='header-button-mobile' className={mobileClickSearch === true ? 'active' : ''} type='button' onClick={() => { setMobileCLickSearch(!mobileClickSearch) }}>
          <SearchSvg /> <span>Procurar</span>
        </button>

        <div className={mobileClickSearch === true ? 'mobile-input active' : 'mobile-input'}>
          <label htmlFor='input-search-text'></label>
          <input type='text' id='input-search-text' placeholder='Ex: Tomb Raider'></input>
          <button type='button'><SearchSvg /></button>
        </div>

      </div>

      <div className='search-input'>

        <label htmlFor='input-search-text'></label>
        <input type='text' id='input-search-text' placeholder='Ex: Tomb Raider'></input>
        <button type='button'><SearchSvg /></button>

      </div>

    </C.Container>
  )
}
