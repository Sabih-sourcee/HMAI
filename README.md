# HMA Study Assistant

AI-powered study assistant for O-Level History and Geography students, powered by Hamza Ali's notes.

## Setup

### Option 1: Supabase (Recommended - Secure & Free)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Supabase:**
   - Follow [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions
   - Create Supabase project at https://supabase.com
   - Deploy Edge Function with your Gemini API key

3. **Configure frontend:**
   - Copy `.env.example` to `.env`
   - Add your Supabase URL and anon key:
     ```
     VITE_SUPABASE_URL=https://your-project-ref.supabase.co
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Run locally:**
   ```bash
   npm run dev
   ```

### Option 2: Local Backend (Development Only)

1. **Install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Configure backend:**
   - Copy `backend/.env.example` to `backend/.env`
   - Add your Gemini API key to `backend/.env`

4. **Run both servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start
   
   # Terminal 2 - Frontend
   cd ..
   npm run dev
   ```

## Deployment

### GitHub Pages (Frontend Only)
```bash
npm run deploy
```

### Supabase (Backend API)
```bash
supabase functions deploy chat
```

## Security

- ✅ **Supabase**: API key stored securely in Edge Function secrets
- ⚠️ **Local Backend**: API key in `.env` file (never commit)
- ❌ **Direct API**: API key exposed in frontend (NOT recommended)
