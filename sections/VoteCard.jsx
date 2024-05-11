import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "primereact/skeleton";
import Image from "next/image";
import { ProgressSpinner } from "primereact/progressspinner";
import Modal from "react-modal";
import { filterNotesByStudentId } from "@/utils/hook";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import Link from "next/link";

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

const VoteCard = ({ user }) => {
  const [profData, setProfData] = useState(null);
  const [ratings, setRatings] = useState({});
  const [loadingState, setLoadingState] = useState({}); // État de chargement spécifique à chaque professeur
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [tabNote, setTabNote] = useState();
  console.log(profData);
  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleRatingChange = (rating) => {
    setRatings(rating);
  };

  const handleVote = async (id) => {
    // Vérifier si la valeur de rating pour ce professeur est une chaîne vide ou non
    if (!ratings[id]) {
      openModal("La note ne peut pas être vide.");
      return; // Arrêter l'exécution de la fonction si la note est vide
    }

    setLoadingState((prevLoadingState) => ({
      ...prevLoadingState,
      [id]: true, // Activer le chargement pour ce professeur
    }));
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_PROF}/addRatingToProfessor/${id}`,
        { valueNote: ratings[id], studiantId: user._id }
      );
      setLoadingState((prevLoadingState) => ({
        ...prevLoadingState,
        [id]: false, // Désactiver le chargement pour ce professeur
      }));
      openModal(response.data.message);
    } catch (error) {
      console.error("Erreur lors du vote :", error);
      setLoadingState((prevLoadingState) => ({
        ...prevLoadingState,
        [id]: false, // Désactiver le chargement pour ce professeur
      }));
      openModal(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user) {
      axios
        .post(`${process.env.NEXT_PUBLIC_APP_PROF}/find`, {
          etat: user.etat,
          classe: user.classe,
          type: user.type,
          serie: user.serie,
          userId: user._id,
        })
        .then((response) => {
          setProfData(response.data);

          //   console.log(tabNote);
        })

        .catch((error) => {
          console.error("Erreur lors de la requête GET:", error);
        });
    }
  }, [user]);

  return (
    <>
      {user ? (
        profData === null ? (
          <>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 mb-3"
              >
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
          profData?.map((prof) => (
            <div
              key={prof._id}
              className="bg-white shadow-lg rounded-lg p-6 mb-3"
            >
              <div className="flex justify-between">
                <div className="text-xl font-semibold">{`${
                  prof.sexe === "M" ? "Mr " : "Mme "
                }${prof.firstName} ${prof.lastName}`}</div>
                <div className="text-gray-600">{prof.etat}</div>
              </div>
              <div className="text-gray-600 mb-2">{prof.cours}</div>
              <div className="flex justify-center space-x-1 mb-4 text-3xl">
                <Image
                  width={100}
                  height={100}
                  style={{ borderRadius: "100%" }}
                  src={prof.sexe === "M" ? "/user-h.webp" : "/user-f.webp"}
                  alt=""
                />
              </div>
              <div className="flex justify-center space-x-1 mb-4 text-3xl">
                <Rating
                  // value={ratings[prof._id]}
                  readOnly={false}
                  value={
                    prof.userRating
                      ? Math.round(prof.averageRating)
                      : ratings[prof._id]
                  }
                  onChange={(e) =>
                    handleRatingChange({ ...ratings, [prof._id]: e.value })
                  }
                  cancel={false}
                />
              </div>
              <div className="flex justify-center space-x-1 mb-4 text-2xl">
                {/* <p>
                {prof.rating?.reduce(
                  (sum, item) => sum + item.valueNote / prof.rating?.length,
                  0
                )}
                /5
              </p> */}

                <p className="text-xl font-bold">
                  {prof.averageRating
                    ? prof.averageRating + "/5"
                    : "Aucun vote"}
                </p>
              </div>
              <div className="flex justify-center mb-4">
                {loadingState[prof._id] ? (
                  <ProgressSpinner
                    style={{ width: "30px", height: "30px" }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                  />
                ) : prof.averageRating ? (
                  <button
                    onClick={() => handleVote(prof._id)}
                    className={`bg-red-500 text-white py-2 px-4 rounded`}
                    disabled // Désactiver le bouton si le chargement est en cours pour ce professeur
                  >
                    Votre note est de {prof.userRating}/5
                  </button>
                ) : (
                  <button
                    onClick={() => handleVote(prof._id)}
                    className={`bg-blue-500 text-white py-2 px-4 rounded`}
                    disabled={loadingState[prof._id]} // Désactiver le bouton si le chargement est en cours pour ce professeur
                  >
                    Vote
                  </button>
                )}
              </div>
            </div>
          ))
        )
      ) : (
        <Link href="/login">Connectez-vous maintenant</Link>
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
