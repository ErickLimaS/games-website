import React, { useRef, useState } from 'react'
import * as C from './styles'
import { ReactComponent as SpinnerSvg } from '../../../img/svg/Spinner-1s-200px.svg'
import API from '../../../API/IGDB'
import { Link } from 'react-router-dom'

export default function PlatformSearch() {

  const [isFetch, setIsFetch] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const refInput = useRef('')

  document.title = 'Search Platform | My Next Game'

  const submitHandler = async (e) => {
    e.preventDefault()

    setLoading(true)
    setIsFetch(false)

    const { data } = await API.searchPlatform(refInput.current.value)
    setSearchResults(data)

    setIsFetch(true)
    setLoading(false)

  }

  console.log(searchResults)

  return (
    <C.Containter isFetch={isFetch}
      style={isFetch ? {
        backgroundImage: 'linear-gradient(#5c16c5, #fff)'
      } : {
        backgroundColor: '#5c16c5'
      }}
    >

      <div className='search-platform'>

        <div className='heading'>
          <h1>Search My Console</h1>
          <p>Type the name of the console you want!</p>
        </div>

        <div className='div-form'>
          <label htmlFor='search-platform' />
          <form onSubmit={submitHandler}>
            <input id='search-platform' type='text' ref={refInput} placeholder='PS4'></input>
            <button type='submit'>Search</button>
          </form>

          {loading && (
            <div className='loading'>
              <SpinnerSvg />
            </div>
          )}
          {isFetch && (
            <div className='result-is-fetch'>
              <h2>Results for {refInput.current.value}</h2>
            </div>
          )}

        </div>

      </div>

      <C.ConsoleList results={searchResults}>

        {searchResults && (
          searchResults.map((item, key) => (
            <div key={key} className='platform'>

              <div className='platform-heading'>
                <Link to={`/platforms/${item.slug}`}>

                  {item.platform_logo ? (
                    <img src={`//images.igdb.com/igdb/image/upload/t_screenshot_med/${item.platform_logo.image_id}.jpg`} alt={`${item.name} Logo`}></img>
                  ) :
                    (
                      <img src={`https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg`} alt='No Image Available'></img>
                    )}

                  <h2>{item.name}</h2>
                </Link>
              </div>

              <div className='details'>

                {item.generation && (
                  item.generation === 1 && (<p>{item.generation}st Generation</p>),
                  item.generation === 2 && (<p>{item.generation}nd Generation</p>),
                  item.generation >= 3 && (<p>{item.generation}th Generation</p>)
                )}

                {item.versions && (
                  item.versions.length === 1 && (<p>{item.versions.length} Version</p>),
                  item.versions.length > 1 && (<p>{item.versions.length} Versions</p>)
                )}
              </div>

              <Link to={`/platforms/${item.slug}`} className='button'>
                Go to Page
              </Link>

            </div>
          ))
        )}

      </C.ConsoleList>

    </C.Containter>
  )
}
