import React, { useEffect, useState } from 'react'
import * as C from './styles'
import API from '../../API/IGDB'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as SpinnerSvg } from '../../img/svg/Spinner-1s-200px.svg'
import { ReactComponent as StarSvg } from '../../img/svg/star.svg'
import { ReactComponent as StarFillSvg } from '../../img/svg/star-fill.svg'
import { useDispatch, useSelector } from 'react-redux'
import { favoriteGame, removeFavoriteGame } from '../../redux/actions/userActions'
import bg_img from '../../img/bg-gaming.jpg'

export default function GamePage() {

  const [gameInfo, setGameInfo] = useState([])
  const [isFetch, setIsFetch] = useState(false)
  const [loading, setLoading] = useState(true)
  const [readMore, setReadMore] = useState(false) // set click to read more of description
  const [indexGameDetails, setIndexGameDetails] = useState(0)
  const [auxBigImgDisplay, setAuxBigImgDisplay] = useState(0) // helps getting Id of first image to show
  const [auxBigVideoDisplay, setAuxBigVideoDisplay] = useState(0) // helps getting Id of first video to show, just like with the images

  const gameId = useParams();

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userNewFavGame = useSelector((state) => state.userNewFavGame)
  const { error } = userNewFavGame

  console.log(userNewFavGame)

  useEffect(() => {

    document.title = "Loading..."

    const load1 = async () => {
      window.scrollTo(0, 0);
      setLoading(true)

      const data = await API.getGameInfo(gameId.slug);
      setGameInfo(data)
      setIsFetch(true)

      document.title = `${data.name} | My Next Game`

      setTimeout(function () {
        setLoading(false)
        if (data.screenshots) { setAuxBigImgDisplay(data.screenshots[0].image_id) }
        if (data.videos) { setAuxBigVideoDisplay(data.videos[0].video_id) }
      }, 3000) //7000

    }
    load1()

  }, [gameId])

  const dispatch = useDispatch()

  const favoriteThisGame = () => {
    dispatch(favoriteGame(gameInfo, userLogin))
  }

  const removeFavoriteFromThisGame = () => {
    dispatch(removeFavoriteGame(gameInfo, userLogin))
  }

  console.log(gameInfo)

  return (
    <C.Container>
      {
        loading === true ? (
          <div className={isFetch === true ? 'loading-deactive' : 'loading-active'}>
            <SpinnerSvg />
          </div>
        ) : (
          // eslint-disable-next-line eqeqeq
          <>
            {/* <C.HeadingContent style={gameInfo.artworks === undefined ? {
              backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_big/${gameInfo.screenshots[0].image_id}.jpg)`,
              backgroundRepeat: 'no-repeat',
            } : {
              backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_huge/${gameInfo.artworks[Math.floor(Math.random() * gameInfo.artworks.length)].image_id}.jpg)`,
              backgroundRepeat: 'no-repeat',
            }}> */}
            <C.HeadingContent style={
              (gameInfo.artworks && {
                backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_huge/${gameInfo.artworks[Math.floor(Math.random() * gameInfo.artworks.length)].image_id}.jpg)`,
                backgroundRepeat: 'no-repeat',
              })
              ||
              (gameInfo.screenshots && {
                backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_big/${gameInfo.screenshots[0].image_id}.jpg)`,
                backgroundRepeat: 'no-repeat',
              })
              ||
              ({
                backgroundImage: `url(${bg_img})`,
                backgroundRepeat: 'no-repeat',
              })
            }>

              <div className='game-first-content'  >
                <div className='game-cover-art'>
                  {/* <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${gameInfo.cover.image_id}.png`} alt={gameInfo.name}></img> */}
                  {gameInfo.cover ? (
                    <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${gameInfo.cover.image_id}.png`} alt={gameInfo.name}></img>
                  ) : (
                    <img src={`https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg`} alt={gameInfo.name}></img>
                  )}
                  {gameInfo.follows > 0 ? (
                    <span className='followers'>{gameInfo.follows} Follower{gameInfo.follows > 1 ? 's' : ''}</span>
                  ) :
                    (
                      <span className='followers'>No Followers</span>
                    )}


                  {userInfo ? (

                    (
                      userInfo.favoriteGames.find(game => game.id === gameInfo.id) ? (

                        <button className='favorite-button' type='button' onClick={() => { removeFavoriteFromThisGame() }} style={{ border: '1px solid #5c16c5', backgroundColor: '#FFF' }}>
                          <StarFillSvg style={{ color: '#5c16c5 ', fill: '#5c16c5' }} /> <span style={{ color: '#333333' }}>Favorited</span>
                        </button>
                      ) : (
                        <>
                          <button className='favorite-button' type='button' onClick={() => { favoriteThisGame() }} style={{ border: '1px solid #5c16c5', backgroundColor: '#7a30e8' }}>
                            <StarSvg style={{ color: '#FFF ', fill: '#FFF' }} /> Favorite
                          </button>
                          {error && <span className='error-new-fav-game'>Error: Check Your Login</span>}
                        </>
                      )
                    )
                  ) : (
                    <button className='favorite-button need-login' type='button' style={{ border: '1px solid #5c16c5', backgroundColor: '#FFF' }}>
                      <Link to={'/user/login'} style={{ color: '#5c16c5 ' }}>Login your Account to Favorite <StarSvg style={{ color: '#5c16c5 ', fill: '#5c16c5' }} /></Link>
                    </button>
                  )
                  }
                </div>

                <div className='game-first-info'>
                  <div className='info-1'>
                    <ul>
                      <li>
                        <h1>{gameInfo.name}</h1>
                      </li>
                      <li>
                        {gameInfo.involved_companies && (
                          <ul>
                            {gameInfo.involved_companies.map((item, key) => (
                              <li><Link to={`/companies/${item.company.slug}`} key={key}>{item.company.name}</Link></li>
                            ))}
                          </ul>
                        )}
                      </li>

                    </ul>
                  </div>
                  <div className='info-2'>
                    <ul>
                      <li>
                        {gameInfo.platforms && (
                          <ul>
                            {gameInfo.platforms.slice(0, 4).map((item, key) => (
                              <li>
                                <Link to={`/platforms/${item.slug}`} key={key}>{item.name}</Link>
                              </li>
                            ))}
                            {gameInfo.platforms.length > 4 && (<span>and more.</span>)}
                          </ul>
                        )}
                      </li>
                      <li>
                        {gameInfo.genres && (
                          <ul>
                            {gameInfo.genres.map((item, key) => (
                              <li>
                                <Link to={`/genre/${item.slug}`} key={key}>{item.name}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                      <li>
                        {gameInfo.first_release_date && (
                          <h4><strong>{gameInfo.first_release_date}</strong></h4>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='rating'>
                  <div className='rating-score' style={(gameInfo.rating >= 75 && {
                    border: '10px solid green'
                  }) || (gameInfo.rating < 75 && {
                    border: '10px solid #fc3'
                  }) || (gameInfo.rating === undefined && {
                    border: '10px solid #333333'
                  })}>
                    {gameInfo.rating && (
                      <h2>{(gameInfo.rating).toFixed(1)}</h2>
                    )}

                    {gameInfo.rating === undefined && (
                      <p style={{
                        color: '#666666'
                      }}>Not Available</p>
                    )}

                    {gameInfo.rating >= 75 && (
                      <>
                        <p>Rating Score</p>
                        <p style={{
                          color: 'green'
                        }}>Good</p>
                      </>
                    )}

                    {gameInfo.rating < 75 && (
                      <>
                        <p>Rating Score</p>
                        <p style={{
                          color: '#fc3'
                        }}>Average</p>
                      </>
                    )}
                  </div>
                  {gameInfo.rating_count === undefined && <span>No Votes Received</span>}
                  {gameInfo.rating_count && <span>{gameInfo.rating_count} voted</span>}
                </div>
              </div>

            </C.HeadingContent>

            <div className='summary'>

              {gameInfo.storyline ?
                readMore === false ?
                  (
                    <p>
                      {gameInfo.storyline.slice(0, 400)}
                      <span onClick={() => setReadMore(!readMore)} style={gameInfo.storyline.length < 400 ? { display: 'none' } : {}}> ...Read More</span>
                    </p>
                  )
                  :
                  (
                    <p>
                      {gameInfo.storyline}
                      <span onClick={() => setReadMore(!readMore)} style={gameInfo.storyline.length < 400 ? { display: 'none' } : {}}> ...Read Less</span>
                    </p>
                  )

                :
                readMore === false ?
                  (
                    <p>
                      {gameInfo.summary.slice(0, 400)}
                      <span onClick={() => setReadMore(!readMore)} style={gameInfo.summary.length < 400 ? { display: 'none' } : {}}> ...Read More</span>
                    </p>
                  )
                  :
                  (
                    <p>
                      {gameInfo.summary}
                      <span onClick={() => setReadMore(!readMore)} style={gameInfo.summary.length < 400 ? { display: 'none' } : {}}> ...Read Less</span>
                    </p>
                  )
              }
            </div>

            <hr />
            <C.Details>

              <div className='navigation'>
                <div className='pointer' style={indexGameDetails === 0 ? { borderBottom: '2px solid #5c16c5' } : {}} onClick={() => { setIndexGameDetails(0) }}>
                  <h3>Screenshots</h3>
                </div>
                <div className='pointer' style={indexGameDetails === 1 ? { borderBottom: '2px solid #5c16c5' } : {}} onClick={() => { setIndexGameDetails(1) }}>
                  <h3 style={gameInfo.videos === undefined ? { display: 'none' } : {}}>
                    Videos
                  </h3>
                </div>
                <div className='pointer' style={indexGameDetails === 2 ? { borderBottom: '2px solid #5c16c5' } : {}} onClick={() => { setIndexGameDetails(2) }}>
                  <h3>More Details</h3>
                </div>
              </div>

              {gameInfo.screenshots && (
                <div className='details dropdown'>

                  <div className={indexGameDetails === 0 ? 'dropdown-item active screenshots' : 'dropdown-item screenshots'}>
                    <div className='list-imgs'>
                      {gameInfo.screenshots.map((item, key) => (
                        <img
                          src={`//images.igdb.com/igdb/image/upload/t_screenshot_med/${item.image_id}.jpg`} alt={gameInfo.name}
                          key={key}
                          onClick={() => { setAuxBigImgDisplay(item.image_id) }}
                          style={auxBigImgDisplay === item.image_id ?
                            { border: '2px solid #FFF' } : {}}
                        ></img>

                      ))}
                    </div>
                    <div className='big-img'>

                      {gameInfo.screenshots.map((item, key) => (
                        <img src={`//images.igdb.com/igdb/image/upload/t_screenshot_huge/${item.image_id}.jpg`} alt={gameInfo.name} key={key} className={auxBigImgDisplay === item.image_id ? 'active' : 'not-active'} ></img>
                      ))}

                    </div>
                  </div>

                </div>
              )}

              {gameInfo.videos && (
                <div className='details dropdown'>

                  <div className={indexGameDetails === 1 ? 'dropdown-item active videos' : 'dropdown-item videos'} >

                    {gameInfo.videos && (<div className='list-videos'>
                      {gameInfo.videos.map((item, key) => (
                        <h4 key={key}
                          onClick={() => { setAuxBigVideoDisplay(item.video_id) }}
                          style={auxBigVideoDisplay === item.video_id ?
                            { backgroundColor: '#FFF', color: '#5c16c5' } : {}}
                        >{item.name}</h4>
                      ))}
                    </div>)
                    }

                    {gameInfo.videos && (<div className='video-display'>
                      {gameInfo.videos.map((item, key) => (
                        <><h2 className={auxBigVideoDisplay === item.video_id ? 'active' : 'not-active'}>{item.name}</h2>
                          <iframe
                            src={`https://www.youtube.com/embed/${item.video_id}`}
                            key={key}
                            title={item.name}
                            className={auxBigVideoDisplay === item.video_id ? 'active' : 'not-active'}></iframe>
                        </>
                      ))}
                    </div>)
                    }
                  </div>

                </div>
              )}

              <div className='details dropdown'>

                <div className={indexGameDetails === 2 ? 'dropdown-item active details' : 'dropdown-item details'}>
                  <div className='list-details'>
                    <ul>

                      {gameInfo.storyline ?
                        (<li>
                          <h5>Storyline:</h5>
                          <p>{gameInfo.storyline}</p>
                        </li>) : (
                          <li>
                            <h5>Summary:</h5>
                            <p>{gameInfo.summary}</p>
                          </li>
                        )
                      }

                      {gameInfo.game_modes &&
                        <li>
                          <h5>Game Modes:</h5>
                          {gameInfo.game_modes.map((item, key) => (
                            <p key={key}><Link to={`/game-modes/${item.slug}`}>{item.name}</Link></p>
                          ))}
                        </li>
                      }

                      {gameInfo.player_perspectives && (
                        <li>
                          <h5>Player Perspective:</h5>
                          {gameInfo.player_perspectives.map((item, key) => (
                            <p key={key}><Link to={`/player-perspective/${item.slug}`}>{item.name}</Link></p>
                          ))}
                        </li>
                      )}

                      {gameInfo.platforms &&
                        <li>
                          <h5>Platforms:</h5>
                          {gameInfo.platforms.map((item, key) => (
                            <p key={key}><Link to={`/platforms/${item.slug}`}>{item.name}</Link></p>
                          ))}
                        </li>
                      }

                      {gameInfo.themes &&
                        <li>
                          <h5>Theme:</h5>
                          {gameInfo.themes.map((item, key) => (
                            <p key={key}><Link to={`/themes/${item.slug}`}>{item.name}</Link></p>
                          ))}
                        </li>
                      }

                      {gameInfo.age_ratings[0] && (<li>
                        <h5>Age Ratings:</h5>

                        <ul>
                          {gameInfo.age_ratings.map((item, key) => (
                            <li key={key}>
                              <h6>{item.category} | {item.rating}</h6>
                              {item.synopsis &&
                                <p>{item.synopsis}</p>
                              }
                            </li>
                          ))}
                        </ul>
                      </li>)
                      }

                      {gameInfo.multiplayer_modes &&
                        <li>
                          <h5>MultiPlayer Modes:</h5>
                          {gameInfo.multiplayer_modes.map((item, key) => (
                            <>
                              {item.platform && <h6>On <strong>{item.platform.name}</strong></h6>}
                              <ul>
                                <li><p key={key}>Campaign Coop: {item.campaigncoop === 0 ? 'Not Available' : 'Available'}</p></li>
                                <li><p key={key}>Lan Coop: {item.lancoop === 0 ? 'Not Supported' : 'Supported'}</p></li>
                                <li><p key={key}>Offline Coop: {item.offlinecoop === 0 ? 'Not Supported' : 'Supported'}</p></li>
                                {item.offlinecoop !== 0 && <li><p key={key}>Max Players on Offline Coop: {item.offlinecoopmax}</p></li>}
                                {item.offlinemax !== 0 && <li><p key={key}>Max Players on Offline MultiPlayer: {item.offlinemax}</p></li>}
                                <li><p key={key}>Online Coop: {item.onlinecoop === 0 ? 'Not Supported' : 'Supported'}</p></li>
                                {item.onlinecoop !== 0 && <li><p key={key}>Max Players on Online Coop: {item.onlinecoopmax}</p></li>}
                                {item.onlinecoop !== 0 && <li><p key={key}>Max Players on Online MultiPlayer: {item.onlinemax}</p></li>}
                                <li><p key={key}>Split Screen: {item.splitscreen === 0 ? 'Not Supported' : 'Supported'}</p></li>
                                <li><p key={key}>Split Screen Online: {item.splitscreenonline === 0 ? 'Not Supported' : 'Supported'}</p></li>
                              </ul>
                            </>
                          ))}
                        </li>
                      }

                    </ul>
                  </div>
                </div>

              </div>

            </C.Details>
            <hr />
            <C.SimilarGame>
              {gameInfo.similar_games && (
                <>
                  <h5>Similar Games</h5>

                  <ul>
                    {gameInfo.similar_games.map((item, key) => (
                      <li>
                        <Link to={`/game/${item.slug}`}>
                          <div key={key} className='background-cover' style={item.cover ? {
                            backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg)`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover'
                          } : {
                            backgroundColor: '#c0c0c0'
                          }}>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </C.SimilarGame>
          </>
        )
      }

    </C.Container >
  )
}
