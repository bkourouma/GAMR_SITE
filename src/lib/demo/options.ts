// Static options for form select fields

export const roles = [
  { value: 'direction', label: 'Direction' },
  { value: 'compliance_audit', label: 'Conformité/Audit' },
  { value: 'operations', label: 'Opérations' },
  { value: 'it_security', label: 'IT/Sécurité' },
  { value: 'other', label: 'Autre' },
] as const;

export const sectors = [
  { value: 'extractive', label: 'Industrie extractive' },
  { value: 'aeroportuaire', label: 'Aéroportuaire' },
  { value: 'gouvernement', label: 'Gouvernement/Institution' },
  { value: 'banque_finance', label: 'Banque & Finance' },
  { value: 'sante_hopitaux', label: 'Santé & Hôpitaux' },
  { value: 'autre', label: 'Autre' },
] as const;

export const standards = [
  { value: 'iso31000', label: 'ISO 31000' },
  { value: 'iso27001', label: 'ISO 27001' },
  { value: 'iso45001', label: 'ISO 45001' },
  { value: 'iso14001', label: 'ISO 14001' },
  { value: 'icao_annexe_19', label: 'OACI Annexe 19' },
  { value: 'coso_erm', label: 'COSO ERM' },
  { value: 'rgpd_anssi_ci', label: 'RGPD/ANSSI-CI' },
  { value: 'basel_iii', label: 'Bâle III' },
  { value: 'oms_patient_safety', label: 'OMS Patient Safety' },
  { value: 'autre', label: 'Autre' },
] as const;

export const goals = [
  { value: 'cartographie', label: 'Cartographie' },
  { value: 'conformite_audits', label: 'Conformité & audits' },
  {
    value: 'automatisation_workflows',
    label: 'Automatisation & workflows',
  },
  { value: 'reporting', label: 'Reporting' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'incidents', label: 'Incidents' },
] as const;

export const teamSizes = [
  { value: '1-10', label: '1–10' },
  { value: '11-50', label: '11–50' },
  { value: '51-200', label: '51–200' },
  { value: '201-1000', label: '201–1000' },
  { value: '1000+', label: '1000+' },
] as const;

export const imports = [
  { value: 'excel', label: 'Excel' },
  { value: 'csv', label: 'CSV' },
  { value: 'erp_crm', label: 'ERP/CRM' },
  { value: 'aucun', label: 'Aucun' },
  { value: 'autre', label: 'Autre' },
] as const;

export const modules = [
  { value: 'evaluation_risques', label: 'Évaluation risques' },
  { value: 'plans_action', label: "Plans d'action" },
  { value: 'incidents_nc', label: 'Incidents/NC' },
  { value: 'audits_rapports', label: 'Audits/rapports' },
  { value: 'tableaux_bord', label: 'Tableaux de bord' },
  { value: 'multi_entites', label: 'Multi-entités' },
] as const;

export const meetingTools = [
  { value: 'google_meet', label: 'Google Meet' },
  { value: 'microsoft_teams', label: 'Microsoft Teams' },
  { value: 'zoom', label: 'Zoom' },
  { value: 'phone', label: 'Téléphone' },
] as const;

export const languages = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
] as const;

// Common timezones for the selector (Africa/Abidjan is default)
export const commonTimezones = [
  { value: 'Africa/Abidjan', label: 'Africa/Abidjan (GMT+0)' },
  { value: 'Africa/Lagos', label: 'Africa/Lagos (GMT+1)' },
  { value: 'Africa/Cairo', label: 'Africa/Cairo (GMT+2)' },
  { value: 'Europe/Paris', label: 'Europe/Paris (GMT+1/+2)' },
  { value: 'Europe/London', label: 'Europe/London (GMT+0/+1)' },
  { value: 'America/New_York', label: 'America/New York (GMT-5/-4)' },
  { value: 'America/Los_Angeles', label: 'America/Los Angeles (GMT-8/-7)' },
] as const;

// Pricing plans
export const pricingPlans = [
  { value: 'starter', label: 'Starter - TPE/PME (1-50 utilisateurs)' },
  { value: 'business', label: 'Business - Moyennes entreprises (51-200 utilisateurs)' },
  { value: 'enterprise', label: 'Enterprise - Grandes organisations (200+ utilisateurs)' },
  { value: 'not_sure', label: 'Pas encore décidé' },
] as const;
