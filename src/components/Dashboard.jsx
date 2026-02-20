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
    FiZap
} from 'react-icons/fi';
import { format, parseISO, isValid } from 'date-fns';
import { authAPI, subscriptionsAPI, newsAPI } from '../services/api';
import { getTriggerName, TRIGGER_CATEGORY_MAPPING } from '../services/triggerMapping';
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
            <img src={item.image} alt={item.title} className="news-card-img" loading="lazy" />
            <div className="news-card-logo-overlay">
                <img src={item.officialLogo} alt={item.company} className="news-card-logo" />
            </div>
        </div>
        <div className="news-card-body">
            <div className="company-badge">{item.company}</div>
            <h3 className="news-title">{item.title}</h3>
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

    const fetchNews = async () => {
        setLoading(true);
        try {
            const data = await newsAPI.getCompanyNews();
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

    useEffect(() => {
        fetchNews();
    }, []);

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
                    <div className={`live-status-badge ${signalSource}`}>
                        <div className={`status-dot ${signalSource === 'live' ? 'pulse' : ''}`}
                            style={{ backgroundColor: signalSource === 'live' ? '#4ade80' : signalSource === 'fallback' ? '#f59e0b' : '#ef4444' }}
                        />
                        <span>{signalSource === 'live' ? 'LIVE FEED' : signalSource === 'fallback' ? 'OFFLINE BUFFER' : 'SIGNAL ERROR'}</span>
                    </div>
                    <button className="sync-btn" onClick={fetchNews} disabled={loading} title="Sync Live News">
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
                            <div className="welcome-text">
                                <h1>Intelligence Dashboard</h1>
                                <p>Real-time corporate signals and strategic disruptions across your tracked portfolio.</p>
                            </div>
                            <div className="welcome-badge-group">
                                <div className="premium-badge">
                                    <FiZap /> <span>UNIVERSAL ACCESS</span>
                                </div>
                                <div style={{ fontSize: '11px', fontWeight: '800', opacity: '0.8', textAlign: 'right' }}>
                                    LAST SYNC: {lastSync ? format(lastSync, 'HH:mm:ss') : '--:--:--'}
                                </div>
                            </div>
                        </div>

                        <div className="news-toolbar">
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
                                    <button className="clear-btn" onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer' }}>
                                        <FiX />
                                    </button>
                                )}
                            </div>
                            <div className="stats-bar-minimal">
                                <div className="stat-item-small">
                                    <span className="stat-label-tiny">TOTAL REPORTS</span>
                                    <span className="stat-value-small">{filteredNews.length}</span>
                                </div>
                            </div>
                        </div>

                        {loading && news.length === 0 ? (
                            <div className="loading-state" style={{ textAlign: 'center', padding: '100px 0' }}>
                                <FiRefreshCw className="spin" size={48} style={{ color: 'var(--accent-color)', marginBottom: '16px' }} />
                                <p style={{ fontWeight: '700', color: 'var(--text-muted)' }}>Synchronizing with Intelligence Feed...</p>
                            </div>
                        ) : (
                            <div className="news-grid">
                                {filteredNews.map((item, index) => (
                                    <NewsCard key={item.id} item={item} index={index} onNewsClick={handleNewsClick} />
                                ))}
                            </div>
                        )}

                        {!loading && filteredNews.length === 0 && (
                            <div className="empty-state-large" style={{ textAlign: 'center', padding: '100px 0', background: 'white', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                                <FiSearch size={48} style={{ color: 'var(--border-color)', marginBottom: '16px' }} />
                                <h3 style={{ fontWeight: '800', marginBottom: '8px' }}>No matching intelligence found</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search query or reset filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* News Detail Overlay */}
            {selectedNews && (
                <div className="news-detail-overlay animate-fadeIn" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div className="news-detail-container glass-effect" style={{ background: 'white', width: '100%', maxWidth: '1000px', maxHeight: '90vh', borderRadius: '24px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        <button className="close-detail" onClick={() => setSelectedNews(null)} style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', background: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <FiX size={20} />
                        </button>

                        <div style={{ padding: '40px', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                <img src={selectedNews.officialLogo} alt="" style={{ height: '40px' }} />
                                <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--accent-color)', textTransform: 'uppercase' }}>{selectedNews.company}</div>
                            </div>

                            <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', marginBottom: '24px', lineHeight: '1.2' }}>{selectedNews.title}</h2>

                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                                {selectedNews.triggers.map(t => (
                                    <span key={t} style={{ padding: '6px 12px', background: '#f1f5f9', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>{t}</span>
                                ))}
                            </div>

                            <img src={selectedNews.image} alt="" style={{ width: '100%', borderRadius: '16px', marginBottom: '32px' }} />

                            <div style={{ fontSize: '18px', lineHeight: '1.8', color: '#334155', whiteSpace: 'pre-line' }}>{selectedNews.content}</div>

                            <a href={selectedNews.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '40px', padding: '12px 24px', background: 'var(--primary-color)', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: '700' }}>
                                View Full Intelligence Report <FiExternalLink />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
