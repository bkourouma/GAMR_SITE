/speckit.specify Génère le contenu et la structure HTML/MDX pour la page : [http://localhost:3000/essai-gratuit](http://localhost:3000/essai-gratuit)

Contexte : La page « Essai gratuit » doit présenter un **questionnaire de 10 questions** pour qualifier les besoins et préparer l’onboarding sur GAMR (Grille d’Analyse des Menaces et Risques). Le but est d’orienter la configuration du compte d’essai, prioriser les modules, et planifier une démo personnalisée.

🎯 Objectifs de la page :

- Collecter des informations **métier** (secteur, normes, objectifs, priorités, délais).
- Délivrer un **message de valeur** (ce que l’essai inclut) et des **CTA** clairs.
- Maximiser la **conversion** (UX simple, mobile-first, étapes courtes, validation).
- Préparer un **handoff** fluide vers l’équipe (email interne + CRM) et l’activation de l’espace d’essai.

---

### ⚙️ Structure attendue

1. **Hero**
   - Titre : « Lancez votre essai gratuit — 10 questions, 2 minutes »
   - Sous-titre : « Nous configurons GAMR selon vos priorités risques et conformité. »
   - Points clés (3) : _Sans CB_ • _Résiliable à tout moment_ • _Support inclus pendant l’essai_
   - CTA : « Démarrer le questionnaire » (scroll vers le formulaire)

2. **Bloc contexte/valeur**
   - Bref paragraphe sur ce que l’essai inclut (accès plateforme, modules de base, support mail, modèle de risques par défaut ISO 31000) et ce qu’il **n’inclut pas** (connecteurs spécifiques, SSO, etc.).

3. **Formulaire — Questionnaire (10 questions)**
   - 10 **questions utilisateur** (les coordonnées de contact sont gérées **hors** quota de 10 questions).
   - Types : select, multiselect, échelle (1–5), numérique, texte court.
   - Validation Zod (front) + revalidation API (back). Messages en FR.

   **Liste des 10 questions**
   1. **Secteur d’activité** _(select, obligatoire)_ — options : Industrie extractive, Aéroportuaire, Gouvernement/Institution, Banque & Finance, Santé & Hôpitaux, Autre.
   2. **Taille de l’organisation** _(select, obligatoire)_ — 1–10, 11–50, 51–200, 201–1000, 1000+.
   3. **Normes prioritaires** _(multiselect, obligatoire)_ — ISO 31000, ISO 27001, ISO 45001, ISO 14001, OACI Annexe 19, COSO ERM, RGPD/ANSSI‑CI, Bâle III, OMS Patient Safety, Autre.
   4. **Objectifs principaux** _(multiselect, obligatoire)_ — Cartographie des risques, Conformité & audits, Automatisation & workflows, Reporting & tableaux de bord, Collaboration & validation, Sensibilisation & incidents, Autre.
   5. **Maturité actuelle de la gestion des risques** _(échelle 1–5, obligatoire)_.
   6. **Nombre d’utilisateurs prévus** _(numérique, obligatoire)_.
   7. **Données à importer au démarrage** _(multiselect, optionnel)_ — Excel, CSV, ERP/CRM, Aucun, Autre.
   8. **Modules prioritaires** _(multiselect, obligatoire)_ — Évaluation des risques, Plans d’action, Incidents & non‑conformités, Audits & rapports, Tableaux de bord, Multi‑entités.
   9. **Délai souhaité de mise en œuvre** _(select, obligatoire)_ — Immédiat, < 1 mois, 1–3 mois, > 3 mois.
   10. **Principale contrainte à prendre en compte** _(texte court, optionnel)_.

4. **Coordonnées & consentement (hors quota de 10)**
   - **Nom complet** _(obligatoire)_, **Organisation** _(obligatoire)_, **Email pro** _(obligatoire)_, **Téléphone** _(optionnel)_.
   - Case à cocher : « J’accepte d’être contacté pour l’activation de mon essai et une démo » _(obligatoire)_.
   - Mention RGPD/ANSSI‑CI (stockage, finalité, durée, droit de retrait) + lien vers politique de confidentialité.

5. **Confirmation**
   - Écran de succès (check) : « Merci ! Votre essai est en préparation. »
   - Résumé des réponses (non sensible) + étapes suivantes (email d’activation, plage pour une démo, FAQ).
   - CTA : « Réserver une démo » (calendrier) et « Accéder au guide de démarrage ».

6. **FAQ (3–4 entrées)**
   - Sécurité & hébergement, données d’essai, résiliation, support.

7. **CTA final**
   - Réassurance + bouton « Démarrer maintenant ».

---

### 🧩 Sorties attendues

- Fichier : `app/essai-gratuit/page.mdx` (App Router Next.js 15).
- Un composant formulaire réutilisable `components/trial/TrialForm.tsx`.
- Un schéma de questions `data/trial/questions.ts` exportant les 10 questions avec métadonnées.
- Validation **Zod** côté client + **API route** `app/api/trial/route.ts` (POST) pour enregistrer les réponses.
- Envoi email d’alerte interne (ex. Resend/Nodemailer, stub prêt).
- Tracking : évènement `trial_started` / `trial_submitted` (GA4/console stub).

---

### 📦 Spécifications techniques (à implémenter par l’agent)

``

```ts
export type TrialQuestionType = 'select' | 'multiselect' | 'scale' | 'number' | 'text';

export interface TrialQuestion {
  id: string;
  label: string;
  type: TrialQuestionType;
  required?: boolean;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

export const trialQuestions: TrialQuestion[] = [
  {
    id: 'sector',
    label: 'Secteur d’activité',
    type: 'select',
    required: true,
    options: [
      { value: 'extractive', label: 'Industrie extractive' },
      { value: 'aero', label: 'Aéroportuaire' },
      { value: 'gov', label: 'Gouvernement/Institution' },
      { value: 'bank', label: 'Banque & Finance' },
      { value: 'health', label: 'Santé & Hôpitaux' },
      { value: 'other', label: 'Autre' },
    ],
  },
  {
    id: 'org_size',
    label: 'Taille de l’organisation',
    type: 'select',
    required: true,
    options: [
      { value: '1-10', label: '1–10' },
      { value: '11-50', label: '11–50' },
      { value: '51-200', label: '51–200' },
      { value: '201-1000', label: '201–1000' },
      { value: '1000+', label: '1000+' },
    ],
  },
  {
    id: 'standards',
    label: 'Normes prioritaires',
    type: 'multiselect',
    required: true,
    options: [
      { value: 'iso31000', label: 'ISO 31000' },
      { value: 'iso27001', label: 'ISO 27001' },
      { value: 'iso45001', label: 'ISO 45001' },
      { value: 'iso14001', label: 'ISO 14001' },
      { value: 'icao19', label: 'OACI Annexe 19' },
      { value: 'coso', label: 'COSO ERM' },
      { value: 'rgpd_anssici', label: 'RGPD/ANSSI‑CI' },
      { value: 'basel3', label: 'Bâle III' },
      { value: 'oms_ps', label: 'OMS Patient Safety' },
      { value: 'other', label: 'Autre' },
    ],
  },
  {
    id: 'goals',
    label: 'Objectifs principaux',
    type: 'multiselect',
    required: true,
    options: [
      { value: 'mapping', label: 'Cartographie des risques' },
      { value: 'compliance', label: 'Conformité & audits' },
      { value: 'automation', label: 'Automatisation & workflows' },
      { value: 'reporting', label: 'Reporting & tableaux de bord' },
      { value: 'collab', label: 'Collaboration & validation' },
      { value: 'awareness', label: 'Sensibilisation & incidents' },
      { value: 'other', label: 'Autre' },
    ],
  },
  {
    id: 'maturity',
    label: 'Maturité actuelle (1–5)',
    type: 'scale',
    required: true,
    min: 1,
    max: 5,
    step: 1,
  },
  { id: 'users', label: 'Nombre d’utilisateurs prévus', type: 'number', required: true, min: 1 },
  {
    id: 'imports',
    label: 'Données à importer au démarrage',
    type: 'multiselect',
    options: [
      { value: 'excel', label: 'Excel' },
      { value: 'csv', label: 'CSV' },
      { value: 'erp_crm', label: 'ERP/CRM' },
      { value: 'none', label: 'Aucun' },
      { value: 'other', label: 'Autre' },
    ],
  },
  {
    id: 'modules',
    label: 'Modules prioritaires',
    type: 'multiselect',
    required: true,
    options: [
      { value: 'risk_eval', label: 'Évaluation des risques' },
      { value: 'actions', label: 'Plans d’action' },
      { value: 'incidents', label: 'Incidents & non‑conformités' },
      { value: 'audits', label: 'Audits & rapports' },
      { value: 'dashboards', label: 'Tableaux de bord' },
      { value: 'multi_entity', label: 'Multi‑entités' },
    ],
  },
  {
    id: 'timeline',
    label: 'Délai souhaité de mise en œuvre',
    type: 'select',
    required: true,
    options: [
      { value: 'now', label: 'Immédiat' },
      { value: 'lt1m', label: '< 1 mois' },
      { value: '1-3m', label: '1–3 mois' },
      { value: '>3m', label: '> 3 mois' },
    ],
  },
  { id: 'constraint', label: 'Principale contrainte à prendre en compte', type: 'text' },
];
```

**Validation Zod (client)**

```ts
import { z } from 'zod';

export const trialSchema = z.object({
  sector: z.string().min(1),
  org_size: z.string().min(1),
  standards: z.array(z.string()).min(1),
  goals: z.array(z.string()).min(1),
  maturity: z.number().min(1).max(5),
  users: z.number().int().positive(),
  imports: z.array(z.string()).optional(),
  modules: z.array(z.string()).min(1),
  timeline: z.string().min(1),
  constraint: z.string().max(200).optional(),
  // Coordonnées (hors quota)
  fullname: z.string().min(2),
  org: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, { message: 'Nécessite votre consentement' }),
});
```

**API route **``** (POST, stub)**

```ts
import { NextResponse } from 'next/server';
import { trialSchema } from '@/data/trial/schema'; // ou inline

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = trialSchema.parse(body);

    // TODO: persister (DB) ou envoyer via webhook/CRM
    // TODO: email interne (Resend/Nodemailer)

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Invalid' }, { status: 400 });
  }
}
```

**Comportement UX**

- Afficher une barre d’avancement (0–100%).
- Boutons « Précédent / Suivant » + validation par étape.
- Afficher les erreurs inline, scroll‑to‑error.
- Au succès : message + liens (réserver démo, guide démarrage, accueil).

---

### 🔐 Contraintes & qualité

- A11y WCAG 2.1 AA, labels + aria‑describedby, focus states visibles.
- SEO : title ≤ 60, meta ≤ 160, no‑index si besoin (si c’est un funnel privé).
- Performance Lighthouse > 90, chargement lazy des icônes.
- Texte FR, ton pro & rassurant.
