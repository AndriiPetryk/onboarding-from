// src/components/form/InputField.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, Control } from 'react-hook-form';
import InputField from './InputField';
import { OnboardingFormData } from '../../types/formTypes';

type TestFormData = {
  testField: string;
};

const MockForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TestFormData>({
    defaultValues: { testField: '' },
  });

  const onSubmit = (data: TestFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="firstName"
        label="First Name"
        control={control as unknown as Control<OnboardingFormData>}
        errors={errors}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('InputField Component', () => {
  it('renders the input field correctly', () => {
    render(<MockForm />);

    // Check if the input field is rendered with the correct label
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  });

  it('updates the input value correctly', () => {
    render(<MockForm />);

    // Get the input field
    const input = screen.getByLabelText(/First Name/i);

    // Simulate typing in the input field
    fireEvent.change(input, { target: { value: 'Test Value' } });

    // Check if the input field value is updated
    expect(input).toHaveValue('Test Value');
  });
});
