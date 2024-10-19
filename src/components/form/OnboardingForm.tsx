import React from 'react';
import { useForm } from 'react-hook-form';
import { OnboardingFormData } from '../../types/formTypes';
import InputField from './InputField';
import PhoneNumberInput from './PhoneNumberInput';
import Button from 'react-bootstrap/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../schema/schema';
import { validateCorporationNumber } from '../../services/api';

const OnboardingForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: OnboardingFormData) => {
    console.log('data', data);
    validateCorporationNumber('');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        name="firstName"
        label="First Name"
        control={control}
        errors={errors}
      />
      <InputField
        name="lastName"
        label="Last Name"
        control={control}
        errors={errors}
      />
      <PhoneNumberInput name="phone" control={control} errors={errors} />
      <InputField
        name="corporationNumber"
        label="Corporation Number"
        control={control}
        errors={errors}
      />
      <Button type="submit" className="btn-primary">
        Submit
      </Button>
    </form>
  );
};

export default OnboardingForm;
