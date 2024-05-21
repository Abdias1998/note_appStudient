"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/Nav";
import { getAllprofs } from "@/features/prof.reducers";
import { setGetUser } from "@/features/user.reducers";
import VoteCard from "@/sections/VoteCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// export const metadata = {
//   title: "Votes",
// };
const VotePage = () => {
  const user = useSelector((state) => state.user?.user);

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
  }, []);
  // Le tableau vide [] assure que useEffect s'exécute une seule fois après l
  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .post(`${process.env.NEXT_PUBLIC_APP_PROF}/find`, {
  //         etat: user.etat,
  //         classe: user.classe,
  //         type: user.type,
  //         serie: user.serie,
  //         userId: user._id,
  //       })
  //       .then((response) => {
  //         dispatch(getAllprofs(response.data));

  //         //   console.log(tabNote);
  //       })

  //       .catch((error) => {
  //         console.error("Erreur lors de la requête GET:", error);
  //       });
  //   }
  // }, [user]);

  return (
    <div>
      <NavBar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <VoteCard user={user} />
      <Footer />
    </div>
  );
};

export default VotePage;
