import React, { useEffect, useState } from 'react'
import * as C from './styles'
import API from '../../../API/IGDB'
import { Link } from 'react-router-dom'
import { ReactComponent as SpinnerSvg } from '../../../img/svg/Spinner-1s-200px.svg'
import { ReactComponent as ChevronSvg } from '../../../img/svg/chevron-caretsvg.svg'
import ScoreRating from '../../../Components/ScoreRating/ScoreRating'

export default function ReleasingThisYear() {

  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  const [releasingGameId, setReleasingGameId] = useState()
  const [releasingLength, setReleasingLength] = useState(0)

  const [releasingIndex, setReleasingIndex] = useState(0) //Array index to aux witch image shows next

  document.title = "Releasing This Year | My Next Game"

  useEffect(() => {

    const load1 = async () => {

      const data = await API.getReleasingGames('YEAR');

      setGames(data)

      setReleasingGameId(data[0].result[0].id)
      setReleasingLength(data[0].result.length)

      setLoading(false)

    }
    load1()

  }, [])

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

            {/* dots array length */}
            {/* <div className='dots-lenght-array'>
              {games[0].result.map((item, key) => (
                <span className='dot'
                  style={releasingGameId === item.id ? { backgroundColor: '#5c16c5' } : {}}
                  key={key}
                  id={item.id}
                  onClick={() => {
                    setReleasingGameId(item.id)
                  }}>{" "}</span>
              ))}
            </div> */}

            <div className='page-title'>
              <h1>Games Releasing This Year</h1>
            </div>

            <C.HighlightedGame>

              <button type='button' onClick={() => {
                if (releasingIndex <= 0) {
                  setReleasingIndex(releasingLength)
                  setReleasingGameId(games[0].result[releasingIndex].id)
                  if (releasingGameId === undefined) {
                    setReleasingGameId(games[0].result[releasingIndex].id)
                  }
                }
                else {
                  setReleasingIndex(currIndex => currIndex - 1)
                  setReleasingGameId(games[0].result[releasingIndex].id)
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
                    id={item.id} style={item.id === releasingGameId ?
                      { display: 'block' } : { display: 'none' }}
                  >
                    <div>

                      <C.GameMapItem data={item}>

                        <div className='all-info'>

                          <Link to={`/game/${item.slug}`} className='game-name'>
                            <h2>{item.name}</h2>
                          </Link>
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

                      </C.GameMapItem>

                      <div className='game-description'>
                        {item.storyline || item.summary ?
                          (
                            <p>{item.storyline || item.summary}</p>
                          ) : (
                            <p>No Description Available</p>
                          )
                        }
                      </div>

                    </div>
                  </li>
                ))}
              </ul>

              <button type='button' onClick={() => {
                if (releasingIndex >= 0 && releasingIndex < releasingLength) {
                  setReleasingIndex(currIndex => currIndex + 1)
                  setReleasingGameId(games[0].result[releasingIndex].id)
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

            </C.HighlightedGame>

            <C.GamesReleased>

              <h1 className='second-title'>Released This Year</h1>

              <ul>
                {games[1].result.map((item, key) => (
                  <>
                    <li key={key}>

                      <img src={`//images.igdb.com/igdb/image/upload/t_cover_small/${item.cover.image_id}.png`} alt={item.name}></img>

                      <div>

                        <Link to={`/game/${item.slug}`}>
                          <h1>
                            {item.name.length > 34 ? item.name.slice(0, 34) + '...' : item.name}
                          </h1>
                        </Link>

                        <h2>{item.release_dates[0] && item.release_dates[0].human}</h2>

                      </div>

                      <h2><ScoreRating data={item} /></h2>

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
