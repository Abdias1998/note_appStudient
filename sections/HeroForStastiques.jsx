"use client";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { useSelector } from "react-redux";
const HeroForStastiques = () => {
  const [professors, setProfessors] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user?.user);
  const profs = useSelector((state) => state.profs?.profs);
  useEffect(() => {
    if (user && profs.length > 0) {
      setLoading(false);
    }
  }, [user, profs]);

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
            <DataTable value={profs} emptyMessage="Aucun professeur trouvé">
              <Column field="name" header="Nom du Professeur" />
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
