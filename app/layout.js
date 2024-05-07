import Head from "next/head";
import "./globals.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import "primeflex/primeflex.css";

export const metadata = {
  title: "Ekpan",
  description:
    "Une application de note en ligne pour noter et choisir le meilleur professur dans chaque classe",
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
      <body>{children}</body>
    </html>
  );
}
