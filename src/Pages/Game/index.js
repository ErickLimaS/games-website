import React, { useEffect, useState } from 'react'
import * as C from './styles'
import API from '../../API/IGDB'
import SearchFromHeader from '../../Components/Search/SearchFromHeader'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as SpinnerSvg } from '../../img/svg/Spinner-1s-200px.svg'

export default function Game() {

  const [gameInfo, setGameInfo] = useState([])
  const [isFetch, setIsFetch] = useState(false)
  const [loading, setLoading] = useState(true)

  const gameId = useParams();
  let date;

  useEffect(() => {

    const load1 = async () => {
      window.scrollTo(0, 0);
      setLoading(true)

      const data = await API.getGameInfo(gameId.id);
      setGameInfo(data)
      setIsFetch(true)
      setTimeout(function () { setLoading(false) }, 3000) //7000

      console.log(data)

      date = new Date()


    }
    load1()

    console.log(gameInfo)


  }, [gameId])

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
            <C.HeadingContent>

              <div className='backImage-blur' style={gameInfo.artworks === undefined ? {
                backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_big/${gameInfo.screenshots[0].image_id}.jpg)`,
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
              } : {
                backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_original/${gameInfo.artworks[0].image_id}.jpg)`,
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
              }}></div>

              <div className='game-first-content'>
                <div className='game-cover-art'>
                  <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${gameInfo.cover.image_id}.png`} alt={gameInfo.name}></img>
                </div>
                <div className='game-first-info'>
                  <div className='info-1'>
                    <ul>
                      <li>
                        <h1>{gameInfo.name}</h1>
                      </li>
                      <li>
                        <h2>{gameInfo.involved_companies[0].name}</h2>
                      </li>
                      <li>
                        <h2>Developed By: {gameInfo.involved_companies.map((item, key) => (
                          <strong><Link to={`/companies/${item.company.id}`} key={item.company.id}>{item.company.name} </Link></strong>
                        ))}</h2>
                      </li>

                    </ul>
                  </div>
                  <div className='info-2'>
                    <ul>
                      <li>
                        <h2>Platforms: {gameInfo.platforms.map((item, key) => (
                          <strong><Link to={`/platforms/${item.id}`} key={item.id}>{item.name} ({item.abbreviation}) </Link></strong>
                        ))}</h2>
                      </li>
                      <li>
                        <h3>{gameInfo.genres.map((item, key) => (
                          <strong><Link to={`/genre/${item.id}`} key={item.id}>{item.name}/ </Link></strong>
                        ))}</h3>
                      </li>
                      <li>
                        <h4><strong>{gameInfo.first_release_date.dd}/{gameInfo.first_release_date.mm}/{gameInfo.first_release_date.yyyy}</strong></h4>
                      </li>

                      <button type='button' onClick={() => { console.log(gameInfo) }}>console</button>
                    </ul>
                  </div>
                </div>
                <div className='rating' style={gameInfo.rating >= 90 ? {
                  border: '1px solid #00e600',
                  backgroundColor: '#e4ffe4'
                } : {
                  border: '1px solid #ffd9b3',
                  backgroundColor: '#ffd9b3'
                }}>
                  <div className='rating-score' style={gameInfo.rating >= 90 ? {
                    border: '1px solid green'
                  } : {
                    border: '1px solid #ff8c1a'
                  }}>
                    <h2>{(gameInfo.rating).toFixed(1)}</h2>

                    <p>Rating Score</p>
                    {gameInfo.rating >= 90 ? (
                      <p style={{
                        color: '#80ff00'
                      }}>Good</p>
                    ) : (
                      <p style={{
                        color: '#ff8c1a'
                      }}>Average</p>
                    )}
                  </div>
                  <span>{gameInfo.rating_count} voted</span>
                </div>
              </div>

            </C.HeadingContent>
            <C.Details>

              <div className='details dropdown'>
                <div className='pointer'>
                  <h3>Info</h3>
                </div>
                <div className='dropdown-item'>

                </div>

              </div>

              <div className='details dropdown'>
                <div className='pointer'>
                  <h3>Place</h3>
                </div>
                <div className='dropdown-item'>

                </div>

              </div>

              <div className='details dropdown'>
                <div className='pointer'>
                  <h3>Place</h3>
                </div>
                <div className='dropdown-item'>

                </div>

              </div>
            </C.Details>
          </>
        )
      }

    </C.Container >
  )
}
