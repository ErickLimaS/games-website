import * as C from './styles'
import Header from './Components/Theme/Header/Header'
import Footer from './Components/Theme/Footer/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'
import GamePage from './Pages/GamePage'
import Platforms from './Pages/Platforms';
import Register from './Pages/User/Register';
import Login from './Pages/User/Login';
import { useDispatch, useSelector } from 'react-redux';
import MyFavoriteGames from './Pages/User/MyFavoriteGames';
import Profile from './Pages/User/Profile';
import Genres from './Pages/Genres';
import ReleasingGames from './Pages/GameNav/ReleasingGames';
import GamesRating from './Pages/GameNav/GamesRating';
import NotificationPage from './Pages/User/NotificationPage';
import PlatformSearch from './Pages/Search/PlatformSearch';
import API from './API/IGDB'
import { Axios } from 'axios';
import { useEffect } from 'react';

function App() {

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {

    //request a new token for the user
    const getValidation = async () => {
      await API.tokenValidation()
    }

    //checks if theres a token on browser and if is still valid
    if (localStorage.getItem('token') == null || undefined) {

      getValidation()

    } else {

      const dateRightNow = new Date()
      const tokenInsertedDate = new Date(localStorage.getItem('token_date_inserted'))

      const differenceInTime = dateRightNow.getTime() - tokenInsertedDate.getTime()
      const differenceInDays = differenceInTime / (1000 * 3600 * 24)

      const daysToExpiration = Math.floor(localStorage.getItem('token_expiration') / (3600 * 24))

      if (differenceInDays >= daysToExpiration) {

        getValidation()

      }

    }

  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <C.Container> {/* tag main */}

          <Routes>
            {/* <Route path='/genre' element={<GenreHome />} /> */}
            <Route path='/platforms/search' element={<PlatformSearch />} />
            <Route path='/genre/:slug' element={<Genres />} />
            <Route path='/user/notifications' element={<NotificationPage />} />
            <Route path='/games/releasing-this-year' element={<ReleasingGames />} />
            <Route path='/games/releasing-this-month' element={<ReleasingGames />} />
            <Route path='/games/games-ratings' element={<GamesRating />} />
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/user/my-favorite-games' element={<MyFavoriteGames />} />
            <Route path='/user/register' element={<Register />} />
            <Route path='/user/login' element={<Login />} />
            <Route path='/platforms/:slug' element={<Platforms />} />
            <Route path='/game/:slug' element={<GamePage />} />
            <Route path='/' element={<Home />} />
          </Routes>

        </C.Container>

        <Footer />
      </div >
    </BrowserRouter >
  );
}

export default App;
