import React from "react";
import NavBar from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Faq",
};
const FaqPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">FAQ</h1>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Question 1 : Qu'est-ce que l'application de notation des
              professeurs ?
            </h2>
            <p className="text-lg mb-4">
              L'application de notation des professeurs est un outil innovant
              conçu pour permettre aux étudiants de donner une note de 1 à 5 à
              leurs enseignants.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Question 2 : Qui a développé cette application ?
            </h2>
            <p className="text-lg mb-4">
              L'application a été développée par Adinsi Abdias, un développeur
              fullstack passionné par l'éducation et la technologie.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Question 3 : Comment puis-je utiliser l'application ?
            </h2>
            <p className="text-lg mb-4">
              Pour utiliser l'application, il vous suffit de vous inscrire avec
              votre mail dans votre université,
              <span style={{ fontWeight: "bold" }}>
                Un mot de passe de 4 mots vous seront communiquer par vos
                responsables de salle
              </span>{" "}
              qui permettra de rechercher vos professeurs et de leur attribuer
              des notes en fonction de leur performance.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Question 4 : Mes notes sont-elles anonymes ?
            </h2>
            <p className="text-lg mb-4">
              Oui, vos notes sont anonymes. Les professeurs ne peuvent pas voir
              qui leur a attribué quelle note.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Question 5 : Où vont les fonds générés par l'application ?
            </h2>
            <p className="text-lg mb-4">
              Une partie des bénéfices générés par notre application sera
              reversée à un orphelinat local pour soutenir les enfants
              orphelins.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FaqPage;
