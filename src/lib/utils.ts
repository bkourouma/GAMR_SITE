import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * List of common personal email domains
 */
const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'msn.com',
  'aol.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'protonmail.com',
  'mail.com',
  'yandex.com',
  'zoho.com',
];

/**
 * Check if an email address uses a personal email domain
 * @param email - Email address to check
 * @returns true if the email uses a personal domain, false otherwise
 */
export function isPersonalEmailDomain(email: string): boolean {
  if (!email || typeof email !== 'string') return false;

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;

  return PERSONAL_EMAIL_DOMAINS.includes(domain);
}
