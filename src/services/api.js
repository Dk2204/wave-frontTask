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

// Utility to strip HTML tags and decode basic entities for a clean, code-free experience
const stripHtml = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  let text = doc.body.textContent || "";
  return text.replace(/\s+/g, ' ').trim();
};

/**
 * Augment real API news with visual elements (Logos & Company Wordmarks)
 */
const augmentNewsItem = (item) => {
  const domain = item.companyDomains?.[0] || 'intellizence.com';

  const cleanSummary = stripHtml(item.desc);
  const shortDescription = cleanSummary.length > 180 ? cleanSummary.substring(0, 177) + "..." : cleanSummary;
  const shortContent = cleanSummary.length > 350 ? cleanSummary.substring(0, 347) + "..." : cleanSummary;

  // 1. Official Logo Pool (for sidebar/logo overlay)
  const LOGO_POOL = [
    'microsoft.com', 'google.com', 'apple.com', 'amazon.com', 'tesla.com', 'netflix.com', 'nvidia.com', 'meta.com',
    'salesforce.com', 'adobe.com', 'intel.com', 'cisco.com', 'oracle.com', 'ibm.com', 'paypal.com', 'visa.com',
    'mastercard.com', 'shopify.com', 'spotify.com', 'twitter.com', 'zoom.us', 'slack.com', 'stripe.com', 'uber.com',
    'airbnb.com', 'dropbox.com', 'github.com', 'linkedin.com', 'reddit.com', 'discord.com', 'snapchat.com', 'tiktok.com',
    'pinterest.com', 'quora.com', 'medium.com', 'substack.com', 'notion.so', 'figma.com', 'canva.com', 'loom.com',
    'atlassian.com', 'mongodb.com', 'datadoghq.com', 'snowflake.com', 'cloudflare.com', 'okta.com', 'twilio.com', 'square.com',
    'coinbase.com', 'robinhood.com', 'revolut.com', 'klarna.com', 'chime.com', 'plaid.com', 'affirm.com', 'brex.com',
    'gusto.com', 'ramp.com', 'deel.com', 'remote.com', 'lattice.com', 'gong.io', 'fivetran.com', 'segment.com',
    'amplitude.com', 'mixpanel.com', 'intercom.com', 'zendesk.com', 'freshworks.com', 'hubspot.com', 'mailchimp.com',
    'grammarly.com', 'duolingo.com', 'coursera.org', 'udemy.com', 'masterclass.com', 'khanacademy.org', 'replit.com',
    'openai.com', 'anthropic.com', 'cohere.ai', 'huggingface.co', 'scale.com', 'palantir.com', 'anduril.com',
    'spacex.com', 'blueorigin.com', 'planet.com', 'rocketlabusa.com'
  ];

  // 2. Company Brand Wordmark Map
  // Each domain maps to the company's official WORDMARK (text-based brand name logo)
  // sourced from Wikipedia Wikimedia Commons & official brand press kits.
  // brandBg = the correct background color the wordmark is designed to appear on.
  const COMPANY_WORDMARK_MAP = {
    'microsoft.com': {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png',
      brandBg: '#ffffff'
    },
    'tesla.com': {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/2560px-Tesla_Motors.svg.png',
      brandBg: '#cc0000'
    },
    'openai.com': {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/2560px-OpenAI_Logo.svg.png',
      brandBg: '#000000'
    },
    'meta.com': {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png',
      brandBg: '#0082fb'
    },
    'salesforce.com': {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png',
      brandBg: '#00a1e0'
    },
    'netflix.com': {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
      brandBg: '#141414'
    },
    'hdfc.com': {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/2560px-HDFC_Bank_Logo.svg.png',
      brandBg: '#004c8f'
    },
    'hdfc.bank.in': {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/2560px-HDFC_Bank_Logo.svg.png',
      brandBg: '#004c8f'
    },
    'federal.bank.in': {
      url: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/48/The_Federal_Bank_Limited_logo.svg/1280px-The_Federal_Bank_Limited_logo.svg.png',
      brandBg: '#002f6c'
    },
    'x.ai': {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/XAI_brand_logo.svg/1280px-XAI_brand_logo.svg.png',
      brandBg: '#000000'
    },
    'wingify.com': {
      url: 'https://vwo.com/img/vwo-logo.svg',
      brandBg: '#f5a623'
    },
    'anaplan.com': {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Anaplan_logo.svg/1280px-Anaplan_logo.svg.png',
      brandBg: '#0a2240'
    },
    'clay.com': {
      url: 'https://clay.com/clay-logo.svg',
      brandBg: '#1a1a2e'
    },
    'apollo.io': {
      url: 'https://apollo.io/images/apollo-logo.svg',
      brandBg: '#1c1e35'
    },
    'manutd.com': {
      url: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1024px-Manchester_United_FC_crest.svg.png',
      brandBg: '#da020e'
    }
  };

  // Fallback wordmarks for companies not yet in the specific map
  const FALLBACK_WORDMARKS = [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png', brandBg: '#ffffff' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png', brandBg: '#131921' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1024px-Apple_logo_black.svg.png', brandBg: '#000000' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png', brandBg: '#1f70c1' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png', brandBg: '#1a1f71' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png', brandBg: '#f79e1b' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Slack_new_logo_and_icon.svg/2560px-Slack_new_logo_and_icon.svg.png', brandBg: '#4a154b' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2560px-Spotify_logo_without_text.svg.png', brandBg: '#1db954' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png', brandBg: '#0077b5' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png', brandBg: '#24292e' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/HubSpot_Logo.svg/2560px-HubSpot_Logo.svg.png', brandBg: '#ff7a59' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png', brandBg: '#96bf48' }
  ];

  // Stable Hash logic — tied to article content, zero randomness
  const seed = item.hash || item.id || '';
  const hashVal = Array.from(seed).reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
  }, 0);
  const positiveHash = Math.abs(hashVal);

  // Assign deterministic Logo (for overlay icon)
  const getPersistentLogo = (hv, origDomain) => {
    if (origDomain && origDomain !== 'intellizence.com' && !origDomain.includes('unknown')) {
      return `https://unavatar.io/${origDomain}?fallback=https://logo.clearbit.com/${origDomain}`;
    }
    const logoIdx = hv % LOGO_POOL.length;
    return `https://unavatar.io/${LOGO_POOL[logoIdx]}?fallback=https://logo.clearbit.com/${LOGO_POOL[logoIdx]}`;
  };

  // Company Wordmark Selector
  const getCompanyWordmark = (companyDomain, hv) => {
    const entry = COMPANY_WORDMARK_MAP[companyDomain];
    if (entry) return entry;
    const idx = (hv + FALLBACK_WORDMARKS.length) % FALLBACK_WORDMARKS.length;
    return FALLBACK_WORDMARKS[idx];
  };

  const officialLogo = getPersistentLogo(positiveHash, domain);
  const wordmarkEntry = getCompanyWordmark(domain, positiveHash);

  return {
    ...item,
    id: item.hash || `news-${Math.random().toString(36).substr(2, 9)}`,
    description: shortDescription,
    announcedDate: item.publishDate || new Date().toISOString(),
    triggers: item.triggerCodes || [],
    company: item.companyNames?.[0] || 'Unknown Company',
    companyDomain: domain,
    officialLogo,
    image: wordmarkEntry.url,
    wordmarkBg: wordmarkEntry.brandBg,
    content: shortContent
  };
};


// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken');
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
