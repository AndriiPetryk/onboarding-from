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

export interface CorporationValidationResponse {
  valid: boolean;
  message?: string;
}

export interface ProfileSubmissionResponse {
  success: boolean;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}
