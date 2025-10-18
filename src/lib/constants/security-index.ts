export const SECURITY_INDEX_DATA = {
  meta: {
    title: "Indice de Sécurité - GAMR",
    description: "Méthodologie d'évaluation de la sécurité d'entreprise"
  },
  hero: {
    title: "Indice de Sécurité",
    subtitle: "Comprenez comment GAMR évalue la sécurité de votre entreprise"
  },
  methodology: {
    title: "Méthodologie GAMR",
    objectives: [
      "Cerner les menaces et identifier les facteurs de risques",
      "Évaluer les conséquences probables de tout incident potentiel",
      "Proposer et recommander des mesures préventives, de surveillance et de protection",
      "Aide précieuse pour la répartition des ressources, la planification d'urgence et la budgétisation"
    ],
    overview: "La «Grille d'Analyse des Menaces et Risques» (GAMR) est une méthodologie simplifiée et un outil pratique axé sur les facteurs de risques de l'entreprise (structure, outil de production et personnel), pour aider à l'exécution d'une Evaluation de Sécurité.",
    disclaimer: "Important : La GAMR doit être mise à jour aussi souvent que l'évolution des circonstances peut l'exiger afin de maintenir son efficacité."
  },
  scoreIndicators: [
    {
      id: "high-risk",
      minScore: 0,
      maxScore: 10,
      color: "bg-red-500",
      label: "Risque Élevé",
      description: "Sécurité critique - Action immédiate requise",
      textColor: "text-white"
    },
    {
      id: "medium-high-risk", 
      minScore: 20,
      maxScore: 30,
      color: "bg-orange-500",
      label: "Risque Moyen-Élevé",
      description: "Sécurité préoccupante - Plan d'action nécessaire",
      textColor: "text-white"
    },
    {
      id: "medium-low-risk",
      minScore: 30,
      maxScore: 40,
      color: "bg-yellow-400", 
      label: "Risque Moyen-Faible",
      description: "Sécurité acceptable - Améliorations recommandées",
      textColor: "text-gray-900"
    },
    {
      id: "low-risk",
      minScore: 40,
      maxScore: 60,
      color: "bg-green-500",
      label: "Risque Faible", 
      description: "Sécurité satisfaisante - Maintenance continue",
      textColor: "text-white"
    }
  ],
  processSteps: [
    {
      id: "targets",
      stepNumber: 1,
      title: "Cibles Potentielles (CP)",
      description: "Les cibles potentielles sont celles qui, si elles sont visées par un acte illégal, peuvent influer de façon négative sur le bon fonctionnement de l'entreprise ou sur la sécurité du personnel.",
      examples: ["Fonctions et activités", "Points ou personnes clés", "Zones vulnérables", "Environs immédiats"]
    },
    {
      id: "threat-scenario",
      stepNumber: 2,
      title: "Scénario de Menace",
      description: "Dans l'évaluation des scénarios possibles, il faut tenir compte de l'historique des incidents de l'entreprise, déterminer, évaluer, analyser les facteurs de risques.",
      examples: ["Attaque à mains armées", "Vols de biens", "Sabotage", "Incendie", "Malaise physiologique", "Prise d'otage"]
    },
    {
      id: "probability",
      stepNumber: 3,
      title: "Probabilité",
      description: "La probabilité qu'un incident se produise.",
      examples: ["3 = Élevée", "2 = Moyenne", "1 = Faible"]
    },
    {
      id: "vulnerability",
      stepNumber: 4,
      title: "Vulnérabilité (liée aux lignes de défense)",
      description: "Évaluation des mesures de protection en place.",
      examples: [
        "4 = Absence de mesures - libre accès aux cibles, dispositifs inexistants, personnel non qualifié",
        "3 = Mesures minimales - identification insuffisante, procédures inadéquates, surveillance sporadique",
        "2 = Mesures satisfaisantes - zones identifiées, accès contrôlé, personnel qualifié, surveillance adéquate",
        "1 = Mesures entièrement efficaces - plan cohérent, prévention efficace, gestion de crises adaptée"
      ]
    },
    {
      id: "impact",
      stepNumber: 5,
      title: "Répercussions",
      description: "Évaluation des conséquences de chaque incident potentiel.",
      examples: [
        "5 = Préjudiciable pour la sécurité des personnes - décès, graves blessures, menace pour la sécurité publique",
        "4 = Préjudiciable pour la santé publique - dommages environnementaux, menace locale",
        "3 = Préjudiciable pour l'environnement/économie - perturbations durables, pertes importantes",
        "2 = Préjudiciable pour les biens/infrastructures - perturbations limitées",
        "1 = Préjudiciable pour la confiance/image - impact sur la réputation"
      ]
    },
    {
      id: "risk-score",
      stepNumber: 6,
      title: "Note Attribuée au Risque",
      description: "Calcul du score de risque global.",
      formula: "Probabilité × Vulnérabilité × Répercussions",
      examples: [
        "Scénario le plus élevé: 3 × 4 × 5 = 60",
        "Scénario le plus faible: 1 × 1 × 1 = 1"
      ]
    },
    {
      id: "action-priority",
      stepNumber: 7,
      title: "Priorité d'Action",
      description: "Le calcul et l'énumération des pointages aideront à évaluer la priorité à accorder au traitement de chaque incident potentiel et donneront des indications sur les interventions nécessaires pour la prévention, la surveillance et les plans de contingence."
    }
  ],
  conclusions: [
    "La GAMR donne des indications précises sur les menaces, l'identification des cibles potentielles et leur degré de vulnérabilité",
    "La GAMR dûment remplie constitue la base de l'élaboration d'un plan de sécurité et de sûreté de l'entreprise"
  ]
};
