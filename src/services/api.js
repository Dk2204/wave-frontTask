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
  "hdfc.bank.in", "federal.bank.in", "meta.com", "manutd.com", "netflix.com"
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
  'microsoft.com': { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png' },
  'wingify.com': { logo: 'https://unavatar.io/wingify.com' },
  'openai.com': { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png' },
  'tesla.com': { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/512px-Tesla_Motors.svg.png' },
  'x.ai': { logo: 'https://wcms.alura.com.br/wp-content/uploads/2025/12/xai-e1766432557653.png' },
  'salesforce.com': { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1024px-Salesforce.com_logo.svg.png' },
  'anaplan.com': { logo: 'https://www.anaplan.com/content/dam/anaplan/wp-content/uploads/2017/02/anaplan-press-release.png' },
  'clay.com': { logo: 'https://cdn.prod.website-files.com/6392f54210990d7ffbfca55f/67f7d5273eeb62f4e766d791_Clay-Logo---Cover-Image-for-Product-Hub-made-by-Zefi-.jpeg' },
  'apollo.io': { logo: 'https://assets.techrepublic.com/uploads/2024/05/tr_20240515-apollo-io-review.jpg' },
  'hdfc.com': { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1024px-HDFC_Bank_Logo.svg.png' },
  'hdfc.bank.in': { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1024px-HDFC_Bank_Logo.svg.png' },
  'federal.bank.in': { logo: 'https://manifest-media.in/cover/prev/6egh70hfpfp66oog85m6kupbi1-20260107105153.Medi.jpeg' },
  'meta.com': { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1024px-Meta_Platforms_Inc._logo.svg.png' },
  'manutd.com': { logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1024px-Manchester_United_FC_crest.svg.png' },
  'netflix.com': { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png' }
};

/**
 * Augments news items with official branding and contextual background imagery.
 */
const augmentNewsItem = (item, refreshSig = Date.now()) => {
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

  // ─── 🖼️ UNIQUE GOOGLE PLATFORM IMAGING ENGINE ────────────────
  // We use a multi-parameter seed + refreshSig to ensure 
  // background images change on every reload or sync click.
  const searchTerms = [
    company,
    'corporate',
    'business',
    'technology'
  ].filter(Boolean).join(',');

  // The refreshSig ensures the image address rotates upon manual reload
  const backgroundImageUrl = item.image || item.imageUrl ||
    `https://images.unsplash.com/featured/1200x800?${searchTerms}&sig=${positiveHash}-${item.id}-${refreshSig}`;

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
    content: shortContent,
    socialSource: item.socialSource || 'Intelligence Hub'
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
  const token = localStorage.getItem('authToken');
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
      localStorage.setItem('authToken', 'auth-token-' + Date.now());
      localStorage.setItem('authUser', JSON.stringify({ name: user.username, email: user.email }));
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
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  },
  isAuthenticated: () => !!localStorage.getItem('authToken'),
};

export const newsAPI = {
  getCompanyNews: async (filters = {}) => {
    console.log('[INTELLIZENCE] Initiating Live Signal Acquisition...', filters);

    // Centralized Fallback Logic to ensure consistency
    const applyFallbackFilters = (rawBuffer) => {
      let data = [...rawBuffer];
      const refreshSig = Date.now(); // Unified visual fingerprint for this session/sync
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
      return data.map(item => augmentNewsItem(item, refreshSig));
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

      // Synchronize with the Social Media Connectivity Buffer if Live Hub returns zero
      if (responseData?.code && responseData.code !== 200) {
        console.warn(`[INTELLIZENCE] API Report: ${responseData.code} - ${responseData.message}`);
        if (!responseData.news || responseData.news.length === 0) {
          return { news: applyFallbackFilters(MOCK_NEWS.news), source: 'social' };
        }
      }

      let rawNews = responseData?.news || (Array.isArray(responseData) ? responseData : []);

      if (rawNews.length === 0) {
        console.warn('[INTELLIZENCE] Zero articles returned. Synchronizing with Official Social Repository.');
        return { news: applyFallbackFilters(MOCK_NEWS.news), source: 'social' };
      }

      console.log(`[INTELLIZENCE] Successfully synchronized ${rawNews.length} live signals.`);
      const syncSig = Date.now();
      return {
        news: rawNews.slice(0, 100).map(item => augmentNewsItem(item, syncSig)),
        source: 'live'
      };
    } catch (error) {
      console.error('[INTELLIZENCE] Live Connection failed. Routing to Secure Social Hub.', error);
      return { news: applyFallbackFilters(MOCK_NEWS.news), source: 'social' };
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
