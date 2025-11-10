/**
 * Tooltip Definitions for Technical Terms
 * Feature: Page Fonctionnalités
 *
 * Contains definitions for all technical terms used in the features page
 */

import type { TooltipDictionary } from '@/types/features';

export const tooltipDefinitions: TooltipDictionary = {
  // P1 Priority - Core Terms (Always visible)
  GAMR: {
    term: 'GAMRdigitale',
    definition:
      'Gestion et Analyse Méthodique des Risques - méthodologie structurée pour identifier, évaluer et piloter les risques organisationnels.',
  },

  cartographie: {
    term: 'cartographie',
    definition:
      'Visualisation graphique de tous les risques identifiés, organisés par domaine, processus ou projet.',
    context: 'Dans le contexte de la gestion des risques',
  },

  heatmap: {
    term: 'heatmap',
    definition:
      "Carte thermique utilisant des couleurs (vert à rouge) pour représenter visuellement l'intensité ou la criticité des risques.",
    context: 'Aussi appelée "carte de chaleur"',
  },

  scoring: {
    term: 'scoring',
    definition:
      "Attribution d'une note chiffrée à chaque risque selon sa probabilité, sa vulnérabilité et son impact.",
  },

  // P2 Priority - Secondary Terms
  workflow: {
    term: 'workflow',
    definition:
      "Enchaînement structuré d'étapes et d'approbations pour traiter un processus métier de bout en bout.",
    context: 'Dans le contexte de la collaboration',
  },

  audit: {
    term: 'audit',
    definition:
      'Examen systématique et indépendant visant à vérifier la conformité aux standards et réglementations.',
    context: 'Audit de sécurité ou de conformité',
  },

  conformité: {
    term: 'conformité',
    definition:
      "Respect des exigences légales, réglementaires et normatives applicables à l'organisation.",
    context: 'Ex: ISO 27001, RGPD, ANSSI',
  },

  risque: {
    term: 'risque',
    definition:
      "Événement potentiel pouvant avoir un impact négatif sur les objectifs de l'organisation.",
    context: 'Mesuré par probabilité × impact',
  },

  // P3 Priority - Context Terms
  ISO: {
    term: 'ISO',
    definition:
      'Organisation Internationale de Normalisation - établit des normes internationales de qualité et sécurité.',
    context: "Ex: ISO 27001 pour la sécurité de l'information",
  },

  ANSSI: {
    term: 'ANSSI',
    definition:
      "Agence Nationale de la Sécurité des Systèmes d'Information - autorité française de cybersécurité.",
    context: 'Publie des référentiels de sécurité',
  },

  méthodologie: {
    term: 'méthodologie',
    definition:
      'Ensemble de méthodes et règles structurées pour accomplir une tâche de manière systématique et reproductible.',
  },

  traçabilité: {
    term: 'traçabilité',
    definition:
      "Capacité à suivre l'historique complet des modifications et actions effectuées sur un élément.",
  },

  indicateurs: {
    term: 'indicateurs',
    definition:
      "Métriques quantifiables permettant de mesurer la performance et l'évolution d'une situation.",
    context: 'Aussi appelés KPI (Key Performance Indicators)',
  },

  automatisée: {
    term: 'automatisée',
    definition:
      'Processus exécuté automatiquement par le système sans intervention manuelle, réduisant les erreurs et le temps de traitement.',
  },

  'tableau de bord': {
    term: 'tableau de bord',
    definition:
      'Interface visuelle présentant les indicateurs clés et métriques essentielles en temps réel pour faciliter la prise de décision.',
    context: 'Aussi appelé dashboard',
  },

  'temps réel': {
    term: 'temps réel',
    definition:
      'Données actualisées instantanément sans délai, permettant de réagir immédiatement aux changements de situation.',
  },
};

/**
 * Get tooltip definition for a term
 * @param term - Technical term to look up
 * @returns Definition object or undefined if not found
 */
export function getTooltipDefinition(term: string) {
  return tooltipDefinitions[term];
}

/**
 * Check if a term has a tooltip definition
 * @param term - Term to check
 * @returns True if definition exists
 */
export function hasTooltip(term: string): boolean {
  return term in tooltipDefinitions;
}
