# 🚀 Vercel Deployment Guide for Portfolio

## Prerequisites

1. **Node.js** - Download and install from [nodejs.org](https://nodejs.org/)
2. **Git** - Make sure your project is in a Git repository
3. **Vercel Account** - Sign up at [vercel.com](https://vercel.com/)

## Quick Deployment Steps

### Option 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project directory**
   ```bash
   # Navigate to your project
   cd "c:\Users\ASUS\Desktop\projects\portfolio"
   
   # Deploy to production
   vercel --prod
   ```

### Option 2: Using PowerShell Script

1. **Run the deployment script**
   ```powershell
   # Open PowerShell as Administrator
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   
   # Run the deployment script
   .\deploy.ps1
   ```

### Option 3: GitHub Integration (Recommended for automatic deployments)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Flask app

## Environment Variables

Set these in Vercel Dashboard under Project Settings > Environment Variables:

- `GOOGLE_GEMINI_API_KEY` - Your Google Gemini API key
- `SECRET_KEY` - A secure secret key for Flask sessions
- `FLASK_ENV` - Set to `production`

## Project Configuration

The following files are already configured for Vercel:

- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `requirements.txt` - Python dependencies
- ✅ `app.py` - Flask application with proper routing
- ✅ `.gitignore` - Excludes sensitive files

## Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click "Settings" > "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Troubleshooting

### Common Issues:

1. **Python version errors**
   - Vercel uses Python 3.9 by default
   - Add `runtime.txt` with `python-3.9` if needed

2. **Static files not loading**
   - Make sure your static files are in the `static/` directory
   - Flask should serve them automatically

3. **Environment variables not working**
   - Double-check they're set in Vercel Dashboard
   - Redeploy after setting environment variables

### Build Logs

Check build logs in Vercel Dashboard under "Functions" tab for any deployment errors.

## Live URL

After deployment, your portfolio will be available at:
- `https://your-project-name.vercel.app`
- Or your custom domain if configured

## Automatic Deployments

Once connected to GitHub:
- Push to `main` branch = Production deployment
- Push to other branches = Preview deployments
- Pull requests get their own preview URLs

---

🎉 **Your portfolio is now ready for the world!**

For support, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Flask Deployment Guide](https://vercel.com/guides/deploying-flask-with-vercel)
