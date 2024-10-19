import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(50, 'First name should not exceed 50 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .max(50, 'Last name should not exceed 50 characters')
    .required('Last name is required'),
  phone: yup
    .string()
    .matches(
      /^\+1\d{10}$/,
      'Phone must be a valid Canadian number starting with +1',
    )
    .required('Phone number is required'),
  corporationNumber: yup
    .string()
    .length(9, 'Corporation number must be 9 digits')
    .required('Corporation number is required'),
});
