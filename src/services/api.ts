import axios from 'axios';

export const validateCorporationNumber = async (number: string) => {
  try {
    const response = await axios.get(
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
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'An unexpected error occurred',
    };
  }
};

export const submitProfileDetails = async (data: any) => {
  try {
    const response = await axios.post(
      'https://fe-hometask-api.dev.vault.tryvault.com/profile-details',
      data,
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.message || 'Failed to submit profile details',
    };
  }
};
