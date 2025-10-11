/speckit.specify Génère le contenu et la structure HTML/MDX pour la page : [http://localhost:3000/demander-demo](http://localhost:3000/demander-demo)

Contexte : La page « Demander une démo » doit **recueillir les informations clés** pour préparer une démonstration personnalisée de GAMR et permettre au prospect de **proposer une date et une heure**. Le flux cible : formulaire → choix de créneaux → confirmation → envoi des invitations (ICS) et email d’accusé de réception.

🎯 Objectifs de la page :

- Qualifier le besoin (secteur, normes, objectifs, enjeux, taille d’équipe).
- Recueillir les **préférences de démonstration** (modules à montrer, mode Cloud/On‑Prem, données à importer).
- **Planifier** la démo : proposer **3 créneaux** (date + heure + durée) dans le fuseau **Africa/Abidjan**.
- Confirmer, envoyer un récapitulatif et un **fichier .ics** + liens "Ajouter à Google/Outlook".

---

### ⚙️ Structure attendue

1. **Hero**
   - Titre : « Demandez votre démo personnalisée »
   - Sous‑titre : « Sélectionnez vos priorités et proposez vos disponibilités. »
   - Points clés (3) : _Démo 30–45 min_ • _Équipe experte_ • _Sans engagement_

2. **Bloc valeur**
   - Court paragraphe : ce que couvre la démo (parcours risques, matrices, plans d’action, dashboards, rapports) et l’adaptation au secteur.

3. **Formulaire — Informations de qualification**
   - **Coordonnées** : Nom complet\*, Organisation\*, Email pro\*, Téléphone (option).
   - **Rôle** (select) : Direction, Conformité/Audit, Opérations, IT/Sécurité, Autre.
   - **Secteur** (select) : Industrie extractive, Aéroportuaire, Gouvernement/Institution, Banque & Finance, Santé & Hôpitaux, Autre.
   - **Normes prioritaires** (multiselect) : ISO 31000, ISO 27001, ISO 45001, ISO 14001, OACI Annexe 19, COSO ERM, RGPD/ANSSI‑CI, Bâle III, OMS Patient Safety, Autre.
   - **Objectifs principaux** (multiselect) : Cartographie, Conformité & audits, Automatisation & workflows, Reporting, Collaboration, Incidents.
   - **Taille de l’équipe concernée** (select) : 1–10, 11–50, 51–200, 201–1000, 1000+.
   - **Contexte & enjeux** (texte court) : problème à résoudre / cas d’usage.
   - **Mode envisagé** (radio) : Cloud / On‑Prem.
   - **Données à importer au démarrage** (multiselect) : Excel, CSV, ERP/CRM, Aucun, Autre.
   - **Modules à prioriser dans la démo** (multiselect) : Évaluation risques, Plans d’action, Incidents/NC, Audits/rapports, Tableaux de bord, Multi‑entités.

4. **Planification — Proposer des créneaux**
   - **Fuseau horaire** par défaut : Africa/Abidjan (modifiable via select).
   - **Durée** (radio) : 30 min / 45 min / 60 min.
   - **Créneaux proposés** : 3 champs (DatePicker + TimePicker 24h). Exemple : `slot1`, `slot2`, `slot3` requis.
   - **Canal préféré** (radio) : Google Meet / Microsoft Teams / Zoom / Téléphone.
   - **Langue** de la démo (select) : Français / Anglais.

5. **Consentements & sécurité**
   - Case RGPD : « J’accepte d’être contacté pour l’organisation de cette démo »\*.
   - Option : « Recevoir des ressources produit et cas d’usage » (opt‑in).
   - Anti‑spam : Turnstile/hCaptcha (stub) + honeypot.

6. **Confirmation**
   - Écran de succès : « Merci ! Nous revenons vers vous pour confirmer le créneau. »
   - Récapitulatif des infos non sensibles.
   - Boutons : « Télécharger l’invitation .ics » + « Ajouter à Google Calendar » + « Ajouter à Outlook ».

---

### 🧩 Sorties attendues

- Fichier : `app/demander-demo/page.mdx` (App Router Next.js 15) — contenu, sections et placeholders composants.
- Composant formulaire : `components/demo/DemoRequestForm.tsx` (Tailwind + shadcn/ui).
- Composant planification : `components/demo/SlotsPicker.tsx` (3 créneaux, TZ aware).
- Données statiques : `data/demo/options.ts` (secteurs, normes, objectifs, canaux, langues, durées).
- Validation **Zod** : `data/demo/schema.ts` (coordonnées, qualification, slots, consentements).
- API route : `app/api/demo/route.ts` (POST) —
  - Valide l’input (Zod),
  - génère un **.ics** (ics lib) avec le créneau principal,
  - envoie un email d’accusé de réception (stub Resend/Nodemailer),
  - crée un enregistrement (stub Prisma/DB) avec statut `pending`.
- Utilitaires : `lib/time.ts` (TZ helpers, format 24h, Africa/Abidjan par défaut), `lib/ics.ts` (génération ICS), `lib/mailer.ts` (stub).

---

### 📦 Spécifications techniques

``

```ts
import { z } from 'zod';

export const slotSchema = z.object({ date: z.string().min(1), time: z.string().min(1) });

export const demoRequestSchema = z.object({
  // Coordonnées
  fullname: z.string().min(2),
  org: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  role: z.enum(['Direction', 'Conformité/Audit', 'Opérations', 'IT/Sécurité', 'Autre']).optional(),

  // Qualification
  sector: z.enum(['extractive', 'aero', 'gov', 'bank', 'health', 'other']),
  standards: z
    .array(
      z.enum([
        'iso31000',
        'iso27001',
        'iso45001',
        'iso14001',
        'icao19',
        'coso',
        'rgpd_anssici',
        'basel3',
        'oms_ps',
        'other',
      ])
    )
    .min(1),
  goals: z
    .array(
      z.enum(['mapping', 'compliance', 'automation', 'reporting', 'collab', 'awareness', 'other'])
    )
    .min(1),
  teamSize: z.enum(['1-10', '11-50', '51-200', '201-1000', '1000+']),
  context: z.string().max(400).optional(),
  mode: z.enum(['cloud', 'onprem']),
  imports: z.array(z.enum(['excel', 'csv', 'erp_crm', 'none', 'other'])).optional(),
  modules: z
    .array(z.enum(['risk_eval', 'actions', 'incidents', 'audits', 'dashboards', 'multi_entity']))
    .min(1),

  // Planification
  tz: z.string().default('Africa/Abidjan'),
  duration: z.enum(['30', '45', '60']).default('45'),
  slot1: slotSchema,
  slot2: slotSchema,
  slot3: slotSchema,
  meetingTool: z.enum(['meet', 'teams', 'zoom', 'phone']).default('meet'),
  language: z.enum(['fr', 'en']).default('fr'),

  // Consentements
  consent: z.boolean().refine((v) => v === true, { message: 'Requis pour organiser la démo' }),
  marketingOptIn: z.boolean().optional(),

  // Anti‑spam
  token: z.string().optional(),
});
```

``** (POST, stub)**

```ts
import { NextResponse } from 'next/server';
import { demoRequestSchema } from '@/data/demo/schema';
import { makeIcs } from '@/lib/ics';
import { sendMail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = demoRequestSchema.parse(body);

    // TODO: persist (DB)
    // const id = await db.demoRequests.create({ data: { ...data, status: "pending" } });

    // ICS pour le 1er créneau
    const ics = makeIcs({
      summary: 'Démo GAMR',
      description: 'Démo personnalisée GAMR',
      tz: data.tz,
      date: data.slot1.date,
      time: data.slot1.time,
      durationMinutes: parseInt(data.duration, 10),
      location: data.meetingTool === 'phone' ? 'Téléphone' : data.meetingTool.toUpperCase(),
      organizer: { name: 'Équipe GAMR', email: 'demo@gamr.example' },
      attendee: { name: data.fullname, email: data.email },
    });

    await sendMail({
      to: data.email,
      subject: 'Votre demande de démo GAMR',
      text: 'Merci — nous confirmons prochainement le créneau.',
      attachments: [{ filename: 'demo-gamr.ics', content: ics, contentType: 'text/calendar' }],
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Invalid' }, { status: 400 });
  }
}
```

**Composants & UX**

- `DemoRequestForm` : étapes « Coordonnées → Qualification → Planification → Consentements → Récap ».
- `SlotsPicker` : 3 items éditables (date + heure), validation min J+1, format 24h, TZ visible.
- Afficher erreurs inline, scroll‑to‑error, annonce ARIA.
- Loader sur submit + désactivation bouton.
- Au succès : carte de confirmation + boutons “Télécharger .ics / Ajouter à Google / Outlook”.

---

### 🔐 Contraintes & qualité

- A11y WCAG 2.1 AA, labels, descriptions, focus order.
- SEO : title ≤ 60, meta ≤ 160.
- Performance > 90; limiter JS, lazy‑load des bibliothèques (ics, date pickers).
- Texte FR, ton pro & rassurant; fuseau par défaut **Africa/Abidjan**.
