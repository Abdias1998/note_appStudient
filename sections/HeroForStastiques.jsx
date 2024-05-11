"use client";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
const HeroForStastiques = ({ user }) => {
  const [professors, setProfessors] = useState(null);
  const [loading, setLoading] = useState(true);
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
          setProfessors(response.data);
          setLoading(false);
        })

        .catch((error) => {
          console.error("Erreur lors de la requête GET:", error);
        });
    }
  }, [user]);

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
              value={professors}
              emptyMessage="Aucun professeur trouvé"
            >
              <Column field="firstName" header="Nom du Professeur" />
              <Column field="totalVotes" header="Nombre total de Votes" />
              <Column field="averageRating" header="Note Moyenne" />
              <Column field="userRating" header="Votre Note" />
            </DataTable>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HeroForStastiques;
