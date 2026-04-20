# Supabase Setup Guide

## Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "Start your project" 
3. Sign up/login
4. Create new project
5. Choose organization and region
6. Set database password (save it)
7. Wait for project to be created

## Step 2: Get Project Credentials
1. In your Supabase dashboard, go to Project Settings → API
2. Copy:
   - Project URL (looks like: https://abcdefg.supabase.co)
   - anon public key (starts with: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)

## Step 3: Install Supabase CLI
```bash
# For Windows (using PowerShell)
iwr -useb https://get.supabase.com | iex

# For Mac/Linux
brew install supabase/tap/supabase
```

## Step 4: Link Project
```bash
# In your project directory
supabase link --project-ref your-project-ref
```

## Step 5: Set Environment Variables
In Supabase dashboard → Settings → Edge Functions → Secrets:
- Add secret: `GEMINI_API_KEY`
- Value: Your Gemini API key from https://makersuite.google.com/app/apikey

## Step 6: Deploy Edge Function
```bash
# Deploy the chat function
supabase functions deploy chat
```

## Step 7: Update Frontend .env
Replace in your `.env` file:
```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

## Step 8: Test
1. Run frontend: `npm run dev`
2. Open http://localhost:8080
3. Send a test message

## Benefits
✅ API key never exposed to frontend
✅ Free tier (500k Edge Function calls/month)
✅ Global CDN for fast responses
✅ Auto-scaling
✅ Easy deployment
