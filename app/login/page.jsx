"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProgressSpinner } from "primereact/progressspinner";
// export const metadata = {
//   title: "Se Connecter",
// };
const LoginPage = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // État pour suivre le chargement

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Définir l'état de chargement sur vrai lors de la soumission du formulaire
    if (!navigator.onLine) {
      setLoading(false);
      setError("Vérifiez votre connexion internet et réessayez");
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 8000);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_USER}/login`,
        {
          identifier,
          password,
        }
      );
      if (response.status === 200) {
        // Définir la date d'expiration du cookie dans 7 jours
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 21);

        // Formater la date d'expiration selon le format UTC
        const expirationDateString = expirationDate.toUTCString();

        // Créer le cookie avec la date d'expiration
        document.cookie = `userId=${response.data.userId}; expires=${expirationDateString}; path=/`;

        // Afficher le popup avec la réponse du serveur
        toast.success("Connexion réussie!");

        router.push("/");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 8000);
      } else {
        setError(
          "Une erreur interne du serveur,veuillez réessayez plus tard !"
        );
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 8000);
      }
    }
    setLoading(false); // Définir l'état de chargement sur faux après le traitement
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Connexion
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse mail ou Numéro de tél
              </label>
              <div className="mt-1">
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="identifier"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex justify-center">
              {loading ? (
                <div className="card flex justify-center">
                  <ProgressSpinner
                    style={{ width: "35px", height: "35px" }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                  />
                </div>
              ) : (
                <button
                  type="submit"
                  className="relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Se connecter
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
