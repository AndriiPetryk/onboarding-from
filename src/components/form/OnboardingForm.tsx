import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { OnboardingFormData } from '../../types/formTypes';
import InputField from './InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../schema/schema';
import {
  submitProfileDetails,
  validateCorporationNumber,
} from '../../services/api';

const OnboardingForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true);
    try {
      const validationResult = await validateCorporationNumber(
        data?.corporationNumber,
      );
      if (!validationResult.success) {
        setError('corporationNumber', {
          type: 'manual',
          message: validationResult.error,
        });
        setIsSubmitting(false);
        return;
      }

      const submissionResult = await submitProfileDetails(data);

      if (!submissionResult.success) {
        setFormError(submissionResult.error ?? 'An unknown error occurred');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full sm:max-w-[50%] p-6 space-y-12 bg-white rounded-md border-b border-gray-900/10 pb-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-center font-semibold leading-9 text-gray-900">
            Onboarding Form
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputField
                name="firstName"
                label="First Name"
                control={control}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <InputField
                name="lastName"
                label="Last Name"
                control={control}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-full">
              <InputField
                name="phone"
                label="Phone Number"
                control={control}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-full">
              <InputField
                name="corporationNumber"
                label="Corporation Number"
                control={control}
                errors={errors}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
            isSubmitting || isSubmitted
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
          disabled={isSubmitting || isSubmitted} // Disable button when form is submitted or submitting
        >
          {isSubmitting
            ? 'Submitting...'
            : isSubmitted
              ? 'Submitted successfully.'
              : 'Submit'}
        </button>
      </form>
      {formError && (
        <div className="text-red-500 text-sm mt-2">{formError}</div>
      )}
    </div>
  );
};

export default OnboardingForm;
