import React, { useState, useEffect } from 'react';
import { FiUser, FiLock, FiArrowRight, FiLoader, FiUserPlus, FiLogIn, FiMail } from 'react-icons/fi';
import { authAPI } from '../services/api';
import './Login.css';

const Login = ({ onLoginSuccess, initialMode = 'login', isGatedAccess = false }) => {
    const [isLoginMode, setIsLoginMode] = useState(initialMode === 'login');
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    // Sync mode if initialMode changes
    useEffect(() => {
        setIsLoginMode(initialMode === 'login');
        setSignupSuccess(false);
        setError('');
    }, [initialMode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(''); // Clear error on typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate brief loading for better UX
        setTimeout(() => {
            try {
                if (isLoginMode) {
                    // Actual login attempt against local registry
                    const response = authAPI.login(formData.username, formData.password);
                    onLoginSuccess(response);
                } else {
                    // Check passwords match for signup
                    if (formData.password !== formData.confirmPassword) {
                        throw new Error('Passwords do not match');
                    }

                    // Register the user locally
                    authAPI.register({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password
                    });
                    setSignupSuccess(true);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }, 800);
    };

    const handleSwitchToLogin = () => {
        setIsLoginMode(true);
        setSignupSuccess(false);
        setError('');
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setError('');
    };

    return (
        <div className="login-container">
            <div className="login-card glass-effect animate-scaleIn">
                <div className="login-header">
                    <div className="logo-container">
                        <div className="logo-icon">IZ</div>
                    </div>
                    <h1 className="login-title gradient-text">Intellizence</h1>
                    <p className="login-subtitle">Company Intelligence Platform</p>
                </div>

                {signupSuccess ? (
                    <div className="success-view animate-fadeIn">
                        <div className="success-icon-container">
                            <FiUserPlus className="success-icon" />
                        </div>
                        <h2 className="success-title">Successfully account created</h2>
                        <p className="success-message">Your intelligence profile is ready. You can now log in to access the platform.</p>
                        <button
                            className="btn btn-primary"
                            onClick={handleSwitchToLogin}
                        >
                            Log In Now
                            <FiArrowRight />
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="login-tabs">
                            <button
                                className={`tab-btn ${isLoginMode ? 'active' : ''}`}
                                onClick={() => { setIsLoginMode(true); setError(''); }}
                            >
                                <FiLogIn /> Login
                            </button>
                            <button
                                className={`tab-btn ${!isLoginMode ? 'active' : ''}`}
                                onClick={() => { setIsLoginMode(false); setError(''); }}
                            >
                                <FiUserPlus /> Sign Up
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            {isLoginMode && <h2 className="form-section-title">Log in</h2>}
                            {!isLoginMode && <h2 className="form-section-title">Join Us</h2>}

                            {error && (
                                <div className="login-error-message animate-fadeIn">
                                    {error}
                                </div>
                            )}

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

                            {!isLoginMode && (
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

                            {!isLoginMode && (
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
                                        placeholder="Confirm your password"
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
                                    <>
                                        <FiLoader className="spinner" />
                                        {isLoginMode ? 'Logging in...' : 'Creating Account...'}
                                    </>
                                ) : (
                                    <>
                                        {isLoginMode ? 'Log In' : 'Create Account'}
                                        <FiArrowRight />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="login-footer">
                            <p>
                                {isLoginMode
                                    ? "Don't have an account yet?"
                                    : "Already have an account?"}
                                <button
                                    className="btn-link"
                                    onClick={toggleMode}
                                >
                                    {isLoginMode ? 'Register Now' : 'Log In Instead'}
                                </button>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
