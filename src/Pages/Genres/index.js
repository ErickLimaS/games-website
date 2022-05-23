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

      document.title = ` Genre ${genre.slug} | My Next Game`

      setLoading(false)
    }
    load1()

  }, [genre])

  console.log(genreInfo)

  return (
    <C.Container>
      {loading === true ? (
        <div className='loading-active'>
          <SpinnerSvg />
        </div>
      ) : (

        <>
          <C.HeadingContent>
            
          </C.HeadingContent>


        </>

      )}
    </C.Container >
  )
}
