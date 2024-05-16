import NavBar from "@/components/Nav";
import React from "react";

const AboutPage = () => {
  return (
    <div>
      <NavBar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          À propos de notre application de notation des professeurs
        </h1>
        <p className="text-lg mb-4">
          Notre application de notation des professeurs est conçue pour
          permettre aux étudiants de donner leur avis sur les enseignants. Nous
          croyons que la rétroaction des étudiants est essentielle pour
          améliorer la qualité de l'enseignement et créer un environnement
          d'apprentissage optimal.
        </p>
        <p className="text-lg mb-4">
          Avec notre application, les étudiants peuvent facilement trouver les
          professeurs éligibles, consulter leurs profils, et voter pour leurs
          préférés. Nous encourageons également les étudiants à partager leurs
          expériences sur les réseaux sociaux pour encourager leurs camarades à
          participer.
        </p>
        <p className="text-lg mb-4">
          Notre objectif est de créer une communauté d'apprentissage
          collaborative où chacun peut contribuer à améliorer la qualité de
          l'éducation. Nous croyons en la transparence, l'équité et l'engagement
          des étudiants dans le processus d'évaluation des enseignants.
        </p>
        <p className="text-lg mb-4">
          Nous sommes impatients de voir notre application bénéficier à la fois
          aux étudiants et aux enseignants, en favorisant une culture de
          l'excellence et de l'amélioration continue dans l'enseignement.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
