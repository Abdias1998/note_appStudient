import Footer from "@/components/Footer";
import NavBar from "@/components/Nav";
import React from "react";

export const metadata = {
  title: "About",
};
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
          Bienvenue sur notre application de notation des professeurs, un outil
          innovant conçu pour permettre aux étudiants de donner une note de 1 à
          5 à leurs enseignants. Cette plateforme vise à offrir une chance aux
          étudiants d'exprimer leur opinion et de contribuer à l'amélioration de
          la qualité de l'enseignement.
        </p>
        <p className="text-lg mb-4">
          Développée par Adinsi Abdias, un développeur fullstack passionné par
          l'éducation et la technologie, notre application a pour objectif
          principal de donner une voix aux étudiants dans le processus
          d'évaluation des enseignants. En permettant une notation honnête et
          transparente, nous espérons encourager une culture d'amélioration
          continue et de responsabilité académique.
        </p>
        <p className="text-lg mb-4">
          Avec notre application, les étudiants peuvent facilement trouver leurs
          professeurs dans la{" "}
          <span style={{ fontWeight: "bold" }}>page Votes</span> et leur
          attribuer des notes en fonction de leur performance. Chaque note
          contribue à une moyenne globale qui aide à identifier les points forts
          et les domaines à améliorer pour chaque enseignant.
        </p>
        <p className="text-lg mb-4">
          En outre, une partie des bénéfices générés par notre application sera
          reversée à un orphelinat local pour soutenir les enfants orphelins.
          Nous sommes fiers de contribuer à cette cause sociale et de faire une
          différence dans la vie des plus vulnérables de notre société.
        </p>
        <p className="text-lg mb-4">
          Nous sommes enthousiastes à l'idée de voir comment notre application
          peut bénéficier à la fois aux étudiants et aux enseignants. En
          favorisant une culture de l'excellence et de l'amélioration continue,
          nous aspirons à rendre l'expérience éducative meilleure pour tout le
          monde.
        </p>
        <p className="text-lg mb-4">
          Merci d'utiliser notre application et de faire partie de cette
          initiative pour une éducation de qualité. Nous sommes impatients de
          voir vos contributions et d'œuvrer ensemble pour un avenir académique
          plus brillant.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
