import Styles from './Home.module.css'
import { BackgroundImage } from '../styles/HomeStyles'
import { fetchHomePageData } from '../api/IGDB'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Plus from '../public/img/icons/PlusSolid'
import NextArrow from '../public/img/icons/NextArrow'
import CarouselItem from '@/components/CarouselItem'
import PageLoading from '@/components/PageLoading'
import GameGenreCard from '@/components/GameGenreCard'
import CustomDocumentHead from '@/components/CustomDocumentHead'

interface HomePage {

  heroSection: GameInfo[],
  genreSection: GameInfo[],
  platformSection: GameInfo[],
  themeSection: Themes[]

}

export default function Home() {

  const [homePageData, setHomePageData] = useState<HomePage>()

  // indicates the index game from hero section  
  const [heroGameInfoIndex, setHeroGameInfoIndex] = useState<number>(0)
  const [backgroundHeroIndex, setBackgroundHeroIndex] = useState<number>(0)

  // index for the carousel buttons on each section
  const [carouselRowNumber, setCarouselRowNumber] = useState<number>(0)
  const [genreContainerRowNumber, setGenreContainerRowNumber] = useState<number>(0)
  // const [platformCarouselRowNumber, setPlatformCarouselRowNumber] = useState<number>(0)

  // randomize the index for background image or any other component that needs a random numb
  function randomizeIndex(array: any) {

    return Math.floor(Math.random() * array.length) || 0

  }

  async function getData() {

    const pageData = await fetchHomePageData('horror', '48')

    const heroSectionData = pageData[0].result

    setHeroGameInfoIndex(randomizeIndex(heroSectionData))

    setBackgroundHeroIndex(
      randomizeIndex(heroSectionData[heroGameInfoIndex].artworks ?
        heroSectionData[heroGameInfoIndex].artworks : heroSectionData[heroGameInfoIndex].screenshots)
    )
    
    // setPlatformCarouselRowNumber(genreGames.length / 2)

    // defines when page load is done
    setHomePageData(
      {
        heroSection: pageData[0].result,
        genreSection: pageData[1].result,
        platformSection: pageData[2].result,
        themeSection: pageData[3].result
      }
    )

  }

  // returns array with the range that should be shown on carousel 
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

    setHeroGameInfoIndex(homePageData!.heroSection.indexOf(gameHovered))

    setBackgroundHeroIndex(
      randomizeIndex(
        homePageData!.heroSection[homePageData!.heroSection.indexOf(gameHovered)].artworks ?
          homePageData!.heroSection[homePageData!.heroSection.indexOf(gameHovered)].artworks : homePageData!.heroSection[homePageData!.heroSection.indexOf(gameHovered)].screenshots
      ))

  }

  if (!homePageData) {
    return (
      <>
        <PageLoading />
      </>
    )
  }

  return (
    <>
      <CustomDocumentHead title='Home' />

      <BackgroundImage
        {...homePageData!.heroSection[heroGameInfoIndex].artworks ?
          homePageData!.heroSection[heroGameInfoIndex].artworks[backgroundHeroIndex] :
          homePageData!.heroSection[heroGameInfoIndex].screenshots[backgroundHeroIndex]
        }
        id={Styles.container}
      />

      <section id={Styles.hero_game_info} className={`${Styles.section_margin} ${Styles.fix_position_absolute}`}>

        <div>

          <h1><Link href={`/game/${homePageData!.heroSection[heroGameInfoIndex].slug}`}>{homePageData!.heroSection[heroGameInfoIndex].name}</Link></h1>

          {homePageData!.heroSection[heroGameInfoIndex].game_modes.length > 0 && (
            <ul>
              {homePageData!.heroSection[heroGameInfoIndex].game_modes.slice(0, 3).map((item: { name: string, slug: string }, key: any) => (
                <li key={key}><Link href={`/game-mode/${item.slug}`}>{item.name}</Link></li>
              ))}
              {homePageData!.heroSection[heroGameInfoIndex].game_modes.length > 3 && (
                <li>e mais.</li>
              )}
            </ul>
          )}

          <button role='link'
            onClick={() => router.push(`/game/${homePageData!.heroSection[0].slug}`)}>
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

            <button
              disabled={carouselRowNumber === homePageData!.heroSection.length ? true : false} onClick={() => setCarouselRowNumber((curr) => curr + 1)}>
              <NextArrow style={{ rotate: '180deg' }} />
            </button>
          </div>

        </div>

        {screen.width >= 480 && (
          <ul aria-live="polite">
            {homePageData!.heroSection.slice(sliceFilterRange(carouselRowNumber)[0], sliceFilterRange(carouselRowNumber)[1]).map((item: GameInfo) => (
              <span key={item.id} onMouseEnter={() => hoverEvent(item)}>
                <CarouselItem props={item} />
              </span>
            ))}
          </ul>
        )}

        {screen.width <= 479 && (
          <ul aria-live="polite">
            {homePageData!.heroSection.map((item: GameInfo) => (
              <CarouselItem key={item.id} props={item} />
            ))}
          </ul>
        )}

        <div id={Styles.carousel_indicators}>
          {homePageData!.heroSection.slice(0, 2).map((item: GameInfo, key: number) => (
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
              {homePageData?.genreSection.map((item: GameInfo) => (
                <GameGenreCard key={item.id} props={item} />
              ))}
            </ul>
          ) : (<ul>
            {homePageData?.genreSection.slice(genreContainerRowNumber * 3, (genreContainerRowNumber + 1) * 3).map((item: GameInfo) => (
              <GameGenreCard key={item.id} props={item} />
            ))}
          </ul>)}

          <div className={Styles.buttons_container}>
            <button
              disabled={genreContainerRowNumber === 0 ? true : false}
              onClick={() => setGenreContainerRowNumber((curr) => curr - 1)}>
              <NextArrow />
            </button>

            <button
              disabled={genreContainerRowNumber === homePageData?.heroSection.length ? true : false}
              onClick={() => setGenreContainerRowNumber((curr) => curr + 1)}>
              <NextArrow style={{ rotate: '180deg' }} />
            </button>
          </div>

        </div>

      </section>

      {/* <section id={Styles.popular_platform_game} className={` ${Styles.position_top}`}>

        <BackgroundImage
          {...homePageData?.platformSection[platformCarouselRowNumber].artworks[0]}
        />

        <div id={Styles.info_wrapper} className={Styles.fix_position_absolute}>

          <h2>Popular Playstation Games</h2>

          <h3>{homePageData?.platformSection[platformCarouselRowNumber].name}</h3>

          {homePageData?.platformSection[platformCarouselRowNumber].genres && (
            <ul id={Styles.genres_list}>
              {homePageData?.platformSection[platformCarouselRowNumber].genres.map(
                (item: Genres) => (
                  <li key={item.slug}>{(item.name).toUpperCase()}</li>
                )
              )}
            </ul>
          )}

          <div className={Styles.game_list_container}>

            <div id={Styles.carousel_container}>
              <ul aria-live="polite">
                {homePageData?.platformSection.map((item: GameInfo, key: any) => (
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
                  disabled={platformCarouselRowNumber === (homePageData?.platformSection.length - 1) ? true : false}
                  onClick={() => setPlatformCarouselRowNumber((curr) => curr + 1)}
                >
                  <NextArrow style={{ rotate: '180deg' }} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </section> */}

      {homePageData?.themeSection && (
        <section id={Styles.themes_category} className={`${Styles.max_width} ${Styles.position_top}`}>

          <h2>Categorias</h2>

          <ul>
            {homePageData!.themeSection.map((item: Themes) => (
              <li key={item.id}>
                <Link href={`/genre/${item.slug}`}>{item.name}</Link>
              </li>
            ))}
          </ul>

        </section>

      )}

    </>
  )
}
