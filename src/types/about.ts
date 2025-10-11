/**
 * TypeScript Types for About Page
 */

export interface CompanyInfo {
  name: string;
  mission: string;
  story: string;
  milestones: Array<{
    year: string;
    achievement: string;
  }>;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutStat {
  id: string;
  label: string;
  value: string;
}

export interface AboutPageData {
  companyInfo: CompanyInfo;
  team: TeamMember[];
  values: CompanyValue[];
  stats: AboutStat[];
}
