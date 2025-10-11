# Feature Specification: Page Solutions - Secteurs d'Activité

**Feature Branch**: `004-page-solutions-pr`  
**Created**: 2025-10-09  
**Status**: Draft  
**Input**: User description: "Génère le contenu complet et la structure HTML/MDX pour la page solutions présentant comment GAMR s'adapte à 5 secteurs clés avec leurs normes spécifiques"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Découvrir les solutions par secteur (Priority: P1)

**Persona**: Directeur de la Sécurité (CSO) / RSSI recherchant une solution adaptée à son secteur d'activité

Un décideur du secteur bancaire visite le site GAMR pour évaluer si la plateforme répond aux exigences réglementaires strictes de son industrie. Il accède à la page Solutions, identifie rapidement la section "Secteur bancaire et financier", et découvre que GAMR supporte les normes Bâle III, ISO 27001 et AML/CFT. Il comprend immédiatement comment GAMR résout ses défis de conformité et génère des rapports pour la BCEAO.

**Why this priority**: C'est la fonctionnalité centrale de la page - permettre aux visiteurs d'identifier rapidement si GAMR répond à leurs besoins sectoriels spécifiques. Sans cette capacité, la page ne remplit pas son objectif principal.

**Independent Test**: Peut être testé en naviguant vers /solutions, en identifiant visuellement les 5 sections sectorielles, et en vérifiant que chaque section affiche clairement le nom du secteur, les normes applicables, et les solutions GAMR correspondantes.

**Acceptance Scenarios**:

1. **Given** un visiteur arrive sur /solutions, **When** il fait défiler la page, **Then** il voit clairement 5 sections distinctes (Industrie extractive, Aéroportuaire, Gouvernement, Bancaire, Santé) avec des titres visuellement différenciés
2. **Given** un visiteur consulte une section sectorielle, **When** il lit le contenu, **Then** il trouve au minimum 3 éléments : normes/référentiels, défis majeurs, et solutions GAMR
3. **Given** un visiteur du secteur bancaire, **When** il identifie la section bancaire, **Then** il voit explicitement mentionnées les normes Bâle III, ISO 27001, et AML/CFT
4. **Given** un visiteur consulte n'importe quelle section sectorielle, **When** il examine le contenu, **Then** les solutions GAMR sont orientées métier (automatisation, conformité, reporting) et non techniques

---

### User Story 2 - Comparer les secteurs et leurs normes (Priority: P2)

**Persona**: Responsable Risques & Conformité comparant les approches réglementaires entre secteurs

Un consultant en gestion des risques travaillant avec plusieurs clients de secteurs différents souhaite comprendre comment GAMR s'adapte à différents cadres réglementaires. Il accède au tableau comparatif qui présente en un coup d'œil les 5 secteurs, leurs normes clés, et les modules GAMR les plus pertinents pour chacun.

**Why this priority**: Fournit une vue synthétique permettant la comparaison rapide, essentielle pour les décideurs évaluant plusieurs options ou gérant des organisations multi-sectorielles. Complète le P1 en offrant une vue consolidée.

**Independent Test**: Peut être testé en localisant le tableau comparatif sur la page, en vérifiant qu'il contient exactement 3 colonnes (Secteur / Normes clés / Modules GAMR) et 5 lignes (un secteur par ligne), et que l'information est cohérente avec les sections détaillées.

**Acceptance Scenarios**:

1. **Given** un visiteur fait défiler vers le bas de la page, **When** il atteint le tableau comparatif, **Then** il voit un tableau avec 3 colonnes (Secteur, Normes clés, Modules GAMR) et 5 lignes correspondant aux 5 secteurs
2. **Given** un visiteur consulte le tableau, **When** il compare deux secteurs, **Then** il peut facilement identifier les différences de normes et de modules recommandés
3. **Given** un visiteur lit une section sectorielle détaillée puis consulte le tableau, **When** il compare les informations, **Then** les normes listées dans le tableau correspondent exactement à celles de la section détaillée

---

### User Story 3 - Naviguer depuis Hero vers les détails (Priority: P1)

**Persona**: Directeur IT découvrant GAMR pour la première fois

Un directeur IT d'un hôpital arrive sur /solutions via un lien marketing. Il lit immédiatement le titre "Des solutions adaptées à chaque secteur" et le sous-titre expliquant l'alignement sur les normes. Il clique sur "Découvrir les fonctionnalités" pour en savoir plus ou sur "Demander une démo" pour un contact direct.

**Why this priority**: La Hero Section est le premier élément visible (above the fold) et détermine si le visiteur reste sur la page. Les CTAs doivent être immédiatement accessibles et fonctionnels pour maximiser la conversion.

**Independent Test**: Peut être testé en chargeant /solutions, en vérifiant la présence de la Hero Section avec titre/sous-titre/boutons dans la zone visible sans défilement, et en cliquant sur chaque bouton pour vérifier la navigation.

**Acceptance Scenarios**:

1. **Given** un visiteur arrive sur /solutions, **When** la page charge, **Then** il voit immédiatement (sans défilement) le titre "Des solutions adaptées à chaque secteur" et le sous-titre
2. **Given** un visiteur voit la Hero Section, **When** il examine les boutons, **Then** il voit deux boutons clairement distincts : un bouton principal "Découvrir les fonctionnalités" et un bouton secondaire "Demander une démo"
3. **Given** un visiteur clique sur "Découvrir les fonctionnalités", **When** la navigation s'effectue, **Then** il est redirigé vers /fonctionnalites
4. **Given** un visiteur clique sur "Demander une démo", **When** la navigation s'effectue, **Then** il est redirigé vers une page ou formulaire de demande de démo

---

### User Story 4 - Comprendre l'introduction et la valeur globale (Priority: P2)

**Persona**: Analyste Sécurité évaluant différentes solutions

Un analyste sécurité fait des recherches préliminaires sur plusieurs plateformes de gestion des risques. Après la Hero Section, il lit l'introduction qui explique comment GAMR s'adapte aux cadres réglementaires pour simplifier la conformité et accélérer la prise de décision. Cette introduction contextualise les sections sectorielles qui suivent.

**Why this priority**: L'introduction établit le positionnement unique de GAMR (adaptabilité multi-sectorielle) et prépare le visiteur à explorer les sections détaillées. Sans elle, les sections sectorielles manqueraient de contexte global.

**Independent Test**: Peut être testé en localisant la section d'introduction entre la Hero et les sections sectorielles, et en vérifiant qu'elle contient le texte spécifié mentionnant "risques spécifiques", "normes strictes", et la valeur de GAMR.

**Acceptance Scenarios**:

1. **Given** un visiteur fait défiler après la Hero Section, **When** il commence à lire, **Then** il trouve une section d'introduction avant les détails sectoriels
2. **Given** un visiteur lit l'introduction, **When** il analyse le contenu, **Then** le texte mentionne explicitement que chaque secteur a des risques spécifiques encadrés par des normes strictes
3. **Given** un visiteur lit l'introduction, **When** il cherche la proposition de valeur, **Then** il trouve une mention claire que GAMR s'adapte aux cadres réglementaires pour simplifier la conformité et accélérer la prise de décision

---

### User Story 5 - Convertir après consultation (Priority: P1)

**Persona**: Tous types de visiteurs prêts à passer à l'action

Après avoir consulté les sections sectorielles pertinentes et le tableau comparatif, un visiteur (quel que soit son secteur) est convaincu que GAMR répond à ses besoins. Il atteint la section CTA de conversion en bas de page, lit la phrase d'appel, et choisit entre "Demander une démo" (pour un accompagnement personnalisé) ou "Essayer gratuitement" (pour tester immédiatement).

**Why this priority**: La conversion est l'objectif final de la page. Sans CTAs clairs et accessibles en fin de parcours, les visiteurs intéressés n'auraient pas de chemin évident vers l'engagement avec GAMR.

**Independent Test**: Peut être testé en faisant défiler jusqu'au bas de la page, en localisant la section CTA de conversion, et en vérifiant la présence de la phrase d'appel et des deux boutons fonctionnels.

**Acceptance Scenarios**:

1. **Given** un visiteur atteint le bas de la page, **When** il arrive à la section CTA finale, **Then** il voit la phrase "Découvrez comment GAMR s'intègre à vos processus et à vos normes sectorielles"
2. **Given** un visiteur voit la section CTA finale, **When** il examine les options, **Then** il trouve deux boutons distincts : "Demander une démo" et "Essayer gratuitement"
3. **Given** un visiteur clique sur "Demander une démo" depuis la section CTA finale, **When** la navigation s'effectue, **Then** il est redirigé vers le formulaire de demande de démo
4. **Given** un visiteur clique sur "Essayer gratuitement", **When** la navigation s'effectue, **Then** il est redirigé vers la page d'inscription à l'essai gratuit

---

### Edge Cases

- **Visiteur d'un secteur non listé**: Comment un visiteur d'un secteur non couvert (ex: retail, éducation) comprend-il que GAMR peut quand même l'aider? → L'introduction générale mentionne l'adaptabilité de GAMR, et le CTA final reste accessible pour poser des questions
- **Affichage sur mobile**: Comment les 5 sections sectorielles détaillées s'affichent-elles sur mobile sans être écrasantes? → Design mobile-first avec sections repliables ou cartes empilées verticalement
- **Chargement lent des images/icônes**: Que voit l'utilisateur si les icônes sectorielles ne chargent pas? → Texte de fallback et structure lisible même sans icônes
- **Navigation directe vers un secteur spécifique**: Un visiteur peut-il accéder directement à la section "Santé" via un lien partagé? → Ancres HTML (#sante) permettent le deep linking vers chaque section
- **Cohérence avec le brief marketing**: Les sections sectorielles sont-elles cohérentes avec les 6 secteurs mentionnés dans le brief (Tech, Santé, Finance, Manufacturing, Gouvernement, Public)? → La page se concentre sur 5 secteurs prioritaires, mais le contenu doit être cohérent avec le positionnement global
- **Tableau comparatif sur mobile**: Comment le tableau à 3 colonnes s'affiche-t-il sur petit écran? → Responsive design transformant le tableau en cartes empilées ou tableau scrollable horizontalement

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: La page MUST être accessible via l'URL `/solutions` depuis la navigation principale du site
- **FR-002**: La page MUST afficher une Hero Section contenant le titre "Des solutions adaptées à chaque secteur", le sous-titre spécifié, et deux boutons CTA distincts
- **FR-003**: Le bouton "Découvrir les fonctionnalités" MUST rediriger vers `/fonctionnalites`
- **FR-004**: Le bouton "Demander une démo" MUST rediriger vers la page ou le formulaire de demande de démo
- **FR-005**: La page MUST afficher une section d'introduction contenant le texte exact: "Chaque secteur fait face à des risques spécifiques, encadrés par des normes strictes. GAMR s'adapte à vos cadres réglementaires pour simplifier la conformité et accélérer la prise de décision."
- **FR-006**: La page MUST afficher exactement 5 sections sectorielles détaillées dans cet ordre: (1) Industrie extractive, (2) Aéroportuaire, (3) Gouvernement & institutions publiques, (4) Secteur bancaire et financier, (5) Santé & hôpitaux
- **FR-007**: Chaque section sectorielle MUST inclure: un titre (nom du secteur), une liste de normes/référentiels (3 maximum), une liste de défis majeurs, une liste de solutions GAMR orientées métier, et une icône ou illustration représentative
- **FR-008**: La section "Industrie extractive" MUST mentionner les normes ISO 14001, ISO 45001, et IFC Performance Standards
- **FR-009**: La section "Aéroportuaire" MUST mentionner les normes OACI Annexe 19, ISO 31000, et ACI Best Practices
- **FR-010**: La section "Gouvernement & institutions publiques" MUST mentionner les normes ISO 31000, COSO ERM, et ANSSI-CI/RGPD
- **FR-011**: La section "Secteur bancaire et financier" MUST mentionner les normes Bâle III, ISO 27001, et AML/CFT (LBC/FT)
- **FR-012**: La section "Santé & hôpitaux" MUST mentionner les normes ISO 9001, ISO 27001, et OMS Patient Safety
- **FR-013**: La page MUST afficher un tableau comparatif avec 3 colonnes (Secteur / Normes clés / Modules GAMR) et 5 lignes (une par secteur)
- **FR-014**: Les données du tableau comparatif MUST être cohérentes avec les informations des sections sectorielles détaillées
- **FR-015**: La page MUST afficher une section CTA de conversion en fin de page contenant la phrase "Découvrez comment GAMR s'intègre à vos processus et à vos normes sectorielles" et deux boutons "Demander une démo" et "Essayer gratuitement"
- **FR-016**: Les solutions GAMR dans chaque section sectorielle MUST être formulées en bénéfices métier clairs (automatisation, conformité, reporting, gouvernance) sans mention de technologies d'implémentation
- **FR-017**: Chaque section sectorielle MUST utiliser un composant réutilisable (SolutionCard ou IndustryCard) pour assurer la cohérence visuelle
- **FR-018**: La page MUST exporter un objet JSON `industries` contenant les données structurées: `{ id, nom, normes: [], defis: [], solutions: [], icone }` pour chaque secteur
- **FR-019**: La page MUST supporter les ancres HTML permettant la navigation directe vers chaque section sectorielle (ex: /solutions#bancaire)
- **FR-020**: La page MUST afficher correctement sur mobile (responsive design) avec sections sectorielles empilées verticalement et tableau comparatif adapté

### Accessibility Requirements (WCAG 2.1 AA)

- **A11Y-001**: Tous les boutons CTA (Hero, sections, CTA final) MUST être accessibles au clavier (Tab, Enter)
- **A11Y-002**: Toutes les icônes sectorielles MUST avoir des attributs alt descriptifs (ex: "Icône industrie extractive - mines et pétrole")
- **A11Y-003**: Le contraste de couleur entre le texte et l'arrière-plan MUST respecter le ratio 4.5:1 minimum sur tous les éléments de texte
- **A11Y-004**: Les titres MUST suivre une hiérarchie sémantique correcte (H1 pour Hero, H2 pour sections principales, H3 pour sous-sections)
- **A11Y-005**: Le tableau comparatif MUST utiliser les balises sémantiques HTML `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` avec les attributs scope appropriés
- **A11Y-006**: Les indicateurs de focus MUST être clairement visibles sur tous les éléments interactifs (boutons, liens internes)
- **A11Y-007**: Les sections sectorielles MUST être navigables via un lecteur d'écran avec une annonce claire du nom de section
- **A11Y-008**: Le landmark `<main>` MUST contenir tout le contenu de la page, et `<nav>` MUST être utilisé pour toute navigation secondaire si applicable

### Performance Requirements

- **PERF-001**: First Contentful Paint (FCP) MUST être < 1.5 secondes sur connexion 3G
- **PERF-002**: Time to Interactive (TTI) MUST être < 3 secondes sur connexion 3G
- **PERF-003**: Cumulative Layout Shift (CLS) MUST être < 0.1 pour éviter les sauts de contenu lors du chargement des icônes
- **PERF-004**: Lighthouse Performance score MUST être > 90 en mode production
- **PERF-005**: Les images et icônes sectorielles MUST être optimisées (WebP avec fallback PNG/JPG) et lazy-loaded sauf pour la Hero Section
- **PERF-006**: Les composants sectoriels MUST utiliser le code splitting pour ne charger que le contenu visible lors du défilement
- **PERF-007**: La page MUST utiliser les design tokens et variables CSS du système pour réduire la duplication de code
- **PERF-008**: Le fichier JSON `industries` exporté MUST être généré au build time (SSG) plutôt qu'au runtime pour optimiser les performances

### SEO Requirements

- **SEO-001**: La page MUST avoir un title unique et descriptif: "Solutions GAMR par Secteur - Conformité & Gestion des Risques" (57 caractères)
- **SEO-002**: La page MUST avoir une meta description unique: "Découvrez comment GAMR s'adapte aux normes de votre secteur : industrie, aéroport, banque, santé, gouvernement. Conformité automatisée et reporting simplifié." (159 caractères)
- **SEO-003**: La page MUST inclure les OpenGraph tags complets: `og:title`, `og:description`, `og:image` (image représentant les 5 secteurs), `og:url` (https://[domain]/solutions), `og:type` (website)
- **SEO-004**: La page MUST inclure le JSON-LD structured data de type `WebPage` avec breadcrumb et sections sectorielles identifiées
- **SEO-005**: La page MUST définir une canonical URL `<link rel="canonical" href="https://[domain]/solutions" />` pour éviter la duplication
- **SEO-006**: Toutes les images sectorielles MUST avoir des attributs alt descriptifs incluant le nom du secteur et des mots-clés pertinents (ex: "Gestion des risques secteur bancaire - conformité Bâle III")
- **SEO-007**: La page MUST utiliser les balises sémantiques HTML5 (`<article>`, `<section>`, `<header>`) pour améliorer la compréhension par les moteurs de recherche
- **SEO-008**: Les ancres de section MUST être descriptives et inclure des mots-clés (ex: #industrie-extractive, #secteur-bancaire) plutôt que des identifiants génériques

### Key Entities _(include if feature involves data)_

- **Secteur d'Activité (Industry)**: Représente un secteur d'activité cible pour GAMR. Attributs clés: id (string unique, ex: "extractive"), nom (string affiché, ex: "Industrie extractive"), normes (array de strings, 3 max), defis (array de strings), solutions (array de strings orientées métier), icone (string, chemin vers icône ou nom de composant icône). Relations: Chaque secteur peut être lié à plusieurs modules GAMR dans le tableau comparatif.

- **Norme/Référentiel (Standard)**: Représente une norme industrielle ou un cadre réglementaire. Attributs: nom complet (ex: "ISO 14001"), description courte (ex: "environnement"), organisation émettrice (ex: "ISO", "OACI", "BCEAO"). Utilisé dans les sections sectorielles et le tableau comparatif.

- **Module GAMR**: Représente une fonctionnalité ou un ensemble de fonctionnalités GAMR particulièrement pertinent pour un secteur. Attributs: nom (ex: "Cartographie des risques environnementaux", "Reporting ESG", "Registre des incidents"), description courte. Utilisé dans le tableau comparatif et les listes de solutions.

- **Section de Page**: Représente une section structurelle de la page (Hero, Introduction, Sections Sectorielles, Tableau Comparatif, CTA Final). Attributs: type, contenu, ordre d'affichage, ancre HTML. Permet l'organisation cohérente du contenu et la navigation interne.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Les visiteurs peuvent identifier leur secteur d'activité en moins de 10 secondes après l'arrivée sur la page (mesurable via heatmaps et scroll tracking)
- **SC-002**: Le taux de clic sur les boutons CTA (Hero + CTA final) atteint au minimum 15% des visiteurs de la page (mesurable via analytics)
- **SC-003**: Le temps moyen passé sur la page est supérieur à 2 minutes, indiquant un engagement avec le contenu sectoriel (mesurable via analytics)
- **SC-004**: 90% des utilisateurs testés peuvent correctement identifier au moins 2 normes applicables à leur secteur après consultation de la page (mesurable via user testing)
- **SC-005**: Le Lighthouse Performance score est supérieur à 90 lors des tests en mode production
- **SC-006**: Le taux de rebond de la page est inférieur à 50%, indiquant que le contenu répond aux attentes des visiteurs (mesurable via analytics)
- **SC-007**: Les sections sectorielles s'affichent correctement sur au moins 95% des combinaisons appareil/navigateur testées (desktop Chrome/Firefox/Safari/Edge, mobile iOS Safari/Android Chrome)
- **SC-008**: Les tests d'accessibilité automatisés (axe-core, WAVE) ne rapportent aucune erreur WCAG 2.1 AA bloquante
- **SC-009**: La page charge entièrement (LCP) en moins de 2.5 secondes sur connexion 4G (mesurable via Lighthouse et WebPageTest)
- **SC-010**: Au moins 20% des visiteurs de /solutions cliquent sur l'ancre d'une section sectorielle spécifique ou font défiler jusqu'à une section complète (mesurable via scroll depth tracking)
