"use client";
import { requete } from "@/utils/requete";
import axios from "axios";
import { useEffect, useState } from "react";

import { Skeleton } from "primereact/skeleton";
import { Button } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfs, getAllprofs } from "@/GlobalRedux/features/prof.reducers";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

// Exemple de données
const professorsData = [
  {
    name: "John Doe",
    totalRating: 125,
    institution: "University A",
    imageUrl: "./next.svg",
  },
  { name: "Jane Smith", totalRating: 98, institution: "University B" },
  { name: "Michael Johnson", totalRating: 150, institution: "University C" },
  { name: "Michael Johnson", totalRating: 150, institution: "University C" },
  // Ajoutez plus de données au besoin
];

const pageSize = 3; // Nombre de cartes par page

const CardForLandingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const profs = useSelector((state) => state.profs?.profs);
  const classe = user.classe;
  const serie = user.serie;
  const type = user.type;
  const etat = user.etat;
  const userId = user._id;

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
  // console.log(classe, serie, type, etat);
  // Calcul du début et de la fin de la plage de données à afficher
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, professorsData.length);

  // Fonction pour passer à la page suivante
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Fonction pour passer à la page précédente
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
    if (user) {
      dispatch(fetchProfs(user));
    }
  }, [user, dispatch]);
  return (
    <>
      {user ? (
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Top 3 des meilleures professeurs du/de {user.etat} série{" "}
            {user.serie} {user.type}
          </h1>

          {profs?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profs?.slice(startIndex, endIndex).map((professor, index) => (
                  <div
                    key={startIndex + index}
                    className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
                  >
                    <Image
                      className="h-24 w-24 rounded-full mb-2"
                      src={
                        professor.sexe === "M" ? "/user-h.webp" : "/user-f.webp"
                      }
                      width={30}
                      height={30}
                      alt={`${professor.name} photo`}
                    />
                    <h2 className="text-lg font-semibold mb-1">
                      {professor.name}
                    </h2>
                    <div className="flex items-center mb-1">
                      <span>{renderStars(professor.averageRating)}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span>{professor.cours}</span>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                      <Link
                        style={{ textDecoration: "none" }}
                        href="/statistiques"
                      >
                        {" "}
                        Voir les stats
                      </Link>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  Précédent
                </button>
                <button
                  onClick={nextPage}
                  disabled={endIndex >= profs?.length}
                  className={`px-4 py-2 rounded-md ${
                    endIndex >= profs?.length
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  Suivant
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
                  >
                    <Skeleton shape="circle" size="4rem" className="mb-2" />
                    <Skeleton width="80%" height="1.5rem" className="mb-1" />
                    <Skeleton width="60%" height="1rem" className="mb-1" />
                    <Skeleton width="40%" height="1rem" className="mb-2" />
                    <Button
                      disabled
                      label="Voir les stats"
                      className="bg-gray-300 py-2 px-4 rounded cursor-not-allowed"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  disabled
                  label="Précédent"
                  className="bg-gray-300 py-2 px-4 rounded cursor-not-allowed"
                />
                <Button
                  disabled
                  label="Suivant"
                  className="bg-gray-300 py-2 px-4 rounded cursor-not-allowed"
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Notez vos Professeurs
          </h1>
          <div className="flex flex-col md:flex-row">
            <div
              className="w-full md:w-1/2 bg-cover bg-center h-64 md:h-96 lg:h-128"
              style={{ backgroundImage: "url('../../../bg.jpg')" }}
            ></div>
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">
                Évaluer vos Enseignants
              </h2>
              <p className="text-lg mb-4">
                Partagez votre avis et aidez les autres étudiants à choisir les
                meilleurs professeurs.
              </p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Donnez votre Avis
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CardForLandingPage;
