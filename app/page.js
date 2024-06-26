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

import { setGetUser } from "@/GlobalRedux/features/user.reducers";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfs, getAllprofs } from "@/GlobalRedux/features/prof.reducers";
import PriceSection from "@/sections/PriceSEction";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const etat = user.etat;
  const classe = user.classe;
  const type = user.classe;
  const serie = user.serie;
  const userId = user._id;
  console.log(classe);
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
          // console.log(response.data);
          dispatch(setGetUser(response.data.user));

          // Mettre à jour l'état avec les données de l'utilisateur
          // Exemple: setUserId(response.data.user._id);
        })
        .catch((error) => {
          // Gérer les erreurs de la requête
          console.error("Erreur lors de la requête GET:", error);
        });
    }
  }, []); // Le tableau vide [] assure que useEffect s'exécute une seule fois après le montage du composant
  useEffect(() => {
    if (user) {
      dispatch(fetchProfs(user));
    }
  }, [user, dispatch]);
  return (
    <>
      <Nav user={user} />
      <Heroe />
      <CardForLandingPage />
      <Features />
      <PriceSection />
      <Team />
      <Footer />
    </>
  );
}
