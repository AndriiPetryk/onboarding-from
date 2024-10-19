export const isValidPhoneNumber = (phone: string) => {
    const regex = /^\+1\d{10}$/;
    return regex.test(phone);
};
