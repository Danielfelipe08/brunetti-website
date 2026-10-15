import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { HomeAnchorNavigation } from "@/components/layout/HomeAnchorNavigation";
import { Header } from "@/components/layout/Header";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeManifesto } from "@/components/sections/HomeManifesto";
import { HomeMakeover } from "@/components/sections/HomeMakeover";
import { HomeMoments } from "@/components/sections/HomeMoments";

import { HomeWork } from "@/components/sections/HomeWork";
import { HomeTeam } from "@/components/sections/HomeTeam";
import { HomeGallery } from "@/components/sections/HomeGallery";
import { HomeInvitation } from "@/components/sections/HomeInvitation";
import { Footer } from "@/components/layout/Footer";

const serif = Fraunces({
  variable: "--font-hero-serif",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});
const sans = Hanken_Grotesk({
  variable: "--font-hero-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export default function Home() {
  return (
    <div className={`relative brunetti-home ${serif.variable} ${sans.variable}`}>
      <HomeAnchorNavigation />
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <HomeHero />
        <HomeManifesto />
        <HomeMakeover />
        <HomeMoments />
        <HomeWork />
        <HomeTeam />
        <HomeGallery />
        <HomeInvitation />
      </main>
      <Footer />
    </div>
  );
}
