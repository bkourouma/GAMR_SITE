import { Feature } from '@/types/content';

export const FEATURES: Feature[] = [
  {
    id: '1',
    name: 'Indice de Sécurité en Temps Réel',
    slug: 'indice-securite-temps-reel',
    icon: 'gauge',
    shortDescription:
      "Visualisez votre posture de sécurité globale en un coup d'œil avec un indice dynamique 3-60 qui se met à jour automatiquement après chaque évaluation.",
    fullDescription:
      "L'Indice de Sécurité GAMRdigitale offre une vue executive unique de votre posture de sécurité. Calculé automatiquement et mis à jour en temps réel après chaque évaluation complétée, cet indice sur 60 combine vos scores d'évaluation, la couverture de vos priorités d'action, le taux de résolution des risques critiques et la conformité aux objectifs de sécurité. Pondéré selon votre secteur d'activité, il permet de piloter votre sécurité par objectifs et de démontrer l'amélioration continue à votre direction.",
    benefits: [
      'Vision executive : un seul chiffre pour communiquer votre posture sécurité',
      'Pilotage par objectifs : suivez la progression vers vos cibles',
      "Démonstration ROI : prouvez l'amélioration continue",
      "Reporting simplifié : indice prêt pour le conseil d'administration",
      'Détection précoce : identifiez la dégradation avant les incidents',
      'Gamification : motivez les équipes avec un scoring visible',
    ],
    screenshot: '/images/features/indice-securite.webp',
    caseStudySlug: 'startup-tech-indice-securite',
    order: 1,
  },
  {
    id: '2',
    name: 'Évaluations de Sécurité Intelligentes',
    slug: 'evaluations-securite',
    icon: 'clipboard-check',
    shortDescription:
      'Conduisez des audits de sécurité complets en 70% moins de temps avec 42 objectifs standardisés, questionnaires adaptatifs et support mobile/offline.',
    fullDescription:
      "Simplifiez vos audits de sécurité avec des évaluations structurées basées sur 42 objectifs de sécurité standardisés. Les questionnaires adaptatifs s'ajustent selon vos réponses, et plus de 10 modèles pré-configurés par secteur accélèrent le démarrage. L'interface mobile avec capacité hors ligne permet aux auditeurs de travailler sur le terrain, avec photos et documents joints automatiquement géolocalisés.",
    benefits: [
      "Réduisez le temps d'évaluation de 70%",
      'Évaluations cohérentes sur tous les sites',
      'Documentation basée sur des preuves avec support multimédia',
      'Aucune formation requise - interface intuitive',
      'Suivi de progression en temps réel',
      'Sauvegarde automatique et sync cloud',
    ],
    screenshot: '/images/features/evaluations.webp',
    caseStudySlug: 'audit-usine-production',
    order: 2,
  },
  {
    id: '3',
    name: "Analyse des Risques Propulsée par l'IA",
    slug: 'analyse-ia',
    icon: 'brain',
    shortDescription:
      "Laissez l'IA transformer vos données de sécurité en intelligence actionnable avec scoring automatique et recommandations contextuelles.",
    fullDescription:
      "L'analyse IA GAMRdigitale élimine les biais subjectifs avec un scoring automatique basé sur la méthodologie Probabilité × Vulnérabilité × Impact. Les recommandations sont générées à partir de vos réponses d'évaluation et adaptées à votre secteur d'activité, avec niveaux de confiance pour chaque suggestion. Le système détecte automatiquement les anomalies et vous alerte sur les incohérences.",
    benefits: [
      "Éliminez les biais subjectifs dans l'évaluation",
      "Conseils d'expert sans embaucher de consultants",
      'Découvrez automatiquement les vulnérabilités cachées',
      'Décisions data-driven avec métriques de confiance',
      'Recommandations contextuelles sectorielles',
      'Assistant de chat RAG pour insights instantanés',
    ],
    screenshot: '/images/features/analyse-ia.webp',
    order: 3,
  },
  {
    id: '4',
    name: 'Gestion des Fiches GAMRdigitale',
    slug: 'fiches-gamr',
    icon: 'file-text',
    shortDescription:
      "De l'évaluation à l'action : gestion complète du cycle de vie des risques avec scoring dynamique et matrices visuelles.",
    fullDescription:
      "Les fiches de risque GAMRdigitale sont générées automatiquement depuis vos évaluations avec un scoring dynamique 3-60. Visualisez votre paysage de risques avec des matrices et cartes thermiques, suivez l'évolution dans le temps avec le contrôle de version complet, et bénéficiez de rappels automatiques de révision. Export PDF pour reporting et conformité.",
    benefits: [
      'Visibilité 360° de votre paysage de risques',
      'Priorisez les ressources sur les menaces critiques',
      "Suivez l'évolution des risques dans le temps",
      "Documentation prête pour l'audit",
      'Génération automatique depuis les évaluations',
      'Matrices de risques visuelles interactives',
    ],
    screenshot: '/images/features/fiches-gamr.webp',
    caseStudySlug: 'conformite-hospitaliere',
    order: 4,
  },
  {
    id: '5',
    name: "Gestion des Priorités d'Action",
    slug: 'priorites-action',
    icon: 'list-checks',
    shortDescription:
      'Transformez les risques en résultats avec un suivi intelligent des actions, priorisation automatique et dashboards KPI.',
    fullDescription:
      'Ne manquez jamais une tâche de sécurité critique avec la gestion intelligente des actions GAMRdigitale. Priorisation automatique basée sur les scores de risque, assignation avec accès basé sur les rôles, suivi des échéances avec notifications, monitoring de progression et taux de complétion. Estimez coûts et durées, suivez la probabilité de succès.',
    benefits: [
      'Ne manquez jamais une tâche critique',
      'Responsabilité avec propriété claire',
      "Mesurez l'efficacité de la remédiation",
      'Démontrez le ROI des investissements sécurité',
      'Priorisation intelligente automatique',
      'Tableaux de bord KPI et analytics',
    ],
    screenshot: '/images/features/actions.webp',
    order: 5,
  },
  {
    id: '6',
    name: 'Gestion des Utilisateurs & Collaboration',
    slug: 'gestion-utilisateurs',
    icon: 'users',
    shortDescription:
      'Sécurité de niveau entreprise pour organisations de toutes tailles avec 5 niveaux de rôles et permissions granulaires.',
    fullDescription:
      "Évoluez de 10 à 10 000 utilisateurs sans effort avec le système de rôles à 5 niveaux : Super Admin, Admin, Analyste IA, Évaluateur, Lecteur. Gestion granulaire des permissions, suivi d'activité utilisateur et logs d'audit complets. Options de personnalisation marque blanche, niveaux de risques configurables, et authentification sécurisée avec SSO.",
    benefits: [
      'Évoluez de 10 à 10 000 utilisateurs',
      'Protégez les données sensibles',
      'Contrôlez les accès avec précision',
      'Supportez plusieurs départements',
      "Logs d'audit complets",
      'SSO entreprise disponible',
    ],
    screenshot: '/images/features/utilisateurs.webp',
    order: 6,
  },
  {
    id: '7',
    name: 'Intelligence & Analytics',
    slug: 'analytics',
    icon: 'bar-chart-3',
    shortDescription:
      'Découvrez les insights cachés dans vos données de sécurité avec tableaux de bord interactifs et benchmarking sectoriel.',
    fullDescription:
      'Transformez vos données de sécurité en intelligence actionnable avec des tableaux de bord interactifs en temps réel. Distribution des risques par priorité, catégorie et statut, taux de complétion des actions et tendances, benchmarking sectoriel. Génération de rapports personnalisés avec export vers PDF, Excel, DOCX. Filtrage avancé et recherche puissante.',
    benefits: [
      'Rapports prêts pour la direction en secondes',
      "Identifiez les tendances avant qu'elles deviennent problèmes",
      'Comparez les performances entre sites',
      'Supportez les décisions stratégiques avec données',
      'Benchmarking sectoriel',
      'Export multi-format (PDF, Excel, DOCX)',
    ],
    screenshot: '/images/features/analytics.webp',
    order: 7,
  },
];
