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
  // Remove extra whitespace/newlines often found in raw API HTML
  return text.replace(/\s+/g, ' ').trim();
};

/**
 * Augment real API news with visual elements (Logos & Contextual Images)
 * since the raw API provides data-rich signals without media.
 */
const augmentNewsItem = (item) => {
  const domain = item.companyDomains?.[0] || 'intellizence.com';

  // Clean the description: Remove HTML 'codes' and technical junk
  const cleanSummary = stripHtml(item.desc);

  // Short versions for UI
  const shortDescription = cleanSummary.length > 180 ? cleanSummary.substring(0, 177) + "..." : cleanSummary;
  const shortContent = cleanSummary.length > 350 ? cleanSummary.substring(0, 347) + "..." : cleanSummary;

  // 1. Official Logo Pool (100 Distinct Corporate Identities)
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
    'grammarly.com', 'duolingo.com', 'coursera.org', 'udemy.com', 'masterclass.com', 'khanacademy.org', 'codeacademy.com', 'replit.com',
    'openai.com', 'anthropic.com', 'cohere.ai', 'huggingface.co', 'scale.com', 'dataiku.com', 'palantir.com', 'anduril.com',
    'spacex.com', 'blueorigin.com', 'relativityspace.com', 'planet.com', 'astra.com', 'rocketlabusa.com', 'virgin-orbit.com'
  ];

  // 2. High-Reliability News Cover Pool (100 Persistent IDs)
  const IMAGE_POOL = [
    // Finance / Investment
    'photo-1611974717424-362249df5ee1', 'photo-1590283603385-17ffb3a7f29f', 'photo-1551288049-bebda4e38f71', 'photo-1460925895917-afdab827c52f', 'photo-1554224155-6726b3ff858f',
    'photo-1534951009808-df43444ac2f1', 'photo-1526303328194-7310e23180c7', 'photo-1624555130581-1d9cca783bc0', 'photo-1633156191775-2dcf0b1f7ccb', 'photo-1642543348745-03b1219733d9',
    'photo-1612178537253-bccd437b730e', 'photo-1579532561466-b419d44ab682', 'photo-1518186285589-2f7649de83e0', 'photo-1535320903710-d993d3d77d29', 'photo-1559526324-4b87b5e36e44',
    'photo-1542222024-c39e2281f121', 'photo-1620228885444-8efc27a7c2a1', 'photo-1560472355-536de3962603', 'photo-1450101499163-c8848c66ca85', 'photo-1507679799987-c73779587ccf',
    // Corporate / Growth
    'photo-1563986768609-322da13575f3', 'photo-1520607162513-77705c0f0d4a', 'photo-1486406146926-c627a92ad1ab', 'photo-1449156001141-cd51dfa9f60c', 'photo-1574162071085-38c208154673',
    'photo-1522071823991-b5ae72647aa9', 'photo-1517245318773-2782e5135164', 'photo-1556761175-5973cf0f32e7', 'photo-1577412647305-991150c7d163', 'photo-1521737604893-d14cc237f11d',
    'photo-1504384308090-c894fdcc538d', 'photo-1497215728101-856f4ea42174', 'photo-1542744173-8e7e53415bb0', 'photo-1520333789090-1afc82db536a', 'photo-1552664730-d307ca884978',
    'photo-1431540015161-0bf868a2d407', 'photo-1497366216548-37526070297c', 'photo-1550751827-4bd374c3f58b', 'photo-1504917595217-d4dc5f646741', 'photo-1527689368864-3a821dbccc48',
    'photo-1516321318423-f06f85e504b3', 'photo-1517048676732-d65bc937f952', 'photo-1515378791036-0648a3ef77b2', 'photo-1486406146926-c627a92ad1ab', 'photo-1521791055366-0d553872125f',
    // Technology / Innovation
    'photo-1553877522-43269d4ea984', 'photo-1568605114967-8130f3a36994', 'photo-1677442136019-21780ecad995', 'photo-1518770660439-4636190af475', 'photo-1523961131990-5ea7c61b2107',
    'photo-1485827404703-89b55fcc595e', 'photo-1531297484001-80022131f5a1', 'photo-1550751827-4bd374c3f58b', 'photo-1504639725590-34d0984388bd', 'photo-1519389950473-acc7a96834b1',
    'photo-1558494949-ef010ccdcc91', 'photo-1451187532383-d241f18c214d', 'photo-1620712943543-bcc4638d9f89', 'photo-1535223289827-42f1e9919769', 'photo-1516110833967-0b5716ca1387',
    'photo-1507146426996-ef05306b995a', 'photo-1581091226825-a6a2a5aee158', 'photo-1487017664839-2884088bc859', 'photo-1519389209713-f145576378cd', 'photo-1526374965328-7f61d4dc18c5',
    'photo-1581092160562-40aa08e78837', 'photo-1581092921461-7d1568205558', 'photo-1581090700227-1e3ad2b24e41', 'photo-1498050108023-c5249f4df085', 'photo-1581091226825-a6a2a5aee158',
    // ESG / Environment / Legal
    'photo-1589829545856-d10d557cf95f', 'photo-1505664194779-8beaceb93744', 'photo-1450101499163-c8848c66ca85', 'photo-1521791136364-79c09c00d65b', 'photo-1589578594210-405423855a95',
    'photo-1585829365294-188470e45669', 'photo-1473341304170-971dccb5ac1e', 'photo-1497435334941-8c899ee9e8e2', 'photo-1466611653911-95455ec3072f', 'photo-1508514177221-188b171f2c97',
    'photo-1509391366360-2e95971161ee', 'photo-1532601224476-15c79f2f7a51', 'photo-1463947628408-f8581a2f4acc', 'photo-1454165833221-d7d1769123c1', 'photo-1504868584819-f8e905b6c70a',
    'photo-1491333078588-55b6733c7de6', 'photo-1515378791036-0648a3ef77b2', 'photo-1551434678-e076c223a692', 'photo-1574607383476-f517f220d398', 'photo-1550439062-609e1531270e',
    'photo-1506146632458-3b8b19555dd9', 'photo-1501139083538-0139583c060f', 'photo-1497366754035-f200968a6e72', 'photo-1497366216548-37526070297c', 'photo-1522202176988-66273c2fd55f'
  ];

  // Stable Hash logic: Zero randomness. Tied to the article content.
  // Use item.hash if available (real API), fallback to item.id (mock data)
  const seed = item.hash || item.id || '';
  const hashVal = Array.from(seed).reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
  }, 0);
  const positiveHash = Math.abs(hashVal);

  // Assign deterministic Logo
  const getPersistentLogo = (hv, origDomain) => {
    // If the domain is actually valid and not intellizence, use it.
    if (origDomain && origDomain !== 'intellizence.com' && !origDomain.includes('unknown')) {
      return `https://logo.clearbit.com/${origDomain}`;
    }
    const logoIdx = hv % LOGO_POOL.length;
    return `https://logo.clearbit.com/${LOGO_POOL[logoIdx]}`;
  };

  // Assign deterministic Image
  const getPersistentImage = (hv) => {
    const imgIdx = hv % IMAGE_POOL.length;
    return `https://images.unsplash.com/${IMAGE_POOL[imgIdx]}?auto=format&fit=crop&q=80&w=1600`;
  };

  const officialLogo = getPersistentLogo(positiveHash, domain);
  const contextualImage = getPersistentImage(positiveHash);

  return {
    ...item,
    id: item.hash || `news-${Math.random().toString(36).substr(2, 9)}`,
    description: shortDescription,
    announcedDate: item.publishDate || new Date().toISOString(),
    triggers: item.triggerCodes || [],
    company: item.companyNames?.[0] || 'Unknown Company',
    companyDomain: domain,
    officialLogo,
    image: contextualImage,
    content: shortContent
  };
};


// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken');
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
      sessionStorage.removeItem('authToken');
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
    sessionStorage.setItem('authToken', token);
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
        sessionStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Demo Login (Bypass API)
  loginAsDemo: () => {
    const demoToken = 'demo-token-' + Date.now();
    sessionStorage.setItem('authToken', demoToken);
    return { token: demoToken, user: { name: 'Demo User' } };
  },

  // Logout
  logout: () => {
    sessionStorage.removeItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!sessionStorage.getItem('authToken');
  },

  isDemoMode: () => {
    const token = sessionStorage.getItem('authToken');
    // If it's a real token (not starting with demo- or auth-token-), it's production mode
    return !token || (token.startsWith('demo-') || token.startsWith('auth-token-'));
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
    try {
      // The API is POST-based for news retrieval as verified by our diagnostics
      const response = await apiClient.post('/news', filters);

      const rawNews = response.data.news || [];
      const translatedNews = rawNews.map(augmentNewsItem);

      localStorage.setItem('iz_last_sync_count', translatedNews.length);
      localStorage.setItem('iz_last_sync_time', new Date().toISOString());

      return { news: translatedNews };
    } catch (error) {
      console.warn('API Failed, falling back to live-simulated mock data', error);

      // Safety fallback during development/outages
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
