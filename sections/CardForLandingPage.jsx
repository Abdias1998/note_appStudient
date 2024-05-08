"use client";
import { useState } from "react";

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">
        À propos de notre application de prise de notes en ligne
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {professorsData.slice(startIndex, endIndex).map((professor, index) => (
          <div
            key={startIndex + index}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            <img
              className="h-24 w-24 rounded-full mb-2"
              src={professor.imageUrl}
              alt={`${professor.name}'s photo`}
            />
            <h2 className="text-lg font-semibold mb-1">{professor.name}</h2>
            <div className="flex items-center mb-1">
              <svg
                className="h-5 w-5 text-yellow-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1.5a.75.75 0 0 1 .672.418l1.882 3.815 4.213.614a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L10 14.697l-3.766 1.985a.75.75 0 0 1-1.088-.79l.719-4.193L.818 7.526a.75.75 0 0 1 .416-1.28l4.213-.613L9.328 1.92A.75.75 0 0 1 10 1.5zM10 16a.75.75 0 0 1 .5.19l3.124 2.605-.938-5.477a.75.75 0 0 1 .216-.656l3.073-3a.75.75 0 0 1 .414-.122l4.04-.587-5.586-.73a.75.75 0 0 1-.565-.414L10 3.885V16z"
                />
              </svg>
              <span>{professor.totalRating}</span>
            </div>
            <div className="flex items-center mb-2">
              <svg
                className="h-5 w-5 text-indigo-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 3a1 1 0 0 0-1 1v12a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1zm5 0a1 1 0 0 0-1 1v12a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1zm5 2a1 1 0 0 0-1-1V6.5a.5.5 0 0 0 1 0V4zm0 6.5a.5.5 0 0 0-1 0v1.5a.5.5 0 0 0 1 0V10zm0 3a.5.5 0 0 0-1 0v1.5a.5.5 0 0 0 1 0V13zm0 3a.5.5 0 0 0-1 0v1.5a.5.5 0 0 0 1 0V16zM6 6.5a.5.5 0 0 0-1 0V8a1 1 0 0 0-2 0v8a1 1 0 0 0 2 0v1.5a.5.5 0 0 0 1 0V16a1 1 0 0 0 2 0v-7a1 1 0 0 0-2 0v1.5a.5.5 0 0 0-1 0V6.5zM5 14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2zm0-6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2zm0-6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2zm0 6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2zm13 5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v9zm0 3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1zm0-6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v5zm0-9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2zm0 12a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1z"
                />
              </svg>
              <span>{professor.institution}</span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Voir les stats
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
          disabled={endIndex >= professorsData.length}
          className={`px-4 py-2 rounded-md ${
            endIndex >= professorsData.length
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default CardForLandingPage;
