# Testing Strategy

The Intellizence project includes a comprehensive testing suite utilizing **Vitest** and **React Testing Library**.

## Test Structure

### Unit Tests
Located next to the source files they test (e.g., `*.test.js` or `*.test.jsx`).

- **Services**: `src/services/api.test.js` covering API endpoints and logic.
- **Components**: `src/components/Login.test.jsx` covering UI interactions.

### Running Tests

To run the test suite:

```bash
npm install
npm test
```

## Coverage

### API Service (`api.test.js`)
- `authAPI.requestCode`: Verifies correct endpoint and payload.
- `authAPI.validateCode`: Verifies token handling and storage.
- `authAPI.logout`: Verifies token removal.
- `subscriptionsAPI`: Verifies data fetching.
- `newsAPI`: Verifies filter payload construction.

### Login Component (`Login.test.jsx`)
- Initial rendering of email form.
- Form submission flow (email -> code step).
- Error handling display.
- Integration with API mocks.

## Configuration

Tests run in a `jsdom` environment configured in `vite.config.js`. Setup files are located in `src/tests/setup.js`.

## Future Improvements

- Add integration tests for the Dashboard component.
- Add E2E tests using Playwright or Cypress for full user flow validation.
- Add coverage reporting to CI pipeline.
