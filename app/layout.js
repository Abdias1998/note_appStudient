import Head from "next/head";
import "./globals.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Providers } from "@/GlobalRedux/provider";
// import "primeflex/primeflex.css";

export const metadata = {
  title: {
    template: "%s | ProfReview",
    default: "ProfReview", // a default is required when creating a template
  },
  description:
    "Une application de note en ligne pour noter et choisir le meilleur professur dans chaque classe",
  // generator: "Next.js",
  applicationName: "ProfReviw",
  // referrer: "origin-when-cross-origin",
  keywords: [
    "Note",
    "Etudiant",
    "Vote professeur",
    "Etablissement Vote",
    "Meilleurs professeurs",
    "notation professeur",
    "évaluation",
    "enseignant",
    "commentaire professeur",
    "avis enseignant",
    "feedback professeur",
    "note prof",
    "évaluation éducative",
    "avis scolaire",
    " critique enseignant",
    "évaluation académique",
    "prof review",
    "teacher rating",
    "évaluation des enseignants",
    "plateforme éducative",
    "note et avis prof",
    "feedback étudiant",
    "commentaire éducatif",
    "classement professeur",
    "prof feedback",
    "notation scolaire",
  ],
  authors: [
    { name: "Adinsi Abdias" },
    {
      name: "Yeme Adoris",
      url: "https://api.whatsapp.com/send?phone=53037832",
    },
  ],
  creator: "Adinsi Abdias",
  // publisher: "Sebastian Markbåge",
  // formatDetection: {
  //   email: false,
  //   address: false,
  //   telephone: false,
  // },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/shortcut-icon.png",
    apple: "/logo.jpg",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  // manifest: "https://nextjs.org/manifest.json",
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Next.js",
  //   description: "The React Framework for the Web",
  //   siteId: "1467726470533754880",
  //   creator: "@nextjs",
  //   creatorId: "1467726470533754880",
  //   images: ["https://nextjs.org/og.png"], // Must be an absolute URL
  // },
};
{
  /* <Head>
  <title>LE GUIDE BJ</title>
  <meta name="viewport" content="initial-scale=1, width=device-width" />
</Head>; */
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
