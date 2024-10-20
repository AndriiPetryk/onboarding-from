// src/types/formTypes.ts
import { Control } from 'react-hook-form';

export interface OnboardingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
}

export interface InputFieldProps {
  name: keyof OnboardingFormData;
  label: string;
  control: Control<OnboardingFormData>;
  errors: any;
  type?: string;
  labelClassName?: string;
  inputClassName?: string;
}
