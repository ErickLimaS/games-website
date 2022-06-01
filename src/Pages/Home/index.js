import React, { useEffect, useState } from 'react'
import * as C from './styles'
import API from '../../API/IGDB'
import { Link } from 'react-router-dom'
import { ReactComponent as SpinnerSvg } from '../../img/svg/Spinner-1s-200px.svg'
import { useDispatch, useSelector } from 'react-redux'
import { userNotificationsReducer } from '../../redux/reducers/userReducers'
import { getNotifications } from '../../redux/actions/userActions'

export default function Home() {

  const [releasingThisMonth, setReleasingThisMonth] = useState([])
  const [highestRatings, setHighestRatings] = useState([])
  const [loading, setLoading] = useState(true)
  const [headingGameChose, setHeadingGameChose] = useState(Math.floor(Math.random() * 9))
  const [auxClickGamesLastMonth, setAuxClickGamesLastMonth] = useState(0)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // console.log(userInfo)

  useEffect(() => {

    document.title = 'Home | My Next Game'

    
    const load1 = async () => {

      window.scrollTo(0, 0);

      const data1 = await API.getMonthRelease();
      const data2 = await API.getLastMonthHighestRatings();
      setReleasingThisMonth(data1)
      setHighestRatings(data2)


      const loadInside = () => {
        if (data1[headingGameChose] && data2) {
          setLoading(false)
        }

        else {
          alert('api')
        }
      }
      loadInside()
    }
    load1()

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
            backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_huge/${releasingThisMonth[headingGameChose].game.artworks[0].image_id}.jpg)`,
          }) || (releasingThisMonth[headingGameChose].game.screenshots[0] && {
            backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_huge/${releasingThisMonth[headingGameChose].game.screenshots[0].image_id}.jpg)`
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
                  <Link to={`/game/${releasingThisMonth[headingGameChose].game.id}`}>{releasingThisMonth[headingGameChose].game.name}</Link>
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

            {/* <button onClick={() => {
            console.log(releasingThisMonth[0].game.artworks[0])

          }}>Console</button> */}

          </C.HeadingContent>

          <C.HighestRatingsLastMonth>

            <h2>Highest Rating From Last Month</h2>

            <div className='ratings-section'>
              <div className='ratings-text'>
                <h3>The Most Best Rated!</h3>
                <p>
                  According with the users, this is the best game of the month!
                </p>

              </div>
              <div className='ratings-games'>
                <ul>
                  <li>
                    <div className='background-image' style={highestRatings[0].game.artworks[0] ? {
                      backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_original/${highestRatings[0].game.artworks[0].image_id}.jpg)`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat'
                    } : {}}>
                      <Link to={`/game/${highestRatings[0].game.slug}`}>
                        <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${highestRatings[0].game.cover.image_id}.jpg`} alt={highestRatings[0].game.name}></img>
                        <div className='rating' style={highestRatings[0].game.rating >= 70 ? {
                          border: '4px solid green'
                        } : {
                          border: '40x solid #fc3'
                        }}>
                          {(highestRatings[0].game.rating).toFixed(1)}
                        </div>
                      </Link>
                    </div>
                    <Link to={`/game/${highestRatings[0].game.slug}`}>
                      <h4>{highestRatings[0].game.name}</h4>
                    </Link>
                  </li>
                </ul>

              </div>
            </div>



          </C.HighestRatingsLastMonth>

        </>
      )
      }
    </C.Container >
  )

}
