"use client";

import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfs } from "@/features/prof.reducers";

const HeroForStastiques = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const profs = useSelector((state) => state.profs?.profs);

  // useEffect(() => {
  //   if (user && profs.length > 0) {
  //     setLoading(false);
  //   }
  // }, [user, profs]);
  useEffect(() => {
    if (user) {
      dispatch(fetchProfs(user));
      setLoading(false);
    }
  }, [user, dispatch]);

  // Fonction pour afficher l'image de profil en fonction du sexe
  const profileImageBodyTemplate = (rowData) => {
    const imageUrl = rowData.sexe === "M" ? "./user-h.webp" : "./user-f.webp";
    return (
      <img
        src={imageUrl}
        alt="Profile"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
    );
  };

  // Fonction pour ajouter le numéro de rang devant le nom
  const nameWithRankBodyTemplate = (rowData, options) => {
    return `${options.rowIndex + 1}. ${rowData.name}`;
  };

  // Trier les professeurs par note moyenne décroissante
  const sortedProfs = [...profs].sort(
    (a, b) => b.averageRating - a.averageRating
  );

  return (
    <div className="p-grid p-dir-col p-align-center">
      <div className="p-col">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Statistiques des Professeurs
        </h1>
      </div>
      <div className="p-col">
        {loading ? (
          <ProgressSpinner style={{ width: "50px", height: "50px" }} />
        ) : (
          <Card>
            <DataTable
              value={sortedProfs}
              responsiveLayout="scroll"
              emptyMessage="Aucun professeur trouvé"
            >
              <Column
                field="profileImage"
                header="Profil"
                body={profileImageBodyTemplate}
                className="profile-column"
              />
              <Column
                field="name"
                header="Nom du Professeur"
                body={nameWithRankBodyTemplate}
                className="name-column"
              />
              <Column
                field="totalVotes"
                header="Nombre total de Votes"
                className="votes-column"
              />
              <Column
                field="averageRating"
                header="Note Moyenne"
                className="rating-column"
              />
              <Column
                field="userRating"
                header="Votre Note"
                className="user-rating-column"
              />
            </DataTable>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HeroForStastiques;
