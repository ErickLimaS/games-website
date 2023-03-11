import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'
import Styles from './Header.module.css'
import BrandImg from '../../../public/img/logo/logo.png'
import Image from 'next/image'
import List from '../../../public/img/icons/List'
import * as SVG from '../../../public/img/icons'
import { searchGame } from '@/api/IGDB'
import SearchResult from '@/components/SearchResult'
import { logInUserThroughToken, logOutUser } from '@/api/server'
import store from '@/store'

function Header() {

  const [loading, setLoading] = useState<boolean>(false)
  const [loadingUser, setLoadingUser] = useState<boolean>(false)

  // USER
  const [user, setUser] = useState<User | null>(null)
  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false)
  const [userProfileImg, setUserProfileImg] = useState<string>('')


  // NAVIGATION MENU
  const [menuVisibility, setMenuVisibility] = useState<boolean | null>(null)

  // SEARCH
  const [searchResults, setSearchResults] = useState<GameInfo[] | null>(null)
  const searchRefDesktop = React.useRef<HTMLInputElement>(null)
  const searchRefMobile = React.useRef<HTMLInputElement>(null)

  // fetch any results that match what user typed on form input
  async function handleSearchForm(e: FormEvent) {

    e.preventDefault()

    // uses the right useRef either on mobile or desktop
    const query = screen.width >= 679 ?
      searchRefDesktop.current!.value : searchRefMobile.current!.value;

    if (query.length == 0) {
      return
    }

    setLoading(true)

    const data = await searchGame(query);

    setSearchResults(data)

    setLoading(false)

    return

  }

  // sets new color on header's background
  function scrollEvent() {

    const screenWidth = screen.width

    // width 300px
    if (screenWidth > 300 && screenWidth <= 560) {
      if (window.scrollY > 40) {

        const element: HTMLElement = document.getElementsByTagName('header')[0]

        element.setAttribute('style', "background: #14171e;")

        return
      }

      const element: HTMLElement = document.getElementsByTagName('header')[0]

      element.setAttribute('style', "background: transparent;")

      return

    }
    // width 560px
    else if (screenWidth > 560 && screenWidth <= 1020) {
      if (window.scrollY > 20) {

        const element: HTMLElement = document.getElementsByTagName('header')[0]

        element.setAttribute('style', "background: #14171e;")

        return
      }

      const element: HTMLElement = document.getElementsByTagName('header')[0]

      element.setAttribute('style', "background: transparent;")

      return

    }
    // width 1020px
    else if (screenWidth > 1020) {
      if (window.scrollY > 40) {

        const element: HTMLElement = document.getElementsByTagName('header')[0]

        element.setAttribute('style', "background: #14171e;")

        return
      }

      const element: HTMLElement = document.getElementsByTagName('header')[0]

      element.setAttribute('style', "background: transparent;")

      return

    }


  }

  // if token is stored on local storage, it tries to log user in
  useEffect(() => {

    async function logUser() {
      setLoadingUser(true)

      await store.dispatch(logInUserThroughToken())

      // if token is still valid
      if (store.getState().user.success) {

        setUser(store.getState().user)
        setUserProfileImg(store.getState().user.profileImg)

      }

      setLoadingUser(false)
    }

    if (localStorage.getItem('server_token')) {
      logUser()
    }

  }, [])

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent)
  }, [])

  return (
    <header className={Styles.container}>

      <div id={Styles.brand_container}>

        <Link href='/'>
          <Image src={BrandImg} alt='My Next Game Logo' />
        </Link>

        <div id={Styles.mobile_menu}>
          {loadingUser ? (

            <div>
              <SVG.Spinner1S200Px style={{ width: '30px', height: 'auto' }} />
            </div>
          ) : (
            user ? (
              <>
                <h6 className={Styles.user_mobile_name}>
                  <Image
                    src={userProfileImg}
                    alt={`Foto de perfil de ${user.name.first}`}
                    width={22} height={22}
                    onError={() => setUserProfileImg('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')}
                  />
                </h6>

              </>
            ) : (
              <Link href='/login'>
                Login
              </Link>
            )
          )}

          <button
            data-clicked={menuVisibility == null ? false : menuVisibility}
            onClick={() => setMenuVisibility(menuVisibility == null ? true : !menuVisibility)}
            aria-haspopup={menuVisibility == null ? false : menuVisibility}
            aria-controls={Styles.links_container}
            aria-label={!menuVisibility ? 'Fechar Menu' : 'Abrir Menu'}
          >
            <List alt='Ícone de Menu' />
          </button>

        </div>

        <nav
          id={Styles.links_container}
          className={Styles.sidebar_menu_mobile}
          data-visible={menuVisibility}
          role='menu'
          aria-labelledby='open_menu_btn'
          data-initial-close-state={menuVisibility == null ? true : false}
          data-expanded={menuVisibility}
          data-visibility={menuVisibility ? true : false}
        // hidden={!menuVisibility ? true : false}
        >

          {user ? (
            <div className={`${Styles.user_mobile_section} ${Styles.mobile_only}`}>

              <Image
                src={userProfileImg}
                alt={`Foto de perfil de ${user.name.first}`}
                width={80} height={80}
                onError={() => setUserProfileImg('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')}
              />

              <div>
                <h6>{user.name.first} {user.name.last}</h6>
                <p>{user.email}</p>
              </div>

            </div>
          ) : (
            <h3 className={`${Styles.mobile_only}`}>Menu</h3>
          )}

          <ul>
            {user && (
              <li className={Styles.mobile_only}><Link href='/bookmarks'><SVG.BookmarksFill /> Marcados</Link></li>
            )}
            <li><Link href='/'>Lançamentos</Link></li>
            <li><Link href='/'>Mais Esperados</Link></li>
            <li><Link href='/'>Gêneros</Link></li>
            <li><Link href='/'>Plataformas</Link></li>
            {user && (
              <li className={Styles.mobile_only}>
                <button onClick={() => logOutUser()}>
                  <SVG.BoxArrowLeft />Sair da Conta
                </button>
              </li>
            )}
          </ul>
        </nav>

        <div className={Styles.user_account_container} data-has-user={user ? true : false}>

          {loadingUser ? (

            <div>
              <SVG.Spinner1S200Px style={{ width: '30px', height: 'auto' }} />
            </div>
          ) : (
            user ? (
              <>
                <button
                  id='open_menu_btn'
                  aria-label={`Menu da Conta de ${user.name.first} ${user.name.last}`}
                  aria-haspopup={openUserMenu}
                  aria-controls='user_menu'
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                >
                  <Image
                    src={userProfileImg}
                    alt={`Foto de perfil de ${user.name.first}`}
                    width={22} height={22}
                    onError={() => setUserProfileImg('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')}
                  />
                  {user.name.first} {user.name.last}
                </button>

                <div
                  role='menu'
                  id='user_menu'
                  aria-labelledby='open_menu_btn'
                  data-expanded={openUserMenu}
                  hidden={openUserMenu ? false : true}
                >

                  <ul>
                    <li><Link href='/bookmarks'><SVG.BookmarksFill /> Marcados</Link></li>
                    <li><button onClick={() => logOutUser()}><SVG.BoxArrowLeft />Sair da Conta</button></li>
                  </ul>

                </div>
              </>
            ) : (
              <Link href='/login'>
                Login
              </Link>
            )
          )}

        </div>

      </div>

      <div className={Styles.form_and_results_container}>
        <form role='search' onSubmit={(e) => { handleSearchForm(e) }} id={Styles.search_form_mobile} className={Styles.search_form}>
          <div>
            <label>
              <input type='text' ref={searchRefMobile} placeholder='Procurar'></input>
            </label>
          </div>
          <button type='submit' aria-label='Procurar' disabled={loading}>
            {loading ? (
              <SVG.Spinner1S200Px alt='Ícone de Carregando Resultados' style={{ width: '30px', height: 'auto', marginRight: '2px' }} />
            ) : (
              <SVG.Search alt='Ícone de Lupa' style={{ margin: '0 8px' }} />
            )}
          </button>

          {searchResults && (
            <button type='button' aria-label='Limpar Pesquisa' title='Limpar Pesquisa'
              onClick={() => setSearchResults(null)}
            >
              X
            </button>
          )}
        </form>

        {searchResults && (
          <div aria-live="polite" id={Styles.search_results}>

            {searchResults.length > 0 ? (

              <ul>

                {searchResults.map((item: GameInfo) => (

                  <SearchResult key={item.id} props={item} />

                ))}

              </ul>
            ) : (


              <div className={Styles.no_results}>

                <p>Sem resultados para essa pesquisa.</p>

              </div>

            )}

          </div>
        )}

      </div>

      <div id={Styles.user_interests}>

        <div className={Styles.form_and_results_container}>

          <form role='search' onSubmit={(e) => { handleSearchForm(e) }} className={Styles.search_form}>
            <div>
              <label>
                <input type='text' ref={searchRefDesktop} placeholder='Procurar'></input>
              </label>
            </div>

            <button type='submit' aria-label='Procurar' disabled={loading}>
              {loading ? (
                <SVG.Spinner1S200Px alt='Ícone de Carregando Resultados' style={{ width: '30px', height: 'auto', marginRight: '2px' }} />
              ) : (
                <SVG.Search alt='Ícone de Lupa' style={{ margin: '0 8px' }} />
              )}
            </button>

            {searchResults && (
              <button type='button' aria-label='Limpar Pesquisa' title='Limpar Pesquisa'
                onClick={() => setSearchResults(null)}
              >
                X
              </button>
            )}
          </form>

          {searchResults && (
            <div aria-live="polite" id={Styles.search_results}>

              {searchResults.length > 0 ? (

                <ul>

                  {searchResults.map((item: GameInfo) => (

                    <SearchResult key={item.id} props={item} />

                  ))}

                </ul>
              ) : (

                <div className={Styles.no_results}>

                  <p>Sem resultados para essa pesquisa.</p>

                </div>
              )}

            </div>
          )}

        </div>

        <div className={Styles.user_account_container} data-has-user={user ? true : false}>

          {loadingUser ? (

            <div>
              <SVG.Spinner1S200Px style={{ width: '30px', height: 'auto' }} />
            </div>
          ) : (
            user ? (
              <>
                <button
                  id='open_menu_btn'
                  aria-label={`Menu da Conta de ${user.name.first} ${user.name.last}`}
                  aria-haspopup={openUserMenu}
                  aria-controls='user_menu'
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                >
                  <Image
                    src={userProfileImg}
                    alt={`Perfil de ${user.name.first}`}
                    width={22} height={22}
                    onError={() => setUserProfileImg('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')}
                  />
                  {user.name.first} {user.name.last}
                </button>

                <div
                  role='menu'
                  id='user_menu'
                  aria-labelledby='open_menu_btn'
                  data-expanded={openUserMenu}
                  hidden={openUserMenu ? false : true}
                >

                  <ul>
                    <li><Link href='/bookmarks'><SVG.BookmarksFill /> Marcados</Link></li>
                    <li><button onClick={() => logOutUser()}><SVG.BoxArrowLeft />Sair da Conta</button></li>
                  </ul>

                </div>
              </>
            ) : (
              <Link href='/login'>
                Login
              </Link>
            )
          )}

        </div>
      </div>
    </header >
  )
}

export default Header
