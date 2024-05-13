"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import NavBar from "@/components/Nav";
import HeroForStastiques from "@/sections/HeroForStastiques";
import { useDispatch } from "react-redux";
import { setGetUser } from "@/features/user.reducers";

const StatisticsPage = () => {
  const dispatch = useDispatch();

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

  return (
    <div>
      <NavBar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <HeroForStastiques />
    </div>
  );
};

export default StatisticsPage;
