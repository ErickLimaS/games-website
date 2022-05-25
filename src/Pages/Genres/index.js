import React, { useEffect, useState } from 'react'
import * as C from './styles'
import API from '../../API/IGDB'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as SpinnerSvg } from '../../img/svg/Spinner-1s-200px.svg'
import bg_img from '../../img/bg-gaming.jpg'

export default function Genres() {

  const genre = useParams();
  const [loading, setLoading] = useState(true)
  const [genreInfo, setGenreInfo] = useState([])
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    setLoading(true)

    window.scrollTo(0, 0);
    document.title = "Loading..."

    const load1 = async () => {
      const data = await API.getGenreInfo(genre.slug)
      setGenreInfo(data)

      document.title = ` ${genre.slug.charAt(0).toUpperCase() + genre.slug.slice(1)} Genre | My Next Game`
      setImageIndex(Math.floor(Math.random() * data.length))
      setLoading(false)
    }
    load1()

  }, [genre])

  console.log(imageIndex)

  return (
    <C.Container>
      {loading === true ? (
        <div className='loading-active'>
          <SpinnerSvg />
        </div>
      ) : (

        <div >

          <C.HeadingContent style={genreInfo[imageIndex].screenshots ? {
            backgroundImage: `
            url(//images.igdb.com/igdb/image/upload/t_screenshot_huge/${genreInfo[imageIndex].screenshots[0].image_id}.jpg)`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '91vh',
          } : {
            backgroundImage: `url(${bg_img})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '91vh',
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
                  } : item.screenshots ? {
                    backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_big/${item.screenshots[0].image_id}.jpg)`
                  } : {
                    backgroundColor: '#c0c0c0'
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

      )
      }
    </C.Container >
  )
}
