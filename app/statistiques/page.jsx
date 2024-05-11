"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import NavBar from "@/components/Nav";
import HeroForStastiques from "@/sections/HeroForStastiques";

const StatisticsPage = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Extraire userId du cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userId"))
      ?.split("=")[1];

    if (cookieValue) {
      // Effectuer la requête GET vers l'API avec userId extrait
      axios
        // .get(`https://backendnote-zul9.onrender.com/api/user/${cookieValue}`)
        .get(`${process.env.NEXT_PUBLIC_APP_USER}/${cookieValue}`)
        .then((response) => {
          // Gérer la réponse de l'API
          // console.log(response.data);
          setUser(response.data.user);

          // Mettre à jour l'état avec les données de l'utilisateur
          // Exemple: setUserId(response.data.user._id);
        })
        .catch((error) => {
          // Gérer les erreurs de la requête
          console.error("Erreur lors de la requête GET:", error);
        });
    }
  }, []);

  return (
    <div>
      <NavBar user={user} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <HeroForStastiques user={user} />
    </div>
  );
};

export default StatisticsPage;
