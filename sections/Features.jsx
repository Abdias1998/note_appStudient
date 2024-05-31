import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Connectez-vous à votre compte étudiant",
    description:
      "Accédez facilement à votre compte étudiant en utilisant vos identifiants personnels. ",
    icon: "pi pi-user",
  },
  {
    name: "Consulter les professeurs",
    description: "Consultez la liste des professeurs ",
    icon: "pi pi-users",
  },
  {
    name: "Noter",
    description:
      "Soutenez vos enseignants en donnant une note élevé pour celui ou celle qui vous inspire le plus.",
    icon: "pi pi-check",
  },
  {
    name: "Voire le classement",
    description:
      "Vérifiez en temps réel le classement des professeurs sur la page 'Statistiques' ",
    icon: "pi pi-eye",
  },
  {
    name: "Donnez un avis",
    description:
      "Partagez vos impressions et expériences en laissant un avis sur la page ‘Avis’. ",
    icon: "pi pi-book",
  },
  {
    name: "Rechercher les résultats d'autres établissement ",
    description:
      "Élargissez vos horizons en consultant les classements d’autres établissements. ",
    icon: "pi pi-search",
  },
];

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Notation des Professeurs
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tout ce dont vous avez besoin pour évaluer vos professeurs
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Participez à l'amélioration de l'enseignement en partageant votre
            avis sur vos professeurs. Suivez les étapes ci-dessous pour
            commencer.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <i className={feature.icon} aria-hidden="true"></i>
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
