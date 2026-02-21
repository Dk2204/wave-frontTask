import axios from 'axios';
import { MOCK_SUBSCRIPTIONS, MOCK_NEWS } from './mockData';
import { TRIGGER_CATEGORY_MAPPING } from './triggerMapping';

const BASE_URL = 'https://account-api.intellizence.com/api';
const LIVE_NEWS_URL = 'https://connect.intellizence.com/api/news';
const API_KEY = 'd6b1a63727159274e0d83042713ee999';

// ─── 🏢 OFFICIAL SUBSCRIPTION PORTFOLIO ──────────────────────────────
const TRIAL_COMPANIES = [
  "microsoft.com", "wingify.com", "openai.com", "tesla.com", "x.ai",
  "salesforce.com", "anaplan.com", "clay.com", "apollo.io", "hdfc.com",
  "hdfc.bank.in", "federal.bank.in", "meta.com", "manutd.com", "netflix.com",
  "nvidia.com", "apple.com", "amazon.com", "google.com", "zara.com", "nike.com"
];

const liveNewsClient = axios.create({
  baseURL: LIVE_NEWS_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
    'Accept': 'application/json'
  }
});

const stripHtml = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  let text = doc.body.textContent || "";
  return text.replace(/\s+/g, ' ').trim();
};

const BRAND_REGISTRY = {
  'microsoft.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png',
  },
  'wingify.com': {
    logo: 'https://unavatar.io/wingify.com',
  },
  'openai.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
  },
  'tesla.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg',
  },
  'meta.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
  },
  'nvidia.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg',
  },
  'apple.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  },
  'google.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  }
};

/**
 * Augments news items with official branding and contextual background imagery.
 */
const augmentNewsItem = (item) => {
  const domain = item.companyDomain || item.companyDomains?.[0] || 'intellizence.com';
  const company = item.company || item.companyNames?.[0] || 'Global Enterprise';
  const rawTitle = item.title || item.newsHeading || 'Intelligence Alert';
  const rawDesc = item.description || item.desc || item.summary || '';

  const cleanSummary = stripHtml(rawDesc);
  const shortDescription = cleanSummary.length > 200 ? cleanSummary.substring(0, 197) + "..." : cleanSummary;
  const shortContent = cleanSummary.length > 800 ? cleanSummary.substring(0, 797) + "..." : cleanSummary;

  const announcedDate = item.announcedDate || item.publishDate || item.date || new Date().toISOString();
  const triggers = item.triggers || item.triggerCodes || [];

  const seed = item.id || item.hash || rawTitle || Math.random().toString();
  const hashVal = Array.from(seed).reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0) | 0, 0);
  const positiveHash = Math.abs(hashVal);

  // ─── 🏢 OFFICIAL LOGO ENGINE ──────────────────────────────────
  let officialLogo = BRAND_REGISTRY[domain]?.logo;
  if (!officialLogo) {
    officialLogo = `https://logo.clearbit.com/${domain}?size=128`;
  }

  // ─── 🖼️ CONTEXTUAL BACKGROUND ENGINE ───────────────────────────
  // We construct a semantic search query for the most relevant imagery
  const searchTerms = [
    company.split(' ')[0],
    triggers[0] ? TRIGGER_CATEGORY_MAPPING[triggers[0]]?.name : 'business',
    'building',
    'modern'
  ].filter(Boolean).join(',');

  const backgroundImageUrl = item.image || item.imageUrl ||
    `https://images.unsplash.com/featured/1200x800?${searchTerms}&sig=${positiveHash}`;

  return {
    ...item,
    id: item.id || item.hash || `sig-${positiveHash}`,
    title: rawTitle,
    description: shortDescription,
    announcedDate,
    triggers,
    company,
    companyDomain: domain,
    officialLogo,
    image: backgroundImageUrl,
    content: shortContent
  };
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to inject bearer token for Account API requests
apiClient.interceptors.request.use(config => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (username, password) => {
    const users = JSON.parse(localStorage.getItem('intellizence_users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      sessionStorage.setItem('authToken', 'auth-token-' + Date.now());
      sessionStorage.setItem('authUser', JSON.stringify({ name: user.username, email: user.email }));
      return { user: { name: user.username, email: user.email } };
    } else {
      throw new Error('Username and Password is Incorrect');
    }
  },
  register: (userData) => {
    const users = JSON.parse(localStorage.getItem('intellizence_users') || '[]');
    if (users.find(u => u.username === userData.username)) {
      throw new Error('Username already exists');
    }
    users.push(userData);
    localStorage.setItem('intellizence_users', JSON.stringify(users));
    return { success: true };
  },
  logout: () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('authUser');
  },
  isAuthenticated: () => !!sessionStorage.getItem('authToken'),
};

export const newsAPI = {
  getCompanyNews: async (filters = {}) => {
    console.log('[INTELLIZENCE] Initiating Live Signal Acquisition...', filters);

    // Centralized Fallback Logic to ensure consistency
    const applyFallbackFilters = (rawBuffer) => {
      let data = [...rawBuffer];
      if (filters.companyDomain) {
        data = data.filter(item => item.companyDomain === filters.companyDomain);
      }
      if (filters.triggers && filters.triggers.length > 0) {
        const translatedCodes = [];
        filters.triggers.forEach(categoryName => {
          Object.entries(TRIGGER_CATEGORY_MAPPING).forEach(([code, mapping]) => {
            if (mapping.category?.includes(categoryName) || mapping.name === categoryName) {
              translatedCodes.push(code);
            }
          });
        });
        const targetCodes = translatedCodes.length > 0 ? [...new Set(translatedCodes)] : filters.triggers;
        data = data.filter(item =>
          item.triggers && item.triggers.some(t => targetCodes.includes(t))
        );
      }
      return data.map(augmentNewsItem);
    };

    try {
      const payload = {
        pageSize: filters.limit || 100,
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
      };

      if (filters.companyDomain) {
        payload.companyDomains = [filters.companyDomain];
      } else {
        payload.companyDomains = TRIAL_COMPANIES;
      }

      if (filters.triggers && filters.triggers.length > 0) {
        const translatedCodes = [];
        filters.triggers.forEach(categoryName => {
          Object.entries(TRIGGER_CATEGORY_MAPPING).forEach(([code, mapping]) => {
            if (mapping.category?.includes(categoryName) || mapping.name === categoryName) {
              translatedCodes.push(code);
            }
          });
        });
        payload.triggerCodes = translatedCodes.length > 0 ? [...new Set(translatedCodes)] : filters.triggers;
      }

      const response = await liveNewsClient.post('', payload);
      const responseData = response.data;

      // Filtered fallback for API errors disguised as 200s
      if (responseData?.code && responseData.code !== 200) {
        console.warn(`[INTELLIZENCE] API Report: ${responseData.code} - ${responseData.message}`);
        if (!responseData.news || responseData.news.length === 0) {
          return { news: applyFallbackFilters(MOCK_NEWS.news), source: 'fallback' };
        }
      }

      let rawNews = responseData?.news || (Array.isArray(responseData) ? responseData : []);

      if (rawNews.length === 0) {
        console.warn('[INTELLIZENCE] Zero articles returned from Live Hub. Loading emergency buffer.');
        return { news: applyFallbackFilters(MOCK_NEWS.news), source: 'fallback' };
      }

      console.log(`[INTELLIZENCE] Successfully synchronized ${rawNews.length} live signals.`);
      return {
        news: rawNews.slice(0, 100).map(augmentNewsItem),
        source: 'live'
      };
    } catch (error) {
      console.error('[INTELLIZENCE] Live Connection failed. Loading secure buffer.', error);
      return { news: applyFallbackFilters(MOCK_NEWS.news), source: 'fallback' };
    }
  },
};

export const subscriptionsAPI = {
  getSubscriptions: async () => {
    try {
      const response = await apiClient.get('/my/subscriptions');
      return response.data;
    } catch (error) {
      console.warn('[SUBS] Live Subscriptions unreachable. Using local profile.');
      return MOCK_SUBSCRIPTIONS;
    }
  }
};

export default apiClient;
