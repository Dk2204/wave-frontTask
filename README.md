# Intellizence - Company Intelligence Platform

A modern React application for tracking company news with advanced filtering capabilities. Built with a premium UI featuring glassmorphism, smooth animations, and intuitive user flow.

## Features

### 🔐 Authentication
- **Email-based authentication** with two-step verification
- Request code → Validate code flow
- Secure token-based session management
- Auto-logout on token expiration

### 📰 Company News Dashboard
- **Real-time news feed** from Intellizence API
- **Advanced filtering system:**
  - Date range selection (announced date)
  - Company domain filtering
  - Triggers/Signals filtering (multi-select)
- **Search functionality** across news titles, descriptions, and companies
- **Responsive grid layout** with smooth animations
- **News cards** displaying:
  - Company badges
  - Announcement dates
  - Titles and descriptions
  - Associated triggers/signals
  - External links

### 🎨 Premium UI/UX
- **Dark theme** with glassmorphism effects
- **Gradient accents** and smooth transitions
- **Animated background** with floating gradient orbs
- **Micro-animations** for better user engagement
- **Sticky filters** panel for easy access
- **Responsive design** for all screen sizes

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client with interceptors
- **date-fns** - Date formatting and manipulation
- **React Icons** - Icon library
- **CSS3** - Custom styling with CSS variables and animations

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the local URL shown in the terminal (typically `http://localhost:5173`)

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## API Endpoints

The application integrates with the following Intellizence API endpoints:

1. **Request Code**: `POST /api/auth/request-code`
2. **Validate Code**: `POST /api/auth/validate-code`
3. **My Subscriptions**: `GET /api/my/subscriptions`
4. **Company News**: `POST /api/company-news/user/Trial`

## Project Structure

```
src/
├── components/
│   ├── Login.jsx          # Authentication component
│   ├── Login.css          # Login styling
│   ├── Dashboard.jsx      # Main dashboard with filters
│   └── Dashboard.css      # Dashboard styling
├── services/
│   └── api.js            # API service layer
├── App.jsx               # Main app component
├── App.css               # App-level styling
├── main.jsx              # Entry point
└── index.css             # Global styles & design system
```

## Key Features Implementation

### Authentication Flow
1. User enters email
2. System sends verification code
3. User enters code
4. On success, receives bearer token
5. Token stored in localStorage
6. Auto-added to all API requests via interceptor

### Filter System
- Filters are extracted from "My Subscriptions" API
- Only subscriptions with `resource: "news.companies"` are used
- Company domains and triggers are dynamically populated
- Filters apply in real-time to the news feed
- Multiple triggers can be selected simultaneously

### User Flow Tracking
- Clear visual feedback for all interactions
- Loading states for async operations
- Error handling with user-friendly messages
- Smooth transitions between states
- Sticky header and filters for easy navigation

## Design Philosophy

- **Premium First**: Every element designed to impress
- **User-Centric**: Intuitive flow with minimal friction
- **Performance**: Optimized rendering and smooth animations
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Responsive**: Works beautifully on all devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is built as a UI developer task demonstration for Intellizence.

---

Built with ❤️ using React and modern web technologies
