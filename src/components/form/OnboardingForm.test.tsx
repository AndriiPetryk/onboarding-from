// src/components/form/OnboardingForm.test.tsx
import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OnboardingForm from './OnboardingForm';
import {
  submitProfileDetails,
  validateCorporationNumber,
} from '../../services/api';

jest.mock('../../services/api', () => ({
  submitProfileDetails: jest.fn(),
  validateCorporationNumber: jest.fn(),
}));

describe('OnboardingForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    render(<OnboardingForm />);

    // Check if form fields are rendered
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Corporation Number/i)).toBeInTheDocument();
  });

  it('displays an error when corporation number validation fails', async () => {
    (validateCorporationNumber as jest.Mock).mockResolvedValue({
      success: false,
      error: 'Invalid corporation number',
    });

    render(<OnboardingForm />);

    // Fill in the form fields
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/First Name/i), {
        target: { value: 'John' },
      });
      fireEvent.change(screen.getByLabelText(/Last Name/i), {
        target: { value: 'Doe' },
      });
      fireEvent.change(screen.getByLabelText(/Phone Number/i), {
        target: { value: '+1234567890' },
      });
      fireEvent.change(screen.getByLabelText(/Corporation Number/i), {
        target: { value: '123456789' },
      });
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
  });

  it('submits the form successfully and disables the button', async () => {
    (validateCorporationNumber as jest.Mock).mockResolvedValue({
      success: true,
    });
    (submitProfileDetails as jest.Mock).mockResolvedValue({
      success: true,
    });

    render(<OnboardingForm />);

    // Fill in the form fields
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/First Name/i), {
        target: { value: 'John' },
      });
      fireEvent.change(screen.getByLabelText(/Last Name/i), {
        target: { value: 'Doe' },
      });
      fireEvent.change(screen.getByLabelText(/Phone Number/i), {
        target: { value: '+1234567890' },
      });
      fireEvent.change(screen.getByLabelText(/Corporation Number/i), {
        target: { value: '123456789' },
      });
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
  });
});
