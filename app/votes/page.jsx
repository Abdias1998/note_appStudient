"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { requete } from "@/utils/requete";

const VoteCard = () => {
  const [rating, setRating] = useState(0);
  const [voted, setVoted] = useState(false);
  const [user, setUser] = useState(null);

  // const classe = user.classe;
  // const serie = user.serie;
  // const type = user.type;
  // const etat = user.etat;
  const handleVote = async () => {
    try {
      // const response = await axios.post(
      //   `/api/candidate/${candidate._id}/vote`,
      //   { rating }
      // );
      // console.log(response.data);
      console.log(rating);
      setVoted(true);
    } catch (error) {
      console.error("Erreur lors du vote :", error);
    }
  };

  useEffect(() => {
    // Extraire userId du cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userId"))
      ?.split("=")[1];

    if (cookieValue) {
      // Effectuer la requête GET vers l'API avec userId extrait
      axios
        .get(`${requete.user}/${cookieValue}`)
        .then((response) => {
          // Gérer la réponse de l'API
          console.log(response + "page vote");
          setUser(response.data);
          console.log(user);

          // Mettre à jour l'état avec les données de l'utilisateur
          // Exemple: setUserId(response.data.user._id);
        })
        .catch((error) => {
          // Gérer les erreurs de la requête
          console.error("Erreur lors de la requête GET:", error);
        });
    }
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .post(`http://localhost:7200/api/prof/find`, {
  //         etat,
  //         classe,
  //         type,
  //         serie,
  //       })
  //       .then((response) => {
  //         // Gérer la réponse de l'API
  //         console.log(response.data);
  //         setProfData(response.data);
  //         // Mettre à jour l'état avec les données de l'utilisateur
  //         // Exemple: setUserId(response.data.user._id);
  //       })
  //       .catch((error) => {
  //         // Gérer les erreurs de la requête
  //         console.error("Erreur lors de la requête GET:", error);
  //       });
  //   }
  // }, []);
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between ">
        <div className="text-xl font-semibold">Adinsi</div>
        <div className="text-gray-600">CEG VEDOKO</div>
      </div>
      <div className="text-gray-600 mb-2">Math</div>
      <div className="flex justify-center space-x-1 mb-4 text-3xl">
        <img
          style={{ borderRadius: "100%", width: "100px", height: "100px" }}
          src="./vercel.svg"
          alt=""
        />
      </div>
      <div className="flex justify-center space-x-1 mb-4 text-3xl">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            className={`text-yellow-500 ${
              index < rating ? "text-yellow-600" : "text-gray-300"
            }`}
            onClick={() => setRating(index + 1)}
          >
            &#9733;
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={handleVote}
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            voted ? "cursor-not-allowed opacity-50 " : "hover:bg-blue-600"
          }`}
          disabled={voted}
        >
          {voted ? "Vote enregistré" : "Vote"}
        </button>
      </div>
    </div>
  );
};

export default VoteCard;
