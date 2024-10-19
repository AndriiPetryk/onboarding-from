import axios from 'axios';

export const validateCorporationNumber = async (number: string) => {
    const response = await axios.get(`https://fe-hometask-api.dev.vault.tryvault.com/corporation-number/${number}`);
    return response.data;
};

export const submitProfileDetails = async (data: any) => {
    const response = await axios.post('https://fe-hometask-api.dev.vault.tryvault.com/profile-details', data);
    return response.data;
};
