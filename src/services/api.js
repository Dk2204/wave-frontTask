import axios from 'axios';
import { MOCK_SUBSCRIPTIONS, MOCK_NEWS } from './mockData';

const BASE_URL = 'https://account-api.intellizence.com/api';
const LIVE_NEWS_URL = 'https://connect.intellizence.com/api/news';
const API_KEY = 'd6b1a63727159274e0d83042713ee999';

// ─── 🏢 OFFICIAL SUBSCRIPTION PORTFOLIO ──────────────────────────────
const TRIAL_COMPANIES = [
  "microsoft.com", "wingify.com", "openai.com", "tesla.com", "x.ai",
  "salesforce.com", "anaplan.com", "clay.com", "apollo.io", "hdfc.com",
  "hdfc.bank.in", "federal.bank.in", "meta.com", "manutd.com", "netflix.com"
];

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

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
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1024px-Microsoft_logo_%282012%29.svg.png'
  },
  'wingify.com': {
    logo: 'https://unavatar.io/wingify.com',
    wordmark: 'https://wingify.com/wp-content/themes/wingify/images/wingify-logo.svg'
  },
  'openai.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/512px-OpenAI_Logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png'
  },
  'tesla.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/512px-Tesla_Motors.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/800px-Tesla_T_symbol.svg.png'
  },
  'x.ai': {
    logo: 'https://unavatar.io/x.ai',
    wordmark: 'https://x.ai/static/logo-white.svg'
  },
  'salesforce.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/512px-Salesforce.com_logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1024px-Salesforce.com_logo.svg.png'
  },
  'meta.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.svg/1024px-Meta-Logo.svg.png'
  },
  'netflix.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/512px-Netflix_2015_logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png'
  },
  'manutd.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/512px-Manchester_United_FC_crest.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/800px-Manchester_United_FC_crest.svg.png'
  },
  'nvidia.com': {
    logo: 'https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/1024px-Nvidia_logo.svg.png',
    wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/1024px-Nvidia_logo.svg.png'
  }
};

const FALLBACK_BRANDS = [
  { domain: 'google.com', wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png' },
  { domain: 'apple.com', wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Apple_logo_black.svg/1024px-Apple_logo_black.svg.png' },
  { domain: 'amazon.com', wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png' },
  { domain: 'ibm.com', wordmark: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png' }
];

const augmentNewsItem = (item) => {
  const domain = item.companyDomain || item.companyDomains?.[0] || 'intellizence.com';
  const rawTitle = item.title || item.newsHeading || 'Breaking Intelligence Update';
  const rawDesc = item.description || item.desc || item.summary || '';
  const cleanSummary = stripHtml(rawDesc);
  const shortDescription = cleanSummary.length > 250 ? cleanSummary.substring(0, 247) + "..." : cleanSummary;
  const shortContent = cleanSummary.length > 800 ? cleanSummary.substring(0, 797) + "..." : cleanSummary;
  const announcedDate = item.announcedDate || item.publishDate || item.date || new Date().toISOString();
  const triggers = item.triggers || item.triggerCodes || [];
  const company = item.company || item.companyNames?.[0] || 'Global Enterprise';
  const seed = item.id || item.hash || rawTitle || Math.random().toString();
  const hashVal = Array.from(seed).reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0) | 0, 0);
  const positiveHash = Math.abs(hashVal);

  let wordmarkUrl = '';
  let officialLogo = '';
  const knownBrand = BRAND_REGISTRY[domain];
  if (knownBrand) {
    wordmarkUrl = knownBrand.wordmark;
    officialLogo = knownBrand.logo;
  } else {
    const fb = FALLBACK_BRANDS[positiveHash % FALLBACK_BRANDS.length];
    wordmarkUrl = fb.wordmark;
    officialLogo = `https://unavatar.io/${domain}?fallback=https://logo.clearbit.com/${domain}`;
  }
  const imageUrl = item.image || item.imageUrl || `https://images.unsplash.com/photo-${1550000000000 + (positiveHash % 500000)}?q=80&w=1200&auto=format&fit=crop`;

  return {
    ...item,
    id: item.id || item.hash || `news-${positiveHash}`,
    title: rawTitle,
    description: shortDescription,
    announcedDate,
    triggers,
    company,
    companyDomain: domain,
    officialLogo,
    image: imageUrl,
    wordmarkUrl: wordmarkUrl,
    content: shortContent
  };
};

export const authAPI = {
  login: async (credentials) => {
    sessionStorage.setItem('authToken', 'demo-token');
    return { user: { name: 'Demo User', email: credentials.email } };
  },
  logout: () => {
    sessionStorage.removeItem('authToken');
  },
  isAuthenticated: () => {
    return !!sessionStorage.getItem('authToken');
  }
};

export const newsAPI = {
  getCompanyNews: async (filters = {}) => {
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
        payload.triggerCodes = filters.triggers;
      }
      const response = await liveNewsClient.post('', payload);
      const responseData = response.data;
      if (responseData?.code && responseData.code !== 200) {
        return { news: MOCK_NEWS.news.map(augmentNewsItem), source: 'fallback' };
      }
      let rawNews = responseData?.news || (Array.isArray(responseData) ? responseData : []);
      if (rawNews.length === 0) {
        return { news: MOCK_NEWS.news.map(augmentNewsItem), source: 'fallback' };
      }
      return { news: rawNews.slice(0, 100).map(augmentNewsItem), source: 'live' };
    } catch (error) {
      return { news: MOCK_NEWS.news.map(augmentNewsItem), source: 'fallback' };
    }
  },
};

export const subscriptionsAPI = {
  getSubscriptions: async () => MOCK_SUBSCRIPTIONS
};

export default apiClient;
