import React, { useState, useEffect } from 'react';
import { FiUser, FiLock, FiArrowRight, FiLoader, FiMail, FiCheck } from 'react-icons/fi';
import { authAPI } from '../services/api';
import './Login.css';

const Login = ({ onLoginSuccess, initialMode = 'login' }) => {
    const [mode, setMode] = useState(initialMode); // 'login', 'signup', 'success'
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Sync mode if initialMode from parent changes
    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Artificial delay for premium feel
            await new Promise(r => setTimeout(r, 600));
            const response = authAPI.login(formData.username, formData.password);
            onLoginSuccess(response);
        } catch (err) {
            // The user requested this exact phrase
            setError('Username and Password is Incorrect');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await new Promise(r => setTimeout(r, 800));
            authAPI.register({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            setMode('success');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (mode === 'success') {
        return (
            <div className="login-container">
                <div className="login-card glass-effect animate-scaleIn">
                    <div className="success-view animate-fadeIn">
                        <div className="success-icon-container">
                            <FiCheck className="success-icon" style={{ fontSize: '32px' }} />
                        </div>
                        <h2 className="success-title" style={{ fontSize: '24px', color: '#10b981' }}>Account Created Successfully</h2>
                        <p className="success-message">Your executive profile is now active. You are being redirected to the login page.</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setMode('login');
                                setFormData({ ...formData, password: '', confirmPassword: '' });
                                setError('');
                            }}
                        >
                            Proceed to Login <FiArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="login-container">
            <div className="login-card glass-effect animate-scaleIn">
                <div className="login-header">
                    <div className="logo-container">
                        <div className="logo-icon">IZ</div>
                    </div>
                    <h1 className="login-title gradient-text">Intellizence</h1>
                    <p className="login-subtitle">Executive Intelligence Hub</p>
                </div>

                <div className="login-tabs">
                    <button
                        className={`tab-btn ${mode === 'login' ? 'active' : ''}`}
                        onClick={() => { setMode('login'); setError(''); }}
                    >
                        Log In
                    </button>
                    <button
                        className={`tab-btn ${mode === 'signup' ? 'active' : ''}`}
                        onClick={() => { setMode('signup'); setError(''); }}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="login-auth-flow">
                    {error && (
                        <div className="login-error-message animate-fadeIn">
                            {error}
                        </div>
                    )}

                    <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="login-form">
                        <div className="form-group">
                            <label className="form-label">
                                <FiUser className="input-icon" />
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Enter username"
                                className="form-input"
                                required
                                disabled={loading}
                            />
                        </div>

                        {mode === 'signup' && (
                            <div className="form-group animate-fadeIn">
                                <label className="form-label">
                                    <FiMail className="input-icon" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="you@company.com"
                                    className="form-input"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">
                                <FiLock className="input-icon" />
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter password"
                                className="form-input"
                                required
                                disabled={loading}
                            />
                        </div>

                        {mode === 'signup' && (
                            <div className="form-group animate-fadeIn">
                                <label className="form-label">
                                    <FiLock className="input-icon" />
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm password"
                                    className="form-input"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <><FiLoader className="spinner" /> Processing...</>
                            ) : (
                                <>{mode === 'login' ? 'Log In' : 'Register Now'} <FiArrowRight /></>
                            )}
                        </button>
                    </form>
                </div>

                <div className="login-footer">
                    <p>Secured Multi-Device Intelligence</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
