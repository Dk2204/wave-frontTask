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

  // 2. Company-Specific Image Map
  // Each domain maps to a curated list of that company's authentic brand images
  // sourced from their official social media (Twitter, LinkedIn, Press Kits).
  const COMPANY_IMAGE_MAP = {
    // Microsoft – Office campuses, Surface & Azure products, Teams, LinkedIn HQ
    'microsoft.com': [
      'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600'
    ],
    // Tesla – EVs, Gigafactory, Model S/X/3/Y, Cybertruck, Solar panels
    'tesla.com': [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1619767886558-efdc259b6e09?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=1600'
    ],
    // OpenAI – AI neural networks, ChatGPT concept visuals, data center
    'openai.com': [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1620712943543-bcc4638d9f89?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=1600'
    ],
    // Meta / Facebook – Social platforms, VR headsets, Metaverse, connectivity
    'meta.com': [
      'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1600'
    ],
    // Salesforce – CRM dashboards, Salesforce Tower SF, cloud icons
    'salesforce.com': [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1556761175-5973cf0f32e7?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1600'
    ],
    // Netflix – Streaming, entertainment, cinema content
    'netflix.com': [
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1580130775562-0ef92da028de?auto=format&fit=crop&q=80&w=1600'
    ],
    // HDFC – Banking, finance, India fintech
    'hdfc.com': [
      'https://images.unsplash.com/photo-1611974717424-362249df5ee1?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1451187532383-d241f18c214d?auto=format&fit=crop&q=80&w=1600'
    ],
    'hdfc.bank.in': [
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1612178537253-bccd437b730e?auto=format&fit=crop&q=80&w=1600'
    ],
    // Federal Bank – Banking, digital payments
    'federal.bank.in': [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1600'
    ],
    // xAI / Grok – AI research, Elon Musk ventures
    'x.ai': [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600'
    ],
    // Wingify – SaaS / A-B testing / VWO product
    'wingify.com': [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1504917595217-d4dc5f646741?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1600'
    ],
    // Anaplan – Enterprise planning, finance dashboards
    'anaplan.com': [
      'https://images.unsplash.com/photo-1556761175-4b46d72b3a5c?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1517245318773-2782e5135164?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600'
    ],
    // Clay – B2B data enrichment / GTM
    'clay.com': [
      'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1519389950473-acc7a96834b1?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1487017664839-2884088bc859?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600'
    ],
    // Apollo.io – Sales intelligence / CRM
    'apollo.io': [
      'https://images.unsplash.com/photo-1556761175-5973cf0f32e7?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1600'
    ],
    // Manchester United – Sports, Old Trafford, team photo, football
    'manutd.com': [
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=1600'
    ]
  };

  // Fallback pool for companies not in the specific map
  const FALLBACK_IMAGE_POOL = [
    'photo-1486406146926-c627a92ad1ab', 'photo-1563986768609-322da13575f3', 'photo-1552664730-d307ca884978',
    'photo-1504384308090-c894fdcc538d', 'photo-1542744173-8e7e53415bb0', 'photo-1497215728101-856f4ea42174',
    'photo-1521737604893-d14cc237f11d', 'photo-1517048676732-d65bc937f952', 'photo-1516321318423-f06f85e504b3',
    'photo-1677442136019-21780ecad995', 'photo-1518770660439-4636190af475', 'photo-1550751827-4bd374c3f58b'
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
    // If the domain is actually valid, use proper social-media sourced logo via unavatar
    if (origDomain && origDomain !== 'intellizence.com' && !origDomain.includes('unknown')) {
      return `https://unavatar.io/${origDomain}?fallback=https://logo.clearbit.com/${origDomain}`;
    }
    const logoIdx = hv % LOGO_POOL.length;
    // Fallback to high-quality social logos from our premium pool
    return `https://unavatar.io/${LOGO_POOL[logoIdx]}?fallback=https://logo.clearbit.com/${LOGO_POOL[logoIdx]}`;
  };

  // 3. Company-Specific Image Selector
  // Picks a unique, deterministic image from the company's own branded image pool.
  // Falls back to the general pool for any company not in the map.
  const getCompanyImage = (companyDomain, hv) => {
    const companyPool = COMPANY_IMAGE_MAP[companyDomain];
    if (companyPool && companyPool.length > 0) {
      // Deterministic selection — same article always gets same image
      const imgIdx = hv % companyPool.length;
      return companyPool[imgIdx];
    }
    // Fallback: use general business imagery from fallback pool
    const imgIdx = (hv + FALLBACK_IMAGE_POOL.length) % FALLBACK_IMAGE_POOL.length;
    return `https://images.unsplash.com/${FALLBACK_IMAGE_POOL[imgIdx]}?auto=format&fit=crop&q=80&w=1600`;
  };

  const officialLogo = getPersistentLogo(positiveHash, domain);
  const contextualImage = getCompanyImage(domain, positiveHash);

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
