// app.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import StringCalculator from './Calculater';

describe('StringCalculator Component', () => {
  test('renders String Calculator input and button', () => {
    render(<StringCalculator />);

    // Check if the input and button are rendered
    const inputElement = screen.getByPlaceholderText(/Enter numbers/i);
    const buttonElement = screen.getByText(/Calculate/i);

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('should display sum for a simple comma-separated input', () => {
    render(<StringCalculator />);

    const inputElement = screen.getByPlaceholderText(/Enter numbers/i);
    const buttonElement = screen.getByText(/Calculate/i);

    // Simulate user typing and submitting the form
    fireEvent.change(inputElement, { target: { value: '1,2,3' } });
    fireEvent.click(buttonElement);

    // Check if the sum is displayed
    const resultElement = screen.getByText(/Sum: 6/i);
    expect(resultElement).toBeInTheDocument();
  });

  test('should handle newlines between numbers', () => {
    render(<StringCalculator />);

    const inputElement = screen.getByPlaceholderText(/Enter numbers/i);
    const buttonElement = screen.getByText(/Calculate/i);

    fireEvent.change(inputElement, { target: { value: '1\n2,3' } });
    fireEvent.click(buttonElement);
  });

  test('should handle custom delimiter', () => {
    render(<StringCalculator />);

    const inputElement = screen.getByPlaceholderText(/Enter numbers/i);
    const buttonElement = screen.getByText(/Calculate/i);

    fireEvent.change(inputElement, { target: { value: '//;\n1;2' } });
    fireEvent.click(buttonElement);
  });

  test('should show error for negative numbers', () => {
    render(<StringCalculator />);

    const inputElement = screen.getByPlaceholderText(/Enter numbers/i);
    const buttonElement = screen.getByText(/Calculate/i);

    fireEvent.change(inputElement, { target: { value: '1,-2,3' } });
    fireEvent.click(buttonElement);

    const errorElement = screen.getByText(/negative numbers not allowed: -2/i);
    expect(errorElement).toBeInTheDocument();
  });

  test('should return 0 for empty input', () => {
    render(<StringCalculator />);

    const inputElement = screen.getByPlaceholderText(/Enter numbers/i);
    const buttonElement = screen.getByText(/Calculate/i);

    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(buttonElement);

    const resultElement = screen.getByText(/Sum: 0/i);
    expect(resultElement).toBeInTheDocument();
  });
});
