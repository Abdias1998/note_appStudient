"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Erreur 404</h1>
      <p style={styles.text}>
        Désolé, la page que vous recherchez n'existe pas.
      </p>
      <button onClick={handleBackToHome} style={styles.button}>
        Retour à l'accueil
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: "3em",
    color: "#333",
  },
  text: {
    fontSize: "1.5em",
    color: "#666",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1em",
    color: "#fff",
    backgroundColor: "#0070f3",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Page;
