# Feature Specification: Page À Propos

**Feature Branch**: `006-redige-la-page`  
**Created**: October 9, 2025  
**Status**: Draft  
**Input**: User description: "redige la page À Propos"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Découvrir l'entreprise GAMR (Priority: P1)

Un visiteur potentiel veut comprendre qui est GAMR, sa mission, et pourquoi il devrait faire confiance à cette plateforme pour la gestion de son association sportive.

**Why this priority**: C'est le cœur de la page À Propos - établir la crédibilité et la confiance. Sans cette information, la page ne remplit pas son objectif principal.

**Independent Test**: Peut être testé en visitant la page et en vérifiant que l'histoire, la mission et la proposition de valeur de GAMR sont clairement présentées et compréhensibles en moins de 30 secondes de lecture.

**Acceptance Scenarios**:

1. **Given** un visiteur arrive sur la page À Propos, **When** il lit la section principale, **Then** il comprend la mission de GAMR (simplifier la gestion des associations sportives)
2. **Given** un visiteur cherche des informations sur l'entreprise, **When** il consulte l'histoire de GAMR, **Then** il découvre les origines, l'évolution et les valeurs de l'entreprise
3. **Given** un décideur évalue GAMR, **When** il lit la proposition de valeur, **Then** il identifie les bénéfices uniques de la plateforme

---

### User Story 2 - Connaître l'équipe et l'expertise (Priority: P2)

Un client potentiel souhaite savoir qui se cache derrière GAMR et quelle est leur expertise pour avoir confiance dans la solution proposée.

**Why this priority**: Les associations sportives font confiance aux personnes autant qu'aux outils. Montrer l'équipe humanise la marque et renforce la crédibilité.

**Independent Test**: Peut être testé en vérifiant la présence d'une section équipe avec photos, rôles, et expertise pertinente pour le domaine sportif.

**Acceptance Scenarios**:

1. **Given** un visiteur veut connaître l'équipe, **When** il consulte la section équipe, **Then** il voit les membres clés avec leurs photos, noms, rôles et expertises
2. **Given** un visiteur évalue la crédibilité, **When** il lit les parcours de l'équipe, **Then** il identifie l'expertise dans le sport et/ou la technologie
3. **Given** un visiteur cherche un contact humain, **When** il voit les profils d'équipe, **Then** il ressent une connexion personnelle avec la marque

---

### User Story 3 - Découvrir les valeurs et engagements (Priority: P2)

Un responsable associatif veut s'assurer que les valeurs de GAMR correspondent à celles de son association avant de s'engager.

**Why this priority**: Les associations sportives fonctionnent sur des valeurs fortes. Montrer l'alignement des valeurs facilite la décision d'adoption.

**Independent Test**: Peut être testé en vérifiant que les valeurs de l'entreprise sont clairement énoncées avec des exemples concrets de leur application.

**Acceptance Scenarios**:

1. **Given** un visiteur consulte la page À Propos, **When** il lit la section valeurs, **Then** il découvre 3 à 5 valeurs fondamentales de GAMR
2. **Given** un visiteur évalue l'alignement culturel, **When** il lit chaque valeur, **Then** il comprend comment elle se traduit concrètement dans le produit ou le service
3. **Given** un visiteur cherche des engagements, **When** il consulte la section, **Then** il trouve des engagements mesurables (support, innovation, communauté)

---

### User Story 4 - Voir les réalisations et preuves sociales (Priority: P3)

Un prospect veut voir des preuves concrètes que GAMR a réussi à aider d'autres associations sportives.

**Why this priority**: Les témoignages et chiffres clés renforcent la confiance mais sont moins essentiels que la présentation de base de l'entreprise.

**Independent Test**: Peut être testé en vérifiant la présence de statistiques d'usage, de logos de clients, ou de témoignages sur la page.

**Acceptance Scenarios**:

1. **Given** un visiteur évalue la traction, **When** il consulte les statistiques, **Then** il voit des chiffres clés (nombre d'associations, d'utilisateurs, de licenciés gérés)
2. **Given** un visiteur cherche des preuves, **When** il voit la section clients, **Then** il reconnaît des logos ou noms d'associations utilisant GAMR
3. **Given** un visiteur veut être rassuré, **When** il lit les témoignages courts, **Then** il trouve des retours positifs de vrais utilisateurs

---

### User Story 5 - Initier le contact (Priority: P3)

Un visiteur intéressé veut pouvoir contacter l'équipe GAMR facilement depuis la page À Propos.

**Why this priority**: Facilite la conversion mais peut aussi être disponible via le footer ou une page contact dédiée.

**Independent Test**: Peut être testé en vérifiant la présence d'un CTA clair de contact ou de demande de démo avec un lien fonctionnel.

**Acceptance Scenarios**:

1. **Given** un visiteur veut en savoir plus, **When** il arrive en bas de la page, **Then** il voit un CTA clair pour "Demander une démo" ou "Nous contacter"
2. **Given** un visiteur clique sur le CTA, **When** il est redirigé, **Then** il arrive sur le formulaire de contact ou la page de demande de démo
3. **Given** un visiteur cherche un contact rapide, **When** il consulte la page, **Then** il trouve une adresse email ou un numéro de téléphone visible

---

### Edge Cases

- Que se passe-t-il si un visiteur accède à la page depuis un appareil mobile avec une connexion lente ?
- Comment la page se comporte-t-elle si les images de l'équipe ne se chargent pas ?
- Comment gérer les profils d'équipe si un membre a quitté l'entreprise (photo en grisé, statut "ancien membre") ?
- Que se passe-t-il si le visiteur utilise un lecteur d'écran pour naviguer sur la page ?
- Comment gérer l'affichage si le contenu de la mission/histoire est très long (plus de 500 mots) ?
- Que se passe-t-il si les statistiques ne sont pas disponibles ou obsolètes (afficher "en cours de mise à jour" vs masquer) ?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: La page DOIT présenter la mission et l'histoire de GAMR de manière claire et concise (maximum 300 mots pour la mission)
- **FR-002**: La page DOIT inclure une section "Notre Équipe" avec au minimum le nom, la photo, le rôle et une brève description (50 mots max) de chaque membre clé
- **FR-003**: La page DOIT afficher 3 à 5 valeurs fondamentales de l'entreprise avec une explication concrète pour chacune (50-100 mots)
- **FR-004**: La page DOIT inclure des statistiques clés sur l'impact de GAMR (nombre d'associations, d'utilisateurs actifs, de licenciés gérés, ou années d'expérience)
- **FR-005**: La page DOIT présenter un appel à l'action (CTA) clair pour contacter l'équipe ou demander une démo
- **FR-006**: La page DOIT inclure une section de preuves sociales (logos de clients, témoignages courts, ou certifications si disponibles)
- **FR-007**: La page DOIT être accessible via un lien "À Propos" dans la navigation principale du site
- **FR-008**: Le contenu DOIT être structuré avec des sections clairement identifiables (Hero, Mission, Équipe, Valeurs, Réalisations, CTA)
- **FR-009**: Les images de l'équipe DOIVENT avoir un format cohérent (rond ou carré, même taille)
- **FR-010**: La page DOIT inclure des liens vers les réseaux sociaux de GAMR si disponibles

### Accessibility Requirements (WCAG 2.1 AA)

- **A11Y-001**: Tous les éléments interactifs (liens, boutons CTA) DOIVENT être accessibles au clavier (Tab, Enter, Esc)
- **A11Y-002**: Toutes les images (photos d'équipe, logos clients) DOIVENT avoir un texte alternatif descriptif
- **A11Y-003**: Le contraste de couleur entre le texte et l'arrière-plan DOIT respecter un ratio minimum de 4.5:1
- **A11Y-004**: Les indicateurs de focus DOIVENT être clairement visibles sur tous les éléments interactifs
- **A11Y-005**: Les titres de section DOIVENT utiliser une hiérarchie logique (H1 > H2 > H3) pour la navigation par lecteur d'écran
- **A11Y-006**: Le contenu DOIT rester lisible et compréhensible avec un zoom de 200%
- **A11Y-007**: Les statistiques et chiffres clés DOIVENT être lisibles par les lecteurs d'écran (pas uniquement visuels)

### Performance Requirements

- **PERF-001**: First Contentful Paint (FCP) DOIT être < 1.5 secondes
- **PERF-002**: Time to Interactive (TTI) DOIT être < 3 secondes
- **PERF-003**: Cumulative Layout Shift (CLS) DOIT être < 0.1
- **PERF-004**: Lighthouse Performance score DOIT être > 90
- **PERF-005**: Les images de l'équipe DOIVENT être optimisées et lazy-loadées (format WebP avec fallback)
- **PERF-006**: La page complète (incluant toutes les images) DOIT se charger en moins de 5 secondes sur une connexion 3G

### SEO Requirements

- **SEO-001**: La page DOIT avoir un titre unique et descriptif (50-60 caractères) : "À Propos de GAMR - Notre Mission et Notre Équipe"
- **SEO-002**: La page DOIT avoir une meta description unique (150-160 caractères) résumant la mission et l'expertise de GAMR
- **SEO-003**: Les tags OpenGraph DOIVENT être complets (og:title, og:description, og:image avec photo d'équipe ou logo, og:url)
- **SEO-004**: Les données structurées JSON-LD DOIVENT inclure le schéma Organization avec les informations de l'entreprise
- **SEO-005**: L'URL canonique DOIT être définie : https://[domaine]/a-propos
- **SEO-006**: Les images DOIVENT avoir des attributs alt descriptifs pour l'indexation par les moteurs de recherche
- **SEO-007**: Les titres de section DOIVENT inclure des mots-clés pertinents (gestion sportive, associations, équipe, expertise)

### Key Entities

- **Membre d'Équipe**: Représente un membre de l'équipe GAMR avec attributs : nom, prénom, rôle/titre, photo, biographie courte (50-100 mots), liens réseaux sociaux optionnels
- **Valeur d'Entreprise**: Représente une valeur fondamentale de GAMR avec attributs : nom de la valeur, description (50-100 mots), icône ou illustration optionnelle
- **Statistique Clé**: Représente un chiffre d'impact avec attributs : valeur numérique, unité, libellé descriptif, date de dernière mise à jour
- **Preuve Sociale**: Représente un élément de crédibilité avec attributs : type (logo client, témoignage, certification), contenu, source, date

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Les visiteurs passent en moyenne au moins 45 secondes sur la page À Propos, indiquant un engagement avec le contenu
- **SC-002**: Le taux de rebond sur la page À Propos est inférieur à 60%, montrant que le contenu retient l'attention
- **SC-003**: Au moins 10% des visiteurs de la page À Propos cliquent sur le CTA de contact ou de demande de démo
- **SC-004**: Le taux de conversion des visiteurs de la page À Propos vers une demande de démo est supérieur de 15% à la moyenne du site
- **SC-005**: La page obtient un score Lighthouse supérieur à 90 en performance, accessibilité et SEO
- **SC-006**: 100% des utilisateurs testés (minimum 5) avec lecteur d'écran peuvent naviguer et comprendre toutes les sections de la page
- **SC-007**: La page se charge complètement en moins de 3 secondes sur une connexion 4G standard
- **SC-008**: Le temps de lecture moyen correspond à au moins 70% du contenu total (indiquant que les visiteurs lisent la majorité de la page)
