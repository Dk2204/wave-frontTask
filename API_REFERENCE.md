# API Integration Reference

## Base Configuration

```javascript
Base URL: https://account-api.intellizence.com/api
Authentication: Bearer Token
Content-Type: application/json
```

## Endpoints

### 1. Request Authentication Code

**Endpoint**: `POST /auth/request-code`

**Purpose**: Initiates the authentication process by sending a verification code to the user's email.

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Success Response**:
```json
{
  "status": "success",
  "message": "Code sent successfully"
}
```

**Implementation Location**: `src/services/api.js` → `authAPI.requestCode()`

---

### 2. Validate Authentication Code

**Endpoint**: `POST /auth/validate-code`

**Purpose**: Validates the verification code and returns an authentication token.

**Request Body**:
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

**Success Response**:
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Token Handling**:
- Token is automatically stored in `localStorage` under the key `authToken`
- All subsequent API requests include: `Authorization: Bearer <token>`

**Implementation Location**: `src/services/api.js` → `authAPI.validateCode()`

---

### 3. Get User Subscriptions

**Endpoint**: `GET /my/subscriptions`

**Purpose**: Retrieves the user's active subscriptions, including company domains and triggers/signals.

**Headers Required**:
```
Authorization: Bearer <token>
```

**Success Response**:
```json
{
  "subscriptions": [
    {
      "id": "sub_123",
      "resource": "news.companies",
      "companies": [
        {
          "name": "Company A",
          "domain": "companya.com"
        },
        {
          "name": "Company B",
          "domain": "companyb.com"
        }
      ],
      "signals": ["Funding", "Acquisition", "Product Launch"],
      "triggers": ["Executive Change", "Partnership"]
    },
    {
      "id": "sub_124",
      "resource": "other.resource",
      "...": "..."
    }
  ]
}
```

**Filter Extraction**:
The application filters subscriptions where `resource === "news.companies"` and extracts:
- `companies[].domain` → Company Domain filter options
- `signals` or `triggers` arrays → Triggers/Signals filter options

**Implementation Location**: `src/services/api.js` → `subscriptionsAPI.getSubscriptions()`

**Usage in Dashboard**: `src/components/Dashboard.jsx` → `fetchSubscriptions()`

---

### 4. Get Company News

**Endpoint**: `POST /company-news/user/Trial`

**Purpose**: Retrieves company news based on applied filters.

**Headers Required**:
```
Authorization: Bearer <token>
```

**Request Body** (all fields optional):
```json
{
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "companyDomain": "companya.com",
  "triggers": ["Funding", "Acquisition"]
}
```

**Success Response**:
```json
{
  "news": [
    {
      "id": "news_123",
      "title": "Company A Raises $50M in Series B",
      "description": "Company A announced today that it has raised $50 million in Series B funding led by XYZ Ventures.",
      "company": "Company A",
      "companyDomain": "companya.com",
      "announcedDate": "2024-02-15T10:30:00Z",
      "url": "https://example.com/news/article-123",
      "triggers": ["Funding"],
      "metadata": {
        "source": "TechCrunch",
        "author": "John Doe"
      }
    },
    {
      "id": "news_124",
      "title": "Company B Acquires Startup X",
      "description": "In a strategic move, Company B has acquired Startup X for an undisclosed amount.",
      "company": "Company B",
      "companyDomain": "companyb.com",
      "announcedDate": "2024-02-14T14:20:00Z",
      "url": "https://example.com/news/article-124",
      "triggers": ["Acquisition"],
      "metadata": {
        "source": "Bloomberg",
        "author": "Jane Smith"
      }
    }
  ],
  "total": 2,
  "page": 1
}
```

**Implementation Location**: `src/services/api.js` → `newsAPI.getCompanyNews()`

**Usage in Dashboard**: `src/components/Dashboard.jsx` → `fetchNews()`

---

## Authentication Flow

```
1. User enters email
   ↓
2. POST /auth/request-code
   ↓
3. User receives code via email
   ↓
4. User enters code
   ↓
5. POST /auth/validate-code
   ↓
6. Store token in localStorage
   ↓
7. All subsequent requests include token in Authorization header
```

## Error Handling

### 401 Unauthorized
- **Trigger**: Invalid or expired token
- **Action**: Automatically removes token from localStorage and redirects to login
- **Implementation**: `src/services/api.js` → Response interceptor

### 400 Bad Request
- **Trigger**: Invalid request data
- **Action**: Display error message to user
- **Implementation**: Component-level error handling

### 500 Server Error
- **Trigger**: Server-side issues
- **Action**: Display generic error message
- **Implementation**: Component-level error handling

---

## Request Interceptors

### Authorization Header Injection
```javascript
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Auto-Logout on 401
```javascript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
```

---

## Filter Application Logic

### Date Range Filter
```javascript
if (filters.startDate && filters.endDate) {
  payload.startDate = filters.startDate;  // "YYYY-MM-DD"
  payload.endDate = filters.endDate;      // "YYYY-MM-DD"
}
```

### Company Domain Filter
```javascript
if (filters.companyDomain) {
  payload.companyDomain = filters.companyDomain;  // "companya.com"
}
```

### Triggers Filter
```javascript
if (filters.triggers.length > 0) {
  payload.triggers = filters.triggers;  // ["Funding", "Acquisition"]
}
```

---

## Local Storage Schema

```javascript
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Token Lifecycle**:
- Set: On successful login (`validateCode`)
- Read: On every API request (via interceptor)
- Remove: On logout or 401 error

---

## Testing the API

### Using the Application
1. Start the dev server: `npm run dev`
2. Open http://localhost:5173
3. Follow the authentication flow
4. Test filters and search functionality

### Using curl (for direct API testing)

**Request Code**:
```bash
curl -X POST https://account-api.intellizence.com/api/auth/request-code \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com"}'
```

**Validate Code**:
```bash
curl -X POST https://account-api.intellizence.com/api/auth/validate-code \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","code":"123456"}'
```

**Get Subscriptions**:
```bash
curl -X GET https://account-api.intellizence.com/api/my/subscriptions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Get News**:
```bash
curl -X POST https://account-api.intellizence.com/api/company-news/user/Trial \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"startDate":"2024-01-01","endDate":"2024-12-31"}'
```

---

## File Locations

- **API Service**: `src/services/api.js`
- **Login Component**: `src/components/Login.jsx`
- **Dashboard Component**: `src/components/Dashboard.jsx`
- **App Entry**: `src/App.jsx`

---

This reference covers all API integrations used in the Intellizence platform.
