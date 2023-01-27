import Styles from './Home.module.css'
import { BackgroundImage } from '../styles/HomeStyles'
import { fetchGamesByGenre, fetchGamesByPlatform, fetchThemes, homePageGames } from '../api/IGDB'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Plus from '../public/img/icons/PlusSolid'
import NextArrow from '../public/img/icons/NextArrow'
import CarouselItem from '@/components/CarouselItem'
import PageLoading from '@/components/PageLoading'
import GameGenreCard from '@/components/GameGenreCard'
import CustomDocumentHead from '@/components/CustomDocumentHead'

export default function Home() {

  const [heroSectionGames, setHeroSectionGames] = useState<GameInfo[]>([])
  const [genreGames, setGenreGames] = useState<GameInfo[]>([])
  const [themes, setThemes] = useState<Themes[]>([])
  // const [platformGames, setPlatformGames] = useState<GameInfo[]>([])

  // randomize the game from hero section  
  const [heroGameInfoIndex, setHeroGameInfoIndex] = useState<number>(0)
  const [backgroundHeroIndex, setBackgroundHeroIndex] = useState<number>(0)

  const [carouselRowNumber, setCarouselRowNumber] = useState<number>(0)
  const [genreContainerRowNumber, setGenreContainerRowNumber] = useState<number>(0)
  const [platformCarouselRowNumber, setPlatformCarouselRowNumber] = useState<number>(0)

  function randomizeIndex(array: any) {

    return Math.floor(Math.random() * array.length)

  }

  async function getData() {

    const homeGames = await homePageGames()
    const genreGames = await fetchGamesByGenre('horror')
    // const platformGames = await fetchGamesByPlatform('48')
    const themesAvailable = await fetchThemes();

    setGenreGames(genreGames)
    // setPlatformGames(genreGames)

    // setPlatformCarouselRowNumber(genreGames.length / 2)

    setHeroGameInfoIndex(randomizeIndex(homeGames))

    setBackgroundHeroIndex(
      randomizeIndex(homeGames[heroGameInfoIndex].artworks ?
        homeGames[heroGameInfoIndex].artworks : homeGames[heroGameInfoIndex].screenshots)
    )

    setThemes(themesAvailable)

    // defines when page load is done
    setHeroSectionGames(homeGames)

  }

  // return array with the exact ammout of how many results should be shown on carousel 
  function sliceFilterRange(currentCarouselRow: number) {

    if (screen.width > 480 && screen.width < 660) {

      return [currentCarouselRow * 2, (currentCarouselRow + 1) * 2]

    }
    else if (screen.width >= 660 && screen.width < 860) {

      return [currentCarouselRow * 3, (currentCarouselRow + 1) * 3]

    }

    return [currentCarouselRow * 4, (currentCarouselRow + 1) * 4]

  }

  const router = useRouter()

  useEffect(() => {
    getData()
  }, [])

  function hoverEvent(gameHovered: GameInfo) {

    setHeroGameInfoIndex(heroSectionGames.indexOf(gameHovered))
    setBackgroundHeroIndex(
      randomizeIndex(heroSectionGames[heroSectionGames.indexOf(gameHovered)].artworks ?
        heroSectionGames[heroSectionGames.indexOf(gameHovered)].artworks : heroSectionGames[heroSectionGames.indexOf(gameHovered)].screenshots)
    )

  }

  return (heroSectionGames.length > 0 ? (
    <>
      <CustomDocumentHead title='Home' />

      <BackgroundImage
        {...heroSectionGames[heroGameInfoIndex].artworks ?
          heroSectionGames[heroGameInfoIndex].artworks[backgroundHeroIndex] :
          heroSectionGames[heroGameInfoIndex].screenshots[backgroundHeroIndex]
        }
        id={Styles.container}
      />

      <section id={Styles.hero_game_info} className={`${Styles.section_margin} ${Styles.fix_position_absolute}`}>

        <div>

          <h1><Link href={`/game/${heroSectionGames[heroGameInfoIndex].slug}`}>{heroSectionGames[heroGameInfoIndex].name}</Link></h1>

          {heroSectionGames[heroGameInfoIndex].game_modes.length > 0 && (
            <ul>
              {heroSectionGames[heroGameInfoIndex].game_modes.slice(0, 3).map((item: { name: string, slug: string }, key: any) => (
                <li key={key}><Link href={`/genre/${item.slug}`}>{item.name}</Link></li>
              ))}
              {heroSectionGames[heroGameInfoIndex].game_modes.length > 3 && (
                <li>e mais.</li>
              )}
            </ul>
          )}

          <button role='link' onClick={() => router.push(`/game/${heroSectionGames[0].slug}`)}>
            <Plus /> Saber Mais
          </button>

        </div>
      </section>

      <section id={Styles.carrousel}>

        <div className={Styles.section_heading}>

          <h2>Lançamentos</h2>

          <div className={Styles.buttons_container}>
            <button disabled={carouselRowNumber === 0 ? true : false} onClick={() => setCarouselRowNumber((curr) => curr - 1)}>
              <NextArrow />
            </button>

            <button disabled={carouselRowNumber === heroSectionGames.length ? true : false} onClick={() => setCarouselRowNumber((curr) => curr + 1)}>
              <NextArrow style={{ rotate: '180deg' }} />
            </button>
          </div>

        </div>

        {screen.width >= 480 && (
          <ul aria-live="polite">
            {heroSectionGames.slice(sliceFilterRange(carouselRowNumber)[0], sliceFilterRange(carouselRowNumber)[1]).map((item: GameInfo) => (
              <span key={item.id} onMouseEnter={() => hoverEvent(item)}>
                <CarouselItem props={item} />
              </span>
            ))}
          </ul>
        )}

        {screen.width <= 479 && (
          <ul aria-live="polite">
            {heroSectionGames.map((item: GameInfo) => (
              <CarouselItem key={item.id} props={item} />
            ))}
          </ul>
        )}

        <div id={Styles.carousel_indicators}>
          {heroSectionGames.slice(0, 2).map((item: GameInfo, key: number) => (
            <span key={key}
              data-active-row={carouselRowNumber === key ? true : false}
              onClick={() => setCarouselRowNumber(key)}
            ></span>
          ))}
        </div>

      </section>

      <section id={Styles.genre_games} className={`${Styles.max_width} ${Styles.position_top}`}>

        <div className={Styles.section_heading}>
          <h2>Terror +18</h2>

          <Link href={`/genre/`}>
            Ver Todos
          </Link>

        </div>

        <div className={Styles.genre_game_cards_container}>

          {screen.width < 560 ? (
            <ul>
              {genreGames.map((item: GameInfo) => (
                <GameGenreCard key={item.id} props={item} />
              ))}
            </ul>
          ) : (<ul>
            {genreGames.slice(genreContainerRowNumber * 3, (genreContainerRowNumber + 1) * 3).map((item: GameInfo) => (
              <GameGenreCard key={item.id} props={item} />
            ))}
          </ul>)}

          <div className={Styles.buttons_container}>
            <button disabled={genreContainerRowNumber === 0 ? true : false} onClick={() => setGenreContainerRowNumber((curr) => curr - 1)}>
              <NextArrow />
            </button>

            <button disabled={genreContainerRowNumber === heroSectionGames.length ? true : false} onClick={() => setGenreContainerRowNumber((curr) => curr + 1)}>
              <NextArrow style={{ rotate: '180deg' }} />
            </button>
          </div>

        </div>

      </section>

      {/* <section id={Styles.popular_platform_game} className={` ${Styles.position_top}`}>

        <BackgroundImage
          {...platformGames[platformCarouselRowNumber].artworks[0]}
        />

        <div id={Styles.info_wrapper} className={Styles.fix_position_absolute}>


          <h2>Popular Playstation Games</h2>

          <h3>{platformGames[platformCarouselRowNumber].name}</h3>

          {platformGames[platformCarouselRowNumber].genres && (
            <ul id={Styles.genres_list}>
              {platformGames[platformCarouselRowNumber].genres.map((item: Genres) => (
                <li key={item.slug}>{(item.name).toUpperCase()}</li>
              ))}
            </ul>
          )}

          <div className={Styles.game_list_container}>

            <div id={Styles.carousel_container}>
              <ul aria-live="polite">
                {platformGames.map((item: GameInfo, key: any) => (
                  <span key={item.id} data-focused={platformCarouselRowNumber == key}>
                    <CarouselItem props={item} />
                  </span>
                ))}
              </ul>

              <div className={Styles.buttons_container}>
                <button
                  disabled={platformCarouselRowNumber === 0 ? true : false}
                  onClick={() => setPlatformCarouselRowNumber((curr) => curr - 1)}
                >
                  <NextArrow />
                </button>

                <button
                  disabled={platformCarouselRowNumber === (platformGames.length - 1) ? true : false}
                  onClick={() => setPlatformCarouselRowNumber((curr) => curr + 1)}
                >
                  <NextArrow style={{ rotate: '180deg' }} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </section> */}

      {themes && (
        <section id={Styles.themes_category} className={`${Styles.max_width} ${Styles.position_top}`}>

          <h2>Categorias</h2>

          <ul>
            {themes.map((item: Themes) => (
              <li key={item.id}>
                <Link href={`/themes/${item.slug}`}>{item.name}</Link>
              </li>
            ))}
          </ul>

        </section>

      )}

    </>
  ) : (
    <PageLoading />
  ))
}

// export async function getServerSideProps(props: any) {

//   const res = await homePageGames()

//   return {
//     props: {
//       results: [res]
//     }
//   }

// }