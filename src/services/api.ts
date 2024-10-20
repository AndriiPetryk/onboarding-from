import axios from 'axios';
import {
  ApiError,
  ApiResponse,
  CorporationValidationResponse,
  OnboardingFormData,
  ProfileSubmissionResponse,
} from '../types/formTypes';

export const validateCorporationNumber = async (
  number: string,
): Promise<ApiResponse<CorporationValidationResponse>> => {
  try {
    const response = await axios.get<CorporationValidationResponse>(
      `https://fe-hometask-api.dev.vault.tryvault.com/corporation-number/${number}`,
    );

    if (response.data.valid) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        error: response.data.message || 'Invalid corporation number',
      };
    }
  } catch (error) {
    const err = error as ApiError;
    return {
      success: false,
      error: err.response?.data?.message || 'An unexpected error occurred',
    };
  }
};

export const submitProfileDetails = async (
  data: OnboardingFormData,
): Promise<ApiResponse<ProfileSubmissionResponse>> => {
  try {
    const response = await axios.post<ProfileSubmissionResponse>(
      'https://fe-hometask-api.dev.vault.tryvault.com/profile-details',
      data,
    );
    return { success: true, data: response.data };
  } catch (error) {
    const err = error as ApiError;
    return {
      success: false,
      error: err.response?.data?.message || 'Failed to submit profile details',
    };
  }
};
