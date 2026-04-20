# HMA Study Assistant

AI-powered study assistant for O-Level History and Geography students, powered by Hamza Ali's notes.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure API key:
   - Copy `.env.example` to `.env`
   - Get a Gemini API key from https://makersuite.google.com/app/apikey
   - Add your key to the `.env` file:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```

3. Run locally:
   ```bash
   npm run dev
   ```

4. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

**Note:** The `.env` file is gitignored and will never be committed to protect your API key.
