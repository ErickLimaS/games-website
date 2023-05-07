import React, { useEffect, useState } from 'react'
import Styles from './PlatformsStyles.module.css'
import PlatformListItem from '@/components/PlatformListItem'
import { fetchPlatforms, searchPlatform } from '@/api/IGDB'
import CustomDocumentHead from '@/components/CustomDocumentHead'
import Router from 'next/router'
import * as SVG from '../../public/img/icons'
import PageLoading from '@/components/PageLoading'

interface PlatformPage {

  all: Platform[],
  sony: Platform[],
  microsoft: Platform[],
  nintendo: Platform[],

}

function Platforms() {

  const [pageData, setPageData] = useState<PlatformPage>()

  const [loading, setLoading] = useState<boolean>(false)

  const [searchResults, setSearchResults] = useState<Platform[] | null>(null)

  const [tabIndex, setTabIndex] = useState<number>(1) //iniciates at 'ALL' section tab

  const searchInput = React.useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    if (searchInput.current?.value == "") {

      e.preventDefault()

      return 

    }

  }

  async function fetchData() {

    setLoading(true)

    const res = await fetchPlatforms()

    setPageData(
      {
        all: res[0].result,
        sony: res[1].result,
        microsoft: res[2].result,
        nintendo: res[3].result,
      }
    )

    if (Router.query.search) {

      const results: Platform[] = await searchPlatform(Router.query.search as string)

      setSearchResults(results)

      setTabIndex(0) // directs to tab results

    }

    setLoading(false)
  }

  useEffect(() => {

    fetchData()

  }, [])

  return (
    <>
      <CustomDocumentHead title='Plataformas' />
      <div className={Styles.container}>

        <section id={Styles.first_content}>

          <div className={Styles.form_container} data-has-search-results={!loading}>

            <h1>Plataformas</h1>

            <div className={Styles.search_input}>

              <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                  <input placeholder='ex: PlayStation 4' name='search' ref={searchInput}></input>
                </label>
                <button type='submit'>
                  Procurar<span><SVG.Search alt="Lupa"/></span>
                </button>
              </form>

            </div>

            <p>Procure pelo console que desejar!</p>

          </div>

        </section>

        <div>

          <section id={Styles.platform_list}>

            <ul role='tablist'>
              <li>
                <button role='tab' onClick={() => setTabIndex(0)}
                  aria-selected={searchResults != null && tabIndex === 0}
                  hidden={loading == false && searchResults == null}
                  data-has-results={searchResults != null}
                >
                  {loading ? (
                    <SVG.Spinner1S200Px height={24} width={24} transform={"scale(2)"} />
                  ) : (
                      <><span><SVG.Search alt="Lupa" /></span> Resultados</>
                  )}
                </button>
              </li>

              <li>
                <button role='tab' onClick={() => setTabIndex(1)} aria-selected={tabIndex === 1}>
                  <span><SVG.Arcade alt="Controle" /></span> Todos
                </button>
              </li>
              <li>
                <button role='tab' onClick={() => setTabIndex(2)} aria-selected={tabIndex === 2}>
                  <span><SVG.Playstation alt="Playstation Logo" /></span> Sony
                </button>
              </li>
              <li>
                <button role='tab' onClick={() => setTabIndex(3)} aria-selected={tabIndex === 3}>
                  <span><SVG.Xbox alt="Xbox Logo" /></span> Microsoft
                </button>
              </li>
              <li>
                <button role='tab' onClick={() => setTabIndex(4)} aria-selected={tabIndex === 4}>
                  <span><SVG.NintendoSwitch alt="Nintendo Switch Logo" /></span> Nintendo
                </button>
              </li>

            </ul>

            {loading && (
              <div id={Styles.loading_container}>
                <PageLoading height={"25vh"} />
              </div>
            )}

            <div role='tabpanel' hidden={tabIndex != 0}>

              <ul>

                {searchResults ? (
                  searchResults!.map((item) => (

                    <li>
                      <PlatformListItem props={item} />
                    </li>

                  ))

                ) : (
                  <p>Sem resultados.</p>
                )}

              </ul>

            </div>

            <div role='tabpanel' hidden={tabIndex != 1}>

              <ul>

                {pageData?.all.map((item) => (

                  <li>
                    <PlatformListItem props={item} />
                  </li>

                ))}

              </ul>

            </div>

            <div role='tabpanel' hidden={tabIndex != 2}>

              <ul>
                {pageData?.sony.map((item) => (

                  <li>
                    <PlatformListItem props={item} />
                  </li>

                ))}
              </ul>

            </div>

            <div role='tabpanel' hidden={tabIndex != 3}>

              <ul>
                {pageData?.microsoft.map((item) => (

                  <li>
                    <PlatformListItem props={item} />
                  </li>

                ))}
              </ul>

            </div>

            <div role='tabpanel' hidden={tabIndex != 4}>

              <ul>
                {pageData?.nintendo.map((item) => (

                  <li>
                    <PlatformListItem props={item} />
                  </li>

                ))}
              </ul>

            </div>

          </section>

        </div>

      </div>
    </>
  )
}

export default Platforms