import React, { useEffect, useState } from 'react'
import * as C from './styles'
import API from '../../../API/IGDB'
import { ReactComponent as SpinnerSvg } from '../../../img/svg/Spinner-1s-200px.svg'
import { Link } from 'react-router-dom'

export default function GamesRating() {

  const [loading, setLoading] = useState(true)

  const [games, setGames] = useState([])
  const [index, setIndex] = useState(Math.floor(Math.random() * 15))

  document.title = "Games Rating | My Next Game"

  useEffect(() => {

    const load = async () => {
      const data = await API.getMostPopularGames()
      setGames(data)
      setLoading(false)
    }
    load()

  }, [])

  console.log(games)
  return (
    <C.Container>

      {loading === true ?
        (
          <div className='loading-active'>
            <SpinnerSvg />
          </div>
        )
        :
        (
          <>
            <h1>Games Ratings</h1>

            <C.Heading>
              {/* {games.slice(0, 1).map((item, key) => (
                <Link to={`/game/${item.slug}`} key={key}>
                  <div className='bg-img' style={
                    (item.artwork &&
                      (
                        {
                          backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_huge/${item.artwork[0].image_id}.jpg)`
                        }
                      ))

                    || (item.screenshots && (
                      {
                        backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_huge/${item.screenshots[0].image_id}.jpg)`
                      }
                    ))
                    || {
                      backgroundColor: `#c0c0c0`
                    }}>

                    <div className='game-info'>
                      <h2>{item.name}</h2>

                      <div>
                        {item.release_dates &&
                          <p>Released on {item.release_dates[0].human}</p>
                        }
                        {item.summary &&
                          <p>{item.summary.slice(0, 250)} <Link to={`/game/${item.slug}`}><strong>...ler mais</strong></Link></p>
                        }
                        {item.total_rating &&
                          <div className='rating'>
                            <span style={item.total_rating >= 75 ? { backgroundColor: 'green' } : { backgroundColor: 'orange' }}>{(item.total_rating).toFixed(1)}</span>
                          </div>
                        }
                        {item.platforms && (
                          <div className='platforms'>
                            {item.platforms.map((item, key) => (
                              <Link to={`/platforms/${item.slug}`} key={key}>{item.name}</Link>
                            ))}
                          </div>
                        )}
                        {item.themes && (
                          <div className='themes'>
                            {item.themes.map((item, key) => (
                              <Link to={`/genres/${item.slug}`} key={key}>{item.name}</Link>
                            ))
                            }
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </Link>
              ))} */}

              <Link to={`/game/${games[index].slug}`}>
                <div className='bg-img' style={
                  (games[index].artwork &&
                    (
                      {
                        backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_huge/${games[index].artwork[0].image_id}.jpg)`
                      }
                    ))

                  || (games[index].screenshots && (
                    {
                      backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_huge/${games[index].screenshots[0].image_id}.jpg)`
                    }
                  ))
                  || {
                    backgroundColor: `#c0c0c0`
                  }}>

                  <div className='game-info'>
                    <h2>{games[index].name}</h2>

                    <div>
                      {games[index].release_dates &&
                        <p>Released on {games[index].release_dates[0].human}</p>
                      }
                      {games[index].summary &&
                        <p>{games[index].summary.slice(0, 250)} <Link to={`/game/${games[index].slug}`}><strong>...ler mais</strong></Link></p>
                      }
                      {games[index].total_rating &&
                        <div className='rating'>
                          <span style={games[index].total_rating >= 75 ? { backgroundColor: 'green' } : { backgroundColor: 'orange' }}>{(games[index].total_rating).toFixed(1)}</span>
                        </div>
                      }
                      {games[index].platforms && (
                        <div className='platforms'>
                          {games[index].platforms.map((item, key) => (
                            <Link to={`/platforms/${item.slug}`} key={key}>{item.name}</Link>
                          ))}
                        </div>
                      )}
                      {games[index].themes && (
                        <div className='themes'>
                          {games[index].themes.map((item, key) => (
                            <Link to={`/genres/${item.slug}`} key={key}>{item.name}</Link>
                          ))}</div>
                      )}
                    </div>
                  </div>

                </div>
              </Link>
              

            </C.Heading>

            <C.GamesList>
              <h2>Other Great Games</h2>

              <ul>
                {games.map((item, key) => (
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
                          <p style={item.rating >= 70 ? {
                            border: '4px solid green'
                          } : {
                            border: '40x solid #fc3'
                          }}>
                            {(item.rating).toFixed(1)}</p>
                        </div>
                        <h3>{item.name}</h3>
                      </Link>
                    </li>
                  </>
                ))}
              </ul>
            </C.GamesList>

          </>
        )

      }



    </C.Container>
  )
}
