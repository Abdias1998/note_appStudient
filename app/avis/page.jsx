"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/Nav";
import PostList from "@/sections/AvisCard";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Avis = () => {
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
  return (
    <div>
      <NavBar /> <br />
      <br />
      <br />
      <br />
      <br />
      <PostList user={user} />
      <Footer />
    </div>
  );
};

export default Avis;
