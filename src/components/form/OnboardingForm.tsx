import React from 'react';
import { useForm } from 'react-hook-form';
import { OnboardingFormData } from '../types/formTypes';
import InputField from './InputField';
import PhoneNumberInput from './PhoneNumberInput';

const OnboardingForm: React.FC = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<OnboardingFormData>({
        // Use custom validation schema here
    });

    const onSubmit = (data: OnboardingFormData) => {
        // Handle form submission logic
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField name="firstName" label="First Name" control={control} errors={errors} />
            <InputField name="lastName" label="Last Name" control={control} errors={errors} />
            <PhoneNumberInput name="phone" control={control} errors={errors} />
            <InputField name="corporationNumber" label="Corporation Number" control={control} errors={errors} />
            <button type="submit" className="btn-primary">Submit</button>
        </form>
    );
};

export default OnboardingForm;
