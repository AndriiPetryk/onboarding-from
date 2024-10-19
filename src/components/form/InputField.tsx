// src/components/InputField.tsx

import React from 'react';
import { Controller } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  label: string;
  control: any;
  errors: any;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  control,
  errors,
  type = 'text',
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors[name] ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:ring focus:ring-opacity-50`}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default InputField;
