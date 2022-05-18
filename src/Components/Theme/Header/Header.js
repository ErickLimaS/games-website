import React, { useRef, useState } from 'react'
import * as C from './styles'
import API from '../../../API/IGDB'
import SearchFromHeader from '../../../Components/Search/SearchFromHeader'
import { ReactComponent as SearchSvg } from '../../../img/svg/search.svg'
import { ReactComponent as ListSvg } from '../../../img/svg/list.svg'
import { ReactComponent as DotsSvg } from '../../../img/svg/three-dots.svg'
import { ReactComponent as NintendoSvg } from '../../../img/svg/nintendo-switch.svg'
import { ReactComponent as XboxSvg } from '../../../img/svg/xbox.svg'
import { ReactComponent as PlaystationSvg } from '../../../img/svg/playstation.svg'
import { ReactComponent as PcSvg } from '../../../img/svg/pc.svg'
import { ReactComponent as SpinnerSvg } from '../../../img/svg/Spinner-1s-200px.svg'
import { ReactComponent as SpinnerWhiteSvg } from '../../../img/svg/Spinner-1s-200px-white.svg'
import { Link } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {

  const [mobileClickSearch, setMobileCLickSearch] = useState(false)
  const [mobileClickMenu, setMobileCLickMenu] = useState(false)
  const [gamesSearched, setGamesSearched] = useState([])
  const [isFetch, setIsFetch] = useState(false)
  const [loading, setLoading] = useState(false)
  const searchInput = useRef('')

  const searchForGames = async (itemToBeSearched) => {
    setLoading(true)
    let data

    setTimeout(async function () {
      data = await API.getSearchResults(itemToBeSearched)

      setGamesSearched(data)
    }, 1500)


    setTimeout(function () {

      setIsFetch(true)

      setMobileCLickSearch(true)

      setLoading(false)

    }, 3000)


    console.log(data)
    console.log(gamesSearched)

    return gamesSearched

  }

  return (
    <C.Container>

      <div className='mobile-menu-dropdown'>
        <button type='button' className={mobileClickMenu === true ? 'active' : ''} onClick={() => { setMobileCLickMenu(!mobileClickMenu) }}>
          <ListSvg />
        </button>
        <div className={mobileClickMenu === true ? 'dropdown-active' : 'dropdown-not-active'}>
          <nav>
            <h1>
              <Link to={`/user/login`}>Login</Link>
            </h1>
            <h2>
              <Link to={`/platforms/`}>Platform</Link>
            </h2>
            <div className='desktop-ul-hover'>
              <ul>
                <Link to={`/platforms/ps4--1`}>
                  <li>
                    <PlaystationSvg fill='#00439C' /> <span>Playstation 4</span>
                  </li>
                </Link>
                <hr />
                <Link to={`/platforms/xboxone`}>
                  <li>
                    <XboxSvg fill='#107C10' /> <span>Xbox One</span>
                  </li>
                </Link>
                <hr />
                <Link to={`/platforms/switch`}>
                  <li>
                    <NintendoSvg fill='#E70009' /> <span>Nin. Switch</span>
                  </li>
                </Link>
                <hr />
                <Link to={`/platforms/win`}>
                  <li>
                    <PcSvg fill='#000' /> <span>PC</span>
                  </li>
                </Link>
                <hr />
                <Link to={`/platforms/others`}>
                  <li>
                    <DotsSvg fill='#000' /> <span>Others</span>
                  </li>
                </Link>
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
        <a href='/'>
          <h1>My Next Game</h1>
        </a>
      </div>

      <div className='nav-and-hover-list'>
        <nav>
          <h2>
            <Link to={`/platforms/`}>Platform</Link>
          </h2>
          <div className='desktop-ul-hover'>
            <ul>
              <Link to={`/platforms/ps4--1`}>
                <li>
                  <PlaystationSvg fill='#00439C' /> <span>Playstation 4</span>
                </li>
              </Link>
              <hr />
              <Link to={`/platforms/xboxone`}>
                <li>
                  <XboxSvg fill='#107C10' /> <span>Xbox One</span>
                </li>
              </Link>
              <hr />
              <Link to={`/platforms/switch`}>
                <li>
                  <NintendoSvg fill='#E70009' /> <span>Nin. Switch</span>
                </li>
              </Link>
              <hr />
              <Link to={`/platforms/win`}>
                <li>
                  <PcSvg fill='#000' /> <span>PC</span>
                </li>
              </Link>
              <hr />
              <Link to={`/platforms/others`}>
                <li>
                  <DotsSvg fill='#000' /> <span>Others</span>
                </li>
              </Link>
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
          <div className='input-and-button'>
            <label htmlFor='input-search-text'></label>
            <input type='text'
              id='input-search-text'
              placeholder='Ex: Tomb Raider'
              onChange={(e) => { if (e.target.value.length >= 4) setTimeout(searchForGames(e.target.value), 3000) }}
              ref={searchInput}
            ></input>
            <button type='button' onClick={() => {
              searchForGames(searchInput.current.value) && setMobileCLickMenu(false)
            }}><SearchSvg /></button>
          </div>
          <div className='search-results-mobile-2'>
            {loading === true && (
              <div className='loading'>
                <SpinnerWhiteSvg width={50} height={50} />
              </div>
            )}
            <div className='search-result'>
              {isFetch === true &&
                gamesSearched.data.map((item, key) => (
                  <SearchFromHeader item={item} key={key} />
                ))
              }
            </div>
          </div>
        </div>

      </div>

      <div className='search-input'>
        <div>
          <label htmlFor='input-search-text'></label>
          <input type='text'
            id='input-search-text'
            placeholder='Ex: Tomb Raider'
            onChange={(e) => { if (e.target.value.length >= 4) { setTimeout(searchForGames(e.target.value), 3000) } }}
            ref={searchInput}
          ></input>
          <button type='button' onClick={() => { searchForGames(searchInput.current.value) && setMobileCLickMenu(false) }}><SearchSvg /></button>
        </div>

        <div className='search-results-desktop'>
          {loading === true && (
            <div className='loading'>
              <SpinnerSvg width={50} height={50} />
            </div>
          )}
          <div className='search-result'>
            {isFetch === true &&
              <div className={mobileClickSearch === true ? 'results-active' : 'results-deactive'}>
                <button type='button' onClick={() => { setMobileCLickSearch(false) }}>X</button>
                {gamesSearched.data.map((item, key) => (
                  <SearchFromHeader item={item} key={key} />
                ))}
              </div>
            }
          </div>
        </div>
        <div className='user-login'>
          <Link to={`/user/login`}>Login</Link>
        </div>
      </div>

    </C.Container>
  )
}
