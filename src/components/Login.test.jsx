import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from './Login';
import { authAPI } from '../services/api';

// Mock the API
vi.mock('../services/api', () => ({
    authAPI: {
        requestCode: vi.fn(),
        validateCode: vi.fn(),
    },
}));

describe('Login Component', () => {
    it('renders initial email step correctly', () => {
        render(<Login onLoginSuccess={() => { }} />);

        expect(screen.getByText(/Intellizence/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/you@company.com/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    });

    it('handles email submission and moves to code step', async () => {
        authAPI.requestCode.mockResolvedValue({ status: 'success' });

        render(<Login onLoginSuccess={() => { }} />);

        const emailInput = screen.getByPlaceholderText(/you@company.com/i);
        const submitButton = screen.getByRole('button', { name: /continue/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        expect(authAPI.requestCode).toHaveBeenCalledWith('test@example.com');

        await waitFor(() => {
            expect(screen.getByPlaceholderText(/enter code/i)).toBeInTheDocument();
        });
    });

    it('displays error message on failed request', async () => {
        authAPI.requestCode.mockRejectedValue({
            response: { data: { message: 'Invalid email' } }
        });

        render(<Login onLoginSuccess={() => { }} />);

        const emailInput = screen.getByPlaceholderText(/you@company.com/i);
        const submitButton = screen.getByRole('button', { name: /continue/i });

        fireEvent.change(emailInput, { target: { value: 'bad@email.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
        });
    });
});
