import React, { useEffect, useState } from 'react'
import * as C from './styles'
import API from '../../API/IGDB'
import SearchFromHeader from '../../Components/Search/SearchFromHeader'
import { useParams } from 'react-router-dom'
import { ReactComponent as SpinnerSvg } from '../../img/svg/Spinner-1s-200px.svg'

export default function Game() {

  const [gameInfo, setGameInfo] = useState([])
  const [isFetch, setIsFetch] = useState(false)
  const [loading, setLoading] = useState(true)

  const gameId = useParams();
  let date;

  useEffect(() => {

    const load1 = async () => {
      setLoading(true)

      const data = await API.getGameInfo(gameId.id);
      setGameInfo(data)
      setIsFetch(true)
      setTimeout(function () { setLoading(false) }, 7000) //7000

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

              <div className='backImage-blur' style={gameInfo.artworks != undefined ? {
                backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_original/${gameInfo.artworks[4].image_id}.jpg)`,
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
                filter: 'blur(2px)'
              } : {}}></div>

              <div className='game-first-content'>
                <div className='game-cover-art'>
                  <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${gameInfo.cover.image_id}.png`} alt={gameInfo.name}></img>
                </div>
                <div className='game-first-info'>
                  <ul>
                    <li>
                      <h1>{gameInfo.name}</h1>
                    </li>
                    <li>
                      <h2>{gameInfo.involved_companies[0].name}</h2>
                    </li>
                    <li>
                      <h3>Released Date: <strong>{ }</strong></h3>
                    </li>
                    <li>
                      <h4>Genres: <strong>genre</strong></h4>
                    </li>
                  </ul>
                </div>
                <div className='rating'>
                  <button type='button' onClick={() => { console.log(gameInfo) }}>console</button>

                </div>
              </div>

            </C.HeadingContent>
            <C.Details>

              <div>

              </div>
              <div>

              </div>
              <div>

              </div>

            </C.Details>
          </>
        )
      }

    </C.Container>
  )
}
