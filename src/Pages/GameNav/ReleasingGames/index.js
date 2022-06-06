import React, { useEffect, useState } from 'react'
import * as C from './styles'
import API from '../../../API/IGDB'
import { Link } from 'react-router-dom'
import { ReactComponent as SpinnerSvg } from '../../../img/svg/Spinner-1s-200px.svg'
import { ReactComponent as ChevronSvg } from '../../../img/svg/chevron-caretsvg.svg'

export default function ReleasingGames() {

  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  const [releasingGameId, setReleasingGameId] = useState()
  const [releasingLength, setReleasingLength] = useState(0)

  const [releasingIndex, setReleasingIndex] = useState(0) //Array index to aux witch image shows next

  document.title = "Releases | My Next Game"

  useEffect(() => {

    const load1 = async () => {

      const data = await API.getReleasingGames();

      setGames(data)

      setReleasingGameId(data[0].result[0].id)
      setReleasingLength(data[0].result.length)

      setLoading(false)

    }
    load1()

  }, [])

  console.log(games)
  console.log(releasingIndex)

  return (
    <C.Container>
      {loading ? (
        <div className='loading-active'>
          <SpinnerSvg />
        </div>
      )
        :
        (
          <>
            <div className='title-section'>
              <h1>Releasing This Year</h1>
            </div>

            <div className='dots-lenght-array'>
              {games[0].result.map((item, key) => (
                <span className='dot'
                  style={releasingGameId === item.id ? { backgroundColor: '#5c16c5' } : {}}
                  key={key}
                  id={item.id}
                  onClick={() => {
                    setReleasingGameId(item.id)
                  }}>{" "}</span>
              ))}
            </div>

            <C.GamesThisYear>

              <button type='button' onClick={() => {
                setReleasingGameId(games[0].result[releasingIndex].id)
                if (releasingIndex <= 0) {
                  setReleasingIndex(releasingLength)
                  if (releasingGameId === undefined) {
                    setReleasingGameId(games[0].result[releasingIndex].id)
                  }
                }
                else {
                  setReleasingIndex(releasingIndex - 1)
                  if (releasingGameId === undefined) {
                    setReleasingGameId(games[0].result[releasingIndex].id)
                  }
                }
              }}>
                <ChevronSvg style={{ transform: 'rotate(180deg)' }} />
              </button>

              <ul>
                {games[0].result.map((item, key) => (
                  <li
                    key={key}
                    id={item.id} style={item.id === releasingGameId ? { display: 'block' }
                      : { display: 'none' }}
                  >
                    <Link to={`/game/${item.slug}`} className={'showing-game-now'}>

                      <div className='bgc-img' style={
                        (item.artwork &&
                          (
                            {
                              backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_big/${item.artwork[0].image_id}.jpg)`
                            }
                          ))

                        || (item.screenshots && (
                          {
                            backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_big/${item.screenshots[0].image_id}.jpg)`
                          }
                        ))
                        || {
                          backgroundColor: `#c0c0c0`
                        }}
                      >

                        <div className='all-info'>

                          <div className='game-name'>
                            <h2>{item.name}</h2>
                          </div>

                          <div className='game-release'>
                            {item.release_dates ?
                              (<h3>Releasing on {item.release_dates[0].human}</h3>)
                              :
                              (<h3>No Releasing Date</h3>)
                            }
                            {item.platforms && (
                              <div className='game-platforms'>
                                {item.platforms.slice(0, 3).map((item, key) => (
                                  <Link to={`/platforms/${item.slug}`}>
                                    <p key={key}>{item.name}</p>
                                  </Link>
                                ))}
                              </div>
                            )}

                            {item.themes && (
                              <div className='game-themes'>
                                {item.themes.map((item, key) => (
                                  <Link to={`/genre/${item.slug}`}>
                                    <small key={key}>{item.name}</small>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <button type='button' onClick={() => {
                setReleasingGameId(games[0].result[releasingIndex].id)
                if (releasingIndex >= 0 && releasingIndex < releasingLength) {
                  setReleasingIndex(releasingIndex + 1)
                  if (releasingLength === undefined) {
                    setReleasingGameId(games[0].result[releasingIndex].id)
                  }
                }
                else {
                  setReleasingIndex(0)
                  if (releasingGameId === undefined) {
                    setReleasingGameId(games[0].result[releasingIndex].id)
                  }
                }

              }}>
                <ChevronSvg />
              </button>

            </C.GamesThisYear>

            <C.GamesReleased>

              {/* <div>
                <ul>
                  {games[1].result.map((item, key) => (
                    <p>{item.name}</p>
                  ))}
                </ul>
              </div> */}

              <div>
                <h2>Released This Year</h2>
              </div>
              <ul>
                {games[1].result.map((item, key) => (
                  <>
                    <li key={key} style={item.artworks ? {
                      backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_big/${item.artworks[0].image_id}.jpg)`
                    } : item.screenshots ? {
                      backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_big/${item.screenshots[0].image_id}.jpg)`
                    } : {
                      backgroundColor: '#c0c0c0'
                    }}>
                      <Link to={`/game/${item.slug}`}>

                        <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg`} alt={`${item.name}`}></img>

                        <div className='rating'>
                          <p style={(item.rating >= 75 && {
                              backgroundColor: 'green'
                            }) || (item.rating < 75 && item.rating > 50 && {
                              backgroundColor: '#fc3'
                            }) || (item.rating < 50 && {
                              backgroundColor: 'red'
                            })}>
                            {(item.rating).toFixed(1)}</p>
                        </div>
                        <h3>{item.name}</h3>
                      </Link>
                    </li>
                  </>
                ))}
              </ul>

            </C.GamesReleased>
          </>
        )
      }
    </C.Container >
  )
}
