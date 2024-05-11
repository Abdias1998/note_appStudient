"use client";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Heroe from "@/sections/Heroe";
import Nav from "@/components/Nav";
import Image from "next/image";
import Features from "@/sections/Features";
import Footer from "@/components/Footer";
import CardForLandingPage from "@/sections/CardForLandingPage";
import Team from "@/sections/Team";

export default function Home() {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    // Extraire userId du cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userId"))
      ?.split("=")[1];

    if (cookieValue) {
      // Effectuer la requête GET vers l'API avec userId extrait
      axios
        .get(`${process.env.NEXT_PUBLIC_APP_USER}/${cookieValue}`)
        .then((response) => {
          // Gérer la réponse de l'API
          console.log(response.data);
          setUser(response.data.user);

          // Mettre à jour l'état avec les données de l'utilisateur
          // Exemple: setUserId(response.data.user._id);
        })
        .catch((error) => {
          // Gérer les erreurs de la requête
          console.error("Erreur lors de la requête GET:", error);
        });
    }
  }, []); // Le tableau vide [] assure que useEffect s'exécute une seule fois après le montage du composant
  return (
    <>
      <Nav user={user} />

      <Heroe user={user} />
      {user && <CardForLandingPage user={user} />}

      <Features />
      <Team />
      <Footer />
    </>
  );
}
