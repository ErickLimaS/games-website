import { fetchHomePageData } from "./api/igdb";
import HeroSection from "./components/pages/Home/HeroSection";
import SpecificGenreSection from "./components/pages/Home/SpecificGenreSection";

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
      <SpecificGenreSection data={igdbData[1].result} />

    </main>
  );
}
