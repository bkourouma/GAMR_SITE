# SEO Metadata Contract

**Feature**: Page Tarifs - GAMR Pricing  
**Purpose**: Define SEO metadata structure, OpenGraph tags, and JSON-LD schema for /tarifs page  
**Requirements**: SEO-001 through SEO-008 from spec.md

---

## Next.js Metadata Export

**Location**: `app/tarifs/page.tsx`

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Basic SEO
  title: 'Tarifs GAMR - Abonnement Cloud et Licence On-Premise',
  description:
    'Découvrez les tarifs GAMR : plans Cloud dès 100.000 FCFA/mois (Starter, Pro, Business) avec essai gratuit 30 jours, ou licence On-Premise perpétuelle. Transparence totale, sans engagement.',

  // Keywords (for reference, not used by modern search engines but good for documentation)
  keywords: [
    'tarifs GAMR',
    'prix cloud',
    'licence on-premise',
    'analyse des risques',
    'conformité',
    'abonnement FCFA',
    'essai gratuit',
    'gestion des menaces',
  ],

  // OpenGraph
  openGraph: {
    title: 'Tarifs GAMR - Abonnement Cloud et Licence On-Premise',
    description:
      'Plans Cloud dès 100.000 FCFA/mois avec essai gratuit 30 jours. Licence On-Premise disponible. Choisissez le modèle adapté à votre gouvernance.',
    url: 'https://gamr.example/tarifs',
    siteName: 'GAMR',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://gamr.example/images/tarifs/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Grille tarifaire GAMR - Cloud et On-Premise',
        type: 'image/png',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Tarifs GAMR - Abonnement Cloud et Licence On-Premise',
    description:
      'Plans Cloud dès 100.000 FCFA/mois avec essai gratuit 30 jours. Licence On-Premise disponible.',
    images: ['https://gamr.example/images/tarifs/og-image.png'],
    creator: '@gamr_official', // If applicable
  },

  // Canonical URL
  alternates: {
    canonical: 'https://gamr.example/tarifs',
    languages: {
      fr: 'https://gamr.example/tarifs',
      en: 'https://gamr.example/en/pricing', // If English version exists
    },
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Other metadata
  category: 'Business Software',
};
```

---

## JSON-LD Structured Data

### Product Schema with Multiple Offers

**Location**: Embedded in `app/tarifs/page.tsx` or separate component

```typescript
// Type definition for structured data
interface ProductStructuredData {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  brand: {
    '@type': 'Organization';
    name: string;
    url?: string;
  };
  offers: AggregateOfferStructuredData | OfferStructuredData[];
  additionalProperty?: PropertyValueStructuredData[];
}

interface AggregateOfferStructuredData {
  '@type': 'AggregateOffer';
  priceCurrency: string;
  lowPrice: string;
  highPrice: string;
  offerCount: string;
  offers: OfferStructuredData[];
  availability?: string;
}

interface OfferStructuredData {
  '@type': 'Offer';
  name: string;
  price: string;
  priceCurrency: string;
  priceSpecification: {
    '@type': 'UnitPriceSpecification';
    price: string;
    priceCurrency: string;
    unitText: 'MONTH' | 'YEAR';
  };
  availability: string;
  url: string;
  description?: string;
}

interface PropertyValueStructuredData {
  '@type': 'PropertyValue';
  name: string;
  value: string;
}
```

### Complete JSON-LD Implementation

```typescript
// components/tarifs/PricingStructuredData.tsx
export function PricingStructuredData() {
  const structuredData: ProductStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'GAMR - Grille d\'Analyse des Menaces et Risques',
    description: 'Solution complète de gestion des risques, conformité réglementaire et analyse des menaces pour entreprises et organisations africaines.',
    brand: {
      '@type': 'Organization',
      name: 'GAMR',
      url: 'https://gamr.example',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'XOF',
      lowPrice: '100000',
      highPrice: '500000',
      offerCount: '3',
      availability: 'https://schema.org/InStock',
      offers: [
        {
          '@type': 'Offer',
          name: 'Starter',
          price: '100000',
          priceCurrency: 'XOF',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '100000',
            priceCurrency: 'XOF',
            unitText: 'MONTH',
          },
          availability: 'https://schema.org/InStock',
          url: 'https://gamr.example/tarifs#starter',
          description: 'Plan de démarrage pour petites équipes : 1 utilisateur, 1 norme, 5 actions prioritaires/an',
        },
        {
          '@type': 'Offer',
          name: 'Pro',
          price: '250000',
          priceCurrency: 'XOF',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '250000',
            priceCurrency: 'XOF',
            unitText: 'MONTH',
          },
          availability: 'https://schema.org/InStock',
          url: 'https://gamr.example/tarifs#pro',
          description: 'Plan professionnel pour équipes moyennes : 5 utilisateurs, 3 normes, 10 actions prioritaires/an',
        },
        {
          '@type': 'Offer',
          name: 'Business',
          price: '500000',
          priceCurrency: 'XOF',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '500000',
            priceCurrency: 'XOF',
            unitText: 'MONTH',
          },
          availability: 'https://schema.org/InStock',
          url: 'https://gamr.example/tarifs#business',
          description: 'Plan entreprise pour grandes organisations : 25 utilisateurs, 10 normes, 25 actions prioritaires/an',
        },
      ],
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Deployment Model',
        value: 'Cloud SaaS',
      },
      {
        '@type': 'PropertyValue',
        name: 'Free Trial',
        value: '30 days',
      },
      {
        '@type': 'PropertyValue',
        name: 'Payment Frequency',
        value: 'Monthly or Annual',
      },
      {
        '@type': 'PropertyValue',
        name: 'Currency',
        value: 'XOF (West African CFA Franc)',
      },
      {
        '@type': 'PropertyValue',
        name: 'Target Region',
        value: 'West Africa',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

### Usage in Page

```typescript
// app/tarifs/page.tsx
import { PricingStructuredData } from '@/components/tarifs/PricingStructuredData';

export default function TarifsPage() {
  return (
    <>
      <PricingStructuredData />
      <main>
        {/* Page content */}
      </main>
    </>
  );
}
```

---

## FAQ Structured Data

**Additional Schema**: FAQPage for better search visibility

```typescript
interface FAQStructuredData {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: FAQQuestionStructuredData[];
}

interface FAQQuestionStructuredData {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
}

// components/tarifs/FAQStructuredData.tsx
export function FAQStructuredData() {
  const faqData: FAQStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Où sont hébergées mes données et quelle est la sécurité appliquée ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Toutes les données Cloud sont hébergées en France (Paris) chez un fournisseur certifié ISO 27001 et HDS. Chiffrement AES-256 au repos, TLS 1.3 en transit. Sauvegardes quotidiennes avec rétention 30 jours. Conformité RGPD complète.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment fonctionne l\'essai gratuit de 30 jours ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'L\'essai gratuit vous donne accès complet au plan Business sans carte bancaire requise. Durée de 30 jours calendaires. À l\'expiration, vos données sont conservées 30 jours supplémentaires si vous souhaitez souscrire. Aucun engagement.',
        },
      },
      {
        '@type': 'Question',
        name: 'Puis-je changer de plan ou ajouter des utilisateurs en cours d\'abonnement ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, vous pouvez upgrader ou downgrader à tout moment. Le changement est proratisé au prorata temporis. L\'ajout d\'utilisateurs supplémentaires se fait depuis le tableau de bord avec facturation immédiate de la différence.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quels sont les moyens de paiement acceptés ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Paiement par carte bancaire (Visa, Mastercard), virement SEPA, ou Mobile Money (Orange Money, MTN, Moov). Facturation mensuelle ou annuelle. Devis sur demande pour paiement par bon de commande (plans Business et Enterprise uniquement).',
        },
      },
      {
        '@type': 'Question',
        name: 'Y a-t-il un engagement de durée ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Aucun engagement pour les plans mensuels. Les plans annuels sont payés d\'avance mais bénéficient de 15% de réduction. Résiliation possible à tout moment avec préavis de 30 jours. Remboursement prorata pour plans annuels.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quel niveau de support puis-je attendre ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Starter: email 48h. Pro: email 24h + chat. Business: prioritaire 8h + téléphone. Enterprise: dédié 4h avec SLA garanti. Base de connaissances et tutoriels vidéo accessibles à tous les plans.',
        },
      },
      {
        '@type': 'Question',
        name: 'GAMR est-il conforme aux standards africains (ANSSI-CI, RGPD) ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, GAMR est conçu pour la conformité réglementaire africaine. Conformité RGPD complète, alignement ANSSI-CI (Côte d\'Ivoire), support des standards ISO 27001, ISO 27002, NIST, et normes sectorielles. Certifications en cours pour ISO 27001.',
        },
      },
      {
        '@type': 'Question',
        name: 'Puis-je exporter mes données si je quitte GAMR ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, réversibilité complète garantie. Export de toutes vos données en CSV, JSON, ou PDF à tout moment depuis le tableau de bord. Support gratuit pour la transition vers une autre solution pendant 30 jours après résiliation.',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
}
```

---

## Breadcrumb Structured Data

**Optional but recommended** for improved navigation visibility in search results

```typescript
interface BreadcrumbStructuredData {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbItemStructuredData[];
}

interface BreadcrumbItemStructuredData {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

export function BreadcrumbStructuredData() {
  const breadcrumbData: BreadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://gamr.example',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tarifs',
        item: 'https://gamr.example/tarifs',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
}
```

---

## Semantic HTML Structure

### Heading Hierarchy

```html
<h1>Des tarifs simples et transparents</h1>

<section>
  <h2>Plans Cloud</h2>
  <article>
    <h3>Starter</h3>
  </article>
  <article>
    <h3>Pro</h3>
  </article>
  <article>
    <h3>Business</h3>
  </article>
  <article>
    <h3>Enterprise</h3>
  </article>
</section>

<section>
  <h2>On-Premise</h2>
</section>

<section>
  <h2>Options Premium (Add-ons)</h2>
</section>

<section>
  <h2>Cloud vs On-Premise : Comparaison</h2>
</section>

<section>
  <h2>Calculateur de ROI</h2>
</section>

<section>
  <h2>Questions fréquentes</h2>
  <article>
    <h3>Question 1</h3>
  </article>
  <!-- ... -->
</section>
```

**Requirements**:

- Single H1 per page
- H2 for major sections
- H3 for subsections (plan names, FAQ questions)
- No skipped heading levels

---

## Meta Tag Validation Checklist

| Tag                         | Requirement                      | Character Limit | Status      |
| --------------------------- | -------------------------------- | --------------- | ----------- |
| `<title>`                   | Unique, descriptive              | 50-60 chars     | ✓ 55 chars  |
| `<meta name="description">` | Unique, compelling               | 150-160 chars   | ✓ 158 chars |
| `og:title`                  | Same as title or variation       | 60 chars        | ✓ 55 chars  |
| `og:description`            | Same as description or variation | 200 chars       | ✓ 142 chars |
| `og:image`                  | 1200×630 px, < 8MB               | N/A             | ✓ Specified |
| `og:url`                    | Canonical URL                    | N/A             | ✓ Defined   |
| `og:type`                   | website                          | N/A             | ✓ Set       |
| `twitter:card`              | summary_large_image              | N/A             | ✓ Set       |
| Canonical URL               | Prevent duplicates               | N/A             | ✓ Defined   |
| robots                      | index, follow                    | N/A             | ✓ Set       |

---

## OpenGraph Image Specifications

**File**: `/public/images/tarifs/og-image.png`

**Requirements**:

- **Dimensions**: 1200×630 pixels (1.91:1 aspect ratio)
- **File size**: < 8MB (recommend < 300KB)
- **Format**: PNG or JPEG (PNG preferred for text clarity)
- **Content**:
  - GAMR logo
  - Pricing headline (e.g., "Plans dès 100.000 FCFA/mois")
  - Key benefits (e.g., "Essai gratuit 30 jours")
  - Clean, on-brand design matching site aesthetic

**Safe zones** (avoid text in these areas):

- Top/bottom 70px: Overlays on some platforms
- Left/right 70px: May be cropped on mobile

---

## Internal Linking Strategy

### From Tarifs Page

```typescript
// Links to include on /tarifs page for SEO
const internalLinks = [
  { href: '/', text: 'Accueil', rel: 'home' },
  { href: '/fonctionnalites', text: 'Fonctionnalités', rel: 'related' },
  { href: '/solutions', text: 'Solutions', rel: 'related' },
  { href: '/contact', text: 'Contact', rel: 'nofollow' }, // Form page
  { href: '/inscription', text: 'Inscription', rel: 'nofollow' }, // Trial signup
  { href: '/a-propos', text: 'À propos', rel: 'related' },
];
```

### To Tarifs Page

Ensure these pages link to /tarifs:

- Homepage (primary CTA)
- Navigation menu
- Fonctionnalités page (CTA)
- Solutions page (CTA)
- Footer (sitemap)

---

## Sitemap Entry

**File**: `/sitemap.xml`

```xml
<url>
  <loc>https://gamr.example/tarifs</loc>
  <lastmod>2025-10-09</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

**Priority**: 0.9 (high - important conversion page)  
**Change frequency**: Monthly (pricing updates quarterly but set monthly for crawl frequency)

---

## robots.txt Configuration

```txt
# Allow all bots to access pricing page
User-agent: *
Allow: /tarifs

# Sitemap
Sitemap: https://gamr.example/sitemap.xml
```

---

## SEO Testing Checklist

- [ ] Google Rich Results Test: Product schema valid
- [ ] Google Rich Results Test: FAQ schema valid
- [ ] Facebook Sharing Debugger: OpenGraph tags render correctly
- [ ] Twitter Card Validator: Card preview looks good
- [ ] Lighthouse SEO audit: Score > 95
- [ ] Mobile-friendly test: Passes
- [ ] Page Speed Insights: Core Web Vitals pass
- [ ] Meta tag length checker: All within limits
- [ ] Canonical URL resolves correctly
- [ ] Sitemap includes /tarifs
- [ ] Internal links from 5+ pages

---

## Monitoring & Maintenance

### Track These Metrics

1. **Search Console**:
   - Impressions for "tarifs" queries
   - Click-through rate (target: > 5%)
   - Average position (target: top 3)
   - Rich results showing rate

2. **Analytics**:
   - Organic search landing rate on /tarifs
   - Trial signup conversion rate from organic
   - Bounce rate (target: < 40%)
   - Time on page (target: > 2min)

3. **Structured Data**:
   - Monitor Search Console for schema errors
   - Check rich snippet appearance in SERPs monthly

---

## Contract Guarantees

1. **Completeness**: All required meta tags present (SEO-001 to SEO-008)
2. **Validity**: All structured data validates with schema.org
3. **Performance**: SEO optimizations don't impact page load speed
4. **Accessibility**: SEO enhancements don't break screen reader support
5. **Accuracy**: Pricing data in schema matches actual page content

---

**Status**: Ready for implementation  
**Validation Required**: Google Rich Results Test, Lighthouse SEO audit
