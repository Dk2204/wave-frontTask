# Intellizence Platform - Usage Guide

## Getting Started

### 1. Starting the Application

The development server is already running! You can access it at:
**http://localhost:5173**

If you need to restart it:
```bash
npm run dev
```

### 2. Authentication Flow

#### Step 1: Request Code
1. Open the application in your browser
2. You'll see a beautiful login screen with animated gradient orbs
3. Enter your email address in the email field
4. Click "Continue"
5. The system will send a verification code to your email

#### Step 2: Validate Code
1. Check your email for the verification code
2. Enter the code in the verification field
3. Click "Verify & Login"
4. Upon success, you'll be redirected to the dashboard

### 3. Dashboard Features

#### Main Navigation
- **Toggle Filters**: Click the filter icon in the header to show/hide the filters panel
- **Refresh**: Click the refresh icon to reload the latest news
- **Logout**: Click the logout button to end your session

#### Filters Panel (Left Sidebar)

The filters are automatically populated from your subscriptions:

1. **Announced Date Range**
   - Select a start date and end date
   - Only news within this range will be displayed
   - Leave blank to show all dates

2. **Company Domain**
   - Dropdown list of all available company domains
   - Select "All Domains" to see news from all companies
   - Choose a specific domain to filter news

3. **Triggers/Signals**
   - Multi-select chips for different triggers
   - Click on a trigger to activate it (turns purple)
   - Click again to deactivate
   - Multiple triggers can be selected simultaneously
   - Only news matching selected triggers will be shown

4. **Clear All**
   - Click "Clear All" button to reset all filters

#### Search Functionality
- Use the search bar at the top of the news section
- Search by:
  - News title
  - Description
  - Company name
- Real-time filtering as you type
- Click the X button to clear the search

#### News Display

Each news card shows:
- **Company Badge**: Purple gradient badge with company name
- **Date**: When the news was announced
- **Title**: Main headline
- **Description**: Brief summary (truncated to 3 lines)
- **Triggers**: Blue tags showing associated signals/triggers
- **Read More Link**: Opens the full article in a new tab

### 4. User Flow Tracking

The application is designed for optimal user experience:

1. **Visual Feedback**
   - Loading spinners during API calls
   - Success/error messages with color coding
   - Hover effects on all interactive elements
   - Smooth transitions between states

2. **Smart Filtering**
   - Filters automatically extracted from your subscriptions
   - Only shows relevant filter options
   - Real-time updates to news feed
   - Stats bar shows filtered results count

3. **Responsive Design**
   - Desktop: Sidebar filters + grid layout
   - Tablet: Stacked layout with collapsible filters
   - Mobile: Single column with expandable filters

### 5. Common Actions

#### Viewing News from a Specific Company
1. Open the Company Domain dropdown
2. Select the company you want to track
3. News automatically filters to that company

#### Finding News by Signal Type
1. Scroll to Triggers/Signals section
2. Click on the signals you're interested in (e.g., "Funding", "Acquisition")
3. News cards will update to show only matching items

#### Searching for Specific Topics
1. Type keywords in the search bar
2. Results update in real-time
3. Works across all fields (title, description, company)

#### Viewing News from Last Week
1. Click the start date field
2. Select a date 7 days ago
3. Click the end date field
4. Select today's date
5. News automatically filters to this range

### 6. API Integration Details

The application connects to:
- **Base URL**: `https://account-api.intellizence.com/api`
- **Authentication**: Bearer token (automatically managed)
- **Token Storage**: localStorage (persists across sessions)
- **Auto-logout**: On token expiration or API 401 errors

### 7. Performance Tips

- **First Load**: May take a moment to fetch subscriptions and initial news
- **Filtering**: Applied client-side for instant updates
- **Refresh**: Pull latest news without reloading the page
- **Smooth Scrolling**: Sticky header and filters stay accessible

### 8. Troubleshooting

**Cannot log in?**
- Ensure you're using a valid email
- Check spam folder for verification code
- Code may expire after some time - request a new one

**No news showing?**
- Check if filters are too restrictive
- Click "Clear All" to reset filters
- Use the refresh button to reload data

**Filters not appearing?**
- Ensure you have active subscriptions
- Only subscriptions with resource "news.companies" are used
- Refresh subscriptions by reloading the page

### 9. Design Features

**Premium UI Elements:**
- Glassmorphism effects with backdrop blur
- Gradient text and buttons
- Floating animated background orbs
- Smooth micro-animations on interactions
- Custom scrollbar styling
- Responsive grid layouts

**Color Scheme:**
- Primary: Purple gradient (#667eea → #764ba2)
- Accent: Pink to red gradient
- Success: Blue cyan gradient
- Dark theme throughout

### 10. Keyboard Navigation

- **Tab**: Navigate through interactive elements
- **Enter**: Submit forms, activate buttons
- **Esc**: Can be used to close modals (future feature)

---

## Support

For any issues or questions, please refer to:
- README.md for technical details
- API documentation for endpoint specifications
- Component files for implementation details

Enjoy using Intellizence! 🚀
