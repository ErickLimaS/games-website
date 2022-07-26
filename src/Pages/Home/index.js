import React, { useEffect, useState } from 'react'
import * as C from './styles'
import API from '../../API/IGDB'
import { Link } from 'react-router-dom'
import { ReactComponent as SpinnerSvg } from '../../img/svg/Spinner-1s-200px.svg'
import { useSelector } from 'react-redux'
import HighestRatingsLastMonth from '../../Components/HighestRatingsLastMonth/HighestRatingsLastMonth'
import ScoreRating from '../../Components/ScoreRating/ScoreRating'

export default function Home() {

  const [releasingThisMonth, setReleasingThisMonth] = useState([])
  const [highestRatings, setHighestRatings] = useState([])
  const [gamesFromVariousGenres, setGamesFromVariousGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [headingGameChose] = useState(Math.floor(Math.random() * 9))

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {

    document.title = 'Home | My Next Game'

    window.scrollTo(0, 0);

    const load = async () => {

      const data1 = await API.getMonthRelease();
      const data2 = await API.getLastMonthHighestRatings();
      const data3 = await API.getGamesFromTheseGenres();
      setReleasingThisMonth(data1)
      setHighestRatings(data2)
      setGamesFromVariousGenres(data3)

      //wait data to be fetched to turn off loading
      const loadInside = () => {
        if (data1[headingGameChose] && data2) {
          setLoading(false)
        }
      }
      loadInside()
    }
    load()

  }, [])

  return (
    <C.Container>
      {loading === true ? (
        <div className='loading-active'>
          <SpinnerSvg />
        </div>
      ) : (

        <>
          <div className='mobile-website-heading'>
            <h1>What will be your Next Game?</h1>
            <h2>See the new releases and pick the one who will entertain you the most!</h2>
          </div >
          <C.HeadingContent style={(releasingThisMonth[headingGameChose].game.artworks && {
            backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_1080p/${releasingThisMonth[headingGameChose].game.artworks[0].image_id}.jpg)`,
          }) || (releasingThisMonth[headingGameChose].game.screenshots[0] && {
            backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_1080p/${releasingThisMonth[headingGameChose].game.screenshots[0].image_id}.jpg)`
          }) || {
            backgroundColor: '#c0c0c0'
          }}>

            <div className='desktop-website-heading'>
              <h1>What will be your Next Game?</h1>
              <h2>See the new releases and pick the one who will entertain you the most!</h2>
            </div>

            <div className='info-game-to-be-released'>
              {releasingThisMonth[headingGameChose].game.release_dates[0] && (
                <h2 className=''>Releasing this Month</h2>
              )}
              <div>
                <h3>
                  <Link to={`/game/${releasingThisMonth[headingGameChose].game.slug}`}>{releasingThisMonth[headingGameChose].game.name}</Link>
                </h3>
                {releasingThisMonth[headingGameChose].game.themes &&
                  <ul>
                    {releasingThisMonth[headingGameChose].game.themes.map((item, key) => (
                      <li key={key}>{item.name}</li>
                    ))
                    }
                  </ul>
                }
                {releasingThisMonth[headingGameChose].game.release_dates[0] &&
                  <h3>{releasingThisMonth[headingGameChose].game.release_dates[0].human}
                    {releasingThisMonth[headingGameChose].game.release_dates[0].region === 1 && ', Europe'}
                    {releasingThisMonth[headingGameChose].game.release_dates[0].region === 2 && ', North America'}
                    {releasingThisMonth[headingGameChose].game.release_dates[0].region === 5 && ', Japan'}
                    {releasingThisMonth[headingGameChose].game.release_dates[0].region === 8 && ', WorldWide'}
                    {releasingThisMonth[headingGameChose].game.release_dates[0].region === 10 && ', Brazil'}

                  </h3>

                }

                <Link className='a-tag-button-style' to={`/game/${releasingThisMonth[headingGameChose].game.slug}`}>More Info</Link>
              </div>
            </div>

          </C.HeadingContent>

          {highestRatings.length !== 0 && (
            <C.HighestRatingsLastMonth highestRatings={highestRatings}>

              <h1>Highest Rating From Last Month</h1>

              <div className='ratings-section'>

                <div className='game-highest-rated'>


                  <img
                    src={`//images.igdb.com/igdb/image/upload/t_cover_big/${highestRatings[0].game.cover.image_id}.jpg`}
                    alt={highestRatings[0].game.name + `Cover Art`}>
                  </img>

                  <div className='game-info'>

                    <div className='name-and-score'>
                      <Link to={`/game/${highestRatings[0].game.slug}`}>
                        <h2>{highestRatings[0].game.name}</h2>
                      </Link>
                      <ScoreRating data={highestRatings[0].game} />
                    </div>

                    {highestRatings[0].game.summary && (

                      <p>{highestRatings[0].game.summary.slice(0, 420)}</p>

                    )}

                    {highestRatings[0].game.release_dates && (

                      <span>{highestRatings[0].game.release_dates[0].human}</span>

                    )}
                    <div className='themes'>
                      <ul>
                        {highestRatings[0].game.themes && (

                          highestRatings[0].game.themes.slice(0, 6).map((item, key) => (
                            <li key={key}>{item.name}</li>
                          ))

                        )}
                      </ul>
                    </div>

                  </div>

                </div>

                <div className='ratings-games'>
                  <h2>Other With High Ratings</h2>

                  <ul>
                    {highestRatings.slice(1, highestRatings.length).map((item, key) => (

                      <li key={key}>

                        <HighestRatingsLastMonth data={item.game} />

                      </li>

                    ))}
                  </ul>
                </div>

                {gamesFromVariousGenres != null && (
                  <>
                    <div className='games-from-genre'>
                      <h2>{gamesFromVariousGenres[0].name}</h2>

                      <ul>
                        {gamesFromVariousGenres[0].result.map((item, key) => (

                          <li key={key}>

                            <HighestRatingsLastMonth data={item} />

                          </li>

                        ))}
                      </ul>
                    </div>

                    <div className='games-from-genre'>
                      <h2>{gamesFromVariousGenres[1].name}</h2>

                      <ul>
                        {gamesFromVariousGenres[1].result.map((item, key) => (

                          <li key={key}>

                            <HighestRatingsLastMonth data={item} />

                          </li>

                        ))}
                      </ul>
                    </div>

                    <div className='games-from-genre'>
                      <h2>{gamesFromVariousGenres[2].name}</h2>

                      <ul>
                        {gamesFromVariousGenres[2].result.map((item, key) => (

                          <li key={key}>

                            <HighestRatingsLastMonth data={item} />

                          </li>

                        ))}
                      </ul>
                    </div>
                  </>
                )}

              </div>
            </C.HighestRatingsLastMonth>
          )}

        </>
      )
      }
    </C.Container >
  )

}
