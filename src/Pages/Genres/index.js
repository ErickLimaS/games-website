import React, { useEffect, useState } from 'react'
import * as C from './styles'
import API from '../../API/IGDB'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as SpinnerSvg } from '../../img/svg/Spinner-1s-200px.svg'

export default function Genres() {

  const genre = useParams();
  const [loading, setLoading] = useState(true)
  const [genreInfo, setGenreInfo] = useState([])

  useEffect(() => {
    setLoading(true)

    window.scrollTo(0, 0);
    document.title = "Loading..."

    const load1 = async () => {
      const data = await API.getGenreInfo(genre.slug)
      setGenreInfo(data)

      document.title = ` ${genre.slug.charAt(0).toUpperCase() + genre.slug.slice(1)} Genre | My Next Game`

      setLoading(false)
    }
    load1()

  }, [genre])

  return (
    <C.Container>
      {loading === true ? (
        <div className='loading-active'>
          <SpinnerSvg />
        </div>
      ) : (

        <div >

          <C.HeadingContent style={genreInfo[0].screenshots ? {
            backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_huge/${genreInfo[(Math.floor(Math.random() * genreInfo.length))].screenshots[0].image_id}.jpg)`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '91vh',
          } : {
            backgroundColor: "#c0c0c0"
          }}>

            <div className='genre-name-heading'>
              <h1>{genre.slug.charAt(0).toUpperCase() + genre.slug.slice(1)} Genre</h1>
              <p>See games from this genre below!</p>
            </div>

          </C.HeadingContent>

          <C.GamesFromThisGenre>

            <div>
              <h2>Games</h2>
            </div>
            <ul>
              {genreInfo.map((item, key) => (
                <>
                  <li key={key} style={item.artworks ? {
                    backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_big/${item.artworks[0].image_id}.jpg)`
                  } : {
                    backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_big/${item.screenshots[0].image_id}.jpg)`
                  } || {
                    backgroundColor: '#a3a3a3'
                  }}>
                    <Link to={`/game/${item.slug}`}>

                      <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg`} alt={`${item.name}`}></img>

                      <div className='rating'>
                        {/* <p style={item.rating >= 70 ? {
                            border: '4px solid green'
                          } : {
                            border: '40x solid #fc3'
                          }}>
                            {(item.rating).toFixed(1)}</p> */}
                      </div>
                      <h3>{item.name}</h3>
                    </Link>
                  </li>
                </>
              ))}
            </ul>

          </C.GamesFromThisGenre>


        </div>

      )}
    </C.Container >
  )
}
