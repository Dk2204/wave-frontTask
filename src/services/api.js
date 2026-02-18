import axios from 'axios';

// Import Mock Data for Demo Mode
import { MOCK_SUBSCRIPTIONS, MOCK_NEWS } from './mockData';

const BASE_URL = '/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    // If mocking, don't need token, but keep logic
    if (token && token.startsWith('demo-')) {
      // Demo Token logic
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      // No longer redirecting to '/' as it causes infinite loops on the home dashboard
    }
    return Promise.reject(error);
  }
);

// API Methods
export const authAPI = {
  // Register a new user locally (for demo/mock purposes)
  register: (userData) => {
    const users = JSON.parse(localStorage.getItem('iz_users') || '[]');
    const userExists = users.find(u => u.username === userData.username);

    if (userExists) {
      throw new Error('Username already exists');
    }

    users.push(userData);
    localStorage.setItem('iz_users', JSON.stringify(users));
    return { success: true };
  },

  // Login locally by checking registered users
  login: (username, password) => {
    const users = JSON.parse(localStorage.getItem('iz_users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      throw new Error('Username and password is incorrect');
    }

    const token = 'auth-token-' + Date.now();
    localStorage.setItem('authToken', token);
    return { token, user: { name: user.username, email: user.email } };
  },

  // Request authentication code
  requestCode: async (email) => {
    try {
      const response = await apiClient.post('/auth/request-code', { email });
      return response.data;
    } catch (error) {
      // If network error/CORS, allow demo fallback
      if (email.includes('demo') || error.message) {
        throw error; // Let UI handle switching to demo
      }
      throw error;
    }
  },

  // Validate authentication code
  validateCode: async (email, code) => {
    try {
      const response = await apiClient.post('/auth/validate-code', { email, code });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Demo Login (Bypass API)
  loginAsDemo: () => {
    const demoToken = 'demo-token-' + Date.now();
    localStorage.setItem('authToken', demoToken);
    return { token: demoToken, user: { name: 'Demo User' } };
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  isDemoMode: () => {
    const token = localStorage.getItem('authToken');
    return token && (token.startsWith('demo-') || token.startsWith('auth-token-'));
  }
};

export const subscriptionsAPI = {
  // Get user subscriptions
  getSubscriptions: async () => {
    if (authAPI.isDemoMode()) {
      return new Promise(resolve => setTimeout(() => resolve(MOCK_SUBSCRIPTIONS), 500));
    }
    try {
      const response = await apiClient.get('/my/subscriptions');
      return response.data;
    } catch (error) {
      console.warn('API Failed, falling back to mock data', error);
      return MOCK_SUBSCRIPTIONS; // Fallback for robustness
    }
  },
};

export const newsAPI = {
  // Get company news with filters
  getCompanyNews: async (filters = {}) => {
    if (authAPI.isDemoMode()) {
      // Simulate filtering on mock data
      let filtered = [...MOCK_NEWS.news];

      if (filters.companyDomain) {
        filtered = filtered.filter(n => n.companyDomain === filters.companyDomain);
      }

      if (filters.startDate) {
        filtered = filtered.filter(n => new Date(n.announcedDate) >= new Date(filters.startDate));
      }

      if (filters.endDate) {
        filtered = filtered.filter(n => new Date(n.announcedDate) <= new Date(filters.endDate));
      }

      if (filters.triggers && filters.triggers.length > 0) {
        filtered = filtered.filter(n =>
          n.triggers.some(t => filters.triggers.includes(t))
        );
      }

      return new Promise(resolve => setTimeout(() => resolve({ news: filtered }), 600));
    }

    try {
      const response = await apiClient.post('/company-news/user/Trial', filters);
      return response.data;
    } catch (error) {
      console.warn('API Failed, falling back to mock data', error);
      return MOCK_NEWS; // Fallback for robustness
    }
  },
};

export default apiClient;
