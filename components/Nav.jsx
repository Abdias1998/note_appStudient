"use client";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "primereact/avatar";
import { PanelMenu } from "primereact/panelmenu";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";

const navigation = [
  { name: "À propos", href: "/about" },
  { name: "Votes", href: "/votes" },
  { name: "Statistiques", href: "/statistiques" },
  { name: "Faq", href: "/faq" },
  { name: "Politique de confidentialité", href: "/confidentialite" },
];

const items = [
  {
    label: "",
    icon: "pi pi-user",
    items: [
      {
        label: "Déconnexion",
        icon: "pi pi-sign-out",
        command: () => signOut(),
      },
    ],
  },
];

const signOut = () => {
  // Supprimer le cookie userId
  document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Rediriger l'utilisateur vers la page de connexion
  window.location.href = "/login";
};

export default function NavBar() {
  const toast = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.user?.user);
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                width={100}
                height={100}
                style={{ borderRadius: "50%" }}
                className="h-8 w-auto"
                src="/logo.jpg"
                alt=""
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {" "}
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {user ? (
              <div className="card flex justify-content-center">
                <PanelMenu model={items} className="w-full md:w-20rem" />
                <Toast ref={toast} />
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Se connecter <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>
        <Dialog
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  width={100}
                  height={100}
                  style={{ borderRadius: "50%" }}
                  className="h-8 w-auto"
                  src="/logo.jpg"
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {user ? (
                    <div className="card flex justify-content-center">
                      <PanelMenu model={items} className="w-full md:w-20rem" />
                      <Toast ref={toast} />
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Se connecter <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
