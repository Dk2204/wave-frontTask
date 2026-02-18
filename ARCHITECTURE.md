# Component Architecture

## Overview

The application follows a clean, modular architecture with separation of concerns between UI components, business logic, and API services.

```
┌─────────────────────────────────────────────────┐
│                    App.jsx                      │
│  (Main container, auth state management)        │
└───────────────┬─────────────────────────────────┘
                │
        ┌───────┴────────┐
        │                │
┌───────▼──────┐  ┌──────▼──────────┐
│  Login.jsx   │  │ Dashboard.jsx   │
│              │  │                 │
│ - Email      │  │ - Header        │
│ - Code       │  │ - Filters       │
│ - Auth Flow  │  │ - Search        │
│              │  │ - News Grid     │
└──────┬───────┘  └────────┬────────┘
       │                   │
       │                   │
   ┌───▼───────────────────▼────┐
   │     services/api.js        │
   │  - authAPI                 │
   │  - subscriptionsAPI        │
   │  - newsAPI                 │
   │  - Interceptors            │
   └────────────┬───────────────┘
                │
                ▼
   ┌────────────────────────────┐
   │  Intellizence API Endpoints│
   └────────────────────────────┘
```

---

## Component Breakdown

### 1. App.jsx
**Purpose**: Root component managing application-level state and routing

**State**:
- `isAuthenticated`: Boolean tracking login status
- `loading`: Boolean for initial auth check

**Functions**:
- `checkAuth()`: Validates token presence on mount
- `handleLoginSuccess()`: Updates state on successful login
- `handleLogout()`: Clears auth state

**Renders**:
- Login component (if not authenticated)
- Dashboard component (if authenticated)
- Loading spinner (during initial check)

**File**: `src/App.jsx` (41 lines)

---

### 2. Login.jsx
**Purpose**: Handles two-step email authentication

**State**:
- `step`: 'email' or 'code' (authentication step)
- `email`: User's email address
- `code`: Verification code
- `loading`: API call in progress
- `error`: Error message string
- `message`: Success message string

**Functions**:
- `handleRequestCode()`: Sends email to get verification code
- `handleValidateCode()`: Validates code and receives token

**UI Features**:
- Animated gradient orbs background
- Glassmorphism card
- Email input form
- Code verification form
- Loading states
- Error/success alerts
- Back button (on code step)

**Animations**:
- Scale-in card entrance
- Slide-down alerts
- Floating gradient orbs
- Pulsing logo

**Files**: 
- `src/components/Login.jsx` (175 lines)
- `src/components/Login.css` (245 lines)

---

### 3. Dashboard.jsx
**Purpose**: Main application interface with news display and filtering

**State**:
- `loading`: Boolean for news fetch status
- `subscriptions`: Object with user subscription data
- `news`: Array of news items
- `filters`: Object containing all active filters
  - `startDate`: ISO date string
  - `endDate`: ISO date string
  - `companyDomain`: String
  - `triggers`: Array of strings
- `showFilters`: Boolean to toggle filter panel
- `searchQuery`: String for text search

**Effects**:
- `fetchSubscriptions()`: Runs on mount
- `fetchNews()`: Runs when filters change

**Functions**:
- `fetchSubscriptions()`: Gets user's subscriptions from API
- `fetchNews()`: Gets news based on current filters
- `handleLogout()`: Calls logout callback
- `handleFilterChange()`: Updates filter state
- `toggleTrigger()`: Adds/removes trigger from filters
- `clearFilters()`: Resets all filters to default

**Derived Data**:
- `filteredNews`: News filtered by search query
- `availableDomains`: Extracted from subscriptions
- `availableTriggers`: Extracted from subscriptions
- `uniqueDomains`: Deduplicated domain list
- `uniqueTriggers`: Deduplicated trigger list

**UI Sections**:

#### Header
- Logo and title
- Filter toggle button
- Refresh button
- Logout button

#### Filters Panel (Sidebar)
- Date range inputs (start/end)
- Company domain dropdown
- Trigger chips (multi-select)
- Clear all button

#### News Content
- Search bar with icon
- Stats bar (total count, active filters)
- News grid (responsive)
- Loading state
- Empty state

#### News Card
- Company badge
- Announcement date
- Title
- Description (truncated)
- Trigger tags
- External link

**Responsive Behavior**:
- Desktop: Sidebar + grid layout
- Tablet: Stacked layout
- Mobile: Single column

**Files**:
- `src/components/Dashboard.jsx` (287 lines)
- `src/components/Dashboard.css` (490 lines)

---

## Service Layer

### services/api.js
**Purpose**: Centralized API communication with interceptors

**Structure**:

#### axios Instance
```javascript
const apiClient = axios.create({
  baseURL: 'https://account-api.intellizence.com/api',
  headers: { 'Content-Type': 'application/json' }
})
```

#### Request Interceptor
- Automatically adds Authorization header
- Reads token from localStorage

#### Response Interceptor
- Catches 401 errors
- Auto-logout on unauthorized
- Redirects to login

#### API Modules

**authAPI**:
- `requestCode(email)` → POST /auth/request-code
- `validateCode(email, code)` → POST /auth/validate-code
- `logout()` → Clears localStorage
- `isAuthenticated()` → Checks token existence

**subscriptionsAPI**:
- `getSubscriptions()` → GET /my/subscriptions

**newsAPI**:
- `getCompanyNews(filters)` → POST /company-news/user/Trial

**File**: `src/services/api.js` (75 lines)

---

## Styling Architecture

### Global Styles (index.css)

**CSS Variables**:
```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--bg-primary: #0f0f1e
--text-primary: #ffffff
--border-color: rgba(255, 255, 255, 0.1)
--shadow-glow: 0 0 20px rgba(102, 126, 234, 0.3)
--transition-normal: 0.3s ease
```

**Utilities**:
- `.glass-effect`: Glassmorphism styling
- `.gradient-text`: Gradient text color
- Animation keyframes
- Scrollbar styling
- Global resets

**Animations**:
- `spin`: Rotation (loading)
- `pulse`: Opacity fade
- `slideUp/slideDown`: Vertical entrance
- `fadeIn`: Opacity transition
- `scaleIn`: Scale entrance
- `gradientShift`: Background animation
- `float`: Orb animation

**File**: `src/index.css` (177 lines)

---

## Data Flow

### Authentication Flow
```
1. User enters email
   └→ Login.jsx: handleRequestCode()
      └→ api.js: authAPI.requestCode()
         └→ API: POST /auth/request-code

2. User enters code
   └→ Login.jsx: handleValidateCode()
      └→ api.js: authAPI.validateCode()
         └→ API: POST /auth/validate-code
            └→ Response: { token }
               └→ localStorage.setItem('authToken', token)
                  └→ Login.jsx: onLoginSuccess()
                     └→ App.jsx: setIsAuthenticated(true)
```

### News Fetching Flow
```
1. Dashboard mounts
   └→ useEffect: fetchSubscriptions()
      └→ api.js: subscriptionsAPI.getSubscriptions()
         └→ API: GET /my/subscriptions
            └→ Extract domains & triggers
               └→ Populate filter options

2. Filters change
   └→ useEffect: fetchNews()
      └→ Build filter payload
         └→ api.js: newsAPI.getCompanyNews(filters)
            └→ API: POST /company-news/user/Trial
               └→ Update news state
                  └→ Re-render news grid

3. Search query changes
   └→ Filter news client-side
      └→ Update filteredNews
         └→ Re-render news grid
```

### Filter Application
```
User interaction
    ↓
handleFilterChange() / toggleTrigger()
    ↓
Update filters state
    ↓
useEffect triggers (dependency: filters)
    ↓
fetchNews() with new filters
    ↓
API call with filter payload
    ↓
Update news state
    ↓
Component re-renders
```

---

## State Management

### App Level
- Authentication status
- Loading states

### Dashboard Level
- Subscriptions data
- News data
- Filter states
- UI toggles (filter panel, search)

### No Global State Manager
- Props drilling for callbacks
- localStorage for persistence
- React hooks for local state

**Rationale**: Application is simple enough that Redux/Context would be overkill

---

## Performance Optimizations

### Current
- Minimal re-renders (useState, useEffect)
- Debounced search (client-side filtering fast enough)
- Conditional rendering (showFilters toggle)
- CSS animations (GPU accelerated)

### Future Considerations
- Pagination for large news lists
- Virtual scrolling for 1000+ items
- Memoization with useMemo/useCallback
- Code splitting with React.lazy()
- Service Worker for offline support

---

## File Structure

```
src/
├── components/
│   ├── Login.jsx           # 175 lines
│   ├── Login.css           # 245 lines
│   ├── Dashboard.jsx       # 287 lines
│   └── Dashboard.css       # 490 lines
├── services/
│   └── api.js              # 75 lines
├── App.jsx                 # 41 lines
├── App.css                 # 9 lines
├── main.jsx                # 10 lines
└── index.css               # 177 lines

Total: ~1,509 lines of code
```

---

## Design Patterns Used

### Component Patterns
- **Container/Presentational**: Dashboard handles logic, renders presentational cards
- **Controlled Components**: All form inputs controlled by React state
- **Composition**: Small, focused components

### React Patterns
- **Custom Hooks**: Could be extracted (e.g., useAuth, useFilters)
- **Effect Dependencies**: Proper dependency arrays for useEffect
- **Conditional Rendering**: Based on state (loading, empty, error)

### API Patterns
- **Service Layer**: Separation of API logic from components
- **Interceptors**: Centralized auth and error handling
- **Async/Await**: Clean asynchronous code

### CSS Patterns
- **CSS Variables**: Theming and consistency
- **BEM-like Naming**: Scoped, descriptive class names
- **Mobile-First**: Responsive design with media queries
- **Utility Classes**: Reusable utilities (glass-effect, gradient-text)

---

## Testing Strategy (Recommended)

### Unit Tests
- API service functions
- Filter logic
- State updates

### Integration Tests
- Login flow (email → code → success)
- Filter application (select → API call → display)
- Search functionality

### E2E Tests
- Complete user journey
- Authentication + filtering + news display

### Tools Suggested
- Jest + React Testing Library
- Cypress for E2E
- MSW for API mocking

---

## Future Enhancements

### Features
- [ ] Save filter presets
- [ ] Bookmark/favorite news items
- [ ] Email notifications for new news
- [ ] Dark/light theme toggle
- [ ] Export news to CSV/PDF
- [ ] Advanced search (boolean operators)

### Technical
- [ ] Add TypeScript
- [ ] Implement pagination
- [ ] Add error boundaries
- [ ] Add analytics tracking
- [ ] Add unit tests
- [ ] PWA capabilities
- [ ] Optimize bundle size

### UI/UX
- [ ] Skeleton loaders
- [ ] Infinite scroll
- [ ] News preview modal
- [ ] Keyboard shortcuts
- [ ] Accessibility improvements (ARIA labels)
- [ ] Onboarding tutorial

---

This architecture provides a solid foundation for scaling the application while maintaining code quality and user experience.
