# 🛠️ Complete Setup Guide for Vercel Deployment

## Step 1: Install Node.js

1. **Download Node.js**
   - Go to [https://nodejs.org/](https://nodejs.org/)
   - Download the LTS version (recommended)
   - Run the installer and follow the setup wizard

2. **Verify Installation**
   ```powershell
   node --version
   npm --version
   ```

## Step 2: Install Vercel CLI

```powershell
npm install -g vercel
```

## Step 3: Deploy Your Portfolio

### Option A: Direct Deployment (Quick)

```powershell
# Login to Vercel
vercel login

# Deploy (from your portfolio directory)
vercel --prod
```

### Option B: GitHub Integration (Recommended)

1. **Create GitHub Repository**
   - Go to [github.com](https://github.com)
   - Create a new repository called "portfolio"

2. **Push Your Code**
   ```powershell
   # Initialize git (if not already done)
   git init
   git add .
   git commit -m "Portfolio ready for deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

3. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your portfolio repository
   - Vercel will auto-detect it's a Python/Flask app

## Step 4: Configure Environment Variables

In Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add these variables:
   - `GOOGLE_GEMINI_API_KEY` = your Gemini API key
   - `SECRET_KEY` = any secure random string
   - `FLASK_ENV` = production

## Step 5: Access Your Live Portfolio

Your portfolio will be live at: `https://your-project-name.vercel.app`

---

## Alternative: Manual Deployment Files

If you prefer not to install Node.js locally, you can:

1. **Upload to GitHub** (using GitHub Desktop or web interface)
2. **Connect GitHub to Vercel** (no local CLI needed)
3. **Configure via Vercel web dashboard**

This method requires no local installations and works entirely through web interfaces.

---

## Need Help?

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- GitHub Desktop: [desktop.github.com](https://desktop.github.com)
- Contact: Open an issue in your repository
