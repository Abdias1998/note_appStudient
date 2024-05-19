import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Se connecter",
    description: "Connectez-vous à votre compte étudiant",
    icon: "pi pi-check",
  },
  {
    name: "Sélectionner la classe",
    description: "Sélectionnez la classe pour laquelle vous souhaitez voter.",
    icon: "pi pi-check",
  },
  {
    name: "Consulter les professeurs",
    description:
      "Consultez la liste des professeurs éligibles et lisez leurs profils.",
    icon: "pi pi-check",
  },
  {
    name: "Voter",
    description:
      "Votez pour votre professeur préféré en appuyant sur le bouton 'Voter'.",
    icon: "pi pi-check",
  },
  {
    name: "Un vote par classe",
    description: "Vous pouvez voter pour un seul professeur par classe.",
    icon: "pi pi-check",
  },
  {
    name: "Donnez un qvis",
    description:
      "Donnez un avis sur un professeur tout en laissant un commentaire",
    icon: "pi pi-check",
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
