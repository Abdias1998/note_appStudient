// import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 md:gap-y-0">
          <div className="col-span-1">
            <h2 className="text-lg font-semibold text-white">Plus</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/confidentialite"
                  className="text-gray-300 hover:text-white"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white">
                  Faq
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+22953037832"
                  className="text-gray-300 hover:text-white"
                >
                  Contact direct
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h2 className="text-lg font-semibold text-white">Liens rapides</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/notes" className="text-gray-300 hover:text-white">
                  Notes
                </Link>
              </li>
              <li>
                <Link
                  href="/statistiques"
                  className="text-gray-300 hover:text-white"
                >
                  Statistiques
                </Link>
              </li>
              <li>
                <Link href="/avis" className="text-gray-300 hover:text-white">
                  Avis
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h2 className="text-lg font-semibold text-white">Suivez-nous</h2>
            <p className="mt-4 text-gray-300">
              Restez à jour avec nos dernières nouvelles et produits.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link
                href="https://www.facebook.com/profile.php?id=100090166686825"
                className="text-gray-300 hover:text-white"
              >
                <img src="./fb.png" width={40} alt="" />
              </Link>

              <Link
                href="https://api.whatsapp.com/send?phone=53037832"
                className="text-gray-300 hover:text-white"
              >
                <img src="./wh.png" width={40} alt="" />
                <i className="h-6 w-6"></i>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <img src="./in.png" width={40} alt="" />
                <i className="h-6 w-6"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
