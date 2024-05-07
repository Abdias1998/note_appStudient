import NavBar from "@/components/Nav";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-12 px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          À propos de notre application de prise de notes en ligne
        </h1>
        <p className="text-lg mb-4">
          Notre application de prise de notes en ligne est conçue pour vous
          aider à organiser vos idées, vos tâches et vos projets de manière
          efficace et simple. Que vous soyez un étudiant, un professionnel ou
          simplement quelqu'un qui aime rester organisé, notre application est
          là pour vous aider.
        </p>
        <h2 className="text-xl font-semibold mb-2">
          Fonctionnalités principales :
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Création, modification et suppression de notes</li>
          <li>Organisation des notes par catégories ou étiquettes</li>
          <li>Partage de notes avec d'autres utilisateurs</li>
          <li>Synchronisation sur plusieurs appareils</li>
          <li>Protection des données avec un cryptage sécurisé</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Notre équipe :</h2>
        <p className="mb-4">
          Notre équipe est composée de développeurs passionnés par la création
          d'outils qui simplifient la vie quotidienne de nos utilisateurs. Nous
          nous engageons à fournir une expérience utilisateur exceptionnelle et
          à améliorer constamment notre application en fonction des retours de
          nos utilisateurs.
        </p>
        <h2 className="text-xl font-semibold mb-2">Contactez-nous :</h2>
        <p className="mb-4">
          Si vous avez des questions, des commentaires ou des suggestions,
          n'hésitez pas à nous contacter. Nous sommes toujours heureux
          d'entendre parler de votre expérience avec notre application et
          d'aider de quelque manière que ce soit.
        </p>
        <p className="mb-4">
          Email :{" "}
          <a href="mailto:contact@monappdenotes.com">
            contact@monappdenotes.com
          </a>
        </p>
      </div>
    </>
  );
};

export default AboutPage;
