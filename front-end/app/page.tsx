import { fetchHomePageData } from "./api/igdb";
import HeroSection from "./components/pages/Home/HeroSection";
import SpecificGenreSection from "./components/pages/Home/SpecificGenreSection";
import PopularPlatformGamesSection from "./components/pages/Home/PopularPlatformGames";
import GenresSection from "./components/pages/Home/GenresSection";

export async function generateMetadata() {

  return {
    title: "Home | My Next Game",
    description: ``,
  }

}

export default async function Home() {

  const igdbData = await fetchHomePageData("horror", "130")

  return (
    <main>

      {/* HERO */}
      <HeroSection data={igdbData[0].result} />

      {/* HORROR GAMES */}
      <SpecificGenreSection data={igdbData[1].result} genre={igdbData[1].name} />

      {/* POPULAR PLATFORM GAMES */}
      <PopularPlatformGamesSection data={igdbData[2].result} />

      {/* ALL GENRES */}
      <GenresSection />

    </main>
  );
}
