# Feature Specification: GAMR Marketing Website

**Feature Branch**: `001-site-marketing-gamr`  
**Created**: 2025-10-08  
**Status**: Draft  
**Input**: Site marketing GAMR complet avec pages accueil, fonctionnalités, solutions industrie, tarifs, ressources, à propos et conversion - basé sur brief `docs/brief/MARKETING_SITE_BRIEF.md`

## Clarifications

### Session 2025-10-08

- Q: What is the data retention policy for form submissions (trial signups, demo requests, contact forms) to ensure GDPR compliance? → A: Indefinite until user requests deletion (requires deletion request workflow and privacy portal for users to manage data)
- Q: What error tracking and monitoring solution should be implemented to detect and diagnose production issues? → A: Built into analytics (GA4 custom events) - track errors via custom events without additional service
- Q: Should blog functionality and content management be included in the MVP? → A: No - blog and articles removed from scope to simplify MVP. Focus on core pages (Homepage, Features, Solutions, Pricing, About, Trial, Demo) and case studies only
- Q: What spam protection mechanism should be implemented for form submissions? → A: Honeypot field (hidden field bots fill) - simple, no external service required, catches basic automated bots

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Découverte et Compréhension Initiale (Priority: P1) 🎯 MVP

Un RSSI ou Responsable Sécurité visite le site pour évaluer si GAMR répond à leurs besoins de gestion des risques.

**Why this priority**: C'est le parcours critique qui doit convaincre le visiteur en moins de 30 secondes. Sans cette première impression réussie, aucune conversion n'est possible.

**Independent Test**: Un utilisateur peut comprendre la proposition de valeur GAMR et identifier au moins 3 bénéfices clés en lisant uniquement la page d'accueil.

**Acceptance Scenarios**:

1. **Given** un visiteur arrive sur la page d'accueil, **When** il lit le Hero Section, **Then** il comprend que GAMR est une plateforme de gestion des risques propulsée par l'IA en moins de 5 secondes
2. **Given** un visiteur scroll la page d'accueil, **When** il atteint la section Problème/Solution, **Then** il identifie au moins 3 points de douleur qui correspondent à sa situation
3. **Given** un visiteur visualise les 7 fonctionnalités clés, **When** il lit les descriptions, **Then** il comprend l'Indice de Sécurité en Temps Réel comme différenciateur principal
4. **Given** un visiteur voit la section preuve sociale, **When** il consulte les témoignages, **Then** il voit des chiffres quantifiables (70% réduction temps, 32 points amélioration moyenne)
5. **Given** un visiteur atteint le bas de page, **When** il cherche une action, **Then** il trouve un CTA "Essai Gratuit 30 jours" clairement visible avec réassurance "Sans carte bancaire"

---

### User Story 2 - Exploration Approfondie des Fonctionnalités (Priority: P2)

Un décideur IT ou Analyste Sécurité veut comprendre en détail comment fonctionnent les capacités de GAMR avant de demander une démo.

**Why this priority**: Les visiteurs qualifiés ont besoin de détails techniques pour justifier l'investissement auprès de leur direction. Cette exploration renforce la confiance et augmente la qualité des leads.

**Independent Test**: Un utilisateur peut explorer les 7 fonctionnalités principales avec screenshots et bénéfices détaillés, puis revenir à la page d'accueil sans friction.

**Acceptance Scenarios**:

1. **Given** un visiteur clique sur "En savoir plus" sur une fonctionnalité, **When** la page Fonctionnalités charge, **Then** il voit une navigation par onglets ou sections pour les 7 fonctionnalités
2. **Given** un visiteur est sur la page Fonctionnalités, **When** il sélectionne "Indice de Sécurité en Temps Réel", **Then** il voit l'algorithme de calcul, un screenshot de la jauge, et les cas d'usage
3. **Given** un visiteur explore "Analyse IA", **When** il lit la description, **Then** il comprend que l'IA génère des recommandations contextuelles avec niveaux de confiance
4. **Given** un visiteur consulte "Évaluations de Sécurité", **When** il lit les bénéfices, **Then** il voit "Réduisez le temps d'évaluation de 70%" avec support mobile/offline
5. **Given** un visiteur termine l'exploration d'une fonctionnalité, **When** il cherche une action, **Then** il trouve un CTA "Essayer cette fonctionnalité" ou "Demander une démo"

---

### User Story 3 - Comparaison des Options de Déploiement (Priority: P2)

Un Directeur IT évalue les options Cloud vs OnPremise pour décider quelle solution correspond aux contraintes de son organisation.

**Why this priority**: Le choix du déploiement est un critère décisionnel majeur, particulièrement pour les secteurs réglementés (santé, finance). Une comparaison claire réduit les frictions commerciales.

**Independent Test**: Un utilisateur peut comparer les deux options, comprendre les différences de coûts/contrôle/déploiement, et obtenir un devis personnalisé.

**Acceptance Scenarios**:

1. **Given** un visiteur accède à la page Tarifs, **When** il voit le tableau comparatif, **Then** il distingue clairement Cloud (24h déploiement, coût prévisible) vs OnPremise (1-2 semaines, contrôle total)
2. **Given** un visiteur hésite entre les deux options, **When** il consulte le guide "Quelle option choisir?", **Then** il voit une matrice décisionnelle avec 8 critères (mise en service, coût, maintenance, sécurité, contrôle, scalabilité, conformité)
3. **Given** un visiteur a choisi une option, **When** il clique sur "Contactez-nous pour un devis", **Then** un formulaire pré-remplit l'option sélectionnée
4. **Given** un visiteur utilise le calculateur ROI, **When** il entre nombre d'utilisateurs et nombre de sites, **Then** il voit une estimation de temps économisé et coûts évités
5. **Given** un visiteur consulte la FAQ Tarifs, **When** il cherche "frais cachés", **Then** il trouve une réponse explicite "Aucun frais caché, formation et support inclus selon option"

---

### User Story 4 - Découverte de Solutions Sectorielles (Priority: P3)

Un responsable conformité dans le secteur Santé ou Finance cherche à comprendre comment GAMR s'adapte aux spécificités réglementaires de son industrie.

**Why this priority**: Les solutions sectorielles augmentent la pertinence perçue et accélèrent la décision pour les industries réglementées. Délivre de la valeur incrémentale sans bloquer les parcours précédents.

**Independent Test**: Un utilisateur peut accéder à une page dédiée à son secteur et identifier des modèles d'évaluation, cas d'usage et conformités spécifiques.

**Acceptance Scenarios**:

1. **Given** un visiteur accède à la section Solutions, **When** il voit les 5 secteurs listés, **Then** il identifie son industrie (Technologie, Santé, Finance, Manufacturing, Gouvernement)
2. **Given** un visiteur du secteur Santé clique sur "Santé", **When** la page charge, **Then** il voit le cas d'usage "Gestion de Conformité Hospitalière" avec résultats "100% conformité aux audits"
3. **Given** un visiteur du secteur Finance consulte la page Finance, **When** il lit les spécificités, **Then** il voit mention de "conformité bancaire", "30 agences", "500+ contrôles"
4. **Given** un visiteur sur une page sectorielle scroll, **When** il atteint le bas, **Then** il voit les certifications pertinentes (ex: HDS pour santé, SOC 2 pour finance)
5. **Given** un visiteur a identifié son secteur, **When** il clique sur CTA "Voir une démo sectorielle", **Then** le formulaire pré-remplit le secteur d'activité

---

### User Story 5 - Demande de Démonstration Personnalisée (Priority: P1) 🎯 MVP

Un décideur qualifié souhaite voir une démo personnalisée de GAMR avec un expert pour valider l'adéquation avec ses besoins avant de s'engager.

**Why this priority**: La demande de démo est le principal objectif de conversion pour les comptes de taille moyenne/grande. C'est le point d'entrée du pipeline commercial.

**Independent Test**: Un utilisateur peut remplir un formulaire de demande de démo en moins de 2 minutes, recevoir une confirmation immédiate, et réserver un créneau via Calendly.

**Acceptance Scenarios**:

1. **Given** un visiteur clique sur "Demander une Démo" depuis n'importe quelle page, **When** la page Démo charge, **Then** il voit un titre clair "Démo Personnalisée de GAMR - 15 minutes avec un expert"
2. **Given** un visiteur remplit le formulaire, **When** il entre ses informations (prénom, nom, email, téléphone, organisation, secteur, type déploiement), **Then** tous les champs sont validés en temps réel
3. **Given** un visiteur soumet le formulaire, **When** la soumission réussit, **Then** il voit une confirmation "Merci ! Nous vous contactons sous 24h" avec option calendrier Calendly intégré
4. **Given** un visiteur consulte la colonne bénéfices, **When** il lit le contenu, **Then** il voit les 8 points couverts dans la démo (dont "Visualisation indice de sécurité en temps réel")
5. **Given** un visiteur hésite, **When** il scroll, **Then** il voit témoignage mini "Setup en 10 minutes, première évaluation le jour même"

---

### User Story 6 - Démarrage Essai Gratuit (Priority: P1) 🎯 MVP

Un Analyste Sécurité ou petite équipe veut tester GAMR immédiatement sans engagement commercial pour valider l'adéquation.

**Why this priority**: L'essai gratuit est la conversion principale pour PME et équipes techniques qui préfèrent tester avant d'acheter. C'est le parcours self-service critique.

**Independent Test**: Un utilisateur peut s'inscrire à l'essai gratuit en moins de 3 minutes, sans carte bancaire, et recevoir un accès immédiat avec email de confirmation.

**Acceptance Scenarios**:

1. **Given** un visiteur clique sur CTA "Démarrer l'Essai Gratuit" depuis n'importe quelle page, **When** la page charge, **Then** il voit titre "Démarrez Votre Essai Gratuit de 30 Jours" avec mention "Sans carte bancaire"
2. **Given** un visiteur remplit le formulaire essai, **When** il entre email professionnel, nom organisation, type déploiement (Cloud/OnPremise/Je ne sais pas), nombre utilisateurs (1-10, 11-50, 51-200, 200+), **Then** la validation email bloque les adresses personnelles (gmail, yahoo, hotmail)
3. **Given** un visiteur soumet le formulaire, **When** l'inscription réussit, **Then** il reçoit un email de confirmation avec lien d'activation et accès plateforme (pour Cloud) ou contact commercial (pour OnPremise)
4. **Given** un visiteur consulte les trust badges, **When** il lit les mentions, **Then** il voit "Configuration en 5 minutes", "Accès toutes fonctionnalités", "Support dédié pendant essai", "Pas d'engagement"
5. **Given** un visiteur hésite sur le type de déploiement, **When** il sélectionne "Je ne sais pas encore", **Then** l'email de confirmation inclut un lien vers guide de comparaison Cloud vs OnPremise

---

### User Story 7 - Consultation Études de Cas (Priority: P3)

Un Analyste Sécurité en phase de recherche veut consulter des exemples concrets de succès clients pour comprendre la valeur de GAMR.

**Why this priority**: Les études de cas renforcent la crédibilité et aident les prospects à se projeter. Valeur incrémentale sans complexité technique (contenu statique).

**Independent Test**: Un utilisateur peut consulter 3 études de cas détaillées avec résultats chiffrés sans créer de compte.

**Acceptance Scenarios**:

1. **Given** un visiteur accède à la page Études de cas depuis le menu ou footer, **When** la page charge, **Then** il voit 3 études présentées : Manufacturing (Audit Usine), Santé (Conformité Hospitalière), Tech (Startup avec Indice Sécurité)
2. **Given** un visiteur clique sur une étude de cas, **When** la page de détail charge, **Then** il voit structure: Contexte (entreprise, challenge), Solution GAMR (fonctionnalités utilisées), Résultats chiffrés (métriques avant/après), Témoignage client
3. **Given** un visiteur lit une étude de cas Manufacturing, **When** il atteint les résultats, **Then** il voit "Réduction 95% temps audit + Amélioration indice 58→82 en 3 mois"
4. **Given** un visiteur termine la lecture d'une étude, **When** il scroll en bas de page, **Then** il trouve un CTA "Démarrer votre essai gratuit" ou "Demander une démo"
5. **Given** un visiteur consulte la liste des études, **When** il cherche à filtrer par secteur, **Then** il voit des badges sectoriels cliquables (Manufacturing, Santé, Tech, Finance, Gouvernement)

---

### User Story 8 - Navigation Mobile et Responsive (Priority: P2)

Un RSSI consulte le site depuis son smartphone lors d'un déplacement pour évaluer rapidement GAMR.

**Why this priority**: 60% du trafic web est mobile (selon brief). L'expérience mobile détermine si le visiteur poursuit l'exploration ou abandonne. Constitution mandate mobile-first.

**Independent Test**: Un utilisateur sur mobile peut naviguer le site, comprendre la proposition de valeur, et soumettre une demande de démo en moins de 3 minutes sans zoom ni scroll horizontal.

**Acceptance Scenarios**:

1. **Given** un visiteur mobile accède à l'accueil, **When** la page charge, **Then** le Hero affiche un titre lisible sans zoom, CTA principal en grand format touch-friendly (min 44x44px)
2. **Given** un visiteur mobile scroll, **When** il atteint une section fonctionnalités, **Then** les 7 cartes s'affichent en carousel swipeable ou stack vertical
3. **Given** un visiteur mobile veut naviguer, **When** il clique sur l'icône menu hamburger, **Then** un drawer s'ouvre avec navigation complète (Accueil, Fonctionnalités, Solutions, Tarifs, Ressources, À propos)
4. **Given** un visiteur mobile remplit un formulaire, **When** il tape dans un champ, **Then** le clavier approprié s'affiche (email keyboard pour email, numeric pour téléphone) et le viewport se réajuste sans cacher le champ
5. **Given** un visiteur mobile scroll en bas de page, **When** il cherche un CTA, **Then** un bouton "Essai Gratuit" reste sticky en bas de l'écran sans masquer le contenu

---

### Edge Cases

- **Performance dégradée**: Si la page met plus de 3 secondes à charger, afficher un skeleton loader ou message de patience avec animation
- **Email invalide**: Si l'utilisateur entre un email invalide (format incorrect ou domaine personnel pour essai entreprise), afficher message d'erreur contextuel "Veuillez utiliser un email professionnel"
- **Formulaire incomplet**: Si l'utilisateur tente de soumettre un formulaire avec champs manquants, mettre en surbrillance rouge les champs requis et afficher message "Veuillez compléter tous les champs obligatoires"
- **Erreur soumission**: Si le serveur ne répond pas lors de la soumission formulaire, afficher message d'erreur gracieux "Erreur temporaire. Veuillez réessayer ou nous contacter à contact@gamr.com"
- **Navigation rapide**: Si l'utilisateur clique rapidement entre plusieurs onglets/sections, annuler les animations en cours et afficher immédiatement le nouveau contenu
- **Vidéo non chargée**: Si la vidéo démo ne charge pas, afficher une image preview cliquable avec message "Cliquez pour visionner sur YouTube"
- **Browser non supporté**: Si l'utilisateur utilise IE11 ou navigateur obsolète, afficher banner "Pour une expérience optimale, veuillez utiliser Chrome, Firefox, Safari ou Edge"
- **No JavaScript**: Si JavaScript est désactivé, le contenu statique doit rester lisible avec formulaires fonctionnels (progressive enhancement)
- **Lien mort**: Si l'utilisateur clique sur un lien de page pas encore créée (ex: blog article), afficher page 404 personnalisée avec CTA retour accueil et suggestions
- **Secteur non listé**: Si un visiteur ne trouve pas son secteur dans Solutions, le formulaire démo doit avoir option "Autre" avec champ texte libre pour préciser
- **Demande suppression données**: Si un utilisateur demande la suppression de ses données mais l'email n'existe pas dans la base, afficher message "Aucune donnée trouvée pour cet email" plutôt qu'erreur
- **Validation identité suppression**: Si un utilisateur clique sur un lien de confirmation de suppression expiré (> 24h), afficher message "Lien expiré. Veuillez soumettre une nouvelle demande de suppression"
- **Bot remplit honeypot**: Si un bot automatisé remplit le champ honeypot caché, afficher message de confirmation normale ("Merci, nous vous contactons bientôt") mais ne pas enregistrer les données ni envoyer email
- **Utilisateur assisté remplit honeypot par erreur**: Si un utilisateur humain avec screen reader ou assistance remplit accidentellement le honeypot (rare), sa soumission sera rejetée - accepter ce risque minimal pour éviter complexité CAPTCHA

## Requirements _(mandatory)_

### Functional Requirements

#### **Pages & Navigation**

- **FR-001**: Le site MUST comporter 7 pages principales : Accueil, Fonctionnalités, Solutions par Industrie, Tarifs, Études de Cas, À Propos, Essai Gratuit, Demander une Démo
- **FR-002**: Le header de navigation MUST être sticky (reste visible lors du scroll) avec logo GAMR, liens pages principales, et CTA "Essai Gratuit" + "Démo"
- **FR-003**: Le footer MUST contenir liens vers pages légales (Mentions légales, Confidentialité RGPD, CGV/CGU), liens rapides vers pages principales (Fonctionnalités, Solutions, Tarifs, Études de Cas, À Propos), coordonnées contact, et réseaux sociaux
- **FR-004**: La navigation mobile MUST utiliser un menu hamburger ouvrant un drawer full-screen avec tous les liens principaux
- **FR-005**: Toutes les pages MUST charger en moins de 3 secondes (TTI) sur connexion 4G standard

#### **Page Accueil**

- **FR-006**: Le Hero Section MUST afficher un titre accrocheur "Transformez la gestion des risques de réactive à proactive avec des insights IA", sous-titre expliquant GAMR, CTA principal "Démarrer l'Essai Gratuit", et visuel dashboard avec Indice de Sécurité visible
- **FR-007**: La section Problème/Solution MUST lister au moins 4 points de douleur (manque visibilité, processus manuels, évaluation incohérente, données éparpillées) avec solutions GAMR correspondantes
- **FR-008**: La section Fonctionnalités Clés MUST présenter 7 cartes interactives : Indice de Sécurité en Temps Réel (featured), Évaluations Intelligentes, Analyse IA, Fiches GAMR, Actions Correctives, Gestion Utilisateurs, Analytics
- **FR-009**: Chaque carte fonctionnalité MUST contenir icône, titre, description courte (2-3 lignes), et lien "En savoir plus" vers page Fonctionnalités
- **FR-010**: La section Preuve Sociale MUST afficher logos clients (si disponible), 6 chiffres clés (500+ organisations, 10 000+ fiches gérées, +32 points amélioration moyenne, 12 pays, 5 000+ utilisateurs, 4.8/5 satisfaction), et 3 témoignages clients avec nom/rôle/organisation/note étoiles
- **FR-011**: La section Démo Vidéo MUST intégrer une vidéo YouTube/Vimeo de 2 minutes montrant workflow Évaluation → Risque → Action avec player responsive
- **FR-012**: Le CTA Final MUST afficher "Démarrer votre essai gratuit de 30 jours" avec mention "Sans carte bancaire • Annulation à tout moment" et CTA secondaire "Demander une Démo"

#### **Page Fonctionnalités**

- **FR-013**: La page MUST organiser les 7 fonctionnalités en onglets cliquables ou sections scrollables avec navigation sticky
- **FR-014**: Chaque fonctionnalité MUST contenir : Titre, description détaillée (3-5 paragraphes), liste bénéfices (4-6 points avec icônes), screenshot haute résolution ou GIF animé, cas d'usage court, et CTA "Essayer cette fonctionnalité"
- **FR-015**: La fonctionnalité "Indice de Sécurité en Temps Réel" MUST afficher l'algorithme de calcul en encadré distinct, screenshot de la jauge (0-100), et témoignage "Notre conseil demandait une vue consolidée..." avec auteur
- **FR-016**: La fonctionnalité "Analyse IA" MUST expliquer scoring automatique Probabilité × Vulnérabilité × Impact, recommandations contextuelles, et niveaux de confiance

#### **Page Solutions par Industrie**

- **FR-017**: La page MUST lister 5 secteurs avec liens vers pages dédiées : Technologie & Logiciel, Santé & Médical, Services Financiers & Assurance, Manufacturing & Industrie, Gouvernement & Secteur Public (optionnellement Éducation & Recherche)
- **FR-018**: Chaque page sectorielle MUST contenir : Points de douleur spécifiques au secteur, fonctionnalités adaptées, 1-2 cas d'usage détaillés avec résultats chiffrés, certifications/conformités pertinentes (ex: HDS pour santé, SOC 2 pour finance), et CTA "Voir une démo sectorielle"
- **FR-019**: La page Santé MUST mentionner conformité HDS, cas d'usage "Gestion Conformité Hospitalière" avec résultat "100% conformité audits, zéro non-conformité"
- **FR-020**: La page Finance MUST mentionner conformité bancaire, cas d'usage "Évaluation Risques Institution Financière" avec "30 agences, 500+ contrôles, conformité bancaire totale"
- **FR-021**: La page Manufacturing MUST mentionner cas d'usage "Audit Sécurité Usine Production" avec résultat "Réduction 95% temps audit + Amélioration indice 58→82 en 3 mois"

#### **Page Tarifs**

- **FR-022**: La page MUST présenter 2 options principales : Cloud (SaaS) et OnPremise (Sur Site) en cartes comparatives côte à côte
- **FR-023**: Chaque option MUST lister : Ce qui est inclus (analyse besoins, formation, support), avantages (4-5 points clés), et CTA "Contactez-nous pour un devis personnalisé"
- **FR-024**: Un tableau comparatif détaillé MUST afficher 8 critères : Mise en service (Cloud: 24h, OnPremise: 1-2 semaines), Coût initial (Cloud: Faible, OnPremise: Élevé), Coût total (Cloud: Prévisible, OnPremise: Variable), Maintenance (Cloud: Gérée, OnPremise: Votre équipe), Sécurité (Cloud: Niveau entreprise, OnPremise: Votre responsabilité), Contrôle données (Cloud: Partagé, OnPremise: 100% vôtre), Scalabilité (Cloud: Automatique, OnPremise: Manuelle), Conformité (Cloud: RGPD ISO 27001, OnPremise: Votre responsabilité)
- **FR-025**: Un guide décisionnel "Quelle Option Choisir?" MUST aider l'utilisateur à sélectionner selon ses contraintes (réglementaires, contrôle données, budget, temps déploiement)
- **FR-026**: Un calculateur ROI interactif MUST permettre d'entrer nombre d'utilisateurs, nombre de sites, fréquence audits actuels, et calculer temps économisé (70%), coûts évités (consultants externes), et amélioration indice sécurité estimée (+32 points)
- **FR-027**: Une FAQ détaillée MUST répondre à minimum 15 questions sur tarification, essai gratuit, migration Cloud↔OnPremise, frais cachés (réponse: "Aucun"), réductions ONG
- **FR-028**: Des badges de sécurité et conformité MUST être affichés (ISO 27001, SOC 2 Type II, RGPD, HDS si applicable)

#### **Page Études de Cas**

- **FR-029**: La page Études de Cas MUST présenter 3 études détaillées avec structure uniforme : "Audit Sécurité Usine Production" (Manufacturing), "Gestion Conformité Hospitalière" (Santé), "Croissance Startup Tech avec Indice Sécurité 75/100" (Tech)
- **FR-030**: La page listing MUST afficher preview de chaque étude : image hero, titre, secteur (badge coloré), excerpt (150 caractères), métrique clé de résultat
- **FR-031**: Chaque étude de cas détaillée MUST suivre structure : Contexte (entreprise, challenge), Solution GAMR (fonctionnalités utilisées), Résultats chiffrés (métriques avant/après avec graphiques ou icônes), Témoignage client avec nom/rôle/organisation
- **FR-032**: L'étude Manufacturing MUST inclure résultat "Réduction 95% temps audit + Amélioration indice 58→82 en 3 mois"
- **FR-033**: L'étude Santé MUST inclure résultat "100% conformité aux audits, zéro non-conformité"
- **FR-034**: L'étude Tech MUST inclure résultat "Indice de sécurité 75/100 présenté aux investisseurs, levée de fonds réussie"
- **FR-035**: La page MUST permettre filtrage par secteur via badges cliquables (Manufacturing, Santé, Tech, Finance, Gouvernement) même si seules 3 études existent initialement

#### **Page À Propos**

- **FR-036**: La page MUST contenir 5 sections : Mission ("Démocratiser la gestion des risques"), Équipe et expertise, Certifications et conformité (ISO 27001, SOC 2, RGPD, HDS), Partenaires (Microsoft Azure, AWS, Prisma, OpenAI), Contact et support
- **FR-037**: La section Certifications MUST afficher logos et descriptions courtes de chaque certification avec liens vers pages de vérification externes si disponible
- **FR-038**: La section Contact MUST fournir formulaire de contact, email contact@gamr.com, et (si disponible) adresse physique, téléphone support

#### **Data Privacy & GDPR Compliance**

- **FR-066**: Le site MUST fournir un mécanisme permettant aux utilisateurs de demander la suppression de leurs données personnelles (email, nom, téléphone, organisation) soumises via formulaires
- **FR-067**: Un lien "Gérer mes données" ou "Supprimer mes données" MUST être disponible dans le footer et la page Confidentialité RGPD
- **FR-068**: La demande de suppression MUST permettre à l'utilisateur d'entrer son email et de recevoir un lien de confirmation par email pour valider l'identité
- **FR-069**: Après validation, toutes les données personnelles associées à cet email MUST être supprimées de la base de données ou anonymisées (remplacer par "Utilisateur supprimé") dans les 30 jours
- **FR-070**: L'utilisateur MUST recevoir un email de confirmation de suppression après traitement de sa demande
- **FR-071**: La Politique de Confidentialité RGPD MUST clairement indiquer : "Vos données sont conservées indéfiniment jusqu'à ce que vous demandiez leur suppression via notre portail de gestion des données"

#### **Error Tracking & Monitoring**

- **FR-072**: Le site MUST tracker les erreurs via Google Analytics 4 custom events avec catégorie "error" et paramètres : error_type, error_message, page_path, user_action
- **FR-073**: Les types d'erreurs trackées MUST inclure : form_validation_failed, form_submission_failed, api_error, page_load_error, javascript_error, video_load_failed
- **FR-074**: Chaque erreur trackée MUST inclure contexte utilisateur anonymisé : page actuelle, action tentée, timestamp, mais PAS d'informations personnelles (email, nom)
- **FR-075**: Les erreurs côté client (JavaScript exceptions) MUST être capturées via window.onerror et envoyées comme custom events GA4
- **FR-076**: Les erreurs de soumission formulaire MUST tracker : type de formulaire (trial/demo/contact), champ en erreur (sans valeur), type d'erreur validation

#### **Page Essai Gratuit**

- **FR-039**: La page MUST afficher titre "Démarrez Votre Essai Gratuit de 30 Jours", sous-titre "Sans carte bancaire • Annulation à tout moment • Support en français"
- **FR-040**: Le formulaire MUST collecter : Email professionnel (validé format + domaine entreprise), Nom de l'organisation, Type de déploiement souhaité (Cloud SaaS recommandé / OnPremise Sur site / Je ne sais pas encore), Nombre d'utilisateurs (1-10 / 11-50 / 51-200 / 200+)
- **FR-041**: Le formulaire MUST valider en temps réel : email valide, domaine non personnel (rejeter gmail/yahoo/hotmail/outlook.com), champs obligatoires remplis
- **FR-042**: Après soumission réussie, l'utilisateur MUST recevoir email de confirmation avec : Lien d'activation compte (pour Cloud), ou message "Nous vous contactons sous 24h" (pour OnPremise), lien vers guide démarrage rapide
- **FR-043**: Des trust badges MUST être affichés sous le formulaire : "Configuration en 5 minutes", "Accès à toutes les fonctionnalités", "Support dédié pendant l'essai", "Pas d'engagement"
- **FR-044**: Un témoignage mini MUST être affiché : "Setup en 10 minutes, notre première évaluation était terminée le jour même - Marc D., RSSI"

#### **Page Demander une Démo**

- **FR-045**: La page MUST afficher titre "Démo Personnalisée de GAMR", sous-titre "15 minutes avec un expert sécurité • Adapté à votre secteur"
- **FR-046**: Le formulaire MUST collecter : Prénom, Nom, Email professionnel, Téléphone, Organisation, Secteur d'activité (Technologie / Santé / Finance / Industrie / Gouvernement / Autre), Type de déploiement souhaité (Cloud / OnPremise / Je ne sais pas), Besoins spécifiques (optionnel, textarea)
- **FR-047**: Le formulaire MUST être présenté en 2 colonnes sur desktop : Colonne gauche = formulaire, Colonne droite = Bénéfices et calendrier
- **FR-048**: La colonne bénéfices MUST lister "Ce que vous verrez dans la démo" : Visualisation indice sécurité temps réel (featured), Création évaluation complète, Analyse IA temps réel, Génération fiches GAMR, Dashboards et reporting, Gestion actions correctives, Comparaison Cloud vs OnPremise, Q&A sur vos cas d'usage
- **FR-049**: Un widget Calendly MUST être intégré permettant de réserver créneau directement après soumission formulaire
- **FR-050**: Après soumission, l'utilisateur MUST recevoir email de confirmation avec récapitulatif de sa demande et message "Nous vous contactons sous 24h pour planifier votre démo"

#### **Formulaires & Validation**

- **FR-051**: Tous les formulaires MUST valider en temps réel chaque champ (onBlur) avec messages d'erreur contextuels en rouge sous le champ
- **FR-052**: Les messages d'erreur MUST être explicites : "Email invalide" → "Veuillez entrer un email valide (ex: nom@entreprise.com)", "Champ requis" → "Ce champ est obligatoire"
- **FR-053**: Les formulaires MUST désactiver le bouton submit et afficher loading spinner pendant la soumission pour éviter double soumission
- **FR-054**: En cas d'erreur serveur (500, timeout), un message gracieux MUST s'afficher : "Erreur temporaire. Veuillez réessayer dans quelques instants ou nous contacter à contact@gamr.com"
- **FR-055**: Après soumission réussie, le formulaire MUST afficher message de confirmation vert avec icône checkmark et masquer le formulaire

#### **Spam Protection (Formulaires)**

- **FR-077**: Tous les formulaires (trial, demo, contact) MUST inclure un champ honeypot caché via CSS (visibility: hidden ou position: absolute off-screen) avec nom générique (ex: "website" ou "url")
- **FR-078**: Le champ honeypot MUST être positionné dans le DOM de manière naturelle (entre champs visibles) mais invisible pour utilisateurs humains
- **FR-079**: Le label du champ honeypot MUST être générique et attrayant pour bots (ex: "Leave this field empty" ou "Website URL")
- **FR-080**: Si le champ honeypot contient une valeur lors de la soumission, le formulaire MUST rejeter silencieusement la soumission (afficher message de confirmation normale sans enregistrer les données)
- **FR-081**: Le rejet silencieux honeypot MUST logger l'événement comme "spam_detected" dans GA4 avec paramètres : form_type, honeypot_field_value (tronqué à 50 chars), timestamp

#### **CTA (Call-to-Action)**

- **FR-056**: Le CTA "Démarrer l'Essai Gratuit de 30 Jours" MUST être présent sur toutes les pages dans le header (bouton bleu vibrant) et footer
- **FR-057**: Le CTA "Demander une Démo" MUST être présent en alternance avec le CTA principal dans sections de contenu (bouton violet)
- **FR-058**: Sur mobile, un CTA sticky MUST rester visible en bas de l'écran : "Essai Gratuit" avec icône, cliquable sans masquer le contenu
- **FR-059**: Tous les CTA MUST avoir mention de réassurance en dessous : "Sans carte bancaire", "Annulation à tout moment", "Support en français", "RGPD", selon contexte
- **FR-060**: Les CTA MUST avoir effet hover (elevation shadow, légère augmentation taille) et active state (légère réduction taille) pour feedback visuel

#### **Contenu Multimédia**

- **FR-061**: Toutes les images MUST être optimisées en format WebP avec fallback PNG/JPEG pour navigateurs non supportés
- **FR-062**: Les images MUST utiliser lazy loading (chargement différé) pour images hors viewport initial
- **FR-063**: Les screenshots de l'application MUST être en haute résolution (2x) pour écrans Retina, avec max-width pour éviter débordement
- **FR-064**: La vidéo démo MUST utiliser embed responsive (ratio 16:9) et avoir thumbnail preview cliquable pour éviter autoplay
- **FR-065**: Les GIFs animés de fonctionnalités MUST être optimisés (<2MB) ou remplacés par vidéos courtes (MP4) pour meilleures performances

### Accessibility Requirements (WCAG 2.1 AA)

- **A11Y-001**: Tous les éléments interactifs (liens, boutons, champs formulaires) MUST être accessibles au clavier avec ordre de tabulation logique (Tab, Shift+Tab)
- **A11Y-002**: Les boutons MUST être activables avec Enter et Espace, les liens avec Enter uniquement
- **A11Y-003**: Le menu hamburger mobile MUST être activable au clavier et permettre navigation complète sans souris
- **A11Y-004**: Tous les formulaires MUST avoir labels associés explicites (attribut for/id) ou aria-label pour champs sans label visible
- **A11Y-005**: Les messages d'erreur formulaire MUST être annoncés par les lecteurs d'écran via aria-live="polite" ou aria-describedby
- **A11Y-006**: Toutes les images non décoratives MUST avoir attribut alt descriptif (max 125 caractères) expliquant le contenu/fonction
- **A11Y-007**: Les images décoratives (icônes illustratives, backgrounds) MUST avoir alt="" pour être ignorées par lecteurs d'écran
- **A11Y-008**: Le contraste texte/fond MUST respecter ratio 4.5:1 minimum pour texte normal, 3:1 pour texte large (18px+ ou 14px+ bold)
- **A11Y-009**: Les focus indicators MUST être clairement visibles (outline 2px solid avec couleur contrastée, ou ring personnalisé) sur tous les éléments interactifs
- **A11Y-010**: Les liens MUST être distinguables du texte normal (couleur différente ET soulignement ou bold)
- **A11Y-011**: La navigation sticky MUST annoncer le changement de section active via aria-current="page" pour lecteurs d'écran
- **A11Y-012**: Les carousels/onglets MUST utiliser attributs ARIA appropriés (role="tablist", aria-selected, aria-controls, aria-labelledby)
- **A11Y-013**: Les vidéos MUST avoir sous-titres disponibles (via YouTube auto-captions minimum) ou transcription textuelle
- **A11Y-014**: Le site MUST fonctionner correctement avec zoom navigateur jusqu'à 200% sans scroll horizontal ni perte de contenu
- **A11Y-015**: Les animations MUST respecter prefers-reduced-motion : désactiver animations non essentielles si utilisateur a activé cette préférence
- **A11Y-016**: La structure de page MUST utiliser headings hiérarchiques corrects (h1 unique, h2 sections principales, h3 sous-sections) pour navigation lecteur d'écran

### Performance Requirements

- **PERF-001**: First Contentful Paint (FCP) MUST être < 1.5 secondes sur connexion 4G (4 Mbps)
- **PERF-002**: Time to Interactive (TTI) MUST être < 3 secondes sur connexion 4G
- **PERF-003**: Cumulative Layout Shift (CLS) MUST être < 0.1 (éviter décalages visuels pendant chargement)
- **PERF-004**: Lighthouse Performance score MUST être > 90 en desktop, > 85 en mobile
- **PERF-005**: La taille totale de la page d'accueil MUST être < 2 MB (HTML + CSS + JS + images critical path)
- **PERF-006**: Les images MUST être redimensionnées selon breakpoints responsive (srcset) pour éviter charger images desktop sur mobile
- **PERF-007**: Les polices (fonts) MUST utiliser font-display: swap pour éviter FOIT (Flash Of Invisible Text)
- **PERF-008**: Le JavaScript MUST être code-splitté par route pour charger uniquement le code nécessaire à chaque page
- **PERF-009**: Les ressources tierces (analytics, Calendly, YouTube) MUST être chargées de manière asynchrone (defer ou async)
- **PERF-010**: Un Service Worker MUST être configuré pour cache assets statiques (images, fonts, CSS) et améliorer chargements répétés
- **PERF-011**: Les soumissions de formulaires MUST répondre en < 2 secondes ou afficher loading state explicite
- **PERF-012**: Le site MUST fonctionner correctement sur connexion 3G lente (1.5 Mbps) avec skeleton loaders pour contenu différé

### SEO Requirements

- **SEO-001**: Chaque page MUST avoir title unique et descriptif (50-60 caractères) incluant mots-clés pertinents
  - Accueil: "GAMR - Plateforme Intelligente de Gestion des Risques | IA & Analytics"
  - Fonctionnalités: "7 Fonctionnalités GAMR: Évaluations, IA, Indice de Sécurité Temps Réel"
  - Tarifs: "Tarifs GAMR: Cloud vs OnPremise | Devis Personnalisé Gratuit"
  - Essai Gratuit: "Essai Gratuit 30 Jours GAMR | Sans Carte Bancaire"
- **SEO-002**: Chaque page MUST avoir meta description unique (150-160 caractères) explicant contenu et incluant CTA
- **SEO-003**: OpenGraph tags MUST être complets sur toutes les pages : og:title, og:description, og:image (1200x630px), og:url, og:type (website), og:site_name
- **SEO-004**: Twitter Card tags MUST être présents : twitter:card (summary_large_image), twitter:title, twitter:description, twitter:image
- **SEO-005**: JSON-LD structured data MUST être implémenté pour :
  - Page Accueil: Organization schema (nom, logo, réseaux sociaux, contact)
  - Page Accueil: WebSite schema (nom, url, searchAction si search disponible)
  - Études de Cas: Article schema (headline, image, datePublished, author, publisher)
  - Tarifs: Product/Offer schema (nom produit, description, offers Cloud/OnPremise)
  - À Propos: Organization + ContactPoint schema
- **SEO-006**: Canonical URLs MUST être définis sur toutes les pages pour éviter duplicate content
- **SEO-007**: Un fichier sitemap.xml MUST être généré listant toutes les pages avec lastmod, changefreq, priority
- **SEO-008**: Un fichier robots.txt MUST être configuré autorisant crawl de toutes les pages publiques (sauf /admin, /api) et référençant sitemap.xml
- **SEO-009**: Les URLs MUST être SEO-friendly (slugs descriptifs) : /fonctionnalites, /tarifs, /solutions/sante, /etudes-de-cas, /etudes-de-cas/audit-usine-production
- **SEO-010**: Les images MUST avoir attribut alt descriptif pour indexation image search
- **SEO-011**: Les headings MUST suivre hiérarchie logique avec mots-clés : h1 unique par page contenant mot-clé principal
- **SEO-012**: Les liens internes MUST utiliser anchor text descriptif (éviter "cliquez ici") et pointer vers pages pertinentes pour link juice
- **SEO-013**: Le Lighthouse SEO score MUST être > 95

### Key Entities _(include if feature involves data)_

- **Page**: Représente une page web du site. Attributs: slug (URL unique), title, metaDescription, heroTitle, heroSubtitle, sections (array), seoData (OpenGraph, JSON-LD), lastUpdated
- **Section**: Composant réutilisable d'une page. Attributs: type (hero, features, testimonials, pricing, cta), title, content, components (cartes, images, CTA), order
- **Testimonial**: Témoignage client. Attributs: quote (texte), authorName, authorRole, authorCompany, authorImage, rating (1-5 stars), featured (boolean)
- **Feature**: Fonctionnalité GAMR. Attributs: name, slug, shortDescription, fullDescription, benefits (array), screenshot, gifUrl, caseStudyLink, order
- **IndustryPage**: Page sectorielle. Attributs: industryName, slug, painPoints (array), adaptedFeatures (array), caseStudies (array), certifications (array), ctaText
- **CaseStudy**: Étude de cas. Attributs: title, slug, industry (manufacturing/health/tech/finance/government), context, challenge, solution, results (metrics array with labels/values/icons), clientQuote, clientName, clientRole, clientCompany, heroImage, featured (boolean)
- **PricingOption**: Option tarifaire. Attributs: name (Cloud/OnPremise), included (array features), advantages (array), ctaText, comparisonCriteria (array)
- **FormSubmission**: Soumission formulaire. Attributs: type (trial, demo, contact), email, name, organization, deploymentType, industry, userCount, needs, submittedAt, status (pending, contacted, converted)

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Les visiteurs comprennent la proposition de valeur GAMR en moins de 10 secondes : 80%+ des utilisateurs testés (N=20) identifient correctement "plateforme gestion risques IA" dans test de compréhension initiale
- **SC-002**: Le taux de conversion Visite → Essai Gratuit atteint minimum 3% (objectif 5%) dans les 3 premiers mois après lancement
- **SC-003**: Le taux de conversion Visite → Demande Démo atteint minimum 2% (objectif 3%) dans les 3 premiers mois
- **SC-004**: 90%+ des formulaires démarrés sont complétés et soumis (taux d'abandon < 10%)
- **SC-005**: Le temps moyen pour compléter formulaire Essai Gratuit est < 2 minutes
- **SC-006**: Le temps moyen pour compléter formulaire Demande Démo est < 3 minutes
- **SC-007**: 95%+ des visiteurs mobiles peuvent naviguer le site et soumettre un formulaire sans friction (sans zoom requis, sans erreurs UX rapportées)
- **SC-008**: La durée moyenne de session est > 3 minutes, indiquant engagement avec contenu
- **SC-009**: Le taux de rebond est < 50% sur page d'accueil
- **SC-010**: Les pages Fonctionnalités et Tarifs sont visitées par 40%+ des visiteurs (depuis page d'accueil ou organique)
- **SC-011**: Les études de cas génèrent 10%+ des demandes de démo (visiteurs qui consultent une étude puis convertissent)
- **SC-012**: Le score Lighthouse Performance reste > 90 (desktop) et > 85 (mobile) même après ajout de contenu
- **SC-013**: Le score Lighthouse Accessibility reste à 100 sur toutes les pages
- **SC-014**: Le score Lighthouse SEO reste > 95 sur toutes les pages
- **SC-015**: Le site charge en < 3 secondes (TTI) pour 90%+ des visites réelles (mesure via Core Web Vitals)
- **SC-016**: Zéro erreur critique d'accessibilité détectée par axe-core ou équivalent
- **SC-017**: 70%+ des visiteurs qui consultent page Tarifs cliquent sur "Contactez-nous pour un devis" ou "Calculateur ROI"
- **SC-018**: Le calculateur ROI est utilisé par 30%+ des visiteurs sur page Tarifs
- **SC-019**: Les témoignages clients augmentent le taux de conversion de 15%+ (A/B test avec/sans témoignages)
- **SC-020**: La vidéo démo est visionnée jusqu'à 50%+ de durée par 40%+ des visiteurs qui la démarrent
- **SC-021**: 90%+ des soumissions formulaires reçoivent email de confirmation dans les 2 minutes
- **SC-022**: Les pages sectorielles (Solutions) et Études de Cas combinées génèrent 25%+ des demandes de démo, avec pré-qualification correcte du secteur
- **SC-023**: Le taux de satisfaction utilisateur (via sondage optionnel en sortie) est > 4/5 pour facilité de navigation et clarté information
- **SC-024**: Le coût d'acquisition client (CAC) via le site web est réduit de 30% par rapport aux canaux traditionnels (salons, cold calling) dans les 6 mois
- **SC-025**: 60%+ des leads générés via essai gratuit sont qualifiés (correspondent aux personas cibles : RSSI, Responsable Risques, Directeur IT)
- **SC-026**: Les erreurs critiques (form submission failures, API errors) sont détectées dans GA4 dans les 24 heures suivant leur occurrence, avec taux d'erreur global < 2% des sessions
- **SC-027**: 95%+ des erreurs JavaScript capturées incluent contexte suffisant (page, action, error type) pour diagnostic sans reproduction
- **SC-028**: Le honeypot spam protection bloque 90%+ des soumissions automatisées de bots (mesure via événements GA4 "spam_detected" vs soumissions légitimes)
- **SC-029**: Le taux de faux positifs honeypot (utilisateurs légitimes bloqués) est < 0.1% des soumissions totales

### Assumptions

- **Assume**: GAMR a accès à un backend API fonctionnel pour traiter soumissions formulaires (essai gratuit, démo, contact) avec endpoints POST /api/trial-signup, /api/demo-request, /api/contact
- **Assume**: Les screenshots haute résolution de l'application GAMR (dashboard, indice de sécurité, évaluations, fiches GAMR) sont disponibles en format 2x pour écrans Retina
- **Assume**: Une vidéo démo de 2 minutes est disponible ou sera produite, hébergée sur YouTube ou Vimeo avec embed code
- **Assume**: Au moins 3 témoignages clients réels avec nom/rôle/organisation/quote sont disponibles, avec autorisations de publication
- **Assume**: Les certifications ISO 27001, SOC 2 Type II, RGPD sont validées et logos officiels peuvent être affichés
- **Assume**: Le domaine principal gamr.com (ou équivalent) est enregistré et DNS configuré
- **Assume**: Un service email transactionnel (SendGrid, AWS SES, Postmark) est configuré pour envoi automatique de confirmations formulaires
- **Assume**: L'intégration Calendly est disponible avec compte entreprise et embed widget configuré pour page Demander une Démo
- **Assume**: Google Analytics 4 ou équivalent est configuré avec compte et tracking ID disponibles
- **Assume**: GA4 sera utilisé pour error tracking via custom events (pas de service dédié comme Sentry) avec événements personnalisés pour capturer erreurs JavaScript, échecs formulaires, erreurs API
- **Assume**: Les erreurs GA4 seront consultées via interface GA4 (événements personnalisés) et tableaux de bord personnalisés pour monitoring quotidien/hebdomadaire
- **Assume**: Un CDN (Cloudflare, Vercel Edge, AWS CloudFront) sera utilisé pour distribution assets statiques et optimisation performance globale
- **Assume**: Les standards de performance (FCP < 1.5s, TTI < 3s, CLS < 0.1, Lighthouse > 90) sont mesurés sur connexion 4G standard (4 Mbps), device mid-tier (Moto G4 ou équivalent)
- **Assume**: Les pages légales (Mentions légales, Politique de confidentialité RGPD, CGV/CGU) existent ou seront rédigées séparément par équipe juridique
- **Assume**: Les 3 études de cas (Audit Usine, Conformité Hospitalière, Startup Tech) sont basées sur clients réels avec chiffres validés et autorisations de publication
- **Assume**: Le contenu des études de cas sera rédigé en format statique (pas de CMS) et intégré directement dans les pages (MDX ou HTML)
- **Assume**: Le calculateur ROI utilisera formules simplifiées basées sur moyennes sectorielles : temps économisé 70%, amélioration indice +32 points, coûts consultants évités selon taille organisation
- **Assume**: La tarification exacte (prix Cloud/OnPremise) n'est pas affichée publiquement, remplacée par "Devis personnalisé" avec contact commercial
- **Assume**: Le site sera hébergé sur infrastructure cloud (Vercel, Netlify, AWS Amplify, Azure Static Web Apps) avec support Next.js SSG/ISR
- **Assume**: Les traductions multilingues ne sont pas requises pour MVP (site en français uniquement), mais structure i18n-ready si expansion future
- **Assume**: Le backend peut gérer validation email domaine entreprise via liste domaines personnels à rejeter (gmail.com, yahoo.com, hotmail.com, outlook.com, etc.)
- **Assume**: Les soumissions formulaires sont stockées en base de données (PostgreSQL, MySQL) ou service tiers (Airtable, Notion, CRM) pour suivi commercial
- **Assume**: La protection anti-spam utilise uniquement honeypot (pas de CAPTCHA, reCAPTCHA, ou rate limiting côté serveur) pour simplicité et UX optimale
- **Assume**: Le backend peut détecter si le champ honeypot est rempli et rejeter silencieusement la soumission tout en affichant message de confirmation à l'utilisateur
- **Assume**: La politique de rétention des données est : conservation indéfinie jusqu'à demande explicite de suppression par l'utilisateur (GDPR-compliant avec mécanisme de suppression)
- **Assume**: Le backend peut gérer les demandes de suppression de données avec workflow : réception demande → envoi email confirmation → validation identité → suppression/anonymisation → notification confirmation
- **Assume**: Les liens de confirmation de suppression expirent après 24 heures pour sécurité
