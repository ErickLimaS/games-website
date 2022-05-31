import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
import { ReactComponent as PersonCircleSvg } from '../../../img/svg/person-circle.svg'
import { ReactComponent as StarSvg } from '../../../img/svg/star.svg'
import { ReactComponent as BoxArrowLeftSvg } from '../../../img/svg/box-arrow-left.svg'
import { ReactComponent as BoxArrowRightSvg } from '../../../img/svg/box-arrow-in-right.svg'
import { ReactComponent as CaretDownSvg } from '../../../img/svg/caret-down-fill.svg'
import { ReactComponent as CaretUpSvg } from '../../../img/svg/caret-up-fill.svg'
import { ReactComponent as BellSvg } from '../../../img/svg/bell.svg'
import { ReactComponent as BellFillSvg } from '../../../img/svg/bell-fill.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications, logout } from '../../../redux/actions/userActions'

export default function Header() {

  const [mobileClickSearch, setMobileCLickSearch] = useState(false)
  const [mobileClickMenu, setMobileCLickMenu] = useState(false)
  const [mobileClickUser, setMobileCLickUser] = useState(false)

  const [gamesSearched, setGamesSearched] = useState([])
  const [gamesToObserveRating, setGamesToObserveRating] = useState([])
  const [notifications, setNotifications] = useState(0)

  const [isFetch, setIsFetch] = useState(false)
  const [loading, setLoading] = useState(false)

  const searchInput = useRef('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useLayoutEffect(() => {
    if (userInfo) {
      if ((userInfo.favoriteGames).length > 0) {

        const qtdFavGames = userInfo.favoriteGames.map((item) => {
          return item.id
        })

        const load1 = async () => {
          const data = await API.compareRatings(qtdFavGames)
          console.log(data)

          setGamesToObserveRating(data)
        }
        load1()

      }
    }

  }, [userInfo])


  // compare games rating
  useEffect(() => {
    const load2 = () => {

      let comparingRatings = []

      if (userInfo) {
        for (let i = 0; i < (userInfo.favoriteGames).length; i++) {

          // eslint-disable-next-line array-callback-return
          gamesToObserveRating.map((item) => {
            if (Number(item.id) === Number(userInfo.favoriteGames[i].id)) {

              if (Number(item.rating) !== Number(userInfo.favoriteGames[i].rating)) {
                setNotifications(notifications + 1)
                return comparingRatings.push(
                  {
                    name: item.name,
                    slug: item.slug,
                    id: item.id,
                    newRating: item.rating,
                    olderRating: userInfo.favoriteGames[i].rating,
                    newRating_count: item.rating_count,
                    olderRating_count: userInfo.favoriteGames[i].totalVotes,
                    cover: userInfo.favoriteGames[i].cover
                  }
                )
              }
              else {
                return console.log('rating nao');
              }
            }
            else {
              return console.log('id nao');
            }
          })

        }
        if (comparingRatings.length > 0) {
          // dispatch new game info to redux and display on Notification Page 
          dispatch(getNotifications(comparingRatings))
        }
        console.log(comparingRatings)
      }
    }
    load2()
  }, [gamesToObserveRating])

  // search feature
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

  // logout
  const logoutUser = (e) => {
    e.preventDefault()
    dispatch(logout())
    document.location.reload()
  }


  return (
    <C.Container>

      <div className='mobile-menu-dropdown'>
        <button type='button' className={mobileClickMenu === true ? 'active' : ''} onClick={() => { setMobileCLickMenu(!mobileClickMenu) }}>
          <ListSvg />
        </button>
        <div className={mobileClickMenu === true ? 'dropdown-active' : 'dropdown-not-active'}>
          <nav>
            <C.User>
              {userInfo ? (
                <>
                  <div className='user-name-and-caret' onClick={() => { setMobileCLickUser(!mobileClickUser) }}>
                    <h2 to={`/user/profile`} ><PersonCircleSvg /> {userInfo.name}{notifications > 0 && <span>{notifications}</span>}</h2>
                    {mobileClickUser === false && <CaretDownSvg />}
                    {mobileClickUser === true && <CaretUpSvg />}
                  </div>
                  <div className={mobileClickUser === true ? 'dropdown active' : 'dropdown deactive'}>
                    <ul>
                      {notifications > 0 ?
                        (
                          <li onClick={() => { setMobileCLickUser(!mobileClickUser) }}>
                            <Link to={`/user/notifications`} ><BellFillSvg /> Notifications <span>{notifications}</span></Link>
                          </li>
                        )
                        :
                        (
                          <li onClick={() => { setMobileCLickUser(!mobileClickUser) }}>
                            <Link to={`/user/notifications`} ><BellSvg /> Notifications</Link>
                          </li>
                        )
                      }
                      <li onClick={() => { setMobileCLickMenu(!mobileClickMenu) }}>
                        <Link to={`/user/profile`}><PersonCircleSvg /> Profile</Link>
                      </li>
                      <li onClick={() => { setMobileCLickMenu(!mobileClickMenu) }}>
                        <Link to={`/user/my-favorite-games`}><StarSvg />Marked Games</Link>
                      </li>
                      <li>
                        <Link to={`/user/signout`} onClick={logoutUser}><BoxArrowLeftSvg />Sign Out</Link>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className='login'>
                  <Link to={`/user/login`} onClick={() => { setMobileCLickMenu(!mobileClickMenu) }}><BoxArrowRightSvg />Login</Link>
                </div>
              )}
            </C.User>
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
            <h2>
              <Link to={`/games`}>Games</Link>
            </h2>
            <div className='desktop-ul-hover'>
              <ul>
                <Link to={`/games/releases`}>
                  <li>
                    Releases
                    {/* <PlusSvg /> New Releases */}
                  </li>
                </Link>
                <hr />
                <Link to={`/games/ratings`}>
                  <li>
                    Games Rating
                    {/* <StarSvg /> Games Rating */}
                  </li>
                </Link>
              </ul>
            </div>
          </nav>
          <nav>
            <h2>
              <Link to={'/genre/'}>Genres</Link>
            </h2>
            <div className='desktop-ul-hover'>
              <ul>
                <Link to={'/genre/adventure'}>
                  <li>
                    <i></i>Adventure
                  </li>
                </Link>
                <hr />
                <Link to={'/genre/shooter'}>
                  <li>
                    <i></i>Shooter
                  </li>
                </Link>
                <hr />
                <Link to={'/genre/sport'}>
                  <li>
                    <i></i>Sports
                  </li>
                </Link>
                <hr />
                <Link to={'/genre/racing'}>
                  <li>
                    <i></i>Racing
                  </li>
                </Link>
                <hr />
                <Link to={'/genre/'}>
                  <li>
                    <i></i>More...
                  </li>
                </Link>
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
          <h2>
            <Link to={`/games`}>Games</Link>
          </h2>
          <div className='desktop-ul-hover'>
            <ul>
              <Link to={`/games/releases`}>
                <li>
                  Releases
                  {/* <PlusSvg /> New Releases */}
                </li>
              </Link>
              <hr />
              <Link to={`/games/ratings`}>
                <li>
                  Games Rating
                  {/* <StarSvg /> Games Rating */}
                </li>
              </Link>
            </ul>
          </div>
        </nav>
        <nav>
          <h2>
            <Link to={`/genre/`}>Genres</Link>
          </h2>
          <div className='desktop-ul-hover'>
            <ul>
              <Link to={'/genre/adventure'}>
                <li>
                  <i></i>Adventure
                </li>
              </Link>
              <hr />
              <Link to={'/genre/shooter'}>
                <li>
                  <i></i>Shooter
                </li>
              </Link>
              <hr />
              <Link to={'/genre/sport'}>
                <li>
                  <i></i>Sports
                </li>
              </Link>
              <hr />
              <Link to={'/genre/racing'}>
                <li>
                  <i></i>Racing
                </li>
              </Link>
              <hr />
              <Link to={'/genre/'}>
                <li>
                  <i></i>More...
                </li>
              </Link>
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
            <label htmlFor='mobile-input-search-text'></label>
            <input type='text'
              id='mobile-search-text'
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
                <button type='button' onClick={() => { setMobileCLickSearch(false) }}>Close</button>
                {gamesSearched.data.map((item, key) => (
                  <SearchFromHeader item={item} key={key} />
                ))}
              </div>
            }
          </div>
        </div>
        <C.User>
          {userInfo ? (
            <>
              <div className='user-name-and-caret-desktop' onClick={() => { setMobileCLickUser(!mobileClickUser) }}>
                {notifications > 0 && <span>{notifications}</span>}
                <h3>{userInfo.name}</h3>
                {mobileClickUser === true && <CaretDownSvg />}
                {mobileClickUser === false && <CaretUpSvg />}
              </div>

              <div className={mobileClickUser === true ? 'dropdown desktop desk-active' : 'dropdown desktop'}>
                <ul>
                  {notifications > 0 ?
                    (
                      <li onClick={() => { setMobileCLickUser(!mobileClickUser) }}>
                        <Link to={`/user/notifications`} ><BellFillSvg /> Notifications <span>{notifications}</span></Link>
                      </li>
                    )
                    :
                    (
                      <li onClick={() => { setMobileCLickUser(!mobileClickUser) }}>
                        <Link to={`/user/notifications`} ><BellSvg /> Notifications</Link>
                      </li>
                    )
                  }
                  <li onClick={() => { setMobileCLickUser(!mobileClickUser) }}>
                    <Link to={`/user/profile`} ><PersonCircleSvg /> Profile</Link>
                  </li>
                  <li onClick={() => { setMobileCLickUser(!mobileClickUser) }}>
                    <Link to={`/user/my-favorite-games`}><StarSvg /> Marked Games</Link>
                  </li>
                  <li onClick={() => { setMobileCLickUser(!mobileClickUser) }}>
                    <Link to={`/user/signout`} onClick={logoutUser}><BoxArrowLeftSvg /> Sign Out</Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to={`/user/login`}>Login</Link>
          )}
        </C.User>
      </div>

    </C.Container >
  )
}
