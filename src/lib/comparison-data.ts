/**
 * Comparison Data: "Avant GAMRdigitale" vs "Avec GAMRdigitale"
 * Feature: Page Fonctionnalités
 *
 * Contains 10 comparison items covering all major aspects
 */

import type { ComparisonTable } from '@/types/features';

export const comparisonData: ComparisonTable = [
  {
    dimension: 'Productivité',
    situationBefore:
      'Audits manuels fastidieux de 2-3 jours par site avec fichiers Excel dispersés',
    situationWithGAMRdigitale:
      'Évaluations automatisées complétées en 2 heures avec consolidation immédiate',
    improvementMetric: '+70%',
  },
  {
    dimension: 'Conformité',
    situationBefore:
      "Préparation d'audit sur 3 semaines avec documentation incomplète et dispersée",
    situationWithGAMRdigitale:
      'Rapports conformité générés en 1 clic, prêts pour auditeurs avec traçabilité complète',
    improvementMetric: '-95% temps',
  },
  {
    dimension: 'Gouvernance',
    situationBefore:
      "Responsabilités floues, actions correctives non suivies, pas de visibilité sur l'avancement",
    situationWithGAMRdigitale:
      'Assignations claires avec échéances, notifications automatiques et tableaux de bord de suivi',
  },
  {
    dimension: 'Visibilité',
    situationBefore: "Vue fragmentée des risques sans vision d'ensemble, difficile de prioriser",
    situationWithGAMRdigitale:
      'Cartographie complète des risques avec heatmaps et scoring global en temps réel',
  },
  {
    dimension: 'Réactivité',
    situationBefore:
      'Identification tardive des risques critiques, délais dans la mise en place des actions',
    situationWithGAMRdigitale:
      'Alertes automatiques sur risques critiques et priorisation intelligente des actions',
  },
  {
    dimension: 'Collaboration',
    situationBefore:
      'Silos entre équipes, processus de validation lents avec emails et fichiers partagés',
    situationWithGAMRdigitale:
      'Workflow collaboratif intégré avec commentaires, approbations et notifications en temps réel',
  },
  {
    dimension: 'Cohérence',
    situationBefore:
      "Évaluations subjectives variant selon l'évaluateur, méthodologies incohérentes",
    situationWithGAMRdigitale:
      'Méthodologie GAMRdigitale standardisée appliquée uniformément sur tous les sites et projets',
  },
  {
    dimension: 'Décision',
    situationBefore:
      'Décisions basées sur des impressions et données partielles difficiles à interpréter',
    situationWithGAMRdigitale:
      'Décisions data-driven avec indicateurs clairs, scoring objectif et recommandations IA',
  },
  {
    dimension: 'Traçabilité',
    situationBefore:
      "Historique limité, difficile de retrouver l'évolution des risques et actions passées",
    situationWithGAMRdigitale:
      "Journal d'audit complet avec versioning, traçabilité totale pour conformité réglementaire",
  },
  {
    dimension: 'Coûts',
    situationBefore:
      'Consultants externes coûteux, temps important mobilisé en interne sur tâches administratives',
    situationWithGAMRdigitale:
      "Automatisation des tâches répétitives, réduction des coûts de consultance et gains d'efficacité",
    improvementMetric: '-60% coûts',
  },
];
