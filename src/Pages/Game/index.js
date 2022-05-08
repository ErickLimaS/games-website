import React, { useEffect, useState } from 'react'
import * as C from './styles'
import API from '../../API/IGDB'
import SearchFromHeader from '../../Components/Search/SearchFromHeader'

export default function Game() {

  const [gameInfo, setGameInfo] = useState([])
  const [isFetch, setIsFetch] = useState(false)

  useEffect(() => {

    const load1 = async () => {

      const data = await API.getSearchResults('mario');
      setGameInfo(data)
      setIsFetch(true)

      console.log(data)

    }
    load1()
    console.log(gameInfo)

  }, [])

  return (
    <C.Container>

      game
      {isFetch === true &&
        gameInfo.map((item, key) => (
          <SearchFromHeader item={item} key={key} />
        ))
      }
    </C.Container>
  )
}
