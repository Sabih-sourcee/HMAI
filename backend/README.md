# HMA Backend API

Secure backend for HMA Study Assistant that handles Gemini API calls.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Add your Gemini API key to `.env`

3. Run locally:
   ```bash
   npm run dev
   ```

4. Deploy to production:
   ```bash
   npm start
   ```

## API Endpoints

- `POST /api/chat` - Send message to AI assistant
- `GET /health` - Health check

The frontend should be configured with `VITE_BACKEND_URL` pointing to this server.
