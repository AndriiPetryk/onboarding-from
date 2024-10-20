// src/components/InputField.tsx
import React from 'react';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { InputFieldProps } from '../../types/formTypes';

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  control,
  errors,
  type = 'text',
  labelClassName,
  inputClassName,
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className={twMerge(
          'block text-sm font-medium leading-6 text-gray-900 text-start',
          labelClassName,
        )}
      >
        {label}
      </label>
      <div className="mt-2">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id={name}
              type={type}
              value={field.value || ''}
              className={twMerge(
                'block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                inputClassName,
              )}
            />
          )}
        />
        <p className="text-red-500 text-xs mt-1 text-start min-h-4">
          {errors[name]?.message}
        </p>
      </div>
    </>
  );
};

export default InputField;
