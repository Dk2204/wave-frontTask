import React, { useState, useEffect } from 'react';
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
    FiArrowRight
} from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import { authAPI, subscriptionsAPI, newsAPI } from '../services/api';
import './Dashboard.css';

const NewsCard = ({ item, index, onNewsClick }) => (
    <article
        className="news-card glass-effect animate-fadeIn clickable-card"
        style={{ animationDelay: `${index * 0.05}s` }}
        onClick={(e) => onNewsClick(e, item)}
    >
        <div className="news-card-header">
            {item.company && (
                <span className="company-badge">{item.company}</span>
            )}
            {item.announcedDate && (
                <span className="date-badge">
                    <FiClock />
                    {format(parseISO(item.announcedDate), 'MMM dd, yyyy')}
                </span>
            )}
        </div>

        <h3 className="news-title">{item.title || 'Untitled'}</h3>

        {item.description && (
            <p className="news-description">{item.description}</p>
        )}

        {item.triggers && item.triggers.length > 0 && (
            <div className="news-triggers">
                {item.triggers.map((trigger, idx) => (
                    <button
                        key={idx}
                        className="news-trigger-tag btn-trigger-link"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNewsClick(e, item);
                        }}
                    >
                        <FiTrendingUp />
                        {trigger}
                    </button>
                ))}
            </div>
        )}

        {item.url && (
            <div className="news-card-footer">
                <button
                    onClick={(e) => onNewsClick(e, item)}
                    className="news-link"
                >
                    Read More
                    <FiArrowRight />
                </button>
            </div>
        )}
    </article>
);

const Dashboard = ({ isAuthenticated, onLogout, onLoginClick, pendingNewsItem, onPendingItemCleared }) => {
    const [loading, setLoading] = useState(false);
    const [subscriptions, setSubscriptions] = useState(null);
    const [news, setNews] = useState([]);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        companyDomain: '',
        triggers: []
    });
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNews, setSelectedNews] = useState(null);
    const [canShowLogin, setCanShowLogin] = useState(false);

    // Fetch data on mount
    useEffect(() => {
        const init = async () => {
            await fetchSubscriptions();
            await fetchNews();
        };
        init();

        // Delay the login option to show dashboard first
        const timer = setTimeout(() => {
            setCanShowLogin(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Handle opening pending item after login
    useEffect(() => {
        if (isAuthenticated && pendingNewsItem) {
            setSelectedNews(pendingNewsItem);
            onPendingItemCleared();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [isAuthenticated, pendingNewsItem, onPendingItemCleared]);

    // Fetch news when filters change
    useEffect(() => {
        fetchNews();
    }, [filters]);

    // Fetch news when filters change

    const fetchSubscriptions = async () => {
        try {
            const data = await subscriptionsAPI.getSubscriptions();
            setSubscriptions(data);
        } catch (error) {
            console.error('Failed to fetch subscriptions:', error);
        }
    };

    const fetchNews = async () => {
        setLoading(true);
        try {
            const filterPayload = {
                ...(filters.startDate && { startDate: filters.startDate }),
                ...(filters.endDate && { endDate: filters.endDate }),
                ...(filters.companyDomain && { companyDomain: filters.companyDomain }),
                ...(filters.triggers.length > 0 && { triggers: filters.triggers })
            };

            const data = await newsAPI.getCompanyNews(filterPayload);
            setNews(data?.news || data || []);
        } catch (error) {
            console.error('Failed to fetch news:', error);
            setNews([]);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        onLogout();
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleTrigger = (trigger) => {
        setFilters(prev => ({
            ...prev,
            triggers: prev.triggers.includes(trigger)
                ? prev.triggers.filter(t => t !== trigger)
                : [...prev.triggers, trigger]
        }));
    };

    const clearFilters = () => {
        setFilters({
            startDate: '',
            endDate: '',
            companyDomain: '',
            triggers: []
        });
    };

    const filteredNews = news.filter(item => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            item.title?.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query) ||
            item.company?.toLowerCase().includes(query)
        );
    });

    // Grouping logic: Current Trend vs Later Articles
    const now = new Date();
    const trendingThreshold = 48 * 60 * 60 * 1000; // 48 hours in ms

    const trendingNews = filteredNews.filter(item => {
        const itemDate = new Date(item.announcedDate);
        return (now - itemDate) <= trendingThreshold;
    });

    const laterNews = filteredNews.filter(item => {
        const itemDate = new Date(item.announcedDate);
        return (now - itemDate) > trendingThreshold;
    });

    const handleNewsClick = (e, item) => {
        e.preventDefault();
        if (!isAuthenticated) {
            onLoginClick(item, 'login');
            return;
        }
        setSelectedNews(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Extract available domains and triggers from subscriptions
    const availableDomains = subscriptions?.subscriptions
        ?.filter(sub => sub.resource === 'news.companies')
        ?.flatMap(sub => sub.companies?.map(c => c.domain) || []) || [];

    const availableTriggers = subscriptions?.subscriptions
        ?.filter(sub => sub.resource === 'news.companies')
        ?.flatMap(sub => sub.signals || sub.triggers || []) || [];

    const uniqueDomains = [...new Set(availableDomains)];
    const uniqueTriggers = [...new Set(availableTriggers)];

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header glass-effect">
                <div className="container">
                    <div className="header-content">
                        <div className="header-left">
                            {!isAuthenticated ? (
                                canShowLogin && (
                                    <button className="btn-login-signup animate-fadeIn" onClick={() => onLoginClick(null, 'signup')}>
                                        Login / Sign Up
                                    </button>
                                )
                            ) : (
                                <div className="logo-section">
                                    <div className="logo-mini">IZ</div>
                                    <h1 className="dashboard-title gradient-text">Intellizence News</h1>
                                </div>
                            )}
                        </div>

                        {!isAuthenticated && (
                            <div className="header-center animate-fadeIn">
                                <h2 className="platform-branding-center">Intellizence News Platform</h2>
                            </div>
                        )}
                        <div className="header-right">
                            {isAuthenticated && (
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="btn-icon"
                                    title="Toggle Filters"
                                >
                                    <FiFilter />
                                </button>
                            )}
                            <button
                                onClick={fetchNews}
                                className="btn-icon"
                                title="Refresh"
                                disabled={loading}
                            >
                                <FiRefreshCw className={loading ? 'spinner' : ''} />
                            </button>
                            {isAuthenticated && (
                                <button
                                    onClick={handleLogout}
                                    className="btn-logout"
                                >
                                    <FiLogOut />
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="dashboard-main container">
                {/* Filters Panel - Only visible for authenticated users when toggled */}
                {isAuthenticated && showFilters && (
                    <aside className="filters-panel glass-effect animate-slideDown">
                        <div className="filters-header">
                            <h2 className="filters-title">
                                <FiFilter />
                                Filters
                            </h2>
                            {(filters.startDate || filters.endDate || filters.companyDomain || filters.triggers.length > 0) && (
                                <button onClick={clearFilters} className="btn-clear">
                                    <FiX />
                                    Clear All
                                </button>
                            )}
                        </div>

                        <div className="filters-content">
                            {/* Date Range Filter */}
                            <div className="filter-group">
                                <label className="filter-label">
                                    <FiCalendar />
                                    Announced Date Range
                                </label>
                                <div className="date-range">
                                    <input
                                        type="date"
                                        value={filters.startDate}
                                        onChange={(e) => handleFilterChange('startDate', e.target.value)}
                                        className="filter-input"
                                        placeholder="Start Date"
                                    />
                                    <span className="date-separator">to</span>
                                    <input
                                        type="date"
                                        value={filters.endDate}
                                        onChange={(e) => handleFilterChange('endDate', e.target.value)}
                                        className="filter-input"
                                        placeholder="End Date"
                                    />
                                </div>
                            </div>

                            {/* Company Domain Filter */}
                            <div className="filter-group">
                                <label className="filter-label">
                                    <FiTag />
                                    Company Domain
                                </label>
                                <div className="select-wrapper">
                                    <select
                                        value={filters.companyDomain}
                                        onChange={(e) => handleFilterChange('companyDomain', e.target.value)}
                                        className="filter-select"
                                    >
                                        <option value="">All Domains</option>
                                        {uniqueDomains.map(domain => (
                                            <option key={domain} value={domain}>{domain}</option>
                                        ))}
                                    </select>
                                    <FiChevronDown className="select-icon" />
                                </div>
                            </div>

                            {/* Triggers/Signals Filter */}
                            <div className="filter-group">
                                <label className="filter-label">
                                    <FiTrendingUp />
                                    Triggers / Signals
                                </label>
                                <div className="triggers-list">
                                    {uniqueTriggers.length > 0 ? (
                                        uniqueTriggers.map(trigger => (
                                            <button
                                                key={trigger}
                                                onClick={() => toggleTrigger(trigger)}
                                                className={`trigger-chip ${filters.triggers.includes(trigger) ? 'active' : ''}`}
                                            >
                                                {trigger}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="empty-state">No triggers available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

                {/* News Content */}
                <main className="news-content">
                    {isAuthenticated && (
                        <div className="welcome-banner glass-effect animate-fadeIn">
                            <div className="welcome-text">
                                <h2>Welcome back to your Intelligence Hub</h2>
                                <p>You have full access to personalized news tracking and advanced filters.</p>
                            </div>
                            <div className="welcome-stats">
                                <div className="stat-pill">Premium Access</div>
                            </div>
                        </div>
                    )}

                    {/* Search Bar */}
                    <div className="search-bar glass-effect">
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search news by title, description, or company..."
                            className="search-input"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="btn-clear-search">
                                <FiX />
                            </button>
                        )}
                    </div>

                    {/* Filter Active Options Bar */}
                    {(filters.startDate || filters.endDate || filters.companyDomain || filters.triggers.length > 0) && (
                        <div className="filter-active-bar animate-fadeIn">
                            <span className="active-bar-label">Active Filters:</span>
                            <div className="active-chips">
                                {filters.companyDomain && (
                                    <span className="active-chip">
                                        {filters.companyDomain}
                                        <FiX onClick={() => handleFilterChange('companyDomain', '')} />
                                    </span>
                                )}
                                {filters.triggers.map(t => (
                                    <span key={t} className="active-chip">
                                        {t}
                                        <FiX onClick={() => toggleTrigger(t)} />
                                    </span>
                                ))}
                                {(filters.startDate || filters.endDate) && (
                                    <span className="active-chip">
                                        Date Range
                                        <FiX onClick={() => { handleFilterChange('startDate', ''); handleFilterChange('endDate', ''); }} />
                                    </span>
                                )}
                                <button className="btn-clear-all-small" onClick={clearFilters}>
                                    Clear All
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Stats Bar */}
                    <div className="stats-bar">
                        <div className="stat-item">
                            <span className="stat-label">Total News</span>
                            <span className="stat-value gradient-text">{filteredNews.length}</span>
                        </div>
                        {filters.triggers.length > 0 && (
                            <div className="stat-item">
                                <span className="stat-label">Active Filters</span>
                                <span className="stat-value gradient-text">{filters.triggers.length}</span>
                            </div>
                        )}
                    </div>

                    {/* News Sections */}
                    {loading ? (
                        <div className="loading-state">
                            <FiRefreshCw className="spinner large" />
                            <p>Loading news...</p>
                        </div>
                    ) : (
                        <div className="news-sections-container">
                            {/* Current Trend Section */}
                            {trendingNews.length > 0 && (
                                <section className="news-section-group animate-fadeIn">
                                    <h2 className="section-title-tag">
                                        <FiTrendingUp />
                                        Current Trend
                                    </h2>
                                    <div className="news-grid">
                                        {trendingNews.map((item, index) => (
                                            <NewsCard
                                                key={item.id || `trend-${index}`}
                                                item={item}
                                                index={index}
                                                onNewsClick={handleNewsClick}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Later Articles Section */}
                            {laterNews.length > 0 && (
                                <section className="news-section-group animate-fadeIn">
                                    <h2 className="section-title-tag">
                                        <FiClock />
                                        Later Articles
                                    </h2>
                                    <div className="news-grid">
                                        {laterNews.map((item, index) => (
                                            <NewsCard
                                                key={item.id || `later-${index}`}
                                                item={item}
                                                index={index + trendingNews.length}
                                                onNewsClick={handleNewsClick}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {filteredNews.length === 0 && (
                                <div className="empty-state-large glass-effect">
                                    <FiSearch className="empty-icon" />
                                    <h3>No news found</h3>
                                    <p>Try adjusting your filters or search query</p>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>

            {/* News Detail Overlay */}
            {selectedNews && (
                <div className="news-detail-overlay animate-fadeIn">
                    <div className="container">
                        <div className="news-detail-container glass-effect animate-slideUp">
                            <button
                                className="btn-close-detail"
                                onClick={() => setSelectedNews(null)}
                            >
                                <FiX />
                            </button>

                            <div className="detail-header">
                                {selectedNews.company && (
                                    <span className="company-badge">{selectedNews.company}</span>
                                )}
                                <h2 className="detail-title news-heading">{selectedNews.title}</h2>
                                <div className="date-badge">
                                    <FiClock />
                                    {format(parseISO(selectedNews.announcedDate), 'MMMM dd, yyyy')}
                                </div>
                            </div>

                            {selectedNews.image && (
                                <div className={`detail-image-container ${['Microsoft', 'Tesla'].includes(selectedNews.company) ? 'large-cover-rect' :
                                    ['NVIDIA', 'Meta', 'Google', 'Amazon'].includes(selectedNews.company) ? 'official-product-rect' : ''
                                    }`}>
                                    <img
                                        key={selectedNews.id}
                                        src={selectedNews.image}
                                        alt={selectedNews.title}
                                        className="detail-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200";
                                        }}
                                    />
                                </div>
                            )}

                            <div className="detail-content">
                                {selectedNews.content ? (
                                    selectedNews.content.split('\n\n').map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))
                                ) : (
                                    <p>{selectedNews.description}</p>
                                )}
                            </div>

                            {selectedNews.triggers && selectedNews.triggers.length > 0 && (
                                <div className="detail-signals">
                                    <h3 className="signals-label">Market Triggers:</h3>
                                    <div className="signals-grid">
                                        {selectedNews.triggers.map((trigger, idx) => (
                                            <div key={idx} className="signal-item">
                                                <FiTrendingUp />
                                                {trigger}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="detail-footer">
                                <a
                                    href={selectedNews.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary-news"
                                >
                                    Visit Original Source
                                    <FiExternalLink />
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
