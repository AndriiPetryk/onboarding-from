// src/App.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema/schema';
import axios from 'axios';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
}

const FormComponent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Asynchronous Validation of Corporation Number
  const validateCorporationNumber = async (number: string) => {
    try {
      const response = await axios.get(
        `https://fe-hometask-api.dev.vault.tryvault.com/corporation-number/${number}`,
      );
      if (!response.data.valid) {
        setError('corporationNumber', {
          type: 'manual',
          message: 'Invalid corporation number',
        });
      }
    } catch (error) {
      setError('corporationNumber', {
        type: 'manual',
        message: 'Error validating corporation number',
      });
    }
  };

  // Form Submit Handler
  const onSubmit = async (data: FormData) => {
    try {
      await validateCorporationNumber(data.corporationNumber);

      // If there are no errors, submit the form
      if (Object.keys(errors).length === 0) {
        const response = await axios.post(
          'https://fe-hometask-api.dev.vault.tryvault.com/profile-details',
          data,
        );
        if (response.status === 200) {
          alert('Form submitted successfully!');
        }
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error submitting the form');
    }
  };

  return (
    <div className="App">
      <h1>Onboarding Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name</label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        <div>
          <label>Last Name</label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>

        <div>
          <label>Phone Number</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <div>
          <label>Corporation Number</label>
          <Controller
            name="corporationNumber"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                onBlur={() => validateCorporationNumber(field.value)}
              />
            )}
          />
          {errors.corporationNumber && (
            <p>{errors.corporationNumber.message}</p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
