'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { DemoRequest } from '@/types/demo';
import { TimeSlotPicker } from './TimeSlotPicker';
import { commonTimezones, meetingTools, languages } from '@/lib/demo/options';

interface SchedulingFieldsProps {
  register: UseFormRegister<DemoRequest>;
  errors: FieldErrors<DemoRequest>;
}

export function SchedulingFields({ register, errors }: SchedulingFieldsProps) {
  return (
    <div className="space-y-8">
      {/* Timezone */}
      <div>
        <label htmlFor="_timezone" className="block text-sm font-medium text-gray-700 mb-2">
          Fuseau horaire <span className="text-red-500">*</span>
        </label>
        <select
          id="_timezone"
          {...register('_timezone')}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors._timezone ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-required="true"
          aria-invalid={!!errors._timezone}
          aria-describedby={errors._timezone ? 'timezone-error' : 'timezone-help'}
        >
          {commonTimezones.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
        <p id="timezone-help" className="mt-1 text-sm text-gray-500">
          Sélectionnez votre fuseau horaire pour proposer des créneaux
        </p>
        {errors._timezone && (
          <p id="timezone-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors._timezone.message}
          </p>
        )}
      </div>

      {/* Time Slots */}
      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4">
            Proposez 3 créneaux <span className="text-red-500">*</span>
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Proposez 3 dates et heures qui vous conviennent. Nous confirmerons le créneau le plus
            adapté.
          </p>
        </div>

        {/* Slot 1 */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-3">Créneau 1 (prioritaire)</h5>
          <TimeSlotPicker slotNumber={1} register={register} errors={errors} />
        </div>

        {/* Slot 2 */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-3">Créneau 2</h5>
          <TimeSlotPicker slotNumber={2} register={register} errors={errors} />
        </div>

        {/* Slot 3 */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-3">Créneau 3</h5>
          <TimeSlotPicker slotNumber={3} register={register} errors={errors} />
        </div>
      </div>

      {/* Meeting Tool */}
      <div>
        <label htmlFor="meetingTool" className="block text-sm font-medium text-gray-700 mb-2">
          Outil de réunion préféré <span className="text-red-500">*</span>
        </label>
        <select
          id="meetingTool"
          {...register('meetingTool')}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.meetingTool ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-required="true"
          aria-invalid={!!errors.meetingTool}
          aria-describedby={errors.meetingTool ? 'meeting-tool-error' : undefined}
        >
          {meetingTools.map((tool) => (
            <option key={tool.value} value={tool.value}>
              {tool.label}
            </option>
          ))}
        </select>
        {errors.meetingTool && (
          <p id="meeting-tool-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.meetingTool.message}
          </p>
        )}
      </div>

      {/* Language */}
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
          Langue de la démo <span className="text-red-500">*</span>
        </label>
        <select
          id="language"
          {...register('language')}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.language ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-required="true"
          aria-invalid={!!errors.language}
          aria-describedby={errors.language ? 'language-error' : undefined}
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
        {errors.language && (
          <p id="language-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.language.message}
          </p>
        )}
      </div>
    </div>
  );
}
