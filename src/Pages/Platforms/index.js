import React, { useEffect, useState } from 'react'
import * as C from './styles'
import API from '../../API/IGDB'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as SpinnerSvg } from '../../img/svg/Spinner-1s-200px.svg'

export default function Platforms() {

  const platform = useParams();
  const [loading, setLoading] = useState(true)
  const [platformInfo, setPlatformInfo] = useState([])

  useEffect(() => {
    setLoading(true)

    window.scrollTo(0, 0);
    document.title = "Loading..."

    const load1 = async () => {
      const data = await API.getPlatformInfo(platform.slug)
      setPlatformInfo(data)
      console.log(data)

      document.title = ` ${data[0].result[0].name} | My Next Game`

      setLoading(false)
    }
    load1()

  }, [platform])

  return (
    <C.Container>
      {loading === true ? (
        <div className='loading-active'>
          <SpinnerSvg />
        </div>
      ) : (

        <>

          <C.HeadingContent>
            <div className='platform-logo'>
              <img src={`//images.igdb.com/igdb/image/upload/t_720p/${platformInfo[0].result[0].versions[0].platform_logo.image_id}.png`} alt={`platformInfo[0].result[0].name`}></img>
            </div>
            <div className='platform-name'>
              <h1>{platformInfo[0].result[0].name}</h1>
              <p>{platformInfo[0].result[0].summary}</p>
            </div>
          </C.HeadingContent>

          <C.MoreDetails>

            <div className='console-info'>

              {platformInfo[0].result[0].generation === 1 && <h2>{platformInfo[0].result[0].generation}st Generation Console</h2>}
              {platformInfo[0].result[0].generation === 2 && <h2>{platformInfo[0].result[0].generation}nd Generation Console</h2>}
              {platformInfo[0].result[0].generation === 3 && <h2>{platformInfo[0].result[0].generation}rd Generation Console</h2>}
              {platformInfo[0].result[0].generation >= 4 && <h2>{platformInfo[0].result[0].generation}th Generation Console</h2>}

              {platformInfo[0].result[0].versions && (
                <>
                  <h2>{platformInfo[0].result[0].name} Versions</h2>
                  <div className='console-versions'>
                    {platformInfo[0].result[0].versions.map((item, key) => (
                      <div key={key} className='version'>
                        <h3>{item.name}</h3>

                        <div>
                          {item.cpu && <p><span>Cpu</span> {item.cpu}</p>}
                          {item.graphics && <p><span>Graphics</span> {item.graphics}</p>}
                          {item.memory && <p><span>Memory</span> {item.memory}</p>}
                          {item.storage && <p><span>Storage</span> {item.storage}</p>}
                          {item.os && <p><span>OS</span> {item.os}</p>}
                          {item.media && <p><span>Media</span> {item.media}</p>}
                          {item.online && <p><span>Online Service</span> {item.online}</p>}
                          {item.connectivity && <p><span>Connectivity</span> {item.connectivity}</p>}
                          {item.platform_version_release_dates && (
                            <>
                              <h4>Release Date</h4>
                              {item.platform_version_release_dates.map((item, key) => (
                                <p key={key}>{item.human} {item.region === 1 && '- Europe'}{item.region === 2 && '- North America'}{item.region === 3 && '- Australia'}{item.region === 4 && '- New Zeland'}{item.region === 5 && '- Japan'}{item.region === 6 && '- China'}{item.region === 7 && '- Asia'}{item.region === 8 && '- Worldwide'}{item.region === 9 && '- Korea'}{item.region === 10 && '- Brazil'}</p>
                              )
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

            </div>


          </C.MoreDetails>

          {platformInfo[1].result[0] && (
            <C.ConsoleGamesRelated>

              <h2>{platformInfo[0].result[0].name} Games</h2>

              <div className='games-list'>

                <ul>
                  {platformInfo[1].result.map((item, key) => (
                    <>
                      <li key={key} style={(item.artworks && {
                        backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_big/${item.artworks[0].image_id}.jpg)`
                      })
                        || (item.screenshots && {
                          backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_big/${item.screenshots[0].image_id}.jpg)`
                        }) || ({
                          backgroundColor: '#a3a3a3'
                        })}>
                        <Link to={`/game/${item.slug}`}>

                          <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg`} alt={`${item.name}`}></img>

                          <div className='rating'>
                            <div style={item.rating >= 70 ? {
                              backgroundColor: 'green'
                            } : {
                              backgroundColor: '#fc3'
                            }}>
                              <p>{(item.rating).toFixed(1)}</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    </>
                  ))}

                </ul>
              </div>

            </C.ConsoleGamesRelated>
          )}
        </>

      )}
    </C.Container >
  )
}
