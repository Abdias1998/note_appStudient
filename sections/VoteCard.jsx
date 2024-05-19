"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "primereact/skeleton";
import Image from "next/image";
import { ProgressSpinner } from "primereact/progressspinner";
import Modal from "react-modal";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfs, addRating } from "@/GlobalRedux/features/prof.reducers";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
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
  const dispatch = useDispatch();
  const profs = useSelector((state) => state.profs.profs);
  const [ratings, setRatings] = useState({});
  const [loadingState, setLoadingState] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
      );
    }
    if (halfStar) {
      stars.push(
        <FontAwesomeIcon
          key="half"
          icon={faStarHalfAlt}
          className="text-yellow-500"
        />
      );
    }
    return stars;
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchProfs(user));
    }
  }, [user, dispatch]);

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleRatingChange = (id, value) => {
    setRatings({ ...ratings, [id]: value });
  };

  const handleVote = async (id) => {
    if (!ratings[id]) {
      openModal("La note ne peut pas être vide.");
      return;
    }

    setLoadingState((prevLoadingState) => ({
      ...prevLoadingState,
      [id]: true,
    }));
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_PROF}/addRatingToProfessor/${id}`,
        { valueNote: ratings[id], studiantId: user._id }
      );
      setLoadingState((prevLoadingState) => ({
        ...prevLoadingState,
        [id]: false,
      }));
      dispatch(addRating({ id, rating: ratings[id] }));
      openModal(response.data.message);
    } catch (error) {
      console.error("Erreur lors du vote :", error);
      setLoadingState((prevLoadingState) => ({
        ...prevLoadingState,
        [id]: false,
      }));
      openModal(error.response.data.message);
    }
  };

  const sortedData = profs
    ? [...profs].sort((a, b) => a.firstName.localeCompare(b.firstName))
    : [];

  const filteredProfs = sortedData.filter(
    (prof) =>
      prof.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.cours.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {profs <= 0 ? (
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
              <div className="flex justify-center space-x-1 mb-4 text-3xl">
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
        <div>
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => router.push("/avis")}
              className="bg-blue-500  text-white py-2 px-4 rounded"
            >
              Donner un avis
            </button>
            <input
              type="text"
              placeholder="Rechercher par nom ou cours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>
          {filteredProfs?.map((prof) => (
            <div
              key={prof._id}
              className="bg-blue-100 shadow-lg rounded-lg p-6 mb-3"
            >
              <div className="flex justify-between">
                <div className="text-xl font-semibold">{`${
                  prof.sexe === "M" ? "Mr " : "Mme "
                }${prof.name}`}</div>
                <div className="text-gray-600">{prof.etat}</div>
              </div>
              <div className="text-gray-600 mb-2">{prof.cours}</div>
              <div className="flex justify-center space-x-1 mb-4 text-3xl">
                <Image
                  width={70}
                  height={70}
                  style={{ borderRadius: "100%" }}
                  src={prof.sexe === "M" ? "/user-h.webp" : "/user-f.webp"}
                  alt=""
                />
              </div>
              <div className="flex justify-center space-x-1 mb-4 text-xl">
                {prof.userRating ? (
                  <div className="flex">{renderStars(prof.averageRating)}</div>
                ) : (
                  <Rating
                    readOnly={prof.userRating ? true : false} // Si userRating existe, le rendu sera en lecture seule (true)
                    value={ratings[prof._id] || 0}
                    onChange={(e) => handleRatingChange(prof._id, e.value)}
                    cancel={false}
                    stars={5}
                    step={0.5} // Permet d'avoir des demi-étoiles
                  />
                )}
              </div>
              <div className="flex justify-center space-x-1 mb-4 text-2xl">
                {prof.averageRating ? (
                  <>
                    <Image
                      width={20}
                      height={20}
                      // style={{ borderRadius: "50%" }}
                      className="h-8 w-auto"
                      src="/book.webp"
                      alt=""
                    />{" "}
                    <span className="text-xl font-bold">
                      {prof.averageRating}/5
                    </span>
                  </>
                ) : (
                  <p className="text-xl font-bold">Soyez le premier à noter</p>
                )}
              </div>
              <div className="flex justify-center mb-4">
                {loadingState[prof._id] ? (
                  <ProgressSpinner
                    style={{ width: "30px", height: "30px" }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                  />
                ) : prof.userRating ? (
                  <p className="bg-blue-500 text-white py-2 px-4" disabled>
                    Votre note pour ce professeur est de {prof.userRating}/5
                  </p>
                ) : (
                  <button
                    onClick={() => handleVote(prof._id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    disabled={loadingState[prof._id]}
                  >
                    Note
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
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
