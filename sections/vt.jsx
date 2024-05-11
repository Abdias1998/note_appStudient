"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { requete } from "@/utils/requete";
import { Skeleton } from "primereact/skeleton";
import Image from "next/image";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

import Modal from "react-modal"; // Importer le composant Modal
const VoteCard = ({ user }) => {
  const [rating, setRating] = useState(0);
  const [voted, setVoted] = useState(false);
  const [userId, setUserId] = useState(null);

  const [profData, setProfData] = useState(null);
  const [ratings, setRatings] = useState({}); // Maintenir les états de notation pour chaque professeur
  const [selectedRating, setSelectedRating] = useState(null); // Stocker la notation sélectionnée

  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false); // État pour contrôler l'ouverture/la fermeture du modal
  const [modalContent, setModalContent] = useState(""); // Contenu du modal
  const [visible, setVisible] = useState(false);

  // Fonction pour ouvrir le modal avec le contenu spécifié
  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleRatingChange = (profId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [profId]: rating,
    }));
    setSelectedRating(rating); // Stocker la notation sélectionnée
  };

  const handleVote = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:7200/api/prof/addRatingToProfessor/${id}`,
        { valueNote: selectedRating, studiantId: user._id }
      );
      setVoted(true);
      setLoading(false);
      openModal(response.data.message); // Ouvrir le modal avec le contenu de la réponse de l'API
    } catch (error) {
      console.error("Erreur lors du vote :", error);
      setLoading(false);
      openModal(error.response.data.message); // Ouvrir le modal avec le contenu de la réponse de l'API
    }
  };
  const etat = user?.etat;
  const classe = user?.classe;
  const type = user?.type;
  const serie = user?.serie;
  useEffect(() => {
    if (user) {
      axios
        .post(`http://localhost:7200/api/prof/find`, {
          etat,
          classe,
          type,
          serie,
        })
        .then((response) => {
          // Gérer la réponse de l'API
          console.log(response.data);
          setProfData(response.data);
          // Mettre à jour l'état avec les données de l'utilisateur
          // Exemple: setUserId(response.data.user._id);
        })
        .catch((error) => {
          // Gérer les erreurs de la requête
          console.error("Erreur lors de la requête GET:", error);
        });
    }
  }, [user]);
  return (
    <>
      {profData === null ? (
        <>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-3">
              <div className="flex justify-between ">
                <div className="text-xl font-semibold">
                  <Skeleton width="100px" />
                </div>
                <div className="text-gray-600">
                  <Skeleton width="50px" />
                </div>
              </div>
              <div className="text-gray-600 mb-2">
                <Skeleton width="80%" />
              </div>
              <div className="flex justify-center space-x-1 mb-4 text-3xl">
                <Skeleton shape="circle" size="100px" />
              </div>
              <div className="flex justify-center  space-x-1 mb-4 text-3xl">
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} width="30px" />
                ))}
              </div>
              <div className="flex justify-center space-x-1 mb-4 text-2xl">
                <Skeleton width="50px" />
              </div>
            </div>
          ))}
        </>
      ) : (
        profData?.map((prof) => {
          return (
            <>
              <div
                key={prof._id}
                className="bg-white shadow-lg rounded-lg p-6 mb-3"
              >
                <div className="flex justify-between ">
                  <div className="text-xl font-semibold">
                    {prof.sexe === "M" ? "Mr " : "Mme "}
                    {`${prof.firstName} ${prof.lastName}`}
                  </div>
                  <div className="text-gray-600">{prof.etat}</div>
                </div>
                <div className="text-gray-600 mb-2">{prof.cours}</div>
                <div className="flex justify-center space-x-1 mb-4 text-3xl">
                  <Image
                    width={100}
                    height={100}
                    style={{
                      borderRadius: "100%",
                    }}
                    src={prof.sexe === "M" ? "/user-h.webp" : "/user-f.webp"}
                    alt=""
                  />
                </div>

                <div className="flex justify-center  space-x-1 mb-4 text-3xl">
                  {[...Array(5)].map((_, index) => (
                    <button
                      key={index}
                      className={`text-yellow-500 ${
                        index < ratings[prof._id]
                          ? "text-yellow-600"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRatingChange(prof._id, index + 1)}
                      title={`${index + 1}`}
                    >
                      &#9733;
                    </button>
                  ))}
                </div>
                <div className="flex justify-center space-x-1 mb-4 text-2xl">
                  <p>
                    {prof.rating?.reduce(
                      (sum, item) => sum + item.valueNote / prof.rating?.length,
                      0
                    )}
                    /5
                  </p>
                </div>

                <div className="flex justify-center mb-4">
                  {loading ? (
                    <button
                      onClick={() => handleVote(prof._id)}
                      className={`bg-blue-500 text-white py-2 px-4 rounded ${
                        voted
                          ? "cursor-not-allowed opacity-50 "
                          : "hover:bg-blue-600"
                      }`}
                      disabled
                    >
                      {voted ? "Vote enregistré" : "Vote"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleVote(prof._id)}
                      className={`bg-blue-500 text-white py-2 px-4 rounded ${
                        voted
                          ? "cursor-not-allowed opacity-50 "
                          : "hover:bg-blue-600"
                      }`}
                      disabled={voted}
                    >
                      {voted ? "Vote enregistré" : "Vote"}
                    </button>
                  )}

                  <div className="card flex justify-content-center">
                    <Button
                      label="Show"
                      icon="pi pi-external-link"
                      onClick={() => setVisible(true)}
                    />
                  </div>
                </div>
              </div>
            </>
          );
        })
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Message Modal"
      >
        <div>{modalContent}</div>
        <button onClick={closeModal}>Fermer</button>
      </Modal>
    </>
  );
};

export default VoteCard;
