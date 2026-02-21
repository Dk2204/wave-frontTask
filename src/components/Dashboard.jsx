import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    FiFilter,
    FiCalendar,
    FiTag,
    FiTrendingUp,
    FiRefreshCw,
    FiLogOut,
    FiSearch,
    FiX,
    FiChevronDown,
    FiExternalLink,
    FiClock,
    FiArrowRight,
    FiUser,
    FiZap,
    FiCheck
} from 'react-icons/fi';
import { format, parseISO, isValid } from 'date-fns';
import { authAPI, subscriptionsAPI, newsAPI } from '../services/api';
import { getTriggerName, MAPPED_CHANNELS, TRIGGER_CATEGORY_MAPPING } from '../services/triggerMapping';
import './Dashboard.css';

const formatDateSafe = (dateObj, formatStr) => {
    if (!dateObj) return 'Recent';
    try {
        const date = (typeof dateObj === 'string') ? parseISO(dateObj) : dateObj;
        return isValid(date) ? format(date, formatStr) : 'Recent';
    } catch (e) {
        return 'Recent';
    }
};

const NewsCard = ({ item, index, onNewsClick }) => (
    <article
        className="news-card"
        style={{ animationDelay: `${index * 0.05}s` }}
        onClick={(e) => onNewsClick(e, item)}
    >
        <div className="news-card-media">
            <img
                src={item.image}
                alt={item.title}
                className="news-card-img"
                loading="lazy"
                onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=cover&q=80&w=1200';
                    e.target.onerror = null;
                }}
            />
            <div className="news-card-overlay"></div>
            <div className="news-card-logo-overlay">
                <img src={item.officialLogo} alt={item.company} className="news-card-logo" />
            </div>
        </div>
        <div className="news-card-body">
            <div className="card-top-info">
                <div className="company-badge">{item.company}</div>
                {item.socialSource && (
                    <div className="social-source-tag">via {item.socialSource}</div>
                )}
            </div>
            <h3 className="news-title">{item.title}</h3>
            <div className="card-triggers">
                {Array.from(new Set((item.triggers || []).map(t =>
                    TRIGGER_CATEGORY_MAPPING[t]?.category?.replace(/^[^\s]+\s/, '') || getTriggerName(t)
                ))).slice(0, 2).map(categoryHeader => (
                    <span key={categoryHeader} className="card-trigger-tag">
                        <FiTag /> {categoryHeader}
                    </span>
                ))}
                {new Set((item.triggers || []).map(t => TRIGGER_CATEGORY_MAPPING[t]?.category)).size > 2 &&
                    <span className="card-trigger-more">
                        +{new Set((item.triggers || []).map(t => TRIGGER_CATEGORY_MAPPING[t]?.category)).size - 2}
                    </span>
                }
            </div>
            <p className="news-description">{item.description}</p>
            <div className="news-card-footer">
                <span className="date-badge">
                    <FiClock /> {formatDateSafe(item.announcedDate, 'MMM dd, yyyy')}
                </span>
                <FiArrowRight style={{ color: 'var(--accent-color)' }} />
            </div>
        </div>
    </article>
);

const Dashboard = ({ isAuthenticated, onLogout, onLoginClick, pendingNewsItem, onPendingItemCleared }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [signalSource, setSignalSource] = useState('connecting');
    const [lastSync, setLastSync] = useState(null);
    const [selectedNews, setSelectedNews] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [filters, setFilters] = useState(() => {
        const saved = localStorage.getItem('intellizence_filters');
        return saved ? JSON.parse(saved) : {
            companyDomain: '',
            triggers: [],
            startDate: '',
            endDate: ''
        };
    });
    const [availableFilters, setAvailableFilters] = useState({
        companies: [],
        triggers: []
    });

    const fetchNews = async (filterOverride = null) => {
        setLoading(true);
        try {
            const activeFilters = filterOverride || filters;
            const data = await newsAPI.getCompanyNews(activeFilters);
            const newsItems = data?.news || [];

            const sortedNews = Array.isArray(newsItems)
                ? [...newsItems].sort((a, b) => new Date(b.announcedDate) - new Date(a.announcedDate))
                : [];

            setNews(sortedNews);
            setSignalSource(data?.source || 'live');
            setLastSync(new Date());
        } catch (error) {
            console.error('Signal failure:', error);
            setSignalSource('error');
        } finally {
            setLoading(false);
        }
    };

    const fetchSubscriptions = async () => {
        try {
            const subData = await subscriptionsAPI.getSubscriptions();
            // Data structure: subData.config.companies / subData.config.triggers
            const config = subData.config || {};

            const triggerCategories = [
                "Mergers & Acquisitions", "Leadership/Management Changes", "Fundraising & Investment",
                "Initial Public Offering (IPO)", "Business Expansion", "Financial Results & Outlook",
                "Product & Service Launch", "Innovation & Initiatives", "Partnerships & Joint Ventures",
                "Layoffs & Cost-Cutting", "Bankruptcy & Business Shut-down", "Awards & Recognition",
                "Advertising & Marketing", "Customer Acquisition / Sourcing", "Customer Churn",
                "Pricing", "Legal", "Regulatory", "Research & Publications",
                "Scandals, Rumours, Activism", "Security Breaches & Outages", "Employee/Labor Dispute",
                "Accidents & Disasters", "Recalls & Disruptions"
            ];

            const authorizedDomains = [
                "microsoft.com", "wingify.com", "openai.com", "tesla.com", "x.ai",
                "salesforce.com", "anaplan.com", "clay.com", "apollo.io", "hdfc.com",
                "hdfc.bank.in", "federal.bank.in", "meta.com", "manutd.com", "netflix.com"
            ];

            setAvailableFilters({
                companies: authorizedDomains.map(domain => ({
                    domain,
                    name: MAPPED_CHANNELS[domain] || domain.split('.')[0].toUpperCase()
                })).sort((a, b) => a.name.localeCompare(b.name)),
                triggers: triggerCategories.map(category => ({
                    code: category,
                    name: category
                }))
            });
        } catch (error) {
            console.error('Failed to load filter metadata:', error);
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem('intellizence_filters');
        const initialFilters = saved ? JSON.parse(saved) : filters;
        fetchNews(initialFilters);
        fetchSubscriptions();

        // 📡 Social Media Live Pulse — Synchronize every 60 seconds
        const pulse = setInterval(() => {
            fetchNews();
        }, 60000);

        return () => clearInterval(pulse);
    }, []);

    // 🔒 Scroll Lock Intelligence Layer — Enabled only for deep-dive news detail
    useEffect(() => {
        const isLocked = !!selectedNews;
        if (isLocked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedNews]);

    // Handle Deep Linking if a news item was clicked while logged out
    useEffect(() => {
        if (isAuthenticated && pendingNewsItem) {
            setSelectedNews(pendingNewsItem);
            onPendingItemCleared();
        }
    }, [isAuthenticated, pendingNewsItem, onPendingItemCleared]);

    const handleNewsClick = (e, item) => {
        e.preventDefault();
        if (!isAuthenticated) {
            onLoginClick(item, 'signup');
            return;
        }
        setSelectedNews(item);
    };

    const toggleTrigger = (categoryName) => {
        setFilters(prev => ({
            ...prev,
            triggers: prev.triggers.includes(categoryName)
                ? prev.triggers.filter(t => t !== categoryName)
                : [...prev.triggers, categoryName]
        }));
    };

    const handleSyncRefresh = () => {
        const resetState = {
            companyDomain: '',
            triggers: [],
            startDate: '',
            endDate: ''
        };
        setFilters(resetState);
        setSearchQuery('');
        localStorage.removeItem('intellizence_filters');
        fetchNews(resetState);
    };

    const handleApplyIntelligence = () => {
        localStorage.setItem('intellizence_filters', JSON.stringify(filters));
        setIsFilterOpen(false);
        fetchNews(filters);
    };

    const clearFilters = () => {
        const resetState = {
            companyDomain: '',
            triggers: [],
            startDate: '',
            endDate: ''
        };
        setFilters(resetState);
        setSearchQuery('');
        localStorage.removeItem('intellizence_filters');
        fetchNews(resetState);
    };

    const filteredNews = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return news.filter(item =>
            !query ||
            item.title?.toLowerCase().includes(query) ||
            item.company?.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query)
        );
    }, [news, searchQuery]);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-left">
                    <div className="logo-section">
                        <div className="logo-mini">IZ</div>
                        <h1 className="dashboard-title">
                            <span className="gradient-text">Intellizence</span> Signal Hub
                        </h1>
                    </div>
                </div>

                <div className="header-right">
                    <div className="header-sync-group">
                        <div className="premium-badge">
                            <FiZap /> <span>UNIVERSAL ACCESS</span>
                        </div>
                        <div className="sync-timestamp">
                            LAST SYNC: {lastSync ? format(lastSync, 'HH:mm:ss') : '--:--:--:--'}
                        </div>
                    </div>
                    <div className={`live-status-badge ${signalSource}`}>
                        <div className={`status-dot ${signalSource === 'live' ? 'pulse' : ''}`}
                            style={{ backgroundColor: signalSource === 'live' ? '#4ade80' : signalSource === 'fallback' ? '#f59e0b' : '#ef4444' }}
                        />
                        <span>{signalSource === 'live' ? 'LIVE FEED' : signalSource === 'fallback' ? 'OFFLINE BUFFER' : 'SIGNAL ERROR'}</span>
                    </div>
                    <button className="sync-btn" onClick={handleSyncRefresh} disabled={loading} title="Sync Live News">
                        <FiRefreshCw className={loading ? 'spin' : ''} />
                    </button>
                    {isAuthenticated ? (
                        <button className="logout-btn" onClick={onLogout}>
                            <FiLogOut /> <span>LOGOUT</span>
                        </button>
                    ) : (
                        <button className="sync-btn" onClick={() => onLoginClick()}>
                            <FiUser /> <span>LOGIN</span>
                        </button>
                    )}
                </div>
            </header>

            <main className="dashboard-main">
                <div className="news-content">
                    <div className="container">
                        <div className="welcome-banner animate-fadeIn">
                            <div className="welcome-content">
                                <div className="welcome-text">
                                    <h1>Intelligence Dashboard</h1>
                                    <p>Real-time corporate signals and strategic disruptions across your tracked portfolio.</p>
                                </div>
                                <div className="social-connection-badge">
                                    <div className={`pulse-dot ${signalSource === 'error' ? 'red' : 'green'}`} />
                                    <span>
                                        {signalSource === 'live' ? 'Connected to Enterprise Signal API' :
                                            signalSource === 'social' ? 'Syncing with Official Social News Pulse' :
                                                signalSource === 'connecting' ? 'Establishing Social Linkage...' :
                                                    'Signal Interference Detected'}
                                    </span>
                                    {lastSync && (
                                        <div className="last-sync-tag">
                                            Last Sync: {formatDateSafe(lastSync, 'HH:mm:ss')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="news-toolbar">
                            <div className="toolbar-main">
                                <div className="search-box">
                                    <FiSearch className="search-icon" />
                                    <input
                                        type="text"
                                        className="search-input-field"
                                        placeholder="Scan intelligence reports..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <button className="clear-btn" onClick={() => setSearchQuery('')}>
                                            <FiX />
                                        </button>
                                    )}
                                </div>
                                <button className={`filter-toggle-btn ${isFilterOpen ? 'active' : ''}`} onClick={() => setIsFilterOpen(!isFilterOpen)}>
                                    <FiFilter /> <span>Filters</span>
                                    {(filters.companyDomain || filters.triggers.length > 0 || filters.startDate) && <span className="filter-count-dot" />}
                                </button>
                            </div>

                            <div className="stats-bar-minimal">
                                <div className="stat-item-small">
                                    <span className="stat-label-tiny">TOTAL REPORTS</span>
                                    <span className="stat-value-small">{filteredNews.length}</span>
                                </div>
                            </div>
                        </div>

                        {/* FILTER PANEL */}
                        {isFilterOpen && (
                            <div className="filter-panel glass-effect animate-fadeIn">
                                <div className="filter-section">
                                    <label className="filter-label"><FiUser /> Company Focus</label>
                                    <select
                                        className="filter-select"
                                        value={filters.companyDomain}
                                        onChange={(e) => setFilters(prev => ({ ...prev, companyDomain: e.target.value }))}
                                    >
                                        <option value="">All Tracked Companies</option>
                                        {availableFilters.companies.map(c => (
                                            <option key={c.domain} value={c.domain}>{c.name} ({c.domain})</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="filter-section">
                                    <label className="filter-label"><FiCalendar /> Date Range</label>
                                    <div className="date-inputs">
                                        <input
                                            type="date"
                                            className="date-input"
                                            value={filters.startDate}
                                            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                                        />
                                        <span className="date-separator">to</span>
                                        <input
                                            type="date"
                                            className="date-input"
                                            value={filters.endDate}
                                            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div className="filter-section full-width">
                                    <label className="filter-label"><FiTag /> Signal Intelligence Triggers</label>
                                    <div className="trigger-chips">
                                        {availableFilters.triggers.map(t => (
                                            <button
                                                key={t.code}
                                                className={`trigger-chip ${filters.triggers.includes(t.code) ? 'active' : ''}`}
                                                onClick={() => toggleTrigger(t.code)}
                                            >
                                                {filters.triggers.includes(t.code) ? <FiCheck /> : <FiTag />}
                                                {t.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="filter-footer">
                                    <button className="btn-clear-all" onClick={clearFilters}>Reset Filters</button>
                                    <button className="btn-apply" onClick={handleApplyIntelligence}>Apply Intelligence</button>
                                </div>
                            </div>
                        )}

                        {loading && news.length === 0 ? (
                            <div className="loading-state">
                                <FiRefreshCw className="spin" size={48} />
                                <p>Synchronizing with Intelligence Feed...</p>
                            </div>
                        ) : (
                            <div className="news-grid">
                                {filteredNews.map((item, index) => (
                                    <NewsCard key={item.id} item={item} index={index} onNewsClick={handleNewsClick} />
                                ))}
                            </div>
                        )}

                        {!loading && filteredNews.length === 0 && (
                            <div className="empty-state-large">
                                <FiSearch size={48} />
                                <h3>No matching intelligence found</h3>
                                <p>Try adjusting your search query or reset filters.</p>
                                <button className="btn-reset-large" onClick={clearFilters}>Reset All Filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* News Detail Overlay */}
            {selectedNews && (
                <div className="news-detail-overlay animate-fadeIn" onClick={() => setSelectedNews(null)}>
                    <div className="news-detail-container glass-effect" onClick={(e) => e.stopPropagation()}>
                        <button className="close-detail" onClick={() => setSelectedNews(null)}>
                            <FiX size={20} />
                        </button>

                        <div className="news-detail-content">
                            <div className="detail-header">
                                <img src={selectedNews.officialLogo} alt="" style={{ height: '40px' }} />
                                <div className="detail-company-name">{selectedNews.company}</div>
                            </div>

                            <h2 className="detail-title">{selectedNews.title}</h2>
                            <div className="detail-tags">
                                {Array.from(new Set((selectedNews.triggers || []).map(t =>
                                    TRIGGER_CATEGORY_MAPPING[t]?.category?.replace(/^[^\s]+\s/, '') || getTriggerName(t)
                                ))).map(categoryHeader => (
                                    <span key={categoryHeader} className="detail-tag">
                                        <FiTag /> {categoryHeader}
                                    </span>
                                ))}
                            </div>


                            <img src={selectedNews.image} alt="" className="detail-main-img" />

                            <div className="detail-body-text">{selectedNews.content}</div>

                            <div className="detail-footer">
                                <a href={selectedNews.url} target="_blank" rel="noopener noreferrer" className="btn-view-report">
                                    View Full Intelligence Report <FiExternalLink />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
