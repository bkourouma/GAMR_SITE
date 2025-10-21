'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { DemoRequest } from '@/types/demo';

interface TimeSlotPickerProps {
  slotNumber: 1 | 2 | 3;
  register: UseFormRegister<DemoRequest>;
  errors: FieldErrors<DemoRequest>;
}

export function TimeSlotPicker({ slotNumber, register, errors }: TimeSlotPickerProps) {
  const slotKey = `slot${slotNumber}` as const;
  const dateKey = `${slotKey}.date` as const;
  const timeKey = `${slotKey}.time` as const;

  const dateError = errors[slotKey]?.date;
  const timeError = errors[slotKey]?.time;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Date Input */}
      <div>
        <label htmlFor={`${slotKey}-date`} className="block text-sm font-medium text-gray-700 mb-2">
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id={`${slotKey}-date`}
          {...register(dateKey)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            dateError ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-required="true"
          aria-invalid={!!dateError}
          aria-describedby={dateError ? `${slotKey}-date-error` : undefined}
        />
        {dateError && (
          <p id={`${slotKey}-date-error`} className="mt-1 text-sm text-red-600" role="alert">
            {dateError.message as string}
          </p>
        )}
      </div>

      {/* Time Input */}
      <div>
        <label htmlFor={`${slotKey}-time`} className="block text-sm font-medium text-gray-700 mb-2">
          Heure <span className="text-red-500">*</span>
        </label>
        <input
          type="time"
          id={`${slotKey}-time`}
          {...register(timeKey)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            timeError ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-required="true"
          aria-invalid={!!timeError}
          aria-describedby={timeError ? `${slotKey}-time-error` : undefined}
        />
        {timeError && (
          <p id={`${slotKey}-time-error`} className="mt-1 text-sm text-red-600" role="alert">
            {timeError.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
