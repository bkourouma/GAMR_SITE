/**
 * ProblemSolution Component
 * Feature: 002-transform-the-gamr
 *
 * Problem/Solution comparison with vibrant colors, staggered animations, and engaging visuals.
 */

'use client';

import { useRef } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { staggerDelay } from '@/lib/animations';

const PROBLEMS = [
  {
    id: '1',
    title: 'Manque de visibilité',
    description: "Impossible d'avoir une vue consolidée des risques à travers l'organisation",
  },
  {
    id: '2',
    title: 'Processus manuels',
    description: 'Évaluations chronophages avec tableurs Excel sujets aux erreurs',
  },
  {
    id: '3',
    title: 'Évaluation incohérente',
    description: 'Chaque auditeur a sa propre méthode, résultats impossibles à comparer',
  },
  {
    id: '4',
    title: 'Données éparpillées',
    description: "Informations dispersées, reporting manuel, préparation d'audits complexe",
  },
];

const SOLUTIONS = [
  {
    id: '1',
    title: 'Indice de Sécurité en Temps Réel',
    description:
      'Vision consolidée avec un indice 0-60 qui évolue automatiquement après chaque évaluation',
  },
  {
    id: '2',
    title: 'Évaluations Automatisées',
    description: "Réduisez le temps d'audit de 70% avec des workflows intelligents et guidés",
  },
  {
    id: '3',
    title: 'Méthodologie GAMR Standardisée',
    description: 'Scoring cohérent basé sur 42 objectifs de sécurité standardisés',
  },
  {
    id: '4',
    title: 'Plateforme Centralisée',
    description: 'Toutes vos données de sécurité au même endroit avec reporting automatisé',
  },
];

export function ProblemSolution() {
  const problemsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const problemsVisible = useIntersectionObserver(problemsRef, {
    threshold: 0.2,
    triggerOnce: true,
  });
  const solutionsVisible = useIntersectionObserver(solutionsRef, {
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="relative pt-2 pb-20 px-4 overflow-hidden">
      {/* Green Gradient Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-success/10 via-secondary/15 to-success/5"
        aria-hidden="true"
      />

      {/* Decorative Elements */}
      <div
        className="absolute top-10 right-0 w-96 h-96 bg-success/20 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Du <span className="text-gradient-accent">Problème</span> à la{' '}
            <span className="text-success font-bold">Solution</span>
          </h2>
          <p className="text-lg text-text/70 max-w-2xl mx-auto">
            GAMR transforme chaque défi de gestion des risques en opportunité d&apos;amélioration
            continue
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Problems Column */}
          <div ref={problemsRef}>
            {/* Problems Header */}
            <div className="mb-8 pb-4 border-b-2 border-red-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-text">
                  Les défis de la gestion des risques
                </h3>
              </div>
            </div>

            {/* Problems List */}
            <div className="space-y-4">
              {PROBLEMS.map((problem, index) => (
                <div
                  key={problem.id}
                  className={`
                    group relative
                    transition-all duration-700
                    ${problemsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
                  `}
                  style={{
                    transitionDelay: problemsVisible ? `${staggerDelay(index, 100)}ms` : '0ms',
                  }}
                >
                  {/* Card with hover effect */}
                  <div className="flex gap-4 p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-red-100 hover:border-red-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="font-bold text-text mb-2 text-lg">{problem.title}</h4>
                      <p className="text-sm text-text/70 leading-relaxed">{problem.description}</p>
                    </div>
                  </div>

                  {/* Connecting line (subtle) */}
                  <div
                    className="absolute -right-6 top-1/2 w-6 h-0.5 bg-gradient-to-r from-red-200 to-transparent opacity-0 md:opacity-100"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Solutions Column */}
          <div ref={solutionsRef}>
            {/* Solutions Header */}
            <div className="mb-8 pb-4 border-b-2 border-success/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-success to-secondary flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-text">
                  Comment GAMR les résout
                </h3>
              </div>
            </div>

            {/* Solutions List */}
            <div className="space-y-4">
              {SOLUTIONS.map((solution, index) => (
                <div
                  key={solution.id}
                  className={`
                    group relative
                    transition-all duration-700
                    ${solutionsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
                  `}
                  style={{
                    transitionDelay: solutionsVisible ? `${staggerDelay(index, 100)}ms` : '0ms',
                  }}
                >
                  {/* Card with hover effect */}
                  <div className="flex gap-4 p-4 rounded-lg bg-gradient-to-br from-success/5 to-secondary/5 backdrop-blur-sm border border-success/20 hover:border-success/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-success/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="font-bold text-text mb-2 text-lg">{solution.title}</h4>
                      <p className="text-sm text-text/70 leading-relaxed">{solution.description}</p>
                    </div>
                  </div>

                  {/* Connecting line from left (subtle) */}
                  <div
                    className="absolute -left-6 top-1/2 w-6 h-0.5 bg-gradient-to-l from-success/30 to-transparent opacity-0 md:opacity-100"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20">
            <p className="text-lg font-semibold text-text mb-2">
              Prêt à transformer votre gestion des risques ?
            </p>
            <p className="text-sm text-text/70">
              Découvrez comment GAMR peut simplifier vos processus dès aujourd&apos;hui
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
