"use client";

import React, { useState } from "react";

const SearchBar = () => {
  const [selectedEstablishment, setSelectedEstablishment] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const handleSearch = () => {
    if (selectedEstablishment && selectedClass) {
      // Si les deux champs sont sélectionnés, exécuter la fonction de recherche
      onSearch(selectedEstablishment, selectedClass);
    }
  };
  const establishments = [
    {
      id: 1,
      name: "CEG VEDOKO",
    },
    {
      id: 2,
      name: "CEG NOKOE",
    },
    {
      id: 3,
      name: "CEG LES PYLONES",
    },
  ];

  const classes = ["6", "5", "4"];
  return (
    <div className="mt-12 flex items-center space-x-4">
      <select
        value={selectedEstablishment}
        onChange={(e) => setSelectedEstablishment(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Sélectionner un établissement</option>
        {establishments.map((establishment) => (
          <option key={establishment.id} value={establishment.id}>
            {establishment.name}
          </option>
        ))}
      </select>
      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Sélectionner une classe</option>
        {classes.map((classNames) => (
          <option key={classNames} value={classNames}>
            {classNames}
          </option>
        ))}
      </select>
      {selectedEstablishment && selectedClass && (
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Rechercher
        </button>
      )}
    </div>
  );
};

export default SearchBar;
