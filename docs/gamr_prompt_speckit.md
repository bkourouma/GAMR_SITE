/speckit.specify
Génère le contenu et la structure HTML/MDX pour la page :
[http://localhost:3000/tarifs](http://localhost:3000/tarifs)

Contexte :
La solution **GAMR** (Grille d’Analyse des Menaces et Risques) est proposée en deux modes :
• Cloud (abonnement mensuel/annuel)
• On-Premise (licence + support)

🎯 Objectifs de la page :
• Permettre de comparer rapidement Cloud vs On-Prem
• Afficher une grille de prix claire, avec bascule Mensuel/Annuel (-15%)
• Mettre en avant les fonctionnalités incluses et les options (add-ons)
• Réassurer (FAQ, mentions, essai gratuit, démo)
• Inclure un mini calculateur de ROI (paramètres simples)

⚙️ Structure attendue :

1. Hero
   - Titre : “Des tarifs simples et transparents”
   - Sous-titre : “Choisissez le mode qui correspond à votre gouvernance : Cloud ou On-Premise.”
   - CTA : “Essai gratuit 30 jours” + “Demander une démo”

2. Bascule Cloud / On-Prem & Bascule Mensuel / Annuel (-15%)
   - UI : deux toggles
   - Rappeler la devise par défaut : FCFA (CFA)

3. Grille Cloud (3 plans + Enterprise)
   - Starter (1 utilisateur, 1 norme, 5 priorités d’actions/an) 100.000 FCFA / MOIS
   - Pro (5 utilisateurs, 3 normes, 10 priorités d’actions/an) 250.000 FCFA / MOIS
   - Business (25 utilisateurs, 10 normes, 25 priorités d’actions/an) 500.000 FCFA / MOIS
   - Enterprise (sur devis ; limites personnalisables)
   - Chaque carte : prix, limites, 8–10 bullet points, CTA “Essayer” ou “Parler à un expert”

4. Bloc On-Premise
   - Licence perpétuelle (prix indicatif), support & maintenance annuels (20% du prix licence)
   - Déploiement, formation, accompagnement (forfaits)
   - Tableau récapitulatif inclus/exclus

5. Options (Add-ons)
   - IA avancée (génération rapports, questionnement naturel)
   - SSO/LDAP/AD
   - Connecteurs (ERP/CRM, data warehouse)
   - Support Premium 24/7
   - Formation & transfert de compétence

6. Comparatif Cloud vs On-Prem (tableau)
   - Mises à jour, sécurité, time-to-value, CAPEX/OPEX, SLA, personnalisation

7. Mini calculateur de ROI
   - Paramètres : nb d’utilisateurs, incidents évités/mois, temps gagné/utilisateur/sem.
   - Afficher ROI estimé mensuel/annuel + seuil de rentabilité

8. FAQ (6–8 questions)
   - Sécurité & hébergement, réversibilité, limites d’utilisateurs, essai gratuit,
     moyens de paiement, engagement, support, conformité (ISO, ANSSI-CI, RGPD)

9. CTA final
   - “Démarrez votre essai gratuit” + “Demander une démo”

Contraintes :
• Rédaction FR, ton pro & clair, orienté bénéfices
• SEO : title ≤ 60, meta ≤ 160, schema.org Product + Offer
• A11y WCAG 2.1 AA
• Performance Lighthouse > 90

Sorties :
• Fichier : app/tarifs/page.mdx
• Importe un data model depuis "data/pricing.ts" (que je fournirai)
• Composants tailwind + shadcn/ui (Card, Badge, Toggle, Table)
• Inclure les libellés en FCFA, avec formattage (es-CI)
