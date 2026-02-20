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
    FiUser
} from 'react-icons/fi';
import { format, parseISO, isValid } from 'date-fns';
import { authAPI, subscriptionsAPI, newsAPI } from '../services/api';
import { getTriggerName, MAPPED_CHANNELS, TRIGGER_CATEGORY_MAPPING } from '../services/triggerMapping';
import './Dashboard.css';

/**
 * Robust date formatting to prevent white-screen crashes on malformed data
 */
const formatDateSafe = (dateObj, formatStr) => {
    if (!dateObj) return 'Never';
    try {
        const date = (typeof dateObj === 'string') ? parseISO(dateObj) : dateObj;
        if (!isValid(date)) return 'Invalid Date';
        return format(date, formatStr);
    } catch (e) {
        console.error("Date formatting error:", e);
        return 'Invalid Date';
    }
};

const NewsCard = ({ item, index, onNewsClick }) => (
    <article
        className="news-card glass-effect animate-fadeIn clickable-card"
        style={{ animationDelay: `${index * 0.05}s` }}
        onClick={(e) => onNewsClick(e, item)}
    >
        <div className="news-card-media">
            <img
                src={item.image}
                alt={item.title}
                className="news-card-img"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=800&auto=format&fit=crop";
                }}
            />
            <div className="news-card-logo-overlay">
                <img
                    src={item.officialLogo}
                    alt="Logo"
                    className="news-card-logo"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                    }}
                />
            </div>
        </div>

        <div className="news-card-body">
            <div className="news-card-header">
                <span className="company-badge">
                    {MAPPED_CHANNELS[item.companyDomain] || item.company || item.companyDomain}
                </span>
                {item.announcedDate && (
                    <span className="date-badge">
                        <FiClock />
                        {formatDateSafe(item.announcedDate, 'MMM dd, yyyy')}
                    </span>
                )}
            </div>

            <h3 className="news-title">{item.title || 'Untitled'}</h3>

            {item.description && (
                <p className="news-description">{item.description}</p>
            )}

            {item.triggers && item.triggers.length > 0 && (
                <div className="news-triggers">
                    {item.triggers.slice(0, 2).map((trigger, idx) => (
                        <button
                            key={idx}
                            className="news-trigger-tag btn-trigger-link"
                            onClick={(e) => {
                                e.stopPropagation();
                                onNewsClick(e, item);
                            }}
                        >
                            <FiTrendingUp />
                            {getTriggerName(trigger)}
                        </button>
                    ))}
                    {item.triggers.length > 2 && <span className="more-triggers">+{item.triggers.length - 2}</span>}
                </div>
            )}

            <div className="news-card-footer-simple">
                <button className="news-read-more-btn">
                    Read Full Intel
                    <FiArrowRight />
                </button>
            </div>
        </div>
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
    const [lastUpdated, setLastUpdated] = useState(() => {
        const saved = localStorage.getItem('iz_last_sync_time');
        if (!saved || saved === 'Never') return new Date();
        const d = new Date(saved);
        return isValid(d) ? d : new Date();
    });
    const [availableCompanies, setAvailableCompanies] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const touchStartX = useRef(null);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (!touchStartX.current) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;

        // Detect left swipe (threshold 50px)
        if (diff > 50) {
            setShowFilters(false);
        }
        touchStartX.current = null;
    };

    // Fetch data on mount
    useEffect(() => {
        const init = async () => {
            await fetchSubscriptions();
            await fetchNews(true); // Hydrate filters on initial load
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

    const fetchSubscriptions = async () => {
        try {
            const data = await subscriptionsAPI.getUserSubscriptions();
            setSubscriptions(data);
        } catch (error) {
            console.error('Failed to fetch subscriptions:', error);
        }
    };

    const fetchNews = async (isInitial = false) => {
        setLoading(true);
        try {
            // Flatten selected categories into all associated trigger codes
            const selectedTriggerCodes = [];
            filters.triggers.forEach(category => {
                Object.keys(TRIGGER_CATEGORY_MAPPING).forEach(code => {
                    if (TRIGGER_CATEGORY_MAPPING[code].category === category) {
                        selectedTriggerCodes.push(code);
                    }
                });
            });

            const filterPayload = {
                ...(filters.startDate && { startDate: filters.startDate }),
                ...(filters.endDate && { endDate: filters.endDate }),
                ...(filters.companyDomain && { companyDomain: filters.companyDomain }),
                // Map local category selection to API trigger codes
                ...(selectedTriggerCodes.length > 0 && { triggerCodes: selectedTriggerCodes })
            };

            const data = await newsAPI.getCompanyNews(filterPayload);
            const newsItems = data?.news || data || [];
            setNews(newsItems);

            // Sync the timestamp with the API's persistent state
            const syncTime = localStorage.getItem('iz_last_sync_time');
            if (syncTime) {
                setLastUpdated(new Date(syncTime));
            } else {
                setLastUpdated(new Date());
            }

            // Update available filters IF this is the initial load OR if no filters are active
            // This ensures all options remain visible even when a specific filter is selected later
            if (isInitial || (!filters.companyDomain && filters.triggers.length === 0 && !filters.startDate && !filters.endDate)) {
                const domainsWithNews = new Set(newsItems.map(item => item.companyDomain));
                const categoriesWithNews = new Set();
                newsItems.forEach(item => {
                    if (item.triggers) {
                        item.triggers.forEach(t => {
                            const cat = TRIGGER_CATEGORY_MAPPING[t]?.category;
                            if (cat) categoriesWithNews.add(cat);
                        });
                    }
                });

                if (subscriptions) {
                    setAvailableCompanies((subscriptions?.config?.companies || []).filter(domain => domainsWithNews.has(domain)));
                } else {
                    setAvailableCompanies(Array.from(domainsWithNews));
                }

                // Always show ALL 24 trigger categories from the mapping (not just those with news)
                const allCategories = [...new Set(
                    Object.values(TRIGGER_CATEGORY_MAPPING).map(v => v.category)
                )].sort();
                setAvailableCategories(allCategories);
            }
        } catch (error) {
            console.error('Failed to fetch news:', error);
            setNews([]);
        } finally {
            setLoading(false);
            setLastUpdated(new Date());
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

    const newsContentRef = useRef(null);

    const handleNewsClick = (e, item) => {
        e.preventDefault();
        if (!isAuthenticated) {
            onLoginClick(item, 'signup');
            return;
        }
        setSelectedNews(item);
    };

    const uniqueCompanies = availableCompanies;
    const uniqueTriggers = availableCategories;

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header glass-effect">
                <div className="container">
                    <div className="header-content">
                        <div className="header-left">
                            {isAuthenticated && (
                                <>
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="btn-icon"
                                        title="Toggle Filters"
                                    >
                                        <FiFilter />
                                    </button>
                                    <div className="header-sync-container">
                                        <button
                                            className={`sync-btn ${loading ? 'syncing' : ''}`}
                                            onClick={() => fetchNews(true)}
                                            disabled={loading}
                                            title="Sync live news from the feed"
                                        >
                                            <FiRefreshCw className={loading ? 'spin' : ''} />
                                        </button>
                                        <div className="sync-info">
                                            <span className="sync-label">Last Updated:</span>
                                            <span className="sync-time show-pulse">
                                                {formatDateSafe(lastUpdated, 'h:mm a')}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="header-center">
                            <div className="logo-section animate-fadeIn">
                                <div className="logo-mini">IZ</div>
                                <h1 className="dashboard-title gradient-text">Intellizence News</h1>
                            </div>
                        </div>

                        <div className="header-right">
                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="btn-logout"
                                >
                                    <FiLogOut />
                                    <span>Logout</span>
                                </button>
                            ) : canShowLogin && (
                                <>
                                    <button className="btn-login-signup animate-fadeIn desktop-only" onClick={() => onLoginClick(null, 'signup')}>
                                        Login / Sign Up
                                    </button>
                                    <button className="btn-profile-mobile animate-fadeIn mobile-only" onClick={() => onLoginClick(null, 'signup')} title="Login / Sign Up">
                                        <FiUser />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="dashboard-main container">
                {/* Filters Panel - Only visible for authenticated users when toggled */}
                {isAuthenticated && showFilters && (
                    <aside
                        className="filters-panel glass-effect animate-slideDown"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="filters-header">
                            <h2 className="filters-title">
                                <FiFilter />
                                Filters
                            </h2>
                            <div className="filters-actions">
                                {(filters.startDate || filters.endDate || filters.companyDomain || filters.triggers.length > 0) && (
                                    <button onClick={clearFilters} className="btn-clear" title="Clear All">
                                        <FiX />
                                        <span>Clear All</span>
                                    </button>
                                )}
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="btn-icon-close mobile-only"
                                    title="Close Filters"
                                >
                                    <FiX />
                                </button>
                            </div>
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
                                        {uniqueCompanies.map(domain => (
                                            <option key={domain} value={domain}>
                                                {MAPPED_CHANNELS[domain] || domain}
                                            </option>
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
                                                title={trigger}
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
                <main className="news-content" ref={newsContentRef}>
                    {isAuthenticated && (
                        <div className="welcome-banner glass-effect animate-fadeIn">
                            <div className="welcome-text">
                                <h2>Welcome to your Open Intelligence Hub</h2>
                                <p>Enjoy full access to premium news tracking, advanced market filters, and live trigger signals.</p>
                            </div>
                            <div className="welcome-stats">
                                <div className="stat-pill">Universal Access</div>
                            </div>
                        </div>
                    )}

                    {/* Toolbar: Search + Stats */}
                    <div className="news-toolbar animate-fadeIn">
                        <div className="search-box">
                            <FiSearch className="search-icon" />
                            <input
                                type="text"
                                className="search-input-field"
                                placeholder=""
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button className="clear-search" onClick={() => setSearchQuery('')}>
                                    <FiX />
                                </button>
                            )}
                        </div>
                        <div className="stats-bar-minimal">
                            <div className="stat-item-small">
                                <span className="stat-label-tiny">TOTAL NEWS</span>
                                <span className="stat-value-small">{filteredNews.length}</span>
                            </div>
                        </div>
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

                    {/* Secondary Stats */}
                    {filters.triggers.length > 0 && (
                        <div className="stats-bar animate-fadeIn">
                            <div className="stat-item">
                                <span className="stat-label">Active Filters</span>
                                <span className="stat-value gradient-text">{filters.triggers.length}</span>
                            </div>
                        </div>
                    )}

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
            {
                selectedNews && (
                    <div className="news-detail-overlay animate-fadeIn">
                        <div className="container">
                            <div className="news-detail-container glass-effect animate-slideUp">
                                <button
                                    className="btn-close-detail"
                                    onClick={() => setSelectedNews(null)}
                                >
                                    <FiX />
                                </button>

                                {/* Official Branding Header */}
                                <div className="detail-brand-header">
                                    <div className="detail-logo-box">
                                        <img
                                            key={`logo-${selectedNews.id}`}
                                            src={selectedNews.officialLogo}
                                            alt={`${selectedNews.company} logo`}
                                            className="detail-logo-img"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=800&auto=format&fit=crop";
                                            }}
                                        />
                                    </div>
                                    <div className="verified-badge">
                                        <div className="pulse-dot"></div>
                                        <span>Verified Intelligence Source</span>
                                    </div>
                                </div>

                                {/* Story Cover Image - Positioned below logo as requested */}
                                {selectedNews.image && (
                                    <div className="detail-cover-box animate-fadeIn">
                                        <img
                                            key={`cover-${selectedNews.id}`}
                                            src={selectedNews.image}
                                            alt={selectedNews.title}
                                            className="detail-cover-img"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                                e.target.parentElement.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="detail-header">
                                    {selectedNews.company && (
                                        <span className="company-badge">{selectedNews.company}</span>
                                    )}
                                    <h2 className="detail-title news-heading">{selectedNews.title}</h2>
                                    <div className="date-badge">
                                        <FiClock />
                                        {formatDateSafe(selectedNews.announcedDate, 'MMMM dd, yyyy')}
                                    </div>
                                </div>


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
                                                <div key={idx} className="signal-item" title={trigger}>
                                                    <FiTrendingUp />
                                                    {getTriggerName(trigger)}
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
                )
            }
        </div >
    );
};

export default Dashboard;
