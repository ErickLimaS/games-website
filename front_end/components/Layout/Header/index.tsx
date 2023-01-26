import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'
import Styles from './Header.module.css'
import BrandImg from '../../../public/img/logo/logo.png'
import Image from 'next/image'
import List from '../../../public/img/icons/List'
import Spinner from '../../../public/img/icons/Spinner1S200Px'
import Search from '../../../public/img/icons/Search'
import { searchGame } from '@/api/IGDB'
import SearchResult from '@/components/SearchResult'

function Header() {

  const searchRefDesktop = React.useRef<HTMLInputElement>(null)
  const searchRefMobile = React.useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState<boolean>(false)

  const [menuVisibility, setMenuVisibility] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<GameInfo[]>([])

  // fetch any results that match what user typed on form input
  async function handleSearchForm(e: FormEvent) {

    e.preventDefault()

    setLoading(true)

    // uses the right useRef either on mobile or desktop
    const query = screen.width >= 679 ?
      searchRefDesktop.current!.value : searchRefMobile.current!.value;

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
    if (screenWidth > 560 && screenWidth <= 1020) {
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
    if (screenWidth > 1020) {
      if (window.scrollY > 140) {

        const element: HTMLElement = document.getElementsByTagName('header')[0]

        element.setAttribute('style', "background: #14171e;")

        return
      }

      const element: HTMLElement = document.getElementsByTagName('header')[0]

      element.setAttribute('style', "background: transparent;")

      return

    }


  }

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

          <Link href=''>
            Login
          </Link>

          <button data-clicked={menuVisibility}
            onClick={() => setMenuVisibility(!menuVisibility)}
            aria-label={menuVisibility ? 'Fechar Menu' : 'Abrir Menu'}
          >
            <List alt='Ícone de Menu' />
          </button>

        </div>

        <nav id={Styles.links_container} data-visible={menuVisibility}>
          <ul>
            <li><Link href='/'>Lançamentos</Link></li>
            <li><Link href='/'>Mais Esperados</Link></li>
            <li><Link href='/'>Gêneros</Link></li>
            <li><Link href='/'>Plataformas</Link></li>
          </ul>
        </nav>

        <div className={Styles.user_account_container}>
          <Link href=''>
            Login
          </Link>
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
              <Spinner alt='Ícone de Carregando Resultados' style={{ width: '30px', height: 'auto', marginRight: '2px' }} />
            ) : (
              <Search alt='Ícone de Lupa' style={{ margin: '0 8px' }} />
            )}
          </button>

          {searchResults.length > 0 && (
            <button type='button' aria-label='Limpar Pesquisa' title='Limpar Pesquisa'
              onClick={() => setSearchResults([])}
            >
              X
            </button>
          )}
        </form>

        {searchResults.length > 0 && (
          <div aria-live="polite" id={Styles.search_results}>

            <ul>

              {searchResults.map((item: GameInfo) => (
                <SearchResult key={item.id} props={item} />
              ))}

            </ul>

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
                <Spinner alt='Ícone de Carregando Resultados' style={{ width: '30px', height: 'auto', marginRight: '2px' }} />
              ) : (
                <Search alt='Ícone de Lupa' style={{ margin: '0 8px' }} />
              )}
            </button>

            {searchResults.length > 0 && (
              <button type='button' aria-label='Limpar Pesquisa' title='Limpar Pesquisa'
                onClick={() => setSearchResults([])}
              >
                X
              </button>
            )}
          </form>

          {searchResults.length > 0 && (
            <div aria-live="polite" id={Styles.search_results}>

              <ul>

                {searchResults.map((item: GameInfo) => (

                  <SearchResult key={item.id} props={item} />

                ))}

              </ul>

            </div>
          )}

        </div>

        <div className={Styles.user_account_container}>
          <Link href=''>
            Login
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
