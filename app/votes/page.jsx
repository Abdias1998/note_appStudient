"use client";
import NavBar from "@/components/Nav";
import VoteCard from "@/sections/VoteCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const VotePage = () => {
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
          //   console.log(response.data);
          setUser(response.data.user);
          // console.log(user);
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
      <VoteCard user={user} />
    </div>
  );
};

export default VotePage;
