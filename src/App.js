import { useEffect, useState } from 'react';
import API from './API/IGDB'
import * as C from './styles'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'
import Game from './Pages/Game'


function App() {

  const [storage, setStorage] = useState([])
  const [fetch, isFetch] = useState(false)

  useEffect(() => {
    // const load = async () => {

    //   const data = await API.getGameInfo(501)

    //   console.log(data)
    //   setTimeout(() => {
    //     setStorage(data)
    //     isFetch(true)
    //     console.log(data)
    //   }, 20000)
    // }
    // load()

  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <C.Container> {/* tag main */}

          <Routes>
            {/* <Route path='/game/:id' element={<Game />} /> */}
            <Route path='/game' element={<Game />} />
            <Route path='/' element={<Home />} />
          </Routes>

        </C.Container>

        <Footer />
      </div >
    </BrowserRouter>
  );
}

export default App;
