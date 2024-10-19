// src/types/formTypes.ts

export interface OnboardingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
}

export interface CorporationValidationResponse {
  corporationNumber: string;
  valid: boolean;
  message?: string;
}

export interface FormSubmissionResponse {
  message: string;
  status: number;
}

export interface FormError {
  field: string;
  message: string;
}
