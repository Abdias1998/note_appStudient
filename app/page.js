import Heroe from "@/sections/Heroe";
import Nav from "@/components/Nav";
import Image from "next/image";
import Features from "@/sections/Features";
import Footer from "@/components/Footer";
import CardForLandingPage from "@/sections/CardForLandingPage";
import Team from "@/sections/Team";

export default function Home() {
  return (
    <>
      <Nav />

      <Heroe />
      <CardForLandingPage />
      <Features />
      <Team />
      <Footer />
    </>
  );
}
