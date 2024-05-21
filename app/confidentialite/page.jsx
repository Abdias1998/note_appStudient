import React from "react";
import NavBar from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Politique de Confidentialité",
};
const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Politique de confidentialité
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-4">
            Cette Politique de confidentialité décrit comment le groupe{" "}
            <span>CodeClean</span> recueille, utilise et partage les
            informations des utilisateurs de notre application de notation des
            professeur.
          </p>
          <h2 className="text-xl font-semibold mb-2">
            Informations que nous recueillons
          </h2>
          <p className="text-lg mb-4">
            Nous ne recueillons aucune information personnelle identifiable
            directement à partir de l'application. Cependant, nous pouvons
            collecter des informations non personnelles telles que le type de
            dispositif, la version du système d'exploitation, l'identifiant
            unique de l'appareil et d'autres informations similaires pour
            améliorer l'expérience utilisateur et analyser les tendances de
            l'utilisation.
          </p>
          <h2 className="text-xl font-semibold mb-2">
            Utilisation des informations
          </h2>
          <p className="text-lg mb-4">
            Les informations non personnelles collectées peuvent être utilisées
            pour :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Personnaliser et améliorer l'expérience de l'utilisateur</li>
            <li>Analyser les tendances d'utilisation de l'application</li>
            <li>Diagnostiquer et résoudre les problèmes techniques</li>
            <li>
              Communiquer avec les utilisateurs concernant l'application et ses
              mises à jour
            </li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">
            Partage des informations
          </h2>
          <p className="text-lg mb-4">
            Nous ne partageons pas les informations collectées avec des tiers,
            sauf dans les cas suivants :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Lorsque cela est nécessaire pour se conformer à la loi ou pour
              protéger nos droits légaux
            </li>
            <li>
              Avec des fournisseurs de services tiers qui nous aident à
              exploiter l'application et à fournir des fonctionnalités (par
              exemple, des services d'analyse)
            </li>
            <li>
              Dans le cadre d'une transaction commerciale telle qu'une fusion,
              une acquisition ou une vente d'actifs
            </li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">
            Sécurité des informations
          </h2>
          <p className="text-lg mb-4">
            Nous mettons en œuvre des mesures de sécurité appropriées pour
            protéger les informations contre la perte, l'usage abusif et l'accès
            non autorisé.
          </p>
          <h2 className="text-xl font-semibold mb-2">Consentement</h2>
          <p className="text-lg mb-4">
            En utilisant notre application, vous consentez à notre Politique de
            confidentialité.
          </p>
          <h2 className="text-xl font-semibold mb-2">Contactez-nous</h2>
          <p className="text-lg mb-4">
            Si vous avez des questions ou des préoccupations concernant cette
            Politique de confidentialité, veuillez nous contacter +229 55 83 18
            70.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
