import React, { useState, useRef, useEffect } from 'react';
import {
    FiMessageSquare,
    FiX,
    FiSend,
    FiZap,
    FiTerminal,
    FiCpu,
    FiTrendingUp,
    FiShield,
    FiExternalLink,
    FiMenu,
    FiBookOpen
} from 'react-icons/fi';
import './Chatbot.css';

const ANTIGRAVITY_PROMPTS = [
    {
        id: 'mn_a',
        title: 'M&A Intelligence',
        icon: <FiZap />,
        prompt: 'Analyze the latest M&A trends across the tech sector and identify potential consolidation patterns.',
        description: 'Strategic merger & acquisition signals.'
    },
    {
        id: 'risk_sig',
        title: 'Risk Acquisition',
        icon: <FiShield />,
        prompt: 'Scan for negative trigger signals (lawsuits, layoffs, or regulatory hurdles) for Fortune 500 companies.',
        description: 'Identifying corporate vulnerabilities.'
    },
    {
        id: 'growth_engine',
        title: 'Growth Vectors',
        icon: <FiTrendingUp />,
        prompt: 'Extract all product launch and expansion signals from the last 24 hours of raw intelligence.',
        description: 'New product and market entry signals.'
    },
    {
        id: 'leadership',
        title: 'Leadership Shifts',
        icon: <FiCpu />,
        prompt: 'Summarize executive appointments and departures in the competitive AI landscape.',
        description: 'Restructuring and C-suite movement.'
    },
    {
        id: 'briefing',
        title: 'Daily Briefing',
        icon: <FiTerminal />,
        prompt: 'Generate a strategic executive summary of the most critical intelligence signals encountered today.',
        description: 'High-level decision-maker summary.'
    }
];

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showPrompts, setShowPrompts] = useState(true);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Systems Online. I am **Antigravity**, your strategic intelligence layer. How can I augment your signal acquisition today?',
            timestamp: new Date().toISOString()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const handleSend = (text) => {
        const content = text || inputValue;
        if (!content.trim()) return;

        const userMessage = {
            role: 'user',
            content: content,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setShowPrompts(false);
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            const assistantMessage = {
                role: 'assistant',
                content: `Processing Intelligence Signal... \n\nI've analyzed your request regarding "${content.substring(0, 30)}...". My neural fabric is currently synchronizing with the live Intellizence stream. \n\n**Strategic Insight:** I am detecting a high concentration of ${content.toLowerCase().includes('risk') ? 'defensive' : 'expansionary'} signals in your current sector focus. \n\n*Note: This is a neural simulation of the Antigravity Layer output.*`,
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handlePromptClick = (prompt) => {
        handleSend(prompt);
    };

    return (
        <div className={`antigravity-chatbot-system ${isOpen ? 'is-open' : ''}`}>
            {/* Floating Trigger */}
            <button
                className="chatbot-trigger"
                onClick={() => setIsOpen(!isOpen)}
                title="Antigravity Intelligence Layer"
            >
                {isOpen ? <FiX size={24} /> : <FiCpu size={28} className="pulse-icon" />}
                {!isOpen && <span className="trigger-badge">AI</span>}
            </button>

            {/* Chat Container */}
            {isOpen && (
                <div className="chat-window animate-scaleIn">
                    <header className="chat-header">
                        <div className="header-info">
                            <div className="bot-avatar">
                                <FiCpu />
                                <span className="status-indicator"></span>
                            </div>
                            <div className="bot-meta">
                                <h3>Antigravity Bot</h3>
                                <span>Pulse Intelligence Active</span>
                            </div>
                        </div>
                        <div className="header-actions">
                            <button onClick={() => setShowPrompts(!showPrompts)} className={showPrompts ? 'active' : ''} title="Prompt Library">
                                <FiBookOpen />
                            </button>
                            <button onClick={() => setIsOpen(false)}>
                                <FiX />
                            </button>
                        </div>
                    </header>

                    <div className="chat-body">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message-wrapper ${msg.role}`}>
                                <div className="message-bubble">
                                    {msg.content}
                                    <div className="message-time">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message-wrapper assistant">
                                <div className="message-bubble typing">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {showPrompts && (
                        <div className="prompts-overlay animate-slideUp">
                            <div className="prompts-header">
                                <h4><FiTerminal /> Prompt Intelligence</h4>
                                <button onClick={() => setShowPrompts(false)}><FiX /></button>
                            </div>
                            <div className="prompts-grid">
                                {ANTIGRAVITY_PROMPTS.map(p => (
                                    <button
                                        key={p.id}
                                        className="prompt-card"
                                        onClick={() => handlePromptClick(p.prompt)}
                                    >
                                        <div className="prompt-icon">{p.icon}</div>
                                        <div className="prompt-content">
                                            <strong>{p.title}</strong>
                                            <p>{p.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div className="prompts-footer">
                                <a href="https://antigravity.ai/docs" target="_blank" rel="noopener noreferrer" className="docs-link">
                                    Access Full Intelligence Hub <FiExternalLink />
                                </a>
                            </div>
                        </div>
                    )}

                    <footer className="chat-footer">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Command intelligence..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button className="send-btn" onClick={() => handleSend()} disabled={!inputValue.trim()}>
                                <FiSend />
                            </button>
                        </div>
                        <div className="footer-tag">Powered by Antigravity Protocol v4.2</div>
                    </footer>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
