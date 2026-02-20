import axios from 'axios';

// Import Mock Data for Demo Mode
import { MOCK_SUBSCRIPTIONS, MOCK_NEWS } from './mockData';

const BASE_URL = 'https://connect.intellizence.com/api';
const API_KEY = 'd6b1a63727159274e0d83042713ee999';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  },
});

// Utility to strip HTML tags
const stripHtml = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  let text = doc.body.textContent || "";
  return text.replace(/\s+/g, ' ').trim();
};

/**
 * BRAND MASTER REGISTRY
 * Ensures the small "Logo" (icon) and large "Wordmark" (text logo) are ALWAYS perfectly paired.
 * Sourced from official brand guidelines and high-clarity Wikimedia Commons.
 */
const BRAND_REGISTRY = {
  'microsoft.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png'
  },
  'google.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png'
  },
  'apple.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1024px-Apple_logo_black.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Apple_logo_black.svg/1024px-Apple_logo_black.svg.png'
  },
  'amazon.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/1024px-Amazon_icon.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png'
  },
  'tesla.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1024px-Tesla_Motors.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_wordmark.svg/2560px-Tesla_wordmark.svg.png'
  },
  'netflix.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2015_N_logo.svg/1024px-Netflix_2015_N_logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
  },
  'nvidia.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/1024px-Nvidia_logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png'
  },
  'meta.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1024px-Meta_Platforms_Inc._logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo_Black.png/1200px-Meta-Logo_Black.png'
  },
  'openai.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/2560px-OpenAI_Logo.svg.png'
  },
  'salesforce.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1024px-Salesforce.com_logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png'
  },
  'adobe.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Icon.svg/1024px-Adobe_Corporate_Icon.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Adobe_Corporate_logo.svg/2560px-Adobe_Corporate_logo.svg.png'
  },
  'intel.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Intel_logo_%282020%2C_light_blue%29.svg/1024px-Intel_logo_%282020%2C_light_blue%29.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Intel_logo_%282020%2C_light_blue%29.svg/2560px-Intel_logo_%282020%2C_light_blue%29.svg.png'
  },
  'ibm.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1024px-IBM_logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png'
  },
  'oracle.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/1024px-Oracle_logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/2560px-Oracle_logo.svg.png'
  },
  'paypal.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/1024px-PayPal_logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png'
  },
  'visa.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1024px-Visa_Inc._logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png'
  },
  'mastercard.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1024px-Mastercard-logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1024px-Mastercard-logo.svg.png'
  },
  'spotify.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/2560px-Spotify_logo_with_text.svg.png'
  },
  'linkedin.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/1024px-LinkedIn_logo_initials.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png'
  },
  'github.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1024px-Octicons-mark-github.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png'
  },
  'slack.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1024px-Slack_icon_2019.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2560px-Slack_icon_2019.svg.png'
  },
  'uber.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1024px-Uber_logo_2018.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png'
  },
  'airbnb.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1024px-Airbnb_Logo_B%C3%A9lo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png'
  },
  'shopify.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Shopify_logo.svg/1024px-Shopify_logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png'
  },
  'tiktok.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Tiktok_logo.svg/1024px-Tiktok_logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/2560px-TikTok_logo.svg.png'
  },
  'manutd.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1024px-Manchester_United_FC_crest.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Manchester_United_wordmark.svg/1280px-Manchester_United_wordmark.svg.png'
  },
  'hdfc.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1024px-HDFC_Bank_Logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/2560px-HDFC_Bank_Logo.svg.png'
  },
  'hdfc.bank.in': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1024px-HDFC_Bank_Logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/2560px-HDFC_Bank_Logo.svg.png'
  },
  'federal.bank.in': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Federal_Bank_Logo.svg/1024px-Federal_Bank_Logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Federal_Bank_Logo.svg/1280px-Federal_Bank_Logo.svg.png'
  },
  'wingify.com': {
    logo: 'https://vwo.com/img/vwo-logo.svg',
    wordmark: 'https://vwo.com/img/vwo-logo.svg'
  }
};

/**
 * FALLBACK BRAND POOL
 * If we don't know the company, we pick a "Persona" from this pool.
 * This ensures the Logo and Wordmark are ALWAYS PERSISTENT and sync'd for unknown items.
 */
const FALLBACK_BRANDS = [
  { domain: 'google.com', wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png' },
  { domain: 'apple.com', wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Apple_logo_black.svg/1024px-Apple_logo_black.svg.png' },
  { domain: 'amazon.com', wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png' },
  { domain: 'ibm.com', wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png' },
  { domain: 'salesforce.com', wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png' },
  { domain: 'nvidia.com', wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png' },
  { domain: 'intel.com', wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Intel_logo_%282020%2C_light_blue%29.svg/2560px-Intel_logo_%282020%2C_light_blue%29.svg.png' },
  { domain: 'cloudflare.com', wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Cloudflare_Logo.svg/2560px-Cloudflare_Logo.svg.png' },
  { domain: 'stripe.com', wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png' },
  { domain: 'slack.com', wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1024px-Slack_icon_2019.svg.png' }
];

const augmentNewsItem = (item) => {
  const domain = item.companyDomains?.[0] || 'intellizence.com';

  const cleanSummary = stripHtml(item.desc);
  const shortDescription = cleanSummary.length > 180 ? cleanSummary.substring(0, 177) + "..." : cleanSummary;
  const shortContent = cleanSummary.length > 350 ? cleanSummary.substring(0, 347) + "..." : cleanSummary;

  // Hashing for deterministic fallback selection
  const seed = item.hash || item.id || '';
  const hashVal = Array.from(seed).reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
  }, 0);
  const positiveHash = Math.abs(hashVal);

  // STEP 1: Determine Brand Identity
  let wordmarkUrl = '';
  let officialLogo = '';

  // Check if it's a known company in our registry
  const knownBrand = BRAND_REGISTRY[domain];

  if (knownBrand) {
    // If we KNOW this specific company, use its explicit assets
    wordmarkUrl = knownBrand.wordmark;
    officialLogo = knownBrand.logo;
  } else if (domain && domain !== 'intellizence.com' && !domain.includes('unknown')) {
    // Check if the FALLBACK_BRANDS happens to contain this company
    const fallbackMatch = FALLBACK_BRANDS.find(b => b.domain === domain);
    if (fallbackMatch) {
      wordmarkUrl = fallbackMatch.wordmark;
      officialLogo = `https://unavatar.io/${domain}?fallback=https://logo.clearbit.com/${domain}`;
    } else {
      // Deterministic Persona Fallback
      const fb = FALLBACK_BRANDS[positiveHash % FALLBACK_BRANDS.length];
      wordmarkUrl = fb.wordmark;
      // For a truly consistent "related" look, we must use the logo of the fallback company too
      const fbKnown = BRAND_REGISTRY[fb.domain];
      officialLogo = fbKnown ? fbKnown.logo : `https://unavatar.io/${fb.domain}?fallback=https://logo.clearbit.com/${fb.domain}`;
    }
  } else {
    // Completely unknown - use Fallback Persona
    const fb = FALLBACK_BRANDS[positiveHash % FALLBACK_BRANDS.length];
    wordmarkUrl = fb.wordmark;
    const fbKnown = BRAND_REGISTRY[fb.domain];
    officialLogo = fbKnown ? fbKnown.logo : `https://unavatar.io/${fb.domain}?fallback=https://logo.clearbit.com/${fb.domain}`;
  }

  return {
    ...item,
    id: item.hash || `news-${Math.random().toString(36).substr(2, 9)}`,
    description: shortDescription,
    announcedDate: item.publishDate || new Date().toISOString(),
    triggers: item.triggerCodes || [],
    company: item.companyNames?.[0] || 'Unknown Company',
    companyDomain: domain,
    officialLogo,
    image: wordmarkUrl,
    wordmarkBg: '#ffffff',
    content: shortContent
  };
};

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken');
    if (token && token.startsWith('demo-')) {
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
      sessionStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);

// API Methods
export const authAPI = {
  register: (userData) => {
    const users = JSON.parse(localStorage.getItem('iz_users') || '[]');
    const userExists = users.find(u => u.username === userData.username);
    if (userExists) throw new Error('Username already exists');
    users.push(userData);
    localStorage.setItem('iz_users', JSON.stringify(users));
    return { success: true };
  },

  login: (username, password) => {
    const users = JSON.parse(localStorage.getItem('iz_users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) throw new Error('Username and password is incorrect');
    const token = 'auth-token-' + Date.now();
    sessionStorage.setItem('authToken', token);
    return { token, user: { name: user.username, email: user.email } };
  },

  requestCode: async (email) => {
    try {
      const response = await apiClient.post('/auth/request-code', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  validateCode: async (email, code) => {
    try {
      const response = await apiClient.post('/auth/validate-code', { email, code });
      if (response.data.token) sessionStorage.setItem('authToken', response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  loginAsDemo: () => {
    const demoToken = 'demo-token-' + Date.now();
    sessionStorage.setItem('authToken', demoToken);
    return { token: demoToken, user: { name: 'Demo User' } };
  },

  logout: () => {
    sessionStorage.removeItem('authToken');
  },

  isAuthenticated: () => {
    return !!sessionStorage.getItem('authToken');
  },

  isDemoMode: () => {
    const token = sessionStorage.getItem('authToken');
    return !token || (token.startsWith('demo-') || token.startsWith('auth-token-'));
  }
};

export const subscriptionsAPI = {
  getSubscriptions: async () => {
    if (authAPI.isDemoMode()) {
      return new Promise(resolve => setTimeout(() => resolve(MOCK_SUBSCRIPTIONS), 500));
    }
    try {
      const response = await apiClient.get('/my/subscriptions');
      return response.data;
    } catch (error) {
      console.warn('API Failed, falling back to mock data', error);
      return MOCK_SUBSCRIPTIONS;
    }
  },
};

export const newsAPI = {
  getCompanyNews: async (filters = {}) => {
    try {
      const response = await apiClient.post('/news', filters);
      const rawNews = response.data.news || [];
      const translatedNews = rawNews.map(augmentNewsItem);
      localStorage.setItem('iz_last_sync_count', translatedNews.length);
      localStorage.setItem('iz_last_sync_time', new Date().toISOString());
      return { news: translatedNews };
    } catch (error) {
      console.warn('API Failed, falling back to live-simulated mock data', error);
      const now = Date.now();
      const fallback = MOCK_NEWS.news.map((n, i) => ({
        ...n,
        announcedDate: new Date(now - (i * 3600000 * 4)).toISOString()
      }));
      return { news: fallback };
    }
  },
};

export default apiClient;
