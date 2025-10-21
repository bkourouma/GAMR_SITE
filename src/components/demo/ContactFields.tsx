'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { DemoRequest } from '@/types/demo';
import { roles } from '@/lib/demo/options';

interface ContactFieldsProps {
  register: UseFormRegister<DemoRequest>;
  errors: FieldErrors<DemoRequest>;
}

export function ContactFields({ register, errors }: ContactFieldsProps) {
  return (
    <div className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
          Nom complet <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          {...register('fullName')}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Marie Kouassi"
          aria-required="true"
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
        />
        {errors.fullName && (
          <p id="fullName-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Organization */}
      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
          Organisation <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="organization"
          {...register('organization')}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.organization ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Banque Centrale"
          aria-required="true"
          aria-invalid={!!errors.organization}
          aria-describedby={errors.organization ? 'organization-error' : undefined}
        />
        {errors.organization && (
          <p id="organization-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.organization.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email professionnel <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="marie.kouassi@example.com"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Téléphone
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Votre numéro de téléphone"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
          Votre rôle
        </label>
        <select
          id="role"
          {...register('role')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Sélectionnez votre rôle</option>
          {roles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
