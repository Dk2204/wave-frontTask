import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authAPI, subscriptionsAPI, newsAPI } from './api';
import axios from 'axios';

// Mock axios
vi.mock('axios', () => {
    return {
        default: {
            create: vi.fn(() => ({
                interceptors: {
                    request: { use: vi.fn() },
                    response: { use: vi.fn() },
                },
                post: vi.fn(),
                get: vi.fn(),
            })),
        },
    };
});

describe('API Service', () => {
    let mockApiClient;

    beforeEach(() => {
        vi.clearAllMocks();
        mockApiClient = axios.create();
    });

    describe('authAPI', () => {
        it('requestCode calls the correct endpoint', async () => {
            const email = 'test@example.com';
            mockApiClient.post.mockResolvedValue({ data: { status: 'success' } });

            const response = await authAPI.requestCode(email);

            expect(mockApiClient.post).toHaveBeenCalledWith('/auth/request-code', { email });
            expect(response).toEqual({ status: 'success' });
        });

        it('validateCode calls the correct endpoint and stores token', async () => {
            const email = 'test@example.com';
            const code = '123456';
            const token = 'fake-jwt-token';

            mockApiClient.post.mockResolvedValue({ data: { token } });

            const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

            const response = await authAPI.validateCode(email, code);

            expect(mockApiClient.post).toHaveBeenCalledWith('/auth/validate-code', { email, code });
            expect(setItemSpy).toHaveBeenCalledWith('authToken', token);
            expect(response).toEqual({ token });
        });

        it('logout removes token from localStorage', () => {
            const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');
            authAPI.logout();
            expect(removeItemSpy).toHaveBeenCalledWith('authToken');
        });
    });

    describe('subscriptionsAPI', () => {
        it('getSubscriptions fetches data correctly', async () => {
            const mockData = { subscriptions: [] };
            mockApiClient.get.mockResolvedValue({ data: mockData });

            const response = await subscriptionsAPI.getSubscriptions();

            expect(mockApiClient.get).toHaveBeenCalledWith('/my/subscriptions');
            expect(response).toEqual(mockData);
        });
    });

    describe('newsAPI', () => {
        it('getCompanyNews sends filters correctly', async () => {
            const filters = {
                startDate: '2024-01-01',
                companyDomain: 'test.com'
            };
            const mockData = { news: [] };
            mockApiClient.post.mockResolvedValue({ data: mockData });

            const response = await newsAPI.getCompanyNews(filters);

            expect(mockApiClient.post).toHaveBeenCalledWith('/company-news/user/Trial', filters);
            expect(response).toEqual(mockData);
        });
    });
});
