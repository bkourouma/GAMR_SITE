'use client';

import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { DemoRequest } from '@/types/demo';
import { sectors, standards, goals, teamSizes, imports, modules } from '@/lib/demo/options';

interface QualificationFieldsProps {
  register: UseFormRegister<DemoRequest>;
  errors: FieldErrors<DemoRequest>;
  watch: UseFormWatch<DemoRequest>;
}

export function QualificationFields({ register, errors, watch }: QualificationFieldsProps) {
  // Watch standards array to show/hide "Préciser" field
  const selectedStandards = watch('standards') || [];
  const showStandardsOther = selectedStandards.includes('autre');

  return (
    <div className="space-y-6">
      {/* Sector */}
      <div>
        <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
          Secteur d&apos;activité <span className="text-red-500">*</span>
        </label>
        <select
          id="sector"
          {...register('sector')}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.sector ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-required="true"
          aria-invalid={!!errors.sector}
          aria-describedby={errors.sector ? 'sector-error' : undefined}
        >
          <option value="">Sélectionnez votre secteur</option>
          {sectors.map((sector) => (
            <option key={sector.value} value={sector.value}>
              {sector.label}
            </option>
          ))}
        </select>
        {errors.sector && (
          <p id="sector-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.sector.message}
          </p>
        )}
      </div>

      {/* Standards */}
      <div>
        <div className="block text-sm font-medium text-gray-700 mb-3">
          Normes et référentiels prioritaires <span className="text-red-500">*</span>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
          {standards.map((standard) => (
            <label
              key={standard.value}
              className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                value={standard.value}
                {...register('standards')}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{standard.label}</span>
            </label>
          ))}
        </div>
        {errors.standards && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.standards.message}
          </p>
        )}

        {/* Show "Préciser" field when "Autre" is selected */}
        {showStandardsOther && (
          <div className="mt-4 ml-4 p-4 bg-blue-50 border-l-4 border-blue-500">
            <label
              htmlFor="standardsOther"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Précisez la norme <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="standardsOther"
              {...register('standardsOther')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.standardsOther ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Indiquez la norme ou le référentiel"
              aria-required="true"
              aria-invalid={!!errors.standardsOther}
              aria-describedby={errors.standardsOther ? 'standardsOther-error' : undefined}
            />
            {errors.standardsOther && (
              <p id="standardsOther-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.standardsOther.message}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Goals */}
      <div>
        <div className="block text-sm font-medium text-gray-700 mb-3">
          Objectifs principaux <span className="text-red-500">*</span>
        </div>
        <div className="space-y-2">
          {goals.map((goal) => (
            <label
              key={goal.value}
              className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                value={goal.value}
                {...register('goals')}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{goal.label}</span>
            </label>
          ))}
        </div>
        {errors.goals && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.goals.message}
          </p>
        )}
      </div>

      {/* Team Size */}
      <div>
        <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
          Taille de l&apos;équipe concernée <span className="text-red-500">*</span>
        </label>
        <select
          id="teamSize"
          {...register('teamSize')}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.teamSize ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-required="true"
          aria-invalid={!!errors.teamSize}
          aria-describedby={errors.teamSize ? 'teamSize-error' : undefined}
        >
          <option value="">Sélectionnez la taille</option>
          {teamSizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
        {errors.teamSize && (
          <p id="teamSize-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.teamSize.message}
          </p>
        )}
      </div>

      {/* Context */}
      <div>
        <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
          Contexte & enjeux
        </label>
        <textarea
          id="context"
          {...register('context')}
          rows={4}
          maxLength={400}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.context ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Décrivez brièvement votre problématique ou cas d'usage..."
          aria-invalid={!!errors.context}
          aria-describedby={errors.context ? 'context-error context-help' : 'context-help'}
        />
        <p id="context-help" className="mt-1 text-sm text-gray-500">
          Maximum 400 caractères
        </p>
        {errors.context && (
          <p id="context-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.context.message}
          </p>
        )}
      </div>

      {/* Mode */}
      <div>
        <div className="block text-sm font-medium text-gray-700 mb-3">
          Mode de déploiement envisagé <span className="text-red-500">*</span>
        </div>
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded border border-gray-200">
            <input
              type="radio"
              value="cloud"
              {...register('mode')}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div>
              <span className="font-medium text-gray-900">Cloud</span>
              <p className="text-sm text-gray-500">Hébergé et maintenu par GAMR</p>
            </div>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded border border-gray-200">
            <input
              type="radio"
              value="onprem"
              {...register('mode')}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div>
              <span className="font-medium text-gray-900">On-Premises</span>
              <p className="text-sm text-gray-500">Sur vos serveurs internes</p>
            </div>
          </label>
        </div>
        {errors.mode && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.mode.message}
          </p>
        )}
      </div>

      {/* Imports */}
      <div>
        <div className="block text-sm font-medium text-gray-700 mb-3">
          Données à importer au démarrage
        </div>
        <div className="space-y-2">
          {imports.map((importItem) => (
            <label
              key={importItem.value}
              className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                value={importItem.value}
                {...register('imports')}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{importItem.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div>
        <div className="block text-sm font-medium text-gray-700 mb-3">
          Modules à prioriser dans votre essai <span className="text-red-500">*</span>
        </div>
        <div className="space-y-2">
          {modules.map((module) => (
            <label
              key={module.value}
              className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                value={module.value}
                {...register('modules')}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{module.label}</span>
            </label>
          ))}
        </div>
        {errors.modules && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.modules.message}
          </p>
        )}
      </div>
    </div>
  );
}
