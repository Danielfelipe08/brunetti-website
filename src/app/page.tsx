import { Header } from "@/components/layout/Header";
import { HomeHero } from "@/components/sections/HomeHero";

export default function Home() {
  return (
    <div className="relative surface-dark">
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <HomeHero />
      </main>
    </div>
  );
}
