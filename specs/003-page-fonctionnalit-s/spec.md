# Feature Specification: Page Fonctionnalités GAMR

**Feature Branch**: `003-page-fonctionnalit-s`  
**Created**: 2025-10-09  
**Status**: Draft  
**Input**: User description: "Génère le contenu complet et la structure HTML/MDX pour la page http://localhost:3000/fonctionnalites présentant les fonctionnalités clés de la plateforme GAMR avec hero section, vue d'ensemble, 7 fonctionnalités principales illustrées, tableau comparatif avant/après, section partenaire ASPCI, et CTA de conversion"

## Clarifications

### Session 2025-10-09

- Q: What schema structure should the features JSON follow? → A: Nested by category: `{main: [{key, title, ...}], secondary: [...]}`
- Q: How many comparison items should the table include? → A: 8-10 rows (comprehensive comparison covering all major aspects)
- Q: Which CTA button should be the primary action? → A: "Demander une démo" primary (emphasizes sales-assisted conversion for enterprise)
- Q: How should the 7 feature cards be laid out visually? → A: Grid 4-3 (4 cards on first row, 3 cards on second row)
- Q: Should tooltips be included for technical terms? → A: Yes, include tooltips for all technical terms (GAMR methodology, cartographie, heatmaps, etc.)

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Découverte des Capacités de GAMR (Priority: P1)

Un décideur (RSSI, Directeur Sécurité) visite la page fonctionnalités pour comprendre rapidement si GAMR répond à ses besoins en gestion des risques avant de demander une démo ou de s'inscrire pour un essai gratuit.

**Why this priority**: C'est le scénario central qui définit la raison d'être de cette page - convertir les visiteurs intéressés en prospects qualifiés en démontrant clairement la valeur de la plateforme.

**Independent Test**: Peut être testé en affichant la page à un utilisateur cible et en mesurant s'il peut identifier au moins 5 fonctionnalités clés et leur bénéfice en moins de 2 minutes de navigation.

**Acceptance Scenarios**:

1. **Given** un visiteur arrive sur `/fonctionnalites`, **When** il consulte la hero section, **Then** il comprend immédiatement la proposition de valeur principale (centralisation de la gestion des risques)
2. **Given** un décideur parcourt les 7 fonctionnalités, **When** il lit chaque carte de fonctionnalité, **Then** il identifie clairement le bénéfice business (pas seulement la description technique)
3. **Given** un utilisateur scroll jusqu'à la section comparaison, **When** il consulte le tableau "Avant/Avec GAMR", **Then** il visualise les gains concrets (productivité, conformité, gouvernance)
4. **Given** un visiteur termine la lecture de la page, **When** il souhaite passer à l'action, **Then** il voit des CTA clairs ("Demander une démo" ou "Essai gratuit") à plusieurs endroits stratégiques

---

### User Story 2 - Évaluation Technique des Fonctionnalités (Priority: P2)

Un responsable technique (Analyste Sécurité, Responsable IT) évalue en détail chaque fonctionnalité pour vérifier la complétude de la solution avant de recommander l'adoption à sa direction.

**Why this priority**: Scénario important pour qualifier les prospects et fournir suffisamment de détails techniques pour convaincre les parties prenantes techniques.

**Independent Test**: Peut être testé en demandant à un analyste sécurité de comparer les fonctionnalités listées avec ses besoins métier et de confirmer que chaque fonctionnalité inclut une description orientée bénéfices (pas seulement des caractéristiques techniques).

**Acceptance Scenarios**:

1. **Given** un utilisateur technique consulte une fonctionnalité, **When** il lit la description, **Then** il comprend à la fois le "quoi" (capacité) et le "pourquoi" (bénéfice métier)
2. **Given** un responsable IT parcourt la section vue d'ensemble, **When** il voit le mockup ou l'image de la plateforme, **Then** il visualise concrètement l'interface utilisateur
3. **Given** un analyste sécurité évalue les 7 fonctionnalités, **When** il compare avec sa checklist interne, **Then** il identifie au moins 5 fonctionnalités correspondant à ses besoins

---

### User Story 3 - Validation de la Crédibilité et Confiance (Priority: P3)

Un décideur final (Direction, C-Suite) vérifie la légitimité et l'expérience du fournisseur avant d'engager un processus d'achat ou de POC.

**Why this priority**: Important pour la conversion finale mais ne bloque pas la compréhension des fonctionnalités. Renforce la confiance établie par le contenu principal.

**Independent Test**: Peut être testé en affichant uniquement la section ASPCI à un décideur et en mesurant si cela augmente sa confiance dans la solution (questionnaire de perception).

**Acceptance Scenarios**:

1. **Given** un décideur lit la section ASPCI, **When** il découvre l'expérience du partenaire (10+ années, formation dans ports et multinationales), **Then** il ressent une légitimité accrue pour la solution
2. **Given** un visiteur international consulte la page, **When** il voit les références géographiques (Abidjan, San-Pedro, sous-région), **Then** il comprend l'ancrage régional et l'expertise locale

---

### Edge Cases

- **Visiteur mobile**: Comment la page s'affiche-t-elle sur smartphone avec navigation verticale et cartes empilées? Les tooltips restent-ils accessibles sur mobile (tap vs hover)?
- **Visiteur non francophone ou non-expert**: Les tooltips explicatifs doivent clarifier tous les termes techniques (GAMR, cartographie, heatmaps, scoring) pour assurer la compréhension universelle
- **Navigation directe**: Un utilisateur arrivant directement sur `/fonctionnalites` (sans passer par l'accueil) comprend-il le contexte de GAMR? Le premier tooltip ou l'intro doit contextualiser
- **Accessibilité**: Les utilisateurs avec lecteurs d'écran peuvent-ils naviguer efficacement entre les sections et comprendre la hiérarchie du contenu?
- **Performance réseau lent**: Les images/mockups se chargent-ils progressivement sans bloquer la lecture du contenu textuel?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: La page MUST afficher une hero section avec un titre principal impactant ("Toutes vos analyses de risques, réunies dans une seule plateforme"), un sous-titre explicatif, et deux boutons CTA avec "Demander une démo" comme action primaire (bouton principal/prominent) et "Essayer gratuitement" comme action secondaire (bouton moins prominent)
- **FR-002**: La page MUST contenir une section "Vue d'ensemble" avec un texte introductif (2-3 phrases) expliquant pourquoi centraliser la gestion des risques et une image représentative de la plateforme
- **FR-003**: La page MUST présenter exactement 7 fonctionnalités principales sous forme de cartes illustrées en grille 4-3 (4 cartes sur la première rangée, 3 cartes sur la seconde rangée sur desktop; empilées verticalement sur mobile), chacune contenant:
  - Un nom de fonctionnalité (titre court, max 6 mots)
  - Une description orientée bénéfices (2 phrases maximum)
  - Une icône ou visuel proposé
- **FR-004**: Les 7 fonctionnalités MUST inclure (dans cet ordre de priorité):
  1. Cartographie des menaces
  2. Évaluation automatisée des risques
  3. Priorités d'action & suivi des mesures
  4. Indicateurs de performance
  5. Collaboration & validation
  6. Rapports & audits intelligents
  7. Sécurité & traçabilité
- **FR-005**: La page MUST inclure une section "Bénéfices pour les utilisateurs" présentant une comparaison "Avant GAMR" vs "Avec GAMR" sous forme de tableau ou liste à deux colonnes avec 8-10 éléments de comparaison couvrant les aspects majeurs de la gestion des risques
- **FR-006**: La comparaison MUST inclure obligatoirement les 5 dimensions clés (productivité, conformité, gouvernance, visibilité, réactivité) plus 3-5 aspects additionnels démontrant des bénéfices concrets
- **FR-007**: La page MUST contenir une section dédiée intitulée "ASPCI, un partenaire de confiance" avec le texte exact: "Depuis plus d'une dizaine d'années, ASPCI assure l'assistance et la formation des agents des Ports d'Abidjan et de San-Pedro ainsi que de nombreuses multinationales notamment dans l'industrie extractive en Côte d'Ivoire et dans d'autres pays de la sous-région."
- **FR-008**: La section ASPCI MUST inclure un encadré visuel ou une photo institutionnelle illustrant la collaboration
- **FR-009**: La page MUST se terminer par une section CTA de conversion avec:
  - Une phrase d'appel forte ("Adoptez la méthodologie GAMR dès aujourd'hui")
  - Deux boutons d'action avec hiérarchie claire: "Demander une démo" (bouton primaire/prominent) + "Essai gratuit 30 jours" (bouton secondaire)
- **FR-010**: La page MUST utiliser un langage d'impact dans les descriptions (verbes d'action: "pilotez", "simplifiez", "automatisez", "maîtrisez")
- **FR-011**: La page MUST maintenir des paragraphes courts (max 3-4 lignes) et privilégier les listes à puces pour la lisibilité
- **FR-011b**: La page MUST inclure des tooltips explicatifs pour tous les termes techniques (GAMR, cartographie des menaces, heatmaps, scoring, etc.) permettant aux visiteurs non-experts de comprendre la terminologie sans quitter le contexte de lecture
- **FR-012**: La page MUST être cohérente avec le ton et le branding définis dans le brief marketing (`docs/brief/MARKETING_SITE_BRIEF.md`)
- **FR-013**: Le contenu MUST utiliser un fichier `app/fonctionnalites/page.mdx` ou `app/fonctionnalites/page.tsx` (Next.js 15 App Router)
- **FR-014**: La structure HTML MUST utiliser les balises sémantiques appropriées (`section`, `article`, `header`, composants `Card`, `Button`)
- **FR-015**: La page MUST inclure un export JSON des fonctionnalités réutilisable dans le code, structuré par catégorie: `{main: [{key, title, description, icon, order}], secondary: [{key, title, description, icon, order}]}` où "main" contient les 7 fonctionnalités principales et "secondary" peut contenir des fonctionnalités futures

### Accessibility Requirements (WCAG 2.1 AA)

- **A11Y-001**: Tous les boutons CTA MUST être accessibles au clavier (Tab, Enter)
- **A11Y-002**: Toutes les icônes de fonctionnalités MUST avoir un texte alternatif ou aria-label descriptif
- **A11Y-003**: Les images/mockups MUST avoir des attributs alt descriptifs (ex: "Interface de la plateforme GAMR montrant le tableau de bord de gestion des risques")
- **A11Y-004**: Le contraste de texte MUST respecter le ratio 4.5:1 minimum (texte sur fond, boutons)
- **A11Y-005**: La hiérarchie des titres MUST être logique et séquentielle (h1 > h2 > h3 sans saut de niveau)
- **A11Y-006**: Les focus indicators MUST être clairement visibles sur tous les éléments interactifs
- **A11Y-007**: La navigation au lecteur d'écran MUST permettre de sauter directement aux sections principales (landmarks ARIA)
- **A11Y-008**: Les tooltips MUST être accessibles au clavier (hover + focus) et les lecteurs d'écran MUST pouvoir accéder aux définitions via aria-describedby ou pattern similaire

### Performance Requirements

- **PERF-001**: First Contentful Paint (FCP) MUST be < 1.5 seconds
- **PERF-002**: Largest Contentful Paint (LCP) MUST be < 2.5 seconds (images optimisées)
- **PERF-003**: Time to Interactive (TTI) MUST be < 3 seconds
- **PERF-004**: Cumulative Layout Shift (CLS) MUST be < 0.1 (réserver l'espace pour les images)
- **PERF-005**: Lighthouse Performance score MUST be > 90
- **PERF-006**: Les images/mockups MUST être optimisées (formats WebP/AVIF avec fallback, lazy loading)
- **PERF-007**: Le contenu textuel MUST s'afficher immédiatement même si les images ne sont pas encore chargées

### SEO Requirements

- **SEO-001**: La page MUST avoir un titre unique et descriptif (50-60 caractères): "Fonctionnalités GAMR | Plateforme de Gestion des Risques"
- **SEO-002**: La page MUST avoir une meta description unique (150-160 caractères): "Découvrez les fonctionnalités de GAMR : cartographie des menaces, évaluation automatisée, indicateurs de performance, rapports intelligents. Simplifiez la gestion de vos risques."
- **SEO-003**: La page MUST inclure des keywords pertinents dans le contenu: gestion des risques, cartographie, audit, conformité, GAMR, Côte d'Ivoire, évaluation des risques, tableaux de bord
- **SEO-004**: La page MUST avoir des tags OpenGraph complets (og:title, og:description, og:image, og:url)
- **SEO-005**: La page MUST inclure JSON-LD structured data de type "WebPage" avec breadcrumb
- **SEO-006**: Les headings MUST contenir des mots-clés pertinents (h1: "Fonctionnalités", h2: noms de sections)
- **SEO-007**: L'URL canonique MUST être définie: `https://[domain]/fonctionnalites`

### Key Entities _(include if feature involves data)_

- **Fonctionnalité**: Représente une capacité de la plateforme GAMR
  - Attributs: clé unique (slug), titre (string, max 50 caractères), description courte (string, max 150 caractères), description bénéfices (string, max 250 caractères), icône (string/composant), ordre d'affichage (number)
  - Relations: Une fonctionnalité peut avoir plusieurs bénéfices associés

- **Section de page**: Représente un bloc de contenu de la page
  - Attributs: identifiant (string), titre (string), contenu (rich text/MDX), ordre (number), type (hero/overview/features/comparison/partner/cta)
  - Relations: Une page contient plusieurs sections dans un ordre séquentiel

- **Comparaison Avant/Après**: Représente un élément du tableau comparatif
  - Attributs: dimension (string: "productivité", "conformité", etc.), situation_avant (string), situation_avec_gamr (string), amélioration (string/number, optionnel)

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Les visiteurs peuvent identifier au moins 5 fonctionnalités clés de GAMR en moins de 2 minutes de consultation de la page
- **SC-002**: 70% des utilisateurs testés comprennent la proposition de valeur principale après lecture de la hero section uniquement (test de compréhension)
- **SC-003**: Le taux de rebond sur la page est inférieur à 60% (mesuré via analytics après 30 jours de mise en ligne)
- **SC-004**: Le temps moyen passé sur la page est supérieur à 90 secondes (indiquant un engagement avec le contenu)
- **SC-005**: Au moins 15% des visiteurs de cette page cliquent sur un CTA ("Demander une démo" ou "Essai gratuit")
- **SC-006**: La page obtient un score Lighthouse supérieur à 90 dans les 4 catégories (Performance, Accessibility, Best Practices, SEO)
- **SC-007**: 100% des utilisateurs testés avec lecteur d'écran peuvent naviguer entre les sections et comprendre le contenu des fonctionnalités
- **SC-008**: La page charge complètement (LCP) en moins de 2.5 secondes sur une connexion 4G moyenne
- **SC-009**: Le taux de conversion (visite page fonctionnalités → action CTA) augmente de 20% par rapport à la moyenne actuelle du site dans les 60 jours suivant le lancement
- **SC-010**: 85% des utilisateurs mobiles peuvent lire et interagir avec tout le contenu sans zoom horizontal (test sur appareils iOS/Android courants)

### Qualitative Outcomes

- Les visiteurs perçoivent GAMR comme une solution professionnelle et complète pour la gestion des risques (feedback qualitatif)
- Les décideurs sentent une confiance accrue grâce à la mention du partenaire ASPCI et de son expérience
- Le contenu est ressenti comme accessible (pas trop technique) tout en étant crédible pour des experts sécurité

## Assumptions

1. **Visuels disponibles**: On suppose que des icônes ou illustrations pour les 7 fonctionnalités sont disponibles (utilisation de bibliothèques comme Lucide Icons) ou peuvent être créées
2. **Image ASPCI**: Une photo ou visuel institutionnel représentant ASPCI ou la collaboration sera fourni ou peut être un placeholder initial
3. **Mockup plateforme**: Un screenshot ou mockup représentatif de l'interface GAMR existe ou sera créé pour la section vue d'ensemble
4. **Contenu brief**: Le contenu marketing référencé dans `docs/brief/MARKETING_SITE_BRIEF.md` est à jour et validé
5. **Navigation**: La page s'intègre dans une navigation existante (header/footer) déjà implémentée ou en cours d'implémentation
6. **Composants UI**: Les composants `Card`, `Button`, `CTAButton` mentionnés sont déjà créés ou peuvent être réutilisés du design system existant (Tailwind + shadcn/ui)
7. **Langue**: Le contenu est en français, ciblant principalement un public francophone (Côte d'Ivoire, Afrique francophone, France)
8. **Responsive**: L'approche mobile-first est adoptée par défaut pour tous les composants

## Notes

- Cette page est une **page de conversion critique** dans le funnel marketing: Accueil → Fonctionnalités → Démo/Essai
- Le style rédactionnel doit rester **professionnel et confiant** tout en étant **accessible aux décideurs non-techniques**
- Les **tooltips explicatifs** sur tous les termes techniques assurent la compréhension par des audiences variées (francophones experts et non-experts, visiteurs internationaux)
- La structure JSON des fonctionnalités facilitera la **maintenance future** (ajout/modification de fonctionnalités) et la **réutilisation** (par exemple pour générer automatiquement une page de comparaison ou un tableau de fonctionnalités)
- Le choix de **"Demander une démo" comme CTA primaire** reflète un modèle de vente assistée adapté aux entreprises et institutions (cible B2B/B2G)
