import * as C from './styles'
import Header from './Components/Theme/Header/Header'
import Footer from './Components/Theme/Footer/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'
import Game from './Pages/Game'
import Platforms from './Pages/Platforms';
import Register from './Pages/User/Register';
import Login from './Pages/User/Login';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <C.Container> {/* tag main */}

          <Routes>
            {/* <Route path='/search/:search' element={<Search />} /> */}
            <Route path='/user/register' element={<Register />} />
            <Route path='/user/login' element={<Login />} />
            <Route path='/platforms/:slug' element={<Platforms />} />
            <Route path='/game/:id' element={<Game />} />
            <Route path='/' element={<Home />} />
          </Routes>

        </C.Container>

        <Footer />
      </div >
    </BrowserRouter >
  );
}

export default App;
